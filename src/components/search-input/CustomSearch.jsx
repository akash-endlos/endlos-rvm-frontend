import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
const CustomSearch = ({globalFilter,setGlobalFilter}) => {
  return (
    <Stack>
      <InputGroup borderRadius={8} borderColor="gray">
        <InputLeftElement pointerEvents="none">
          <AiOutlineFileSearch color="gray.300" size={20} />
        </InputLeftElement>
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          type="text"
          placeholder="Search Here ..."
        />
      </InputGroup>
    </Stack>
  );
};

export default CustomSearch;
