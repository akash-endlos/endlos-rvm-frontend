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
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import AddEditProblemsModal from "@/components/modals/problems-modal/AddEditProblemsModal";
import { useAddProblemMutation, useDeleteProblemMutation, useGetProblemsQuery, useUpdateProblemByIdMutation } from "@/redux/feature/problemsApiSlice";


const index = () => {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const headers = ["name","problemType","description", "Action"];
  const { data: inventoryType } = useGetInventoryTypeQuery();
  const { data: problems, isLoading, isError, error,refetch } = useGetProblemsQuery();
  const [updateProblemById] = useUpdateProblemByIdMutation()
  const [addProblem] = useAddProblemMutation()
  const [deleteProblem] = useDeleteProblemMutation()
  useEffect(() => {
   if(problems?.data?.problems)
   {
     setDataTable(problems?.data?.problems)
   }
  }, [problems?.data?.problems])
  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteProblem(selectedRow._id)
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

  const handleSave = async(data) => {
    await addProblem(data)
    .unwrap()
    .then(() => {
      toast.success('Added SuccessFully')
    })
    .catch((error) => {
      toast.error(error.data.error)

    });
  };
  
  const handleEditSave=async(data)=>{
    const updatedData={
      id: selectedRow._id,
      editedData:data
    }
    await updateProblemById(updatedData)
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
      <Layout>
        <Text color="teal" fontSize="3xl" className="font-bold px-5 py-5">
          Problems
        </Text>
        <Flex px={5} alignContent="center" justifyContent="space-between">
          <Box>Search</Box>
          <Box>
            <Button colorScheme="teal" onClick={() => setIsAddEditModalOpen(true)}>
              Add Problems
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
        <AddEditProblemsModal
          inventoryType={inventoryType?.payload?.InventryTypes}
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRow}
        />
      </Layout>
    </>
  );
};

export default index;
