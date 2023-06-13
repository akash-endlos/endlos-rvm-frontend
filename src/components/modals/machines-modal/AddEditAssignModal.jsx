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
  const [customerOptions, setCustomerOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const validationSchema = Yup.object().shape({
    customerId: Yup.string().required("Customer ID is required"),
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
        setValue("customerId", rowData.customerId);
        setValue("machineId", rowData.machineId);
        setValue("branchId", rowData.branchId);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  // Fetch customer options (dummy data)
  useEffect(() => {
    const dummyCustomerOptions = [
      { id: "1", name: "Customer 1" },
      { id: "2", name: "Customer 2" },
      { id: "3", name: "Customer 3" },
    ];
    setCustomerOptions(dummyCustomerOptions);
  }, []);

  // Fetch branch options based on selected customer (dummy data)
  useEffect(() => {
    if (selectedCustomerId) {
      let dummyBranchOptions = [];
      if (selectedCustomerId === "1") {
        dummyBranchOptions = [
          { id: "1.1", name: "Branch 1.1" },
          { id: "1.2", name: "Branch 1.2" },
          { id: "1.3", name: "Branch 1.3" },
        ];
      } else if (selectedCustomerId === "2") {
        dummyBranchOptions = [
          { id: "2.1", name: "Branch 2.1" },
          { id: "2.2", name: "Branch 2.2" },
          { id: "2.3", name: "Branch 2.3" },
        ];
      } else if (selectedCustomerId === "3") {
        dummyBranchOptions = [
          { id: "3.1", name: "Branch 3.1" },
          { id: "3.2", name: "Branch 3.2" },
          { id: "3.3", name: "Branch 3.3" },
        ];
      }
      setBranchOptions(dummyBranchOptions);
    } else {
      setBranchOptions([]);
    }
  }, [selectedCustomerId]);

  const handleCustomerChange = (customerId) => {
    setSelectedCustomerId(customerId);
  };

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
                <option value="">Select a machine</option>
                {machineDataTable.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.machineId}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.machineId && errors.machineId.message}
              </FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={errors.customerId}>
              <FormLabel>Customer ID</FormLabel>
              <Select
                name="customerId"
                {...register("customerId")}
                onChange={(e) => handleCustomerChange(e.target.value)}
              >
                <option value="">Select a customer</option>
                {customerOptions.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.customerId && errors.customerId.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.branchId}>
              <FormLabel>Branch ID</FormLabel>
              <Select name="branchId" {...register("branchId")}>
                <option value="">Select a branch</option>
                {branchOptions.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
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
