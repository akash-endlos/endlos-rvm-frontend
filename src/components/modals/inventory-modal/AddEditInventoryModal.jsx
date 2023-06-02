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
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditModalBranch = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  onEditSave,
  options,
}) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    inventorytype: Yup.string().required("Inventory type is required"),
    serialNumber: Yup.string()
      .matches(/^\d{3}-[A-Z]{4}-\d{4}$/, "Invalid serial number format")
      .required("Serial number is required"),
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
        setValue("inventorytype", rowData.inventorytype);
        setValue("serialNumber", rowData.serialNumber);
        setValue("purchasedate", rowData.purchasedate);
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
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Branches</ModalHeader>
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
            <FormControl isInvalid={errors.inventorytype}>
              <FormLabel>Inventory Type</FormLabel>
              <Select
                name="inventorytype"
                {...register("inventorytype")}
                placeholder="Select option"
              >
                {options.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.inventorytype && errors.inventorytype.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.serialNumber}>
              <FormLabel>Serial Number</FormLabel>
              <Input
                placeholder="1234-ABCD-1234"
                type="text"
                name="serialNumber"
                {...register("serialNumber")}
              />
              <FormErrorMessage>
                {errors.serialNumber && errors.serialNumber.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Purchase Date</FormLabel>
              <Input
                type="date"
                name="purchasedate"
                {...register("purchasedate")}
              />
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

export default AddEditModalBranch;
