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

const AddEditMachineModal = ({ isOpen, onClose, onSave, rowData, onEditSave }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});
  const [dropdowns, setDropdowns] = useState([{ category: "", subcategory: "" }]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  const categoryOptions = ["Category 1", "Category 2", "Category 3"];
  const subcategoryOptions = {
    "Category 1": ["Subcategory 1.1", "Subcategory 1.2"],
    "Category 2": ["Subcategory 2.1", "Subcategory 2.2"],
    "Category 3": ["Subcategory 3.1", "Subcategory 3.2"],
  };

  const handleDropdownChange = (index, field, value) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index][field] = value;
    setDropdowns(updatedDropdowns);
  };

  const addDropdown = () => {
    setDropdowns([...dropdowns, { category: "", subcategory: "" }]);
  };

  const removeDropdown = (index) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns.splice(index, 1);
    setDropdowns(updatedDropdowns);
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
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Machine</ModalHeader>
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

            {dropdowns.map((dropdown, index) => (
              <div key={index}>
                <FormControl mt={4}>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={dropdown.category}
                    onChange={(e) =>
                      handleDropdownChange(index, "category", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    value={dropdown.subcategory}
                    onChange={(e) =>
                      handleDropdownChange(index, "subcategory", e.target.value)
                    }
                  >
                    <option value="">Select Subcategory</option>
                    {subcategoryOptions[dropdown.category]?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="link"
                  colorScheme="red"
                  onClick={() => removeDropdown(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button variant="link" colorScheme="green" mt={4} onClick={addDropdown}>
              Add Dropdown
            </Button>
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

export default AddEditMachineModal;
