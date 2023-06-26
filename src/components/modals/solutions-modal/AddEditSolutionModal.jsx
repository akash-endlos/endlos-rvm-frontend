const AddEditSolutionModal = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  onEditSave,
  inventoryType,
}) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const validationSchema = Yup.object().shape({
    problemId: Yup.string().required("Problem is required"),
    description: Yup.string().required("Description is required"),
    files: Yup.array()
      .min(1, "At least one file is required")
      .required("Files are required"),
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
        setValue("problemId", rowData.problemId);
        setValue("description", rowData.description);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  const onSubmit = async (data) => {
    if (isEditMode) {
      onEditSave(data);
    } else {
      onSave(data);
    }
    onClose();
    reset();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Problems</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.problemId}>
              <FormLabel>Problem</FormLabel>
              <Select name="problemId" {...register("problemId")}>
                <option value="">Select a problem</option>
                {inventoryType?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.problemId && errors.problemId.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" {...register("description")} />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.files}>
              <FormLabel>Files</FormLabel>
              <Input type="file" name="files" multiple onChange={handleFileChange} />
              {selectedFiles.length > 0 && (
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
              <FormErrorMessage>
                {errors.files && errors.files.message}
              </FormErrorMessage>
            </FormControl>

            {selectedFiles.length > 0 && (
              <FormControl>
                <FormLabel>Image Preview & Crop</FormLabel>
                <Cropper
                  src={URL.createObjectURL(selectedFiles[0])}
                  style={{ height: 400, width: "100%" }}
                  guides={true}
                  aspectRatio={1}
                  zoomable={false}
                  crop={onCrop}
                />
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

export default AddEditSolutionModal;
