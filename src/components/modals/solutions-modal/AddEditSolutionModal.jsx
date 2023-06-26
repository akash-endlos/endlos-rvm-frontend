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
  Select,
  Textarea,
  FormErrorMessage,
  Box,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RxCross2 } from 'react-icons/rx'

const AddEditModal = ({ isOpen, onClose, onSave, rowData, onEditSave, problems, inventoryType }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const validationSchema = Yup.object().shape({
    problemId: Yup.string().required("Problem is required"),
    description: Yup.string().required("Description is required"),
    files: Yup.array().min(1, "At least one file is required"),
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
      setImages(rowData.files || []);
    } else {
      setFormData({ files: [] }); // Initialize the files array
      setImages([]);
    }
  }, [rowData]);


  useEffect(() => {
    if (isOpen) {
      reset();
      if (isEditMode) {
        setValue("problemId", rowData.problemId);
        setValue("description", rowData.description);
        setValue("files", rowData.files);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const fileObjects = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...fileObjects]);
    setValue("files", [...selectedFiles, ...formData.files]);
    event.target.value = null;
  };


  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setValue("files", updatedImages.map((file) => file));
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
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Solution</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.problemId} mb={4}>
              <FormLabel>Problem</FormLabel>
              <Select name="problemId" {...register("problemId")}>
                <option value="">Select Problem</option>
                {inventoryType.map((problem) => (
                  <option key={problem._id} value={problem._id}>
                    {problem.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.problemId && errors.problemId.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.description} mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                {...register("description")}
                placeholder="Enter description"
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.files}>
              <FormLabel>Files</FormLabel>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
              />
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {images.map((fileObject, index) => (
                  <Box key={index} mt={2} mr={2} display="flex" alignItems="center">
                    <div style={{ position: "relative" }}>
                      <Image
                        src={fileObject}
                        alt={`File ${index + 1}`}
                        maxH={50}
                        objectFit="contain"
                        mr={2}
                      />
                      <RxCross2
                        className="cursor-pointer"
                        onClick={() => removeImage(index)}
                        size={20}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: "4px",
                        }}
                      />
                      {/* <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => removeImage(index)}
                        style={{ position: "absolute", top: "0", right: "0" }}
                      >
                        Remove
                      </Button> */}
                    </div>
                  </Box>
                ))}
              </div>

              <FormErrorMessage>
                {errors.files && errors.files.message}
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

export default AddEditModal;
