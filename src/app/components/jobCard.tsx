'use client'
import React, { useState, useRef, useEffect } from "react";
import JobUpdateForm from "../jobs/job-update-form";
import { FiMapPin, FiClock, FiTrash2, FiEdit, FiBriefcase, FiChevronDown, FiChevronUp, FiMaximize2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '../types/job.type';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';

type JobCardProps = {
  job: Job;
  onDelete?: (jobId: string) => void;
  showActions?: boolean;
};

const JobCard = ({ job, onDelete, showActions = true }: JobCardProps) => {
  const { jobId, jobTitle, jobDescription, location, companyName, createdAt, isExpired } = job;
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    if (onDelete && window.confirm(`¿Seguro que quieres eliminar el anuncio "${jobTitle}"?`)) {
      onDelete(jobId);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  useEffect(() => {
    const element = descriptionRef.current;
    if (element) {
      const hasClamp = element.scrollHeight > element.clientHeight;
      setIsClamped(hasClamp);
    }
    return () => setIsClamped(false);
  }, [jobDescription]);

  return (
    <>
      <motion.div
        className={`relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden group transition-opacity duration-300 h-full flex flex-col ${isExpired ? 'opacity-60' : ''}`}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.02, shadow: 'lg', borderColor: 'rgb(209 213 219)' }}
        transition={{ type: 'spring', stiffness: 300, duration: 0.3 }}
      >
        <div className="relative z-10 flex flex-col flex-grow p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{jobTitle}</h2>
              <div className="flex items-center gap-1.5 text-sm text-blue-600 font-medium mt-1">
                <FiBriefcase className="w-4 h-4"/>
                <span>{companyName}</span>
              </div>
            </div>
            {isExpired && (
               <span className="flex-shrink-0 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">Expirado</span>
            )}
             {!isExpired && showActions && (
               <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Activo</span>
             )}
          </div>

          <p
            ref={descriptionRef}
            className={`text-gray-700 text-sm mb-4 line-clamp-3 flex-grow`}
          >
            {jobDescription}
          </p>

          <div className={`flex items-center gap-4 text-xs text-gray-500 border-t border-gray-200 pt-3 mt-auto`}>
            <div className="flex items-center gap-1">
              <FiMapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {isClamped && (
            <Button
              size="sm"
              variant="light"
              onPress={onOpen}
              className="absolute bottom-[calc(1rem+1.5rem)] right-6 text-blue-600 hover:text-blue-800 z-20 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 h-auto"
              startContent={<FiMaximize2 className="w-3.5 h-3.5" />}
            >
              Leer más
            </Button>
          )}
        </div>

        {showActions && onDelete && (
             <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
               <JobUpdateForm job={job} />
               <Button isIconOnly color="danger" variant="light" onPress={handleDelete} aria-label="Eliminar Anuncio" className="hover:bg-red-100 text-red-600">
                 <FiTrash2 className="w-5 h-5" />
               </Button>
             </div>
         )}
      </motion.div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
        scrollBehavior="inside"
        backdrop="blur"
        className="text-gray-900"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b border-gray-200 pb-4">
                 <h3 className="text-xl font-semibold text-gray-900">{jobTitle}</h3>
                <div className="flex items-center gap-1.5 text-sm text-blue-600 font-medium">
                  <FiBriefcase className="w-4 h-4"/>
                  <span>{companyName}</span>
                </div>
              </ModalHeader>
              <ModalBody className="py-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {jobDescription}
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobCard;
