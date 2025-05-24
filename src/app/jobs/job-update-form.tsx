"use client";

import { useForm } from "react-hook-form";
import {
  Button,
  Textarea,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { JobsContext } from "../contexts/jobs.context";
import FormButton from "../components/common/form-button";
import { FiEdit, FiSave, FiXCircle } from "react-icons/fi";

type JobForUpdate = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
  createdAt: string;
};

type JobUpdateFormProps = {
  job: JobForUpdate;
};

const JobUpdateForm = ({ job }: JobUpdateFormProps) => {
  const { updateJob } = useContext(JobsContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<JobForUpdate>({
    defaultValues: job
  });

  useEffect(() => {
    if (!isOpen) {
      reset(job);
    }
  }, [job, reset, isOpen]);

  const onSubmit = async (data: JobForUpdate) => {
    try {
      await updateJob(data.jobId, data);
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleOpen = () => {
    reset(job);
    onOpen();
  }

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        variant="flat"
        onPress={handleOpen}
        aria-label="Actualizar Anuncio"
        className="hover:bg-blue-100"
      >
        <FiEdit className="w-5 h-5" />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        size="xl"
        scrollBehavior="inside"
        className="text-gray-900"
      >
        <ModalContent>
          {(onCloseModal) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1 border-b border-gray-200">
                <div className="flex items-center gap-2">
                   <FiEdit className="w-5 h-5 text-blue-600"/>
                   <span>Actualizar Anuncio</span>
                </div>
              </ModalHeader>
              <ModalBody className="py-6 px-6">
                <div className="flex flex-col gap-6">
                  <Input
                    {...register("jobTitle", { required: "Título es requerido" })}
                    label="Título del Puesto"
                    labelPlacement="outside"
                    placeholder="Ej: Camarero/a de Sala"
                    variant="bordered"
                    isInvalid={!!errors.jobTitle}
                    errorMessage={errors.jobTitle?.message}
                  />
                  <Textarea
                    {...register("jobDescription", { required: "Descripción es requerida" })}
                    label="Descripción del Puesto"
                    labelPlacement="outside"
                    placeholder="Detalla las responsabilidades, requisitos, horario..."
                    variant="bordered"
                    minRows={4}
                    isInvalid={!!errors.jobDescription}
                    errorMessage={errors.jobDescription?.message}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...register("location", { required: "Ubicación es requerida" })}
                      label="Ubicación"
                      labelPlacement="outside"
                      placeholder="Ej: El Albir, Alicante"
                      variant="bordered"
                      isInvalid={!!errors.location}
                      errorMessage={errors.location?.message}
                    />
                    <Input
                      {...register("companyName", { required: "Nombre empresa es requerido" })}
                      label="Nombre de la Empresa"
                      labelPlacement="outside"
                      placeholder="Ej: Restaurante Sol"
                      variant="bordered"
                      isInvalid={!!errors.companyName}
                      errorMessage={errors.companyName?.message}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="border-t border-gray-200">
                <Button
                    variant="light"
                    onPress={onCloseModal}
                    startContent={<FiXCircle />}
                    className="text-gray-600 hover:text-gray-800"
                 >
                  Cancelar
                </Button>
                 <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    startContent={!isSubmitting ? <FiSave /> : null}
                  >
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                 </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobUpdateForm;