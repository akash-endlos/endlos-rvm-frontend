import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Select,
  Input,
  Radio,
  RadioGroup,
  Stack,
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

  const validationSchema = Yup.object().shape({
    serialNumber: Yup.string().required("Serial number is required"),
    inventoryTypeId: Yup.string().required("Inventory type is required"),
    brandId: Yup.string().required("Brand is required"),
    brandName: Yup.string().when("brandId", (brandId, schema) => {
      return brandId && brandId !== "" ? schema.notRequired() : schema.required("Brand name is required");
    }),
  });
  
  

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [inventoryTypeOptions, setInventoryTypeOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [brandNameVisible, setBrandNameVisible] = useState(false);
  const [radioButton, setRadioButton] = useState('existing');

  useEffect(() => {
    reset(); // Reset the form when rowData changes
    if (rowData) {
      console.log(rowData);
      setValue("serialNumber", rowData.serialNumber || ""); // Update serialNumber input value
      setValue("inventoryTypeId", rowData?.invetrytypes[0]?.id);
      setValue("brandId", rowData.brandId);
      setValue("brandName", rowData.brandName);
    }
  }, [rowData, reset, setValue]);

  useEffect(() => {
    setInventoryTypeOptions(options);
  }, [options]);

  const handleInventoryTypeChange = (event) => {
    const selectedType = event.target.value;
    const selectedTypeOptions = options.find((item) => item._id === selectedType);
    if (selectedTypeOptions) {
      setBrandOptions(selectedTypeOptions.invetrybrands || []);
    } else {
      setBrandOptions([]);
    }
    setValue("brandId", ""); // Reset brandId value when inventoryTypeId changes
  };

  const onSubmit = (data) => {
    if (isEditMode) {
      onEditSave(data);
      reset()
      onClose();
    } else {
      onSave(data);
      reset()
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }
  const handleRadioChange = (value) => {
    if (value === "byBrandName") {
      setRadioButton('brandName');
    } else {
      setRadioButton('existing');
    }
  };
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
        <FormControl isInvalid={errors.inventoryTypeId} mt={4}>
          <FormLabel>Inventory Type</FormLabel>
          <Select
            {...register("inventoryTypeId")}
            onChange={handleInventoryTypeChange}
            placeholder="Select option"
          >
            {inventoryTypeOptions.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.inventoryTypeId && errors.inventoryTypeId.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.inventoryTypeId} mt={4}>
          <RadioGroup defaultValue="byInventoryType" onChange={handleRadioChange}>
            <Stack direction="row">
              <Radio value="byInventoryType">Existing Brand</Radio>
              <Radio value="byBrandName">Add New Brand</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        {radioButton==='existing' && (
          <FormControl isInvalid={errors.brandId} mt={4}>
            <FormLabel>Brand</FormLabel>
            <Select {...register("brandId")} placeholder="Select option">
              {brandOptions.map((item, index) => (
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

        {radioButton==='brandName' && (
          <FormControl isInvalid={errors.brandName} mt={4}>
            <FormLabel>Brand Name</FormLabel>
            <Input type="text" name="brandName" {...register("brandName")} />
            <FormErrorMessage>
              {errors.brandName && errors.brandName.message}
            </FormErrorMessage>
          </FormControl>
        )}

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
