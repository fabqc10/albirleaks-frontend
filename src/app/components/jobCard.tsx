'use client'
import React, { useState, useRef, useEffect } from "react";
import JobUpdateForm from "../jobs/job-update-form";
import { FiMapPin, FiClock, FiTrash2, FiEdit, FiBriefcase, FiMaximize2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
// import { Job } from '../types/job.type'; // <-- ERROR DE LINTER AQUÍ
// --- Solución Temporal Linter: Define un tipo básico si no encuentras el import ---
 type Job = {
   jobId: string;
   jobTitle: string;
   jobDescription: string;
   location: string;
   companyName: string;
   createdAt: string;
   isExpired?: boolean;
 };
 // --- Fin Solución Temporal ---
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
      const checkClamp = () => {
          const hasClamp = element.scrollHeight > element.clientHeight;
          if (hasClamp !== isClamped) {
              setIsClamped(hasClamp);
          }
      };
      checkClamp();
      window.addEventListener('resize', checkClamp);
      return () => {
          window.removeEventListener('resize', checkClamp);
      };
    }
  }, [jobDescription, isClamped]);

  return (
    <>
      <motion.div
        className={`relative bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-md overflow-hidden group transition-opacity duration-300 h-full flex flex-col ${isExpired ? 'opacity-60' : 'hover:border-white/20'}`}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, duration: 0.3 }}
      >
        <div className="relative z-10 flex flex-col flex-grow p-6">
          <div className="flex items-start justify-between mb-3">
           <div>
            <h2 className="text-lg font-semibold text-white line-clamp-2">{jobTitle}</h2>
            <div className="flex items-center gap-1.5 text-sm text-blue-400 font-medium mt-1">
              <FiBriefcase className="w-4 h-4"/>
              <span>{companyName}</span>
            </div>
           </div>
           {isExpired && ( <span className="flex-shrink-0 px-2 py-0.5 bg-red-500/20 text-red-300 text-xs rounded-full font-medium">Expirado</span> )}
           {!isExpired && showActions && ( <span className="flex-shrink-0 px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full font-medium">Activo</span> )}
          </div>

          <p
            ref={descriptionRef}
            className={`text-gray-300 text-sm mb-4 line-clamp-3 flex-grow`}
          >
            {jobDescription}
          </p>

          <div className={`flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-3 mt-auto`}>
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
              className="absolute bottom-[calc(1rem+1.5rem)] right-6 text-blue-400 hover:text-blue-300 z-20 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 h-auto font-medium"
              startContent={<FiMaximize2 className="w-3.5 h-3.5" />}
            >
              Leer más
            </Button>
          )}
        </div>

        {showActions && onDelete && (
             <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-white/10 bg-black/20">
               <JobUpdateForm job={job} />
               <Button isIconOnly color="danger" variant="light" onPress={handleDelete} aria-label="Eliminar Anuncio" className="text-red-400 hover:bg-red-500/20">
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
      >
        <ModalContent className="dark:bg-gray-900 dark:text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b border-white/10 pb-4">
                <h3 className="text-xl font-semibold">{jobTitle}</h3>
                <div className="flex items-center gap-1.5 text-sm text-blue-400 font-medium">
                  <FiBriefcase className="w-4 h-4"/>
                  <span>{companyName}</span>
                </div>
              </ModalHeader>
              <ModalBody className="py-4">
                <p className="text-sm text-gray-300 whitespace-pre-wrap">
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
