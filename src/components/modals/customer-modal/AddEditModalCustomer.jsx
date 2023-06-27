import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditSidebar = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  onEditSave,
  Vendors,
}) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    branchName: Yup.string(),
    vendorId: Yup.string().required("Vendor is required"),
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
        setValue("vendorId", rowData.vendorId);
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
        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" {...register("name")} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        {!isEditMode && (
          <FormControl isInvalid={errors.branchName} mt={4}>
            <FormLabel>
              Branch Name <small>(Optional)</small>
            </FormLabel>
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
        <FormControl isInvalid={errors.vendorId} mt={4}>
          <FormLabel>Vendor</FormLabel>
          <Select name="vendorId" {...register("vendorId")}>
            <option value="">Select Vendor</option>
            {Vendors?.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
            {/* Add options for vendors here */}
          </Select>
          <FormErrorMessage>
            {errors.vendorId && errors.vendorId.message}
          </FormErrorMessage>
        </FormControl>
        <Button variant="ghost" onClick={onClose} mt={4}>
          Cancel
        </Button>
        <Button type="submit" colorScheme="blue" ml={3} mt={4}>
          {isEditMode ? "Update" : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default AddEditSidebar;
