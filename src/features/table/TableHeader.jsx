import { Th, Thead, Tr } from "@chakra-ui/react";

const TableHeader = ({ headerNames, sortConfig, handleSort }) => {
  return (
    <Thead>
      <Tr>
        {headerNames.map((header, index) => (
          <Th key={index} onClick={() => handleSort(header)}>
            {header}
            {sortConfig.column === header && (
              <span>{sortConfig.order === 'asc' ? '▲' : '▼'}</span>
            )}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default TableHeader