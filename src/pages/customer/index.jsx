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
import DeleteModal from "@/components/modals/customer-modal/DeleteModalCustomer";
import { useAddCustomerMutation, useDeleteCustomerMutation, useGetCustomerByIdMutation, useGetCustomersMutation, useGetCustomersQuery, useUpdateCustomerMutation } from "@/redux/feature/customerApiSlice";
import { BiDotsVerticalRounded } from "react-icons/bi";
import AddEditModal from "@/components/modals/customer-modal/AddEditModalCustomer";
import AddEditBranchModal from "@/components/modals/customer-modal/AddEditBranchModal";
import { useRouter } from "next/router";
import { AiFillEdit,AiFillEye,AiFillDelete,AiOutlineBranches} from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { toast } from "react-hot-toast";
import { useAddBranchMutation } from "@/redux/feature/branchApiSlice";
import { useGetVendorsQuery } from "@/redux/feature/vendorApiSlice";
import AddEditSidebar from "@/components/modals/customer-modal/AddEditModalCustomer";

const Index = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedRowForAddEdit, setSelectedRowForAddEdit] = useState(null);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [selectedRowForAddBranch, setSelectedRowForAddBranch] = useState(null);
  
  const { data: vendors } = useGetVendorsQuery();
  const [dataTable, setDataTable] = useState([]);
  const headers = ["name", "branch", "Action"];
  const [addCustomer] = useAddCustomerMutation();
  const { data: customers, isLoading, isError, error, refetch } = useGetCustomersQuery();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [addBranch] = useAddBranchMutation();

  useEffect(() => {
    if (customers) {
      setDataTable(customers.payload.Customer);
      refetch();
    }
  }, [customers]);

  const handleDelete = (row) => {
    setSelectedRowForDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCustomer(selectedRowForDelete._id)
      .unwrap()
      .then(() => {
        setSelectedRowForDelete(null);
        setIsDeleteModalOpen(false);
        toast.success('Delete SuccessFully');
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  const handleAddEdit = (row) => {
    setIsAddBranchModalOpen(false)
    setSelectedRowForAddEdit(row);
    setIsAddEditModalOpen(true);
  };

  const handleSave = async (data) => {
    await addCustomer(data)
      .unwrap()
      .then(() => {
        toast.success('Added Successfully');
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  const handleEditSave = async (data) => {
    const updatedData = {
      id: selectedRowForAddEdit._id,
      editedData: data
    };
    await updateCustomer(updatedData)
      .unwrap()
      .then(() => {
        toast.success('Updated Successfully');
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  const handleCancelAddEdit = () => {
    setSelectedRowForAddEdit(null);
    setIsAddEditModalOpen(false);
   
  };

  const handleSaveBranch = async (branchData) => {
    const updatedData = {
      customerId: selectedRowForAddBranch?._id,
      name: branchData.name,
    };
    await addBranch(updatedData)
      .unwrap()
      .then(() => {
        refetch();
        toast.success('Added Successfully');
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  const renderAction = (row) => {
    return (
      <Flex gap={3} alignContent='center'>
        <AiFillEye className="cursor-pointer" onClick={() => router.push(`customer/branches/${row._id}`)} color="#174050" size={25} />
        <FiEdit className="cursor-pointer" onClick={() => handleAddEdit(row)} color="teal" size={20} />
        <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(row)} color="red" size={20} />
        <AiOutlineBranches className="cursor-pointer" onClick={() => { setIsAddBranchModalOpen(true);setIsAddEditModalOpen(false); setSelectedRowForAddBranch(row) }} color="gray" size={20} />
      </Flex>
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="teal" />
      </Box>
    );
  }

  return (
    <>
      <Layout>
        <Text color="teal" fontSize="3xl" className="font-bold px-5 py-5">
          Customer
        </Text>
        <Flex px={5} alignContent="center" justifyContent="space-between">
          <Box>Search</Box>
          <Box>
            <Button colorScheme="teal" onClick={() => setIsAddEditModalOpen(true)}>
              Add Customer
            </Button>
          </Box>
        </Flex>
        <DynamicTable
          headerNames={headers}
          data={dataTable}
          renderAction={renderAction}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
        <AddEditModal
          Vendors={vendors?.payload?.vendors}
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRowForAddEdit}
        />
        <AddEditBranchModal
          Customer={customers?.data?.Customer}
          isOpen={isAddBranchModalOpen}
          onClose={() => setIsAddBranchModalOpen(false)}
          onSave={handleSaveBranch}
          rowData={selectedRowForAddBranch}
        />
      </Layout>
    </>
  );
};

export default Index;
