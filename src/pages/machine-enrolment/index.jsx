import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index


// import { CustomInpuFile, CustomInput } from '@/components/form-inputs/FormInputs'
// import OverLayComponent from '@/components/overlay-component/OverLayComponent'
// import CustomTable from '@/features/table/CustomTable'
// import Layout from '@/layout/Layout'
// import { data } from '@/makedata'
// import { Box, Button, Flex, FormControl, Heading, ModalBody, ModalFooter } from '@chakra-ui/react'
// import React, { useMemo, useState } from 'react'
// import { BsThreeDotsVertical } from 'react-icons/bs'

// const index = () => {
//   const [machineID, setmachineID] = useState('')
//   const handleSubmit = () => {

//   }
//   const columns = useMemo(
//     () => [
//       {
//         Header: "id",
//         accessor: "id",
//       },
//       {
//         Header: "Machine ID",
//         accessor: "machineID",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//       },
//       {
//         Header: "action",
//         accessor: ({ action }) => {
//           return (
//             <Flex>
//               <Button >
//                 <BsThreeDotsVertical />
//               </Button>
//             </Flex>
//           );
//         },
//       },
//     ],
//     []
//   );

//   return (
//     <>
//       <Layout>
//         <div className="py-5 ">
//           <OverLayComponent title='Add Machine' handleSubmit={handleSubmit}>
//             <FormControl >
//               <ModalBody >
//                 <CustomInput name='machineID' value={machineID} handleChange={(e) => setmachineID(e.target.value)} placeholder='Enter Your Machine ID' label='Machine ID' />
//               </ModalBody>
//             </FormControl>
//           </OverLayComponent>
//           <Box>
//             <Flex direction={{ base: 'column', md: 'row' }} gap={5} px='5' py='5' my='5' display='flex' justifyContent='space-between' alignItems='center'>
//               <Heading as='h4' size='md' textColor='green' >
//                 MACHINE TABLE
//               </Heading>
//             </Flex>
//             <CustomTable columns={columns} data={data} />
//           </Box>
//         </div>
//       </Layout>
//     </>
//   )
// }

// export default index