import React, { useState, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  TableContainer,
} from "@chakra-ui/react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import GoToPage from "./GotoPage";
import ItemsPerPage from "./ItemsPerPage";

const DynamicTable = ({ headerNames, data, renderAction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ column: null, order: null });
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const itemsPerPageOptions = [5, 10, 15];
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && currentPage * itemsPerPage < data.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
    setGoToPage("");
  };

  const handleSort = (column) => {
    let order = "asc";
    if (sortConfig.column === column && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ column, order });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedData = useMemo(() => {
    if (!sortConfig.column) {
      return data;
    }

    const columnData = data.map((row) => row[sortConfig.column]);
    const sortedIndexes = Array.from(Array(columnData.length).keys()).sort(
      (a, b) => {
        if (columnData[a] < columnData[b]) {
          return sortConfig.order === "asc" ? -1 : 1;
        }
        if (columnData[a] > columnData[b]) {
          return sortConfig.order === "asc" ? 1 : -1;
        }
        return 0;
      }
    );

    return sortedIndexes.map((index) => data[index]);
  }, [data, sortConfig]);

  const paginatedData = sortedData.slice(startIndex, endIndex);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled =
    currentPage === totalPages || data.length === 0 || endIndex >= data.length;

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
      <div className="flex justify-between flex-wrap gap-5 px-5 items-center">
      <GoToPage
        goToPage={goToPage}
        handleGoToPage={handleGoToPage}
        setGoToPage={setGoToPage}
      />
      <ItemsPerPage
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        setItemsPerPage={setItemsPerPage}
      />
      </div>
    <TableContainer>
    <Table>
        <TableHeader
          headerNames={headerNames}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />
        <TableBody
          headerNames={headerNames}
          paginatedData={paginatedData}
          renderAction={renderAction}
        />
      </Table>
    </TableContainer>
    </div>
  );
};

export default DynamicTable;
