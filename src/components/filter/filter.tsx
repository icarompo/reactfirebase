import AddProcessButton from "./addprocess.tsx";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import "./styles.css";


function SearchProcessButton() {
  return (
    <button type="button" className="button" id="searchButton">
      {<SearchIcon className="icon" />}
      <span>Pesquisar Processo</span>
    </button>
  );
}

type SelectLocationProps = {
  onSelectChange: (value: string) => void;
};

function SelectLocation(props: SelectLocationProps) {
  const [selectedOption, setSelectedOption] = useState("relatoria");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
    props.onSelectChange(event.target.value as string); // Chama a função de callback com o valor selecionado
  };

  return (
    <div>
      <select
        className="button"
        id="select"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="*">Todos</option>
        <option value="sim">Finalizados</option>
        <option value="TRAMIT.">Tramitando</option>
        <option value="sobrest">Sobrestado</option>
        <option value="relatoria">Relatoria</option>
      </select>
    </div>
  );
}

interface TableFilterProps {
  onSelectChange: (value: string) => void;
}

function TableFilter(props: TableFilterProps ) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectChange = (value: string) => {
    props.onSelectChange(value);
  };

  return (
    <div className="filterContainer">
      <SearchProcessButton />
      <AddProcessButton openModal={openModal} />
      <SelectLocation onSelectChange={handleSelectChange} />
    </div>
  );
}

export default TableFilter;