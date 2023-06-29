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
import { AiFillEdit, AiFillEye, AiFillDelete } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoAddSharp } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import { toast } from "react-hot-toast";
import { useAddBranchMutation } from "@/redux/feature/branchApiSlice";
import DeleteVendorModal from "@/components/modals/vendors-modal/DeleteVendorModal";
import AddEditVendorModal from "@/components/modals/vendors-modal/AddEditVendorModal";
import { useAddVendorMutation, useDeleteVendorMutation, useGetVendorsQuery, useUpdateVendorMutation } from "@/redux/feature/vendorApiSlice";
import AddEditVendorSidebar from "@/components/modals/vendors-modal/AddEditVendorModal";
import AddEditVendorCustomerSidebar from "@/components/modals/vendors-modal/AddEditCustomerSidebar";


const index = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isVendorCustomerModalOpen, setIsVendorCustomerModalOpen] = useState(false); // Add the state variable for AddEditVendorCustomerSidebar
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const headers = ["name", "email", "customers", "Action"];
  const [addVendor] = useAddVendorMutation();
  const { data: vendors, isLoading, isError, error, refetch } = useGetVendorsQuery();
  const [updateVendor] = useUpdateVendorMutation();
  const [deleteVendor] = useDeleteVendorMutation();
  const [addBranch] = useAddBranchMutation()
  const [addCustomer] = useAddCustomerMutation();
  useEffect(() => {
    if (vendors?.payload?.vendors) {
      setDataTable(vendors?.payload?.vendors);
      refetch();
    }
  }, [vendors?.payload?.vendors]);
  
  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    console.log(selectedRow._id);
    await deleteVendor(selectedRow._id)
      .unwrap()
      .then(() => {
        setSelectedRow(null);
        setIsDeleteModalOpen(false);
        toast.success('Delete Successfully');
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
    await addVendor(data)
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
      id: selectedRow._id,
      editedData: data
    };
    await updateVendor(updatedData)
      .unwrap()
      .then(() => {
        toast.success('Updated Successfully');
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.data.error);
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
  
  const handleSaveCustomer = async (customerData) => {
    console.log(customerData);
    const updatedData={
      vendorId:selectedRow._id,
      name:customerData.customerName
    }
    await addCustomer(updatedData)
      .unwrap()
      .then(() => {
        toast.success('Added Successfully');
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const handleAddEditVendorCustomer = (row) => {
    setSelectedRow(row);
    setIsVendorCustomerModalOpen(true);
  };

  const handleCancelAddEditVendorCustomer = () => {
    setSelectedRow(null);
    setIsVendorCustomerModalOpen(false);
  };

  const renderAction = (row) => {
    return (
      <Flex gap={3} alignContent='center'>
        <AiFillEye className="cursor-pointer" onClick={() => router.push(`customer/branches/${row._id}`)} color="#174050" size={25} />
        <FiEdit className="cursor-pointer" onClick={() => handleAddEdit(row)} color="teal" size={20} />
        <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(row)} color="red" size={20} />
        <IoAddSharp className="cursor-pointer" onClick={() => handleAddEditVendorCustomer(row)} color="red" size={20} />
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
          Vendor
        </Text>
        <Flex px={5} alignContent="center" justifyContent="space-between">
          <Box>Search</Box>
          <Box>
            <Button colorScheme="teal" onClick={() => setIsAddEditModalOpen(true)}>
              Add Vendor
            </Button>
          </Box>
        </Flex>
        <DynamicTable
          headerNames={headers}
          data={dataTable}
          renderAction={renderAction}
        />
        <DeleteVendorModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <AddEditVendorModal
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRow}
        />
        <AddEditVendorCustomerSidebar
          isOpen={isVendorCustomerModalOpen}
          onClose={handleCancelAddEditVendorCustomer}
          onSave={handleSaveCustomer}
          rowData={selectedRow}
        />
      </Layout>
    </>
  );
};

export default index;
