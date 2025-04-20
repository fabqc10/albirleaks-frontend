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
import { useContext } from "react";
import { JobsContext } from "../contexts/jobs.context";
import { FiPlus, FiSave, FiXCircle } from "react-icons/fi";

type JobForPost = {
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
};

const JobCreateForm = () => {
  const { addJob } = useContext(JobsContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<JobForPost>({
    defaultValues: {
        jobTitle: "",
        jobDescription: "",
        location: "",
        companyName: ""
    }
  });

  const onSubmit = async (data: JobForPost) => {
    try {
      await addJob(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <>
      <Button
        color="primary"
        variant="solid"
        onPress={onOpen}
        startContent={<FiPlus className="w-5 h-5" />}
        className="shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
      >
        Crear Nuevo Anuncio
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        size="xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onCloseModal) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1 border-b border-white/10">
                <div className="flex items-center gap-2">
                   <FiPlus className="w-5 h-5 text-blue-400"/>
                   <span>Crear Nuevo Anuncio de Empleo</span>
                </div>
              </ModalHeader>
              <ModalBody className="py-6 px-6">
                <div className="flex flex-col gap-6">
                  <Input
                    {...register("jobTitle", { required: "Título es requerido" })}
                    label="Título del Puesto"
                    labelPlacement="outside"
                    placeholder="Ej: Ayudante de Cocina"
                    variant="bordered"
                    isInvalid={!!errors.jobTitle}
                    errorMessage={errors.jobTitle?.message}
                    autoFocus
                  />
                  <Textarea
                    {...register("jobDescription", { required: "Descripción es requerida" })}
                    label="Descripción del Puesto"
                    labelPlacement="outside"
                    placeholder="Detalla las responsabilidades, requisitos, etc."
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
                      placeholder="Ej: El Albir"
                      variant="bordered"
                      isInvalid={!!errors.location}
                      errorMessage={errors.location?.message}
                    />
                    <Input
                      {...register("companyName", { required: "Nombre empresa es requerido" })}
                      label="Nombre de la Empresa o Particular"
                      labelPlacement="outside"
                      placeholder="Ej: Bar Pepe o 'Particular'"
                      variant="bordered"
                      isInvalid={!!errors.companyName}
                      errorMessage={errors.companyName?.message}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="border-t border-white/10">
                <Button
                    variant="light"
                    onPress={() => {
                        reset();
                        onCloseModal();
                    }}
                    startContent={<FiXCircle />}
                 >
                  Cancelar
                </Button>
                 <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    startContent={!isSubmitting ? <FiSave /> : null}
                  >
                    {isSubmitting ? "Creando..." : "Crear Anuncio"}
                 </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobCreateForm;