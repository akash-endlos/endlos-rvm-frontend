import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import DynamicTable from "@/features/table/DynamicTable";
import {
  useAddBranchMutation,
  useDeleteBranchMutation,
  useGetBranchesByIdFormatQuery,
  useUpdateBranchByIdMutation,
} from "@/redux/feature/branchApiSlice";
import { useRouter } from "next/router";
import AddEditModalBranch from "@/components/modals/branches-modal/AddEditModalBranch";
import { BiDotsVerticalRounded } from "react-icons/bi";
import DeleteModalBranch from "@/components/modals/branches-modal/DeleteModalBranch";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";

const index = () => {
  const router = useRouter()
  const id = router?.query?.id
  const btnRef = React.useRef();
  const headers = ["name", "Action"];
  const [branches, setBranches] = useState([]);
  const { data: myallbranches,isLoading } = useGetBranchesByIdFormatQuery(id)
  const [addBranch] = useAddBranchMutation()
  const [updateBranchById] = useUpdateBranchByIdMutation()
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBranch] = useDeleteBranchMutation()
  useEffect(() => {
    if (myallbranches) {
      setBranches(myallbranches.data.Branches);
    }
  }, [myallbranches])

  const handleAddEdit = (row) => {
    setSelectedRow(row);
    setIsAddEditModalOpen(true);
  };
  const handleCancelAddEdit = () => {
    setSelectedRow(null);
    setIsAddEditModalOpen(false);
  };
  const handleSave = async (data) => {
    if (id) {
      await addBranch({ ...data, customerId: id })
        .unwrap()
        .then(() => {
          toast.success('Added SuccessFully')
        })
        .catch((error) => {
          toast.error(error.data.error)

        });
    }
  };
  const handleEditSave = async (data) => {
    const updatedData = {
      id: selectedRow._id,
      editedData: data
    }
    await updateBranchById(updatedData)
      .unwrap()
      .then(() => {
        toast.success('Updated SuccessFully')
      })
      .catch((error) => {
        toast.error(error.data.error)

      });
  }
  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };
  const handleCancelDelete = () => {
    setSelectedRow(null);
    setIsDeleteModalOpen(false);
  };
  const handleConfirmDelete = async () => {
    await deleteBranch(selectedRow._id)
      .unwrap()
      .then(() => {
        setSelectedRow(null);
        setIsDeleteModalOpen(false);
        toast.success('Deleted SuccessFully')
      })
      .catch((error) => {
        toast.error(error.data.error)
      });
  };
  const renderAction = (row) => {
    return (
      <Flex gap={3} alignContent='center'>
      <FiEdit className="cursor-pointer" onClick={() => handleAddEdit(row)} color="teal" size={20}/>
      <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(row)} color="red" size={20}/>
    </Flex>
    );
  };
  if(isLoading)
  {
   return(
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Spinner size="xl" color="teal" />
  </Box>
   ) 
  }
  return (
    <>
      {true && (
        <Drawer
          isOpen={true}
          placement="right"
          finalFocusRef={btnRef}
          size="full"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Button variant="outline" mr={3} onClick={() => router.push('/customer')}>
                Back
              </Button>
            </DrawerHeader>
            <DrawerBody overflow="scroll">
              <Text color="teal" fontSize="3xl" className="font-bold px-5 py-5">
                Branch Detail
              </Text>
              <Flex px={5} alignContent="center" justifyContent="space-between">
                <Box>Search</Box>
                <Box>
                  <Button
                    colorScheme="teal"
                    onClick={() => setIsAddEditModalOpen(true)}
                  >
                    Add Branches
                  </Button>
                </Box>
              </Flex>
              <DynamicTable
                headerNames={headers}
                data={branches}
                renderAction={renderAction}
              />
              <DeleteModalBranch
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
              />
              <AddEditModalBranch
                isOpen={isAddEditModalOpen}
                onClose={handleCancelAddEdit}
                onSave={handleSave}
                onEditSave={handleEditSave}
                rowData={selectedRow}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default index;


<Menu>
<MenuButton variant="outline">
  <BiDotsVerticalRounded size={25} />
</MenuButton>
<MenuList className=" text-white rounded-md p-1">
  <MenuItem
    className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
    onClick={() => handleAddEdit(row)}
  >
    Edit Branch
  </MenuItem>
  <MenuItem
    className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
    onClick={() => handleDelete(row)}
  >
    Delete Branch
  </MenuItem>
</MenuList>
</Menu>