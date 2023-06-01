import { Tbody, Td, Tr } from "@chakra-ui/react";

const TableBody = ({ headerNames, paginatedData, renderAction }) => {

  const showInterConnectedData = (items, name) => {
    if (items?.length === 0) {
      return <div>No data available</div>;
    }
    let renderedItems = [];

    if (items?.length > 0) {
      renderedItems = items.slice(0, 2).map((item, index) => (
        <span key={index}>{item[name]} / </span>
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
              return <Td key={colIndex}>{showInterConnectedData(row?.branches, 'name')}</Td>;
            }
            if (header === 'invetries') {
              return <Td key={colIndex}>{showInterConnectedData(row?.invetries, 'brandName')}</Td>;
            }
            return <Td key={colIndex}>{row[header]}</Td>;
          })}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableBody