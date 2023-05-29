import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  Text,
  Flex,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import DynamicTable from "@/features/table/DynamicTable";
import { useGetCustomersQuery } from "@/redux/feature/customerApiSlice";
import {
  useGetBranchesByIdMutation,
  useGetBranchesByIdQuery,
  useGetBranchesQuery,
} from "@/redux/feature/branchApiSlice";
import { useRouter } from "next/router";

const index = ({ isOpen, rowData }) => {
  const router=useRouter()
  const id = router?.query?.id
  const btnRef = React.useRef();
  const headers = ["name"];
  const [branches, setBranches] = useState([]);
  const [getBranchesById] = useGetBranchesByIdMutation();
  const fetchBranches = async (newid) => {
    const { data } = await getBranchesById(newid);
    const allbranches = data?.data?.Branches;
    if (allbranches) {
      setBranches(allbranches);
    }
  };
  useEffect(() => {
     if(id)
     {
      fetchBranches(id);
     }
  }, [id]);

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
              <Button variant="outline" mr={3} onClick={()=>router.push('/customer')}>
                Back
              </Button>
            </DrawerHeader>
            <DrawerBody overflow="scroll">
              {/* <Input placeholder="Name" value={rowData?._id} isReadOnly /> */}

              <Text color="teal" fontSize="3xl" className="font-bold px-5 py-5">
                Branch Detail
              </Text>
              <Flex px={5} alignContent="center" justifyContent="space-between">
                <Box>
                  <Button
                    colorScheme="teal"
                    onClick={() => setIsAddEditModalOpen(true)}
                  >
                    Add Branches
                  </Button>
                </Box>
                <Box>Search</Box>
              </Flex>
              <DynamicTable
                headerNames={headers}
                data={branches}
                // renderAction={renderAction}
              />
              {/* <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <AddEditModal
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRow}
        />
        <ViewDrawerCustomer
           isOpen={isViewModalOpen}
           onClose={handleViewDrawerClose}
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
