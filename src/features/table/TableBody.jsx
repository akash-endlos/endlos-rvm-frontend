import { Tbody, Td, Tr } from "@chakra-ui/react";

const TableBody = ({ headerNames, paginatedData, renderAction }) => {

  const showBranches = (items) => {
    if (items.length === 0) {
      return <div>No branches available</div>;
    }
    let renderedItems = [];

    if (items.length > 0) {
      renderedItems = items.slice(0, 2).map((item, index) => (
        <span key={index}>{item.name} / </span>
      ));
      renderedItems.push(<span key="ellipsis">...</span>);
    }
    return <div>{renderedItems}</div>;
  }
  return (
    <Tbody>
      {paginatedData.map((row, rowIndex) => (
        <Tr key={rowIndex}>
          {headerNames.map((header, colIndex) => {
            if (header === 'Action') {
              return <Td key={colIndex}>{renderAction(row)}</Td>;
            }
            if (header === 'branch') {
              return <Td key={colIndex}>{showBranches(row?.branches)}</Td>;
            }
            return <Td key={colIndex}>{row[header]}</Td>;
          })}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableBody