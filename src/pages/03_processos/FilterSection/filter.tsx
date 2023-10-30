import AddProcessButton from "./modal/addModal/AddModal.tsx";
import EditProcessButton from "./modal/editModal/EditModal.tsx";
import FilterProcessButton from "./modal/filterModal/FilterModal.tsx";
import SelectLocation from "../../../components/Select/Select.tsx";
import AddDialog from "./Dialog/Dialog.tsx";

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
    <div className="filterContainer bg-primary w-20 h-20 rounded ">
      <SelectLocation onSelectChange={handleSelectChange} />
      <AddDialog/>
      <EditProcessButton/>
      <FilterProcessButton onFilterChange={handleFilterChange}/>
    </div>
  );
}

export default TableFilter;
