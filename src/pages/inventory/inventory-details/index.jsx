import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
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
import { useAddInventoryMutation, useDeleteInventoryMutation, useGetInventoryQuery, useUpdateInventoryByIdMutation } from "@/redux/feature/inventoryApiSlice";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";

const index = () => {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [InventoryType, setInventoryType] = useState([])
  const headers = ['invetrybrands', 'invetrytypes', 'serialNumber', 'purchaseDate', "Action"];
  const [addInventory] = useAddInventoryMutation();
  const { data: inventory, refetch, isLoading, currentData } = useGetInventoryQuery();
  const { data: inventoryType } = useGetInventoryTypeQuery();
  // const [updateInventoryTypeById] = useUpdateInventoryTypeByIdMutation()
  const [updateInventoryById] = useUpdateInventoryByIdMutation()
  const [deleteInventory] = useDeleteInventoryMutation()
  useEffect(() => {
    if (inventory?.payload?.allInventry) {

      setDataTable(inventory?.payload?.allInventry)
      refetch()
    }
  }, [inventory?.payload?.allInventry])
  useEffect(() => {
    if (inventoryType) {
      setInventoryType(inventoryType?.payload?.InventryTypes)
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
        toast.success('Deleted SuccessFully')
      })
      .catch((error) => {
        toast.error(error.data.error)
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

  const handleSave = async (data) => {
    console.log(data);
    const newAddData = {
      brandName: data.brandName,
      inventryType: data.inventryType,
      serialNumber: data.serialNumber
    }
    const manipulatedData = data.purchaseDate ? data : newAddData
    await addInventory(manipulatedData)
      .unwrap()
      .then(() => {
        toast.success('Added SuccessFully')
      })
      .catch((error) => {
        toast.error(error.data.message)

      });
  };

  const handleEditSave = async (data) => {
    const updatedData = {
      id: selectedRow._id,
      editedData: data
    }
    await updateInventoryById(updatedData)
      .unwrap()
      .then(() => {
        toast.success('Updated SuccessFully')
      })
      .catch((error) => {
        toast.error(error.data.error)

      });
  }
  const handleCancelAddEdit = () => {
    setSelectedRow(null);
    setIsAddEditModalOpen(false);
  };
  const renderAction = (row) => {
    return (
      <Flex gap={3} alignContent='center'>
        <FiEdit className="cursor-pointer" onClick={() => handleAddEdit(row)} color="teal" size={20} />
        <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(row)} color="red" size={20} />
      </Flex>
    );
  };
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="teal" />
      </Box>
    )
  }
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
