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
import AddEditBranchModal from "@/components/modals/customer-modal/AddEditBranchModal"; // Import the AddEditBranchModal
import { useRouter } from "next/router";
import {AiFillEdit,AiFillEye,AiFillDelete,AiOutlineBranches} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {FiEdit} from 'react-icons/fi'
import { toast } from "react-hot-toast";
import { useAddBranchMutation } from "@/redux/feature/branchApiSlice";
import { useGetVendorsQuery } from "@/redux/feature/vendorApiSlice";
import AddEditSidebar from "@/components/modals/customer-modal/AddEditModalCustomer";

const index = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false); // Add state for the AddEditBranchModal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { data: vendors } = useGetVendorsQuery();
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const headers = ["name", "branch", "Action"];
  const [addCustomer] = useAddCustomerMutation();
  const { data: customers, isLoading, isError, error, refetch } = useGetCustomersQuery();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [addBranch] = useAddBranchMutation()
  console.log(vendors?.payload?.vendors);
  useEffect(() => {
    if (customers) {
      refetch();
      setDataTable(customers.data.Customer);
    }
  }, [customers]);
  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCustomer(selectedRow._id)
      .unwrap()
      .then(() => {
        setSelectedRow(null);
        setIsDeleteModalOpen(false);
        toast.success('Delete SuccessFully');
      })
      .catch((error) => {
        toast.error(error.data.error);
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
    await addCustomer(data)
      .unwrap()
      .then(() => {
        toast.success('Added SuccessFully');
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  const handleEditSave = async (data) => {
    const updatedData = {
      id: selectedRow._id,
      editedData: data
    };
    await updateCustomer(updatedData)
      .unwrap()
      .then(() => {
        toast.success('Updated SuccessFully');
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  const handleCancelAddEdit = () => {
    setSelectedRow(null);
    setIsAddEditModalOpen(false);
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setIsViewModalOpen(true);
  };

  const handleViewDrawerClose = () => {
    setSelectedRow(null);
    setIsViewModalOpen(false);
  };
  const handleSaveBranch = async (branchData) => {
    const updatedData={
      customerId:selectedRow?._id,
      name:branchData.name,
    }
    await addBranch(updatedData)
    .unwrap()
    .then(() => {
      toast.success('Added SuccessFully')
    })
    .catch((error) => {
      toast.error(error.data.error)

    });
  };
  const renderAction = (row) => {
    return (
      <Flex gap={3} alignContent='center'>
        <AiFillEye className="cursor-pointer" onClick={() => router.push(`customer/branches/${row._id}`)} color="#174050" size={25} />
        <FiEdit className="cursor-pointer" onClick={() => handleAddEdit(row)} color="teal" size={20} />
        <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(row)} color="red" size={20} />
        <AiOutlineBranches className="cursor-pointer" onClick={() => {setIsAddBranchModalOpen(true);setSelectedRow(row)}} color="gray" size={20} />
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
            {/* <Button ml={4} colorScheme="teal" onClick={() => setIsAddBranchModalOpen(true)}>
              Add Branch
            </Button> */}
          </Box>
        </Flex>
        <DynamicTable
          headerNames={headers}
          data={dataTable}
          renderAction={renderAction}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <AddEditSidebar
          Vendors={vendors?.payload?.vendors}
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRow}
        />
        <AddEditBranchModal
          Customer={customers?.data?.Customer}
          isOpen={isAddBranchModalOpen}
          onClose={() => setIsAddBranchModalOpen(false)}
          onSave={handleSaveBranch}
          rowData={selectedRow}
        />
      </Layout>
    </>
  );
};

export default index;
