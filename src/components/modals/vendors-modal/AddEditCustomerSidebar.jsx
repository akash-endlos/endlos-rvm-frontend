import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditVendorCustomerSidebar = ({ isOpen, onClose, onSave, rowData }) => {
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Name is required"),
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
    if (isOpen) {
      reset();
      setFormData({});
      setValue("fieldName", rowData.name);
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    onSave(data);
    onClose();
    reset();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      width="400px"
      backgroundColor="white"
      padding={4}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
      zIndex={999}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
          <FormLabel>Vendor Name</FormLabel>
          <Input disabled type="text" name="fieldName" {...register("fieldName")} readOnly />
        </FormControl>
        <FormControl isInvalid={errors.customerName}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="customerName" {...register("customerName")} />
          <FormErrorMessage>
            {errors.customerName && errors.customerName.message}
          </FormErrorMessage>
        </FormControl>
        
        <Button variant="ghost" onClick={onClose} mt={4}>
          Cancel
        </Button>
        <Button type="submit" colorScheme="blue" ml={3} mt={4}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default AddEditVendorCustomerSidebar;
