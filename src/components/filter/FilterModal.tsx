import ReactModal from "react-modal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import "./form/modal.styles.css";

function FilterProcessModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const appElement = document.getElementById("root");
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
                <label htmlFor="search">Pesquisar</label>
                <select className="select-field" id="search-field">
                  <option value="relatoria">Relatoria</option>
                  <option value="assessor">Assessor</option>
                  <option value="entidade">Entidade</option>
                  <option value="vinculado">Vinculado</option>
                  <option value="conselheiro">Conselheiro</option>
                </select>
                <input type="text" id="search" />
              </div>
              <div className="order"></div>
            </div>
            <div className="field"></div>
          </div>
        </ReactModal>
      )}
    </>
  );
}

function FilterProcessButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
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
      <FilterProcessModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
}

export default FilterProcessButton;
