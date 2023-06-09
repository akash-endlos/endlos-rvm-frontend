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
import {
  useGetInventoryFormatQuery,
  useGetInventoryTypeQuery,
} from "@/redux/feature/inventoryTypeApiSlice";
import { useGetInventoryQuery } from "@/redux/feature/inventoryApiSlice";
import moment from "moment/moment";

const AddEditMachineModal = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  onEditSave,
  inventoryType,
  selectedCategory,
  setSelectedCategory,
  inventory
}) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({
    tags: [],
  });
  // const { data: inventoryType } = useGetInventoryTypeQuery();
  console.log(inventory);
  const [categories, setCategories] = useState(inventoryType?.payload?.InventryTypes);
  const [subcategories, setSubcategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  // const { data: inventory } = useGetInventoryFormatQuery(selectedCategory);
  
  const validationSchema = Yup.object().shape({
    machineId: Yup.string().required("Machine ID is required"),
    // warrentyStartDate: Yup.string().required("Warranty start date is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { machineId: "", tags: [] },
  });

  const [warrentyStartDate, setWarrantyStartDate] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setFormData({ ...rowData, tags: rowData.inventry || [] });
      setSelectedCategory(rowData.category);
      setSelectedSubcategory(rowData.subcategory);
      setSelectedTags([...rowData.inventoryDetails]);
      setWarrantyStartDate(rowData.warrentyStartDate ? moment(rowData.warrentyStartDate).format('YYYY-MM-DD') : "");
    } else {
      setFormData({ machineId: "", tags: [] });
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedTags([]);
      setWarrantyStartDate("");
    }
  }, [rowData]);

  useEffect(() => {
    if (isOpen) {
      reset();
      if (isEditMode) {
        setValue("machineId", rowData.machineId);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  useEffect(() => {
    if(selectedCategory)
    {
      setSubcategories(inventory?.payload?.InventryTypes[0]?.invetries || []);
    }
  }, [selectedCategory,inventory?.payload?.InventryTypes[0]?.invetries]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  const handleAddTag = () => {
    if (selectedCategory && selectedSubcategory) {
      const subcategory = subcategories.find(
        (subcategory) => subcategory._id === selectedSubcategory
      );
      if (subcategory) {
        setSelectedTags([...selectedTags, subcategory]);
        setSelectedCategory("");
        setSelectedSubcategory("");
      }
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t._id !== tag._id));
  };
  const handleClose=()=>{
    onClose();
    setSelectedCategory("");
    setSelectedSubcategory("");
  }
  const onSubmit = (data) => {
    const inventry = selectedTags.map((item) => ({ _inventry: item._id }));
    if (isEditMode) {
      onEditSave({ ...data, warrentyStartDate, tags: inventry });
      onClose();
      setSelectedTags([]);
      setWarrantyStartDate("");
      reset();
    } else {
      onSave({ ...data, warrentyStartDate, tags: inventry });
      onClose();
      setSelectedTags([]);
      setWarrantyStartDate("");
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
              <Input
                type="text"
                name="machineId"
                {...register("machineId")}
              />
              <FormErrorMessage>
                {errors.machineId && errors.machineId.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.warrentyStartDate}>
              <FormLabel>Warranty Start Date</FormLabel>
              <Input
                type="date"
                name="warrentyStartDate"
                {...register("warrentyStartDate")}
                value={warrentyStartDate}
                onChange={(e) => setWarrantyStartDate(e.target.value)}
              />
              <FormErrorMessage>
                {errors.warrentyStartDate && errors.warrentyStartDate.message}
              </FormErrorMessage>
            </FormControl>

            {selectedTags.length > 0 && (
              <FormControl mt={4}>
                <FormLabel>Selected Tags</FormLabel>
                <div>
                  {selectedTags.map((tag) => (
                    <Tag
                      key={tag.id}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="teal"
                      mr={2}
                      mb={2}
                    >
                      <TagLabel>{tag.brandName}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </div>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category._id}>
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
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.brandName}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              onClick={handleAddTag}
              disabled={!selectedCategory || !selectedSubcategory}
            >
              Add Selected
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
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
