import { Button } from "@chakra-ui/react";
import { useState } from "react";

const Search = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSearchClick = () => {
      handleSearch(searchTerm);
    };
  
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearchClick} size="sm">
          Search
        </Button>
      </div>
    );
  };

  export default Search