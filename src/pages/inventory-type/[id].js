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
} from "@chakra-ui/react";
import DynamicTable from "@/features/table/DynamicTable";
import {
  useAddBranchMutation,
  useDeleteBranchMutation,
  useUpdateBranchByIdMutation,
} from "@/redux/feature/branchApiSlice";
import { useRouter } from "next/router";
import AddEditModalBranch from "@/components/modals/branches-modal/AddEditModalBranch";
import { BiDotsVerticalRounded } from "react-icons/bi";
import DeleteModalBranch from "@/components/modals/branches-modal/DeleteModalBranch";
import { useGetInventoryTypeByIdFormatQuery } from "@/redux/feature/inventoryTypeApiSlice";

const index = () => {
  const router = useRouter()
  const id = router?.query?.id
  console.log(id);
  const btnRef = React.useRef();
  const headers = ["brandName", "Action"];
  const [inventories, setInventories] = useState([]);
  const { data: myallInventoryType } = useGetInventoryTypeByIdFormatQuery(id)
  const [addBranch] = useAddBranchMutation()
  const [updateBranchById] = useUpdateBranchByIdMutation()
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBranch] = useDeleteBranchMutation()
  console.log(myallInventoryType?.data?.InventryTypes[0]?.invetries);
  useEffect(() => {
    if (id && myallInventoryType?.data?.InventryTypes[0]?.invetries) {
      setInventories(myallInventoryType?.data?.InventryTypes[0]?.invetries);
    }
  }, [id])
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
          console.log();
        })
        .catch((error) => {
          console.log(error);

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
        console.log();
      })
      .catch((error) => {
        console.log(error);

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
      })
      .catch((error) => {
        console.log(error);

      });
  };
  const renderAction = (row) => {
    return (
      <Menu>
        <MenuButton variant="outline">
          <BiDotsVerticalRounded size={25} />
        </MenuButton>
        <MenuList className=" text-white rounded-md p-1">
          <MenuItem
            className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
            onClick={() => handleAddEdit(row)}
          >
            Edit Inventory
          </MenuItem>
          <MenuItem
            className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
            onClick={() => handleDelete(row)}
          >
            Delete Inventory
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };
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
              <Button variant="outline" mr={3} onClick={() => router.push('/inventory-type')}>
                Back
              </Button>
            </DrawerHeader>
            <DrawerBody overflow="scroll">
              <Text color="teal" fontSize="3xl" className="font-bold px-5 py-5">
                Inventory Type Detail
              </Text>
              <Flex px={5} alignContent="center" justifyContent="space-between">
                <Box>Search</Box>
                <Box>
                  <Button
                    colorScheme="teal"
                    onClick={() => setIsAddEditModalOpen(true)}
                  >
                    Add Inventory
                  </Button>
                </Box>
              </Flex>
              <DynamicTable
                headerNames={headers}
                data={inventories}
                renderAction={renderAction}
              />
              {/* <DeleteModalBranch
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
              /> */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default index;
