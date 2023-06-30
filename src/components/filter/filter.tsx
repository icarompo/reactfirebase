import AddProcessButton from "./AddModal.tsx";
import EditProcessButton from "./EditModal.tsx";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import "./styles.css";

import SelectLocation from "../select/Select.tsx";


function FilterProcessButton() {
  return (
    <button type="button" className="filter-button">
      {<FilterAltIcon />}
    </button>
  );
}

interface TableFilterProps {
  onSelectChange: (value: string) => void;
}

function TableFilter(props: TableFilterProps ) {

  const handleSelectChange = (value: string) => {
    props.onSelectChange(value);
  };

  return (
    <div className="filterContainer">
      <AddProcessButton/>
      <SelectLocation onSelectChange={handleSelectChange} />
      <EditProcessButton/>
      <FilterProcessButton />
    </div>
  );
}

export default TableFilter;
