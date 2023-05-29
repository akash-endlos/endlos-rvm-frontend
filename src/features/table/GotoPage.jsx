import { Button, Input } from "@chakra-ui/react";

const GoToPage = ({ goToPage, handleGoToPage, setGoToPage }) => {
    return (
      <div className="go-to-page flex">
        <Input
          type="number"
          placeholder="Go to page"
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleGoToPage();
            }
          }}
        />
        <Button border='1px' borderColor='Highlight' onClick={handleGoToPage} size="md">
          Go
        </Button>
      </div>
    );
  };

  export default GoToPage