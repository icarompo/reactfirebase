import ReactModal from "react-modal";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import './style.css';

function SearchProcessButton() {
  return <button type="button" className="button" id="searchButton">{<SearchIcon className="icon"/>}<span>Pesquisar Processo</span></button>
}

function AddProcessButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return ( 
  <>
  <button type="button" className="button" id="addProcessButton" onClick={openModal}>{<AddIcon className="icon"/>}<span>Adicionar Processo</span></button>

      {modalOpen && (
        <ReactModal
          className="modal"
          isOpen={modalOpen}
          onRequestClose={closeModal}
        >
          <h2>Adicionar Processo</h2>
          <button className="closeModalButton" onClick={closeModal}>
            X
          </button>
          <form name="Adicionar processo">
            <div className="row">
              <div className="column">
                <label htmlFor="proc">Processo:</label>
                <label htmlFor="ano">Ano:</label>
                <label htmlFor="assunto">Assunto:</label>
                <label htmlFor="data">Data de inserção:</label>
                <label htmlFor="datadecisao">Data de decisão:</label>
                <label htmlFor="assessor">Assessor:</label>
                <label htmlFor="entidade">Entidade:</label>
                <label htmlFor="vinculado">Vinculado:</label>
                <label htmlFor="conselheiro">Conselheiro:</label>
                <label htmlFor="julgador">Órgão Julgador:</label>
                <label htmlFor="encaminhamento">Encaminhamento:</label>
                <label htmlFor="definicao">Definição:</label>
                <label htmlFor="meta">Meta:</label>
              </div>
              <div className="column">
                <input
                  className="formRow"
                  type="number"
                  id="proc"
                  name="proc"
                />
                <input className="formRow" type="number" id="ano" name="ano" />
                <input
                  className="formRow"
                  type="text"
                  id="assunto"
                  name="assunto"
                />
                <input className="formRow" type="date" id="data" name="data" />
                <input
                  className="formRow"
                  type="date"
                  id="datadecisao"
                  name="datadecisao"
                />
                <input
                  className="formRow"
                  type="number"
                  id="assessor"
                  name="assessor"
                />
                <input
                  className="formRow"
                  type="text"
                  id="entidade"
                  name="entidade"
                />
                <input
                  className="formRow"
                  type="text"
                  id="vinculado"
                  name="vinculado"
                />
                <input
                  className="formRow"
                  type="text"
                  id="conselheiro"
                  name="conselheiro"
                />
                <input
                  className="formRow"
                  type="text"
                  id="julgador"
                  name="julgador"
                />
                <input
                  className="formRow"
                  type="text"
                  id="encaminhamento"
                  name="encaminhamento"
                />
                <input
                  className="formRow"
                  type="text"
                  id="definicao"
                  name="definicao"
                />
                <input className="formRow" type="text" id="meta" name="meta" />
              </div>
              <div className="column">
                <button className="button" type="button">
                  Adicionar
                </button>
                <button className="button" type="button">
                  Localizar
                </button>
                <button className="button" type="button">
                  Verificar
                </button>
                <button className="button" type="button">
                  Fechar
                </button>
              </div>
            </div>
            <button className="button" id="addprocessButton" type="submit">
              Adicionar
            </button>
          </form>
        </ReactModal>
      )} 
  </>
  );
}

function DeleteProcessButton() {
  return <button type="button" className="button" id="deleteButton">{<DeleteIcon />}<span>Excluir Processo</span></button>
}

function SelectLocation() {
  const [selectedOption, setSelectedOption] = useState("relatoria");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };

  return (
  <div>
    <select className="button" id="select" value={selectedOption} onChange={handleChange}>
      <option value="">Todos</option>
      <option value="sim">Finalizados</option>
      <option value="tramit">Tramitando</option>
      <option value="sobrest">Sobrestado</option>
      <option value="relatoria">Relatoria</option>
    </select>
  </div>
  );
}

function TableFilter() {
  return (
    <div className="filterContainer">
      <SearchProcessButton />
      <AddProcessButton />
      <DeleteProcessButton />
      <SelectLocation />
    </div>
  );
}

export default TableFilter;
