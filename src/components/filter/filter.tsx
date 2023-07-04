import AddProcessButton from "./AddModal.tsx";
import EditProcessButton from "./EditModal.tsx";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SelectLocation from "../select/Select.tsx";
import "./styles.css";

function FilterProcessButton() {
  return (
    <button type="button" className="filter-button">
      {<FilterAltIcon />}
    </button>
  );
}

interface TableFilterProps {
  onSelectChange: (value: string) => void;
  onRowCheck: (value: string[]) => void;
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
