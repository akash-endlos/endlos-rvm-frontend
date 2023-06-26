import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditModal = ({ isOpen, onClose, onSave, rowData, onEditSave }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    branchName: Yup.string(),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData(rowData);
    } else {
      setFormData({});
    }
  }, [rowData]);

  useEffect(() => {
    if (isOpen) {
      reset();
      if (isEditMode) {
        setValue("name", rowData.name);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  const onSubmit = (data) => {
    if (isEditMode) {
      onEditSave(data);
      onClose();
      reset();
    } else {
      onSave(data);
      onClose();
      reset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Customer</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            {!isEditMode && (
              <FormControl isInvalid={errors.branchName} mt={4}>
                <FormLabel>Branch Name <small>(Optional)</small></FormLabel>
                <Input
                  type="text"
                  name="branchName"
                  {...register("branchName")}
                />
                <FormErrorMessage>
                  {errors.branchName && errors.branchName.message}
                </FormErrorMessage>
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue" ml={3}>
              {isEditMode ? "Update" : "Save"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditModal;
