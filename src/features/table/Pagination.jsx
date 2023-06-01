import { Button } from "@chakra-ui/react";
import {AiOutlineDoubleLeft,AiOutlineCaretLeft,AiOutlineDoubleRight,AiOutlineCaretRight} from 'react-icons/ai'

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
      <div className="pagination px-5 py-5 flex gap-2">
        <Button
          onClick={handleFirstPage}
          disabled={isPreviousDisabled}
          variant="outline"
          size="sm"
          colorScheme='teal'
        >
          <AiOutlineDoubleLeft/>
        </Button>
        <Button
          onClick={handlePreviousPage}
          disabled={isPreviousDisabled}
          variant="outline"
          size="sm"
          colorScheme='teal'
        >
         <AiOutlineCaretLeft/>
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={handleNextPage}
          disabled={isNextDisabled}
          variant="outline"
          size="sm"
          colorScheme='teal'
        >
          <AiOutlineCaretRight/>
        </Button>
        <Button
          onClick={handleLastPage}
          disabled={isNextDisabled}
          variant="outline"
          size="sm"
          colorScheme='teal'
        >
          <AiOutlineDoubleRight/>
        </Button>
      </div>
    );
  };

  export default Pagination
































// import { Button } from "@chakra-ui/react";

// const Pagination = ({
//     currentPage,
//     totalPages,
//     handleFirstPage,
//     handleLastPage,
//     handlePreviousPage,
//     handleNextPage,
//     isPreviousDisabled,
//     isNextDisabled,
//   }) => {
//     return (
//       <div className="pagination flex justify-between px-5 py-5 flex-wrap">
//         <Button
//           onClick={handleFirstPage}
//           disabled={isPreviousDisabled}
//           variant="outline"
//           size="sm"
//         >
//           First
//         </Button>
//         <Button
//           onClick={handlePreviousPage}
//           disabled={isPreviousDisabled}
//           variant="outline"
//           size="sm"
//         >
//           Previous
//         </Button>
//         <span>{`Page ${currentPage} of ${totalPages}`}</span>
//         <Button
//           onClick={handleNextPage}
//           disabled={isNextDisabled}
//           variant="outline"
//           size="sm"
//         >
//           Next
//         </Button>
//         <Button
//           onClick={handleLastPage}
//           disabled={isNextDisabled}
//           variant="outline"
//           size="sm"
//         >
//           Last
//         </Button>
//       </div>
//     );
//   };

//   export default Pagination