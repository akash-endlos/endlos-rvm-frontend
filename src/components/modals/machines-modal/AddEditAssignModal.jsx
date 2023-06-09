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
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditAssignModal = ({ isOpen, onClose, onSave, rowData, onEditSave, machineDataTable }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    machineId: Yup.string().required("Machine ID is required"),
    branchId: Yup.string().required("Branch ID is required"),
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
        setValue("machineId", rowData.machineId);
        setValue("branchId", rowData.branchId);
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
        <ModalHeader>{isEditMode ? "Edit" : "Assign"} Machine</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.machineId}>
              <FormLabel>Machine ID</FormLabel>
              <Select name="machineId" {...register("machineId")}>
                <option value="">Select an option</option>
                {machineDataTable.map((item, index) => (
                  <option key={item._id} value={item._id}>{item.machineId}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.machineId && errors.machineId.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={errors.branchId}>
              <FormLabel>Branch ID</FormLabel>
              <Select name="branchId" {...register("branchId")}>
                <option value="">Select an option</option>
                {machineDataTable.map((item,index)=>(
                  <option key={item._id} value={item._id}>{item.machineId}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.branchId && errors.branchId.message}
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

export default AddEditAssignModal;
