import ReactModal from "react-modal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import "./form/modal.styles.css";
import "./filter.styles.css";

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
                  <input className="input-form" type="text" id="search-input" />
                </div>
                <div className="line"></div>
              </div>
              <div className="order">
                <label className="label" htmlFor="search">
                  Ordem
                </label>
                <div className="input">
                  <select className="input-form" id="order-definition">
                    <option value="relatoria">Relatoria</option>
                    <option value="assessor">Assessor</option>
                    <option value="entidade">Entidade</option>
                    <option value="vinculado">Vinculado</option>
                    <option value="conselheiro">Conselheiro</option>
                  </select>
                  <select className="input-form" id="order-filter">
                    <option value="asc">Crescente</option>
                    <option value="desc">Decrescente</option>
                  </select>
                  <button className="button" id="button" type="button">
                    +
                  </button>
                </div>
                <div className="order-selected"></div>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="search">
                Campos
              </label>
              <div className="checkList">
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true} />
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
                <div>
                  <input type="checkbox" name="relatoria" value="relatoria" checked={true}/>
                  <label htmlFor="relatoria">Relatoria</label>
                </div>
              </div>
              <div className="button-field">
                <button className="button" id="filter-button" type="button">
                  Redefinir
                </button>
                <button className="button" id="filter-button" type="button">
                  Aplicar
                </button>
              </div>
            </div>
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
