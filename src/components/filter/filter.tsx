import AddProcessButton from "./AddModal.tsx";
import EditProcessButton from "./EditModal.tsx";
import FilterProcessButton from "./FilterModal.tsx";
import SelectLocation from "../select/Select.tsx";
import "./styles.css";

interface TableFilterProps {
  onSelectChange: (value: string) => void;
  onFilterChange: (value: Array<string>) => void;
}

function TableFilter(props: TableFilterProps ) {

  const handleSelectChange = (value: string) => {
    props.onSelectChange(value);
  };

  const handleFilterChange = (value: Array<string>) => {
    props.onFilterChange(value);
  }

  return (
    <div className="filterContainer">
      <SelectLocation onSelectChange={handleSelectChange} />
      <AddProcessButton/>
      <EditProcessButton/>
      <FilterProcessButton onFilterChange={handleFilterChange}/>
    </div>
  );
}

export default TableFilter;
