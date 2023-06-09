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
import { useRouter } from "next/router";
import DeleteInventoryTypeModal from "@/components/modals/inventoryType-modal/DeleteInventoryTypeModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useAddRoleMutation, useDeleteRoleMutation, useGetRoleQuery, useUpdateRoleByIdMutation } from "@/redux/feature/roleApiSlice";
import { useAddUserMutation, useDeleteUserMutation, useGetUserQuery, useGetUsersQuery, useUpdateUserByIdMutation } from "@/redux/feature/userApiSlice";
import AddEditUserModal from "@/components/modals/user-modal/UserModal";


const index = () => {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const headers = ['name',"mobile","isActive","Role","email", "Action"];
  const [addUser] = useAddUserMutation();
  const { data: userRole } = useGetRoleQuery();
  // console.log(userRole?.data?.userRole);
  const { data: users, isLoading, isError, error,refetch } = useGetUsersQuery();
  const [updateUserById] = useUpdateUserByIdMutation()
  const [deleteUser] = useDeleteUserMutation()
  useEffect(() => {
   if(users)
   {
     setDataTable(users.data.allUsers)
     refetch();
   }
  }, [users])
  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(selectedRow._id)
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
    await addUser(data)
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
    await updateUserById(updatedData)
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
          Users
        </Text>
        <Flex px={5} alignContent="center" justifyContent="space-between">
          <Box>Search</Box>
          <Box>
            <Button colorScheme="teal" onClick={() => setIsAddEditModalOpen(true)}>
              Add User
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
        <AddEditUserModal
          userRole={userRole?.data?.userRole}
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
