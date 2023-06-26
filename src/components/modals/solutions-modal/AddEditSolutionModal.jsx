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
  Select,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditModal = ({ isOpen, onClose, onSave, rowData, onEditSave, problems, inventoryType }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    problemId: Yup.string().required("Problem is required"),
    description: Yup.string().required("Description is required"),
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
        setValue("problemId", rowData.problemId);
        setValue("description", rowData.description);
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
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Solution</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.problemId} mt={4}>
              <FormLabel>Problem</FormLabel>
              <Select name="problemId" {...register("problemId")}>
                <option value="">Select Problem</option>
                {inventoryType.map((problem) => (
                  <option key={problem._id} value={problem._id}>
                    {problem.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.problemId && errors.problemId.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.description} mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                {...register("description")}
                resize="vertical"
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
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
