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

const sampleCategories = [
  { id: 1, name: "Display" },
  { id: 2, name: "Motor" },
  { id: 3, name: "Jarvis" },
];

const sampleSubcategories = {
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
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState(sampleCategories);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

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
      setSelectedCategory(rowData.category);
      setSelectedSubcategory(rowData.subcategory);
      setSelectedTags([rowData.category, rowData.subcategory]);
    } else {
      setFormData({});
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedTags([]);
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

  useEffect(() => {
    setSubcategories(sampleSubcategories[selectedCategory] || []);
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(""); // Reset the selected subcategory when category changes
  };

  const handleAddTag = () => {
    if (selectedCategory && selectedSubcategory) {
      const subcategory = sampleSubcategories[selectedCategory].find(
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
