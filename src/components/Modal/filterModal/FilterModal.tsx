import ReactModal from "react-modal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import "../form/modal.styles.css";
import "./filter.styles.css";

function FilterProcessModal({
  isOpen,
  closeModal,
  onFilterChange,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onFilterChange: (value: Array<string>) => void;
}) {
  const appElement = document.getElementById("root");
  const [newSearch, setNewSearch] = useState("");
  const [newOrder, setNewOrder] = useState("");
  const [newDate0, setNewDate0] = useState("");
  const [newDate1, setNewDate1] = useState("");
  const [newDays, setNewDays] = useState("");

  const searchSelect = document.getElementById("search-select") as HTMLSelectElement;
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const orderDefinition = document.getElementById("order-definition") as HTMLSelectElement;
  const orderFilter = document.getElementById("order-filter") as HTMLSelectElement;
  const dateInputStart = document.getElementById("date-input-start") as HTMLInputElement;
  const dateInputEnd = document.getElementById("date-input-end") as HTMLInputElement;
  const daysInputStart = document.getElementById("days-input-start") as HTMLInputElement;

  interface Checkbox {
    name: string;
    checked: boolean;
  }

  const [checkboxes, setCheckboxes] = useState<Checkbox[]>([
    { name: "processo", checked: true },
    { name: "ano", checked: true },
    { name: "assunto", checked: true },
    { name: "dias", checked: true },
    { name: "dataInsercao", checked: true },
    { name: "dataDecisao", checked: true },
    { name: "assessor", checked: true },
    { name: "entidade", checked: true },
    { name: "vinculado", checked: true },
    { name: "conselheiro", checked: true },
    { name: "orgaoJulgador", checked: true },
    { name: "encaminhamento", checked: true },
    { name: "definicao", checked: true },
    { name: "prioridade", checked: true },
    { name: "meta", checked: true },
    { name: "aguardando", checked: true },
  ]);

  const toggleCheckbox = (name: String) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.name === name
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleClick = () => {
    const campoPesquisa = pesquisaEm.value;
    const pesquisaValor = pesquisa.value;
  };

  const handleClearClick = () => {
    setNewSearch("");
    setNewOrder("");
    setNewDate0("");
    setNewDate1("");
    setNewDays("");
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({ ...checkbox, checked: true }))
    );
  };

  return (
    <>
      {isOpen && (
        <ReactModal
          className="modal"
          isOpen={isOpen}
          onRequestClose={closeModal}
          appElement={appElement as HTMLElement}
        >
          <div className="modal-header">
            <div className="modal-title">
              <h2>
                <FilterAltIcon /> Filtrar Processos
              </h2>
            </div>
          </div>
          <button className="closeModalButton" onClick={closeModal}>
            X
          </button>
          <div className="modal-body">
            <div className="input-section">
              <div className="search">
                <label className="label" htmlFor="search">
                  Pesquisar
                </label>
                <div className="input">
                  <select className="input-form" id="search-select">
                    <option value="relatoria">Relatoria</option>
                    <option value="assessor">Assessor</option>
                    <option value="entidade">Entidade</option>
                    <option value="vinculado">Vinculado</option>
                    <option value="conselheiro">Conselheiro</option>
                  </select>
                  <input
                    className="input-form"
                    type="text"
                    id="search-input"
                    value={newSearch}
                    onChange={(event) => {
                      setNewSearch(event.target.value);
                    }}
                  />
                </div>
                <div className="line"></div>
              </div>
              <div className="bellow-div">
                <div className="order">
                  <label className="label" htmlFor="search">
                    Ordem
                  </label>
                  <div className="input">
                    <select className="input-form" id="order-definition">
                      <option value="ano">Ano</option>
                      <option value="proc">Processo</option>
                      <option value="assunto">assunto</option>
                      <option value="assessor">Assessor</option>
                      <option value="entidade">Entidade</option>
                      <option value="conselheiro">Conselheiro</option>
                      <option value="conselheiro">Conselheiro</option>
                    </select>
                    <select className="input-form" id="order-filter" value={newOrder} onChange={(event) => {
                      setNewOrder(event.target.value);
                    }}>
                      <option value=""></option>
                      <option value="asc">Crescente</option>
                      <option value="desc">Decrescente</option>
                    </select>
                  </div>
                  <label className="label" htmlFor="search">
                    Intervalo
                  </label>
                  <div className="input">
                    <input
                      className="input-form"
                      type="date"
                      id="date-input-start"
                      value={newDate0}
                      onChange={(event) => {
                        setNewDate0(event.target.value);
                      }}
                    />
                    <input
                      className="input-form"
                      type="date"
                      id="date-input-end"
                      value={newDate1}
                      onChange={(event) => {
                        setNewDate1(event.target.value);
                      }}
                    />
                  </div>
                  <label className="label" htmlFor="search">
                    Dias
                  </label>
                  <div className="input">
                    <input
                      className="input-form"
                      type="number"
                      id="days-input-start"
                      value={newDays}
                      onChange={(event) => {
                        setNewDays(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="section">
                  <label className="label" htmlFor="search">
                    Campos
                  </label>
                  <div className="checkList">
                    {checkboxes.map((checkbox) => (
                      <div key={checkbox.name}>
                        <input
                          type="checkbox"
                          id={checkbox.name}
                          name={checkbox.name}
                          checked={checkbox.checked}
                          onChange={() => toggleCheckbox(checkbox.name)}
                        />
                        <label htmlFor={checkbox.name}> {checkbox.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <button
                className="button"
                id="filter-button-reset"
                type="button"
                onClick={handleClearClick}
              >
                Limpar
              </button>
              <button
                className="button"
                id="filter-button-apply"
                type="button"
                onClick={handleClick}
              >
                Filtrar
              </button>
            </div>
          </div>
        </ReactModal>
      )}
    </>
  );
}

type FilterProcessButtonProps = {
  onFilterChange: (value: Array<string>) => void;
};

function FilterProcessButton(props: FilterProcessButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFilterChange = (value: Array<string>) => {
    props.onFilterChange(value);
  };

  return (
    <>
      <button
        type="button"
        className="filter-button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        {<FilterAltIcon />}
      </button>
      <FilterProcessModal isOpen={modalOpen} closeModal={closeModal} onFilterChange={handleFilterChange}/>
    </>
  );
}

export default FilterProcessButton;
