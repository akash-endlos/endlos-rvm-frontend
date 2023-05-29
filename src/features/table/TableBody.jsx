import { Tbody, Td, Tr } from "@chakra-ui/react";

const TableBody = ({ headerNames, paginatedData, renderAction }) => {
    return (
      <Tbody>
        {paginatedData.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {headerNames.map((header, colIndex) => {
              if (header === 'Action') {
                return <Td key={colIndex}>{renderAction(row)}</Td>;
              }
              return <Td key={colIndex}>{row[header]}</Td>;
            })}
          </Tr>
        ))}
      </Tbody>
    );
  };

  export default TableBody