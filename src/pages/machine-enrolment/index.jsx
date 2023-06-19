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
import {
  useAddMachineMutation,
  useAssignMachineMutation,
  useDeleteMachineMutation,
  useGetMachinesQuery,
  useUpdateMachineMutation,
} from "@/redux/feature/machineApiSlice";
import DeleteMachineModal from "@/components/modals/machines-modal/DeleteMachineModal";
import AddEditMachineModal from "@/components/modals/machines-modal/AddEditMachineModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAssign } from "react-icons/cg";
import { RiFileEditLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import AddEditAssignModal from "@/components/modals/machines-modal/AddEditAssignModal";
import { useGetInventoryFormatQuery, useGetInventoryTypeQuery } from "@/redux/feature/inventoryTypeApiSlice";

const index = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddEditAssignModal, setIsAddEditAssignModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const headers = ["ID","machineId", "warrentyStartDate", "Action"];
  // const headers = ["ID","machineId", "customer","branchName", "warrentyStartDate", "Action"];
  const [addMachine] = useAddMachineMutation();
  const { data: machines, isLoading, isError, error, refetch } =
    useGetMachinesQuery();
    const { data: inventoryType } = useGetInventoryTypeQuery();
    const { data: inventory } = useGetInventoryFormatQuery(selectedCategory);
  const [updateMachine] = useUpdateMachineMutation();
  const [deleteMachine] = useDeleteMachineMutation();
  const [assignMachine] = useAssignMachineMutation()
  useEffect(() => {
    if (machines) {
      refetch();
      setDataTable(machines?.data?.AllMachines);
    }
  }, [machines]);

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteMachine(selectedRow._id)
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

  const handleSave = async (data) => {
    const addNewData = {
      machineId: data.machineId,
      inventry: data.tags,
      warrentyStartDate: data.warrentyStartDate,
    };
    await addMachine(addNewData)
      .unwrap()
      .then(() => {
        toast.success("Added Successfully");
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  const handleEditSave = async (data) => {
    const editNewData = {
      machineId: data.machineId,
      inventry: data.tags,
      warrentyStartDate: data.warrentyStartDate,
    };
    const updatedData = {
      id: selectedRow._id,
      editedData: editNewData,
    };
    await updateMachine(updatedData)
      .unwrap()
      .then(() => {
        toast.success("Updated Successfully");
      })
      .catch((error) => {
        if (error.data.message) {
          toast.error(error.data.message);
        }
        if (error.data.error) {
          console.log(error.data.error);
        }
      });
  };

  const handleCancelAddEdit = () => {
    setSelectedRow(null);
    setIsAddEditModalOpen(false);
  };
  const handleAddEditAssign = (row) => {
    setSelectedRow(row);
    setIsAddEditAssignModal(true);
  };

  const handleAssignEditCancel = () => {
    setSelectedRow(null);
    setIsAddEditAssignModal(false);
  };

  const handleAssignSave = async(data) => {
    console.log(data
      );
    const {machineId,branchId} = data;
    const addNewData={
      "machineId":machineId,
      "branchId":branchId
    }
    await assignMachine(addNewData)
    .unwrap()
    .then(() => {
      toast.success("Assigned Successfully");
    })
    .catch((error) => {
      if (error.data.message) {
        toast.error(error.data.message);
      }
      if (error.data.error) {
        console.log(error.data.error);
      }
    });
    setIsAddEditAssignModal(false);
  };

  const handleEditAssignSave = async (data) => {
    console.log(data);
    // const editNewData = {
    //   machineId: data.machineId,
    //   inventry: data.tags,
    //   warrentyStartDate: data.warrentyStartDate,
    // };
    // const updatedData = {
    //   id: selectedRow._id,
    //   editedData: editNewData,
    // };
    await updateMachine(data)
      .unwrap()
      .then(() => {
        toast.success("Updated Assigned Successfully");
      })
      .catch((error) => {
        if (error.data.message) {
          toast.error(error.data.message);
        }
        if (error.data.error) {
          console.log(error.data.error);
        }
      });
  };
  const renderAction = (row) => {
    return (
      <Flex gap={3} alignContent="center">
        <FiEdit
          className="cursor-pointer"
          onClick={() => handleAddEdit(row)}
          color="teal"
          size={20}
        />
        <RiDeleteBin6Line
          className="cursor-pointer"
          onClick={() => handleDelete(row)}
          color="red"
          size={20}
        />
        {row && row?.customer ? (
          <CgAssign
            className="cursor-pointer"
            onClick={() => setIsAddEditAssignModal(true)}
            color="teal"
            size={20}
          />
        ) : (
          <RiFileEditLine
            className="cursor-pointer"
            onClick={() => handleAddEditAssign(row)}
            color="teal"
            size={20}
          />
        )}
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
          Machines
        </Text>
        <Flex px={5} alignContent="center" justifyContent="space-between">
          <Box>Search</Box>
          <Box>
            <Button colorScheme="teal" onClick={() => setIsAddEditModalOpen(true)}>
              Add Machine
            </Button>
          </Box>
        </Flex>
        <DynamicTable headerNames={headers} data={dataTable} renderAction={renderAction} />
        <DeleteMachineModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <AddEditMachineModal
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRow}
          inventoryType={inventoryType}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          inventory={inventory}
        />
        <AddEditAssignModal
          machineDataTable={dataTable}
          isOpen={isAddEditAssignModal}
          onClose={handleAssignEditCancel}
          onSave={handleAssignSave}
          onEditSave={handleEditAssignSave}
          rowData={selectedRow}
        />
      </Layout>
    </>
  );
};

export default index;
