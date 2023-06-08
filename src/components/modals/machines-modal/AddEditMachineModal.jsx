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
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Categories = [
  { id: 1, name: "Display" },
  { id: 2, name: "Motor" },
  { id: 3, name: "Jarvis" },
];

const subCategories = {
  1: [
    { id: 1, name: "DS-1" },
    { id: 2, name: "DS-2" },
    { id: 3, name: "DS-3" },
  ],
  2: [
    { id: 4, name: "MT-1" },
    { id: 5, name: "MT-2" },
    { id: 6, name: "MT-3" },
  ],
  3: [
    { id: 7, name: "JS-1" },
    { id: 8, name: "JS-2" },
    { id: 9, name: "JS-3" },
  ],
};

const AddEditMachineModal = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  onEditSave,
}) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({
    warrantyStartDate: "",
    tags: [],
  });
  const [categories, setCategories] = useState(Categories);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const validationSchema = Yup.object().shape({
    machineId: Yup.string().required("Machine ID is required"),
    warrantyStartDate: Yup.string().required("Warranty start date is required"),
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
      setFormData({ ...rowData, tags: rowData.tags || [] });
      setSelectedCategory(rowData.category);
      setSelectedSubcategory(rowData.subcategory);
      setSelectedTags([...rowData.tags]);
    } else {
      setFormData({ warrantyStartDate: "", tags: [] });
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedTags([]);
    }
  }, [rowData]);

  useEffect(() => {
    if (isOpen) {
      reset();
      if (isEditMode) {
        setValue("machineId", rowData.machineId);
        setValue("warrantyStartDate", rowData.warrantyStartDate);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  useEffect(() => {
    setSubcategories(subCategories[selectedCategory] || []);
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  const handleAddTag = () => {
    if (selectedCategory && selectedSubcategory) {
      const subcategory = subCategories[selectedCategory].find(
        (subcategory) => subcategory.id === parseInt(selectedSubcategory)
      );
      if (subcategory) {
        setSelectedTags([...selectedTags, subcategory.name]);
        setSelectedCategory("");
        setSelectedSubcategory("");
      }
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const onSubmit = (data) => {
    if (isEditMode) {
      onEditSave({ ...data, tags: selectedTags });
      onClose();
      reset();
    } else {
      onSave({ ...data, tags: selectedTags });
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
            <FormControl isInvalid={errors.machineId}>
              <FormLabel>Machine ID</FormLabel>
              <Input type="text" name="machineId" {...register("machineId")} />
              <FormErrorMessage>
                {errors.machineId && errors.machineId.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.warrantyStartDate}>
              <FormLabel>Warranty Start Date</FormLabel>
              <Input
                type="date"
                name="warrantyStartDate"
                {...register("warrantyStartDate")}
              />
              <FormErrorMessage>
                {errors.warrantyStartDate && errors.warrantyStartDate.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Subcategory</FormLabel>
              <Select
                name="subcategory"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button
              mt={4}
              colorScheme="blue"
              onClick={handleAddTag}
              disabled={!selectedCategory || !selectedSubcategory}
            >
              Add Selected
            </Button>

            {selectedTags.length > 0 && (
              <FormControl mt={4}>
                <FormLabel>Selected Tags</FormLabel>
                <div>
                  {selectedTags.map((tag) => (
                    <Tag
                      key={tag}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      mr={2}
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </div>
              </FormControl>
            )}
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
