import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment/moment";

const AddEditSidebar = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  onEditSave,
  options,
}) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});
  const [selectedInventoryType, setSelectedInventoryType] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);

  const validationSchema = Yup.object().shape({
    brandName: Yup.string().required("Brand Name is required"),
    inventryType: Yup.string().required("Inventory type is required"),
    serialNumber: Yup.string().required("Serial number is required"),
  });

  const selectedBrandName = options.find((item) => item._id === selectedInventoryType)?.invetrybrands || [];

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
      setSelectedInventoryType(rowData?.invetrybrands?.inventryTypeId);
      setSelectedBrandId("");
      setSecondDropdownOptions([]);
      if (isEditMode) {
        setValue("inventryType", rowData.invetrytypes._id);
        setValue("brandName", rowData.invetrybrands.name);
        setValue("serialNumber", rowData.serialNumber);
        setValue(
          "purchaseDate",
          moment(rowData?.purchaseDate).format("YYYY-MM-DD")
        );
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  const handleInventoryTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedInventoryType(selectedType)
    setSelectedBrandId("");
    const selectedTypeOptions = options.find((item) => item._id === selectedType);
    if (selectedTypeOptions) {
      setSecondDropdownOptions(selectedTypeOptions.invetrybrands || []);
    } else {
      setSecondDropdownOptions([]);
    }
  };
  const handleBrandChange = (event) => {
    setSelectedBrandId(event.target.value);
  };

  const onSubmit = (data) => {
    if (isEditMode) {
      onEditSave({ ...data, inventoryType: selectedInventoryType, brandId: selectedBrandId });
      onClose();
      reset();
    } else {
      onSave({ ...data, inventoryType: selectedInventoryType, brandId: selectedBrandId });
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
        {/* secondDropdownOptions.length > 0 */}
        <FormControl isInvalid={errors.inventryType} mt={4}>
          <FormLabel>Inventory Type</FormLabel>
          <Select
            {...register("inventryType")}  // Register the field with react-hook-form
            value={selectedInventoryType}
            onChange={handleInventoryTypeChange}
            placeholder="Select option"
          >
            {options.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.inventryType && errors.inventryType.message}
          </FormErrorMessage>
        </FormControl>
        {secondDropdownOptions.length > 0 && (
          <FormControl isInvalid={errors.brandId} mt={4}>
            <FormLabel>Inventry Brands</FormLabel>
            <Select
              name="brandId"
              value={selectedBrandId}
              onChange={handleBrandChange}
              placeholder="Select option"
            >
              {selectedBrandName.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.brandId && errors.brandId.message}
            </FormErrorMessage>
          </FormControl>
        )}
        {(secondDropdownOptions.length === 0 || secondDropdownOptions.length === undefined) && (<FormControl isInvalid={errors.brandName}>
          <FormLabel>Brand Name</FormLabel>
          <Input type="text" name="brandName" {...register("brandName")} />
          <FormErrorMessage>
            {errors.brandName && errors.brandName.message}
          </FormErrorMessage>
        </FormControl>)}
        <FormControl isInvalid={errors.serialNumber} mt={4}>
          <FormLabel>Serial Number</FormLabel>
          <Input
            type="text"
            name="serialNumber"
            {...register("serialNumber")}
          />
          <FormErrorMessage>
            {errors.serialNumber && errors.serialNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.purchaseDate} mt={4}>
          <FormLabel>Purchase Date</FormLabel>
          <Input
            type="date"
            name="purchaseDate"
            {...register("purchaseDate")}
          />
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
