import { Button } from "@chakra-ui/react";

const Pagination = ({
    currentPage,
    totalPages,
    handleFirstPage,
    handleLastPage,
    handlePreviousPage,
    handleNextPage,
    isPreviousDisabled,
    isNextDisabled,
  }) => {
    return (
      <div className="pagination flex justify-between px-5 py-5 flex-wrap">
        <Button
          onClick={handleFirstPage}
          disabled={isPreviousDisabled}
          variant="outline"
          size="sm"
        >
          First
        </Button>
        <Button
          onClick={handlePreviousPage}
          disabled={isPreviousDisabled}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={handleNextPage}
          disabled={isNextDisabled}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
        <Button
          onClick={handleLastPage}
          disabled={isNextDisabled}
          variant="outline"
          size="sm"
        >
          Last
        </Button>
      </div>
    );
  };

  export default Pagination