import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useAddBranchMutation } from "@/redux/feature/branchApiSlice";

const schema = yup.object().shape({
  name: yup.string().required("Branch Name is required"),
  // Add more validation rules for other form fields
});

const AddEditBranchModal = ({ isOpen, onClose, onSave, rowData }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onSave(data);
    reset();
    onClose();
  };

  React.useEffect(() => {
    // if (rowData) {
    //   Object.entries(rowData).forEach(([name, value]) => {
    //     setValue(name, value);
    //   });
    // }
    setValue('customer',rowData?.name)
  }, [rowData, setValue]);

  if (!isOpen) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      width="500px"
      backgroundColor="white"
      padding={4}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
      zIndex={999}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          {/* <Text className="font-bold" color="teal">
            Add Branch
          </Text> */}
            <FormControl>
            <FormLabel>Customer</FormLabel>
            <Input type="text" name="customer" {...register("customer")} isReadOnly />
          </FormControl>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Branch Name</FormLabel>
            <Input type="text" name="name" {...register("name")} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Button colorScheme="blue" type="submit">
          Save
        </Button>
        <Button ml={5} colorScheme="teal" onClick={onClose}>
          Close
        </Button>
      </form>
    </Box>
  );
};

export default AddEditBranchModal;
