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
  FormErrorMessage,
  Select,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditUserModal = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  onEditSave,
  userRole
}) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    role: Yup.string().required("Role is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(
        /^[0-9]{10}$/,
        "Mobile number must be 10 digits without any spaces or special characters"
      ),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue
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
        setValue("role", rowData.Role._id);
        setValue("name", rowData.name);
        setValue("password", rowData.password);
        setValue("mobile", rowData.mobile);
        setValue("email", rowData.email);
        setValue("isActive", rowData.isActive);
      }
    }
  }, [isOpen, isEditMode, reset, register]);

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
        <ModalHeader>{isEditMode ? "Edit" : "Add"} User</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.role}>
              <FormLabel>Role</FormLabel>
                <Select name="role" {...register("role")}  placeholder="Select option">
              {userRole && userRole?.map((item,index)=>(
                <option  key={index} value={item._id}>{item.roleName}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.role && errors.role.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email} mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" {...register("email")} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.name} mt={4}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" {...register("password")} />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.mobile} mt={4}>
              <FormLabel>Mobile</FormLabel>
              <Input type="text" name="mobile" {...register("mobile")} />
              <FormErrorMessage>
                {errors.mobile && errors.mobile.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.isActive} mt={4}>
              <FormLabel>Active</FormLabel>
              <Input type="text" name="isActive" {...register("isActive")}  defaultValue="true"/>
              <FormErrorMessage>
                {errors.isActive && errors.isActive.message}
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

export default AddEditUserModal;
