import { CustomInpuFile, CustomInput } from '@/components/form-inputs/FormInputs'
import OverLayComponent from '@/components/overlay-component/OverLayComponent'
import CustomTable from '@/features/table/CustomTable'
import Layout from '@/layout/Layout'
import { data } from '@/makedata'
import { useGetInventoryMutation, useGetInventoryQuery } from '@/redux/feature/inventoryApiSlice'
import { Box, Button, Flex, FormControl, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, ModalBody, ModalFooter } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const index = () => {
    const [machineID, setmachineID] = useState('')
    const [allInventory, setallInventory] = useState([])
    const [getInventory] = useGetInventoryMutation()
    const handleSubmit = () => {

    }
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const { data } = await getInventory();
                setallInventory(data.data.allInventry);
                // Additional logic after the API call
            } catch (error) {
                // Handle any errors
            }
        };

        fetchInventory();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "id",
                accessor: (_row, index) => index + 1
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Brand Name",
                accessor: "brandName",
            },
            // {
            //     Header: "Serial Number",
            //     accessor: "serialNumber",
            // },,
            // {
            //     Header: "Purchase Date Name",
            //     accessor: "purchaseDate",
            // },
            {
                Header: "action",
                Cell: row => {
                    return (
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                //   icon={<HamburgerIcon />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem >
                                    Edit
                                </MenuItem>
                                <MenuItem >
                                    Delete
                                </MenuItem>
                                <MenuItem >
                                    View
                                </MenuItem>

                            </MenuList>
                        </Menu>
                    )
                }
            },
        ],
        []
    );

    return (
        <>
            <Layout>
                <div className="py-5 ">
                    <OverLayComponent title='Add Inventory' handleSubmit={handleSubmit}>
                        <FormControl >
                            <ModalBody >
                                <CustomInput name='machineID' placeholder='Enter Your Inventory name' label='Name' />
                                <CustomInput name='brand' placeholder='Enter Your Inventory Brand name' label='Brand Name' />
                                <CustomInput name='serialnumber' placeholder='Enter Your Serial Number' label='Serial Number' />
                                <CustomInput name='date' type='date' placeholder='Enter Your Date' label='Date' />
                            </ModalBody>
                        </FormControl>
                    </OverLayComponent>
                    <Box>
                        <Flex direction={{ base: 'column', md: 'row' }} gap={5} px='5' py='5' my='5' display='flex' justifyContent='space-between' alignItems='center'>
                            <Heading as='h4' size='md' textColor='green' >
                                INVENTORY
                            </Heading>
                        </Flex>
                        <CustomTable columns={columns} data={allInventory} />
                    </Box>
                </div>
            </Layout>
        </>
    )
}

export default index