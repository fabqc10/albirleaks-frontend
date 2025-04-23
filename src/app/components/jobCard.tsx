'use client'
import React, { useState, useRef, useEffect } from "react";
import JobUpdateForm from "../jobs/job-update-form"; // Ajusta la ruta si es necesario
import { FiMapPin, FiClock, FiTrash2, FiEdit, FiBriefcase, FiMaximize2, FiMessageSquare } from 'react-icons/fi'; // Eliminados FiChevronDown, FiChevronUp si no se usan
import { motion } from 'framer-motion'; // Eliminado AnimatePresence si no se usa aquí
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import { useAuth } from '@/app/contexts/auth.context'; // Se usa para la lógica de mostrar/ocultar botón
import { useSession } from 'next-auth/react'; // <-- IMPORTADO
import { useChat } from '@/app/contexts/chat.context'; // <-- IMPORTADO
import { useRouter } from 'next/navigation';
// initiateChatForJob ya no se importa aquí, se usa la del contexto
// import { initiateChatForJob } from '@/lib/apiClient';
import { toast, Toaster } from 'react-hot-toast'; // Asegúrate que Toaster se renderiza una sola vez en tu layout principal
import paths from "@/paths";

type Job = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
  createdAt: string;
  isExpired?: boolean;
};

// Asegúrate que el tipo User que viene de useAuth tiene 'id'
type AuthenticatedUser = {
  id: string;
  // otras propiedades...
} | null | undefined;

type JobCardProps = {
  job: Job & { owner?: { userId: string } }; // userId en owner debe ser string
  onDelete?: (jobId: string) => void;
  showActions?: boolean;
};

const JobCard = ({ job, onDelete, showActions = true }: JobCardProps) => {
  const { jobId, jobTitle, jobDescription, location, companyName, createdAt, isExpired, owner } = job;
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Contextos y hooks
  const { user: currentUser } = useAuth(); // Para saber si el usuario actual es el dueño
  const { data: session, status: sessionStatus } = useSession(); // <-- OBTENER SESIÓN Y STATUS
  const { initiateChat } = useChat(); // <-- OBTENER FUNCIÓN DEL CONTEXTO CHAT
  const router = useRouter();
  const [isContacting, setIsContacting] = useState(false); // Estado local para el botón

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
      // Simple re-check on description change
      const checkClamp = () => {
          const hasClamp = element.scrollHeight > element.clientHeight;
          setIsClamped(hasClamp);
      };
      // Check initially and maybe on resize if needed
      checkClamp();
      window.addEventListener('resize', checkClamp); // Example listener
      return () => window.removeEventListener('resize', checkClamp);
    }
    return () => setIsClamped(false); // Cleanup
  }, [jobDescription]); // Re-run if description changes

  // Lógica para mostrar botón Contactar
  // Asegúrate que currentUser?.id y owner?.userId son comparables (ambos string)
  const isOwner = owner?.userId && currentUser?.id === owner.userId;
  const canContact = sessionStatus === 'authenticated' && !isOwner;
  const isLoadingSession = sessionStatus === 'loading';


  const handleContact = async () => {
    // Verificar si se puede contactar (ya incluye la verificación de autenticado)
    if (!canContact) {
        console.log("[JobCard] handleContact: Preconditions not met (not authenticated or is owner).");
        toast.error('No puedes contactar para este anuncio.'); // Mensaje genérico o más específico
        return;
    }

    // Obtener el token de la sesión (ahora sabemos que status es 'authenticated')
    const token = session?.idToken ?? null;
    console.log("[JobCard] handleContact: Token read from session:", token);

    // Verificar que el token exista (crucial)
    if (!token) {
        console.error("[JobCard] handleContact: Token is null/undefined even though status is authenticated.");
        toast.error('Error de autenticación temporal. Inténtalo de nuevo.');
        return;
    }

    console.log(`[JobCard] Calling initiateChat from context for jobId: ${jobId}`);
    setIsContacting(true); // Indicar carga

    try {
        // <-- IMPORTANTE: Pasar jobId y token a la función del contexto
        const conversationId = await initiateChat(jobId, token);

        if (conversationId !== null) {
            console.log(`[JobCard] Context call successful (ID: ${conversationId}). Navigating.`);
            toast.success('Chat iniciado/encontrado. Redirigiendo...');
            // Navegar a la página de chat, idealmente seleccionando la conversación
            router.push(paths.chat()); // Podrías añadir #convId o similar si tu ChatPage lo soporta
        } else {
             console.log("[JobCard] Context initiateChat returned null (error handled in context).");
             // El contexto ya debería haber puesto un error en su estado si procede
             toast.error('No se pudo iniciar el chat.');
        }
    } catch (error) {
        console.error("[JobCard] Error caught from context initiateChat:", error);
         if (error instanceof Error && error.message === 'Unauthorized') {
             toast.error('Sesión inválida o expirada.');
             router.push('/api/auth/signin');
         } else {
            toast.error(`Error al contactar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
         }
    } finally {
        setIsContacting(false); // Quitar estado de carga
    }
  };

  return (
    <>
      {/* Asegúrate que Toaster se renderiza solo UNA VEZ en tu Layout principal */}
      {/* <Toaster position="bottom-center" /> */}
      <motion.div
        className={`relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden group transition-opacity duration-300 h-full flex flex-col ${isExpired ? 'opacity-60' : ''}`}
        // ... animaciones ...
        whileHover={{ scale: 1.02, shadow: 'lg', borderColor: 'rgb(209 213 219)' }}
        transition={{ type: 'spring', stiffness: 300, duration: 0.3 }}
      >
        <div className="relative z-10 flex flex-col flex-grow p-6">
           {/* ... Título, Compañía, Descripción ... */}
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
             {!isExpired && showActions && !isOwner && ( // Muestra activo si no es dueño
                <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Activo</span>
             )}
              {!isExpired && showActions && isOwner && ( // O muestra 'Tuyo' si es el dueño
                <span className="flex-shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Tuyo</span>
             )}
           </div>

           <p
             ref={descriptionRef}
             className={`text-gray-700 text-sm mb-4 line-clamp-3 flex-grow`}
           >
             {jobDescription}
           </p>
           {/* ... */}
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

          {/* Botón Leer más, no debería interferir */}
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

        {/* Sección de Acciones (Footer) */}
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex-grow">
             {/* Mostrar botón Contactar solo si se cumplen las condiciones */}
            {canContact && (
              <Button
                color="primary"
                variant="flat"
                size="sm"
                startContent={<FiMessageSquare className="w-4 h-4" />}
                onPress={handleContact} // Llama a la función corregida
                isLoading={isContacting || isLoadingSession} // Muestra loading si está contactando o cargando sesión
                isDisabled={isContacting || isLoadingSession} // Deshabilita en ambos casos
                className="hover:bg-blue-100 text-blue-600"
              >
                {isContacting ? 'Iniciando...' : (isLoadingSession ? 'Cargando...' : 'Contactar')}
              </Button>
            )}
            {/* Mostrar mensaje si no está autenticado y no es el dueño */}
            {sessionStatus === 'unauthenticated' && !isOwner && (
                 <span className="text-xs text-gray-500 italic">Inicia sesión para contactar</span>
            )}
          </div>

           {/* Mostrar acciones de edición/borrado solo si es el dueño */}
          {showActions && isOwner && onDelete && (
            <div className="flex items-center justify-end gap-2 flex-shrink-0">
              <JobUpdateForm job={job} />
              <Button isIconOnly color="danger" variant="light" onPress={handleDelete} aria-label="Eliminar Anuncio" className="hover:bg-red-100 text-red-600">
                <FiTrash2 className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal sin cambios */}
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