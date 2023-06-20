import { Tag, Tbody, Td, Tr } from "@chakra-ui/react";
import moment from "moment/moment";


const TableBody = ({ headerNames, paginatedData, renderAction }) => {

  const showInterConnectedData = (items, name) => {
    if (items?.length === 0) {
      return <div>-</div>;
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
              // if (header === 'ID') {
              //   return <Td key={colIndex}>{rowIndex+1}</Td>;
              // }
            if (header === 'Action') {
              return <Td key={colIndex}>{renderAction(row)}</Td>;
            }
            if (header === 'branch') {
              return <Td key={colIndex}>{showInterConnectedData(row?.branches, 'name')}</Td>;
            }
            if (header === 'invetries') {
              return <Td key={colIndex}>{showInterConnectedData(row?.invetries, 'brandName')}</Td>;
            }
            if (header === 'inventry') {
              return <Td key={colIndex}>{showInterConnectedData(row?.inventry, '_inventry')}</Td>;
            }
            if(header === 'purchaseDate'){
              return <Td key={colIndex}>{moment(row[header]).format('DD-MM-YYYY')}</Td>;
            }
            if(header === 'isActive'){
              return <Td key={colIndex}><Tag variant='solid' colorScheme='teal'>{row[header] ===true ? 'active':"disabled"}</Tag></Td>;
            }
            if(header === 'Role'){
              return <Td key={colIndex}>{row[header].role}</Td>;
            }
            return <Td key={colIndex}>{row[header] !==undefined ? row[header]:"-"}</Td>;
          })}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableBody