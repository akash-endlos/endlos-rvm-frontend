import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import DynamicTable from "@/features/table/DynamicTable";
import Layout from "@/layout/Layout";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRouter } from "next/router";
import { useAddInventoryTypeMutation, useDeleteInventoryTypeMutation, useGetInventoryTypeQuery, useUpdateInventoryTypeByIdMutation } from "@/redux/feature/inventoryTypeApiSlice";
import AddEditInventoryTypeModal from "@/components/modals/inventoryType-modal/AddEditInventoryTypeModal";
import DeleteInventoryTypeModal from "@/components/modals/inventoryType-modal/DeleteInventoryTypeModal";
import AddEditInventoryModal from "@/components/modals/inventory-modal/AddEditInventoryModal";
import { useAddInventoryMutation, useDeleteInventoryMutation, useGetInventoryQuery } from "@/redux/feature/inventoryApiSlice";

const index = () => {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [InventoryType, setInventoryType] = useState([])
  const headers = ["brandName",'inventryType','serialNumber','purchaseDate', "Action"];
  const [addInventory] = useAddInventoryMutation();
  const { data: inventory,refetch } = useGetInventoryQuery();
  const { data: inventoryType } = useGetInventoryTypeQuery();
  const [updateInventoryTypeById] = useUpdateInventoryTypeByIdMutation()
  const [deleteInventory] = useDeleteInventoryMutation()
  useEffect(() => {
   if(inventory)
   {
     setDataTable(inventory.data.allInventry)
     refetch()
   }
  }, [inventory])
  useEffect(() => {
    if(inventoryType)
    {
      setInventoryType(inventoryType.data.InventryTypes)
    }
   }, [inventoryType])
  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteInventory(selectedRow._id)
      .unwrap()
      .then(() => {
        setSelectedRow(null); 
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleCancelDelete = () => {
    setSelectedRow(null);
    setIsDeleteModalOpen(false);
  };

  const handleAddEdit = (row) => {
    setSelectedRow(row);
    setIsAddEditModalOpen(true);
  };

  const handleSave = async(data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    await addInventory(data)
    .unwrap()
    .then(() => {
      console.log('');
    })
    .catch((error) => {
    console.log(error);

    });
  };
  
  const handleEditSave=async(data)=>{
    const updatedData={
      id: selectedRow._id,
      editedData:data
    }
    await updateInventoryTypeById(updatedData)
    .unwrap()
    .then(() => {
      console.log('');
    })
    .catch((error) => {
    console.log(error);

    });
  }
  const handleCancelAddEdit = () => {
    setSelectedRow(null);
    setIsAddEditModalOpen(false);
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
            Edit 
          </MenuItem>
          <MenuItem
            className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
            onClick={() => handleDelete(row)}
          >
            Delete 
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Layout>
        <Text color="teal" fontSize="3xl" className="font-bold px-5 py-5">
          Inventory Details
        </Text>
        <Flex px={5} alignContent="center" justifyContent="space-between">
          <Box>Search</Box>
          <Box>
            <Button colorScheme="teal" onClick={() => setIsAddEditModalOpen(true)}>
              Add Inventory Details
            </Button>
          </Box>
        </Flex>
        <DynamicTable
          headerNames={headers}
          data={dataTable}
          renderAction={renderAction}
        />
        <DeleteInventoryTypeModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <AddEditInventoryModal
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRow}
          options={InventoryType}
        />
      </Layout>
    </>
  );
};

export default index;