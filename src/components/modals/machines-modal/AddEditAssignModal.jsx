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
import { useGetCustomersQuery } from "@/redux/feature/customerApiSlice";
import { useGetBranchesByIdFormatQuery } from "@/redux/feature/branchApiSlice";

const AddEditAssignModal = ({ isOpen, onClose, onSave, rowData, onEditSave, machineDataTable }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});
  const [customerOptions, setCustomerOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const { data: myallbranches } = useGetBranchesByIdFormatQuery(selectedCustomerId)
  const { data: customers, isLoading, isError, error,refetch } = useGetCustomersQuery();
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
        setValue("customerId", '648e9cb8829e1029275c3e92');
        setValue("machineId", rowData._id);
        setValue("branchId", rowData.branchId);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  useEffect(() => {
   if(customers?.data?.Customer){
    setCustomerOptions(customers?.data?.Customer);
   }
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      if (selectedCustomerId && myallbranches?.data.Branches) {
      setBranchOptions(myallbranches?.data.Branches);
      }
      else{
        setBranchOptions([])
      }
    } 
  }, [selectedCustomerId,myallbranches?.data.Branches]);
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
      setBranchOptions([])
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
                  <option key={customer._id} value={customer._id}>
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
                  <option key={branch._id} value={branch._id}>
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
