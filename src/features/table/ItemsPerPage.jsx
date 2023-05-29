import { Select } from "@chakra-ui/react";

const ItemsPerPage = ({
  itemsPerPage,
  itemsPerPageOptions,
  setItemsPerPage,
}) => {
  return (
    <div className="flex justify-between items-center gap-5">
        <div>Items Per Page :-</div>
        <div className="items-per-page ">
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        size="sm"
      >
        {itemsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    </div>
  );
};

export default ItemsPerPage;
