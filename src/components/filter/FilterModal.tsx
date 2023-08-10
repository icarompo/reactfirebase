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

  function CheckboxList() {
    const [checkboxes, setCheckboxes] = useState([
      processo: true,
      ano: true,
      assunto: true,
      dias: true,
      dataInsercao: true,
      dataDecisao: true,
      assessor: true,
      entidade: true,
      vinculado: true,
      conselheiro: true,
      orgaoJulgador: true,
      encaminhamento: true,
      definicao: true,
      prioridade: true,
      meta: true,
      aguardando: true,
    ]);
  }

  const toggleCheckbox = (name) => {
    setCheckboxes(prevState => ({
        ...prevState,
        [name]: !prevState[name]
    }));
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
                <div >
                    <input type="checkbox" id="checkBox" name="processo" value="processo" checked={checkbox.} onChange={() => toggleCheckbox('processo')}/>
                    <label htmlFor="processo" >Processo</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="ano" value="ano" checked={checkbox.ano} onChange={() => toggleCheckbox('ano')} />
                    <label htmlFor="ano">Ano</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="assunto" value="assunto" checked={checkbox.assunto} onChange={() => toggleCheckbox('assunto')} />
                    <label htmlFor="assunto">Assunto</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="data" value="data" checked={checkbox.dias} onChange={() => toggleCheckbox('dias')} />
                    <label htmlFor="data">Data</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="data-insercao" value="data-insercao" checked={checkbox.dataInsercao} onChange={() => toggleCheckbox('dataInsercao')} />
                    <label htmlFor="data-insercao">Data de inserção</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="data-decisao" value="data-decisao" checked={checkbox.dataDecisao} onChange={() => toggleCheckbox('dataDecisao')} />
                    <label htmlFor="data-decisao">Data de decisão</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="assessor" value="assessor" checked={checkbox.assessor} onChange={() => toggleCheckbox('assessor')} />
                    <label htmlFor="assessor">Assessor</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="entidade" value="entidade" checked={checkbox.entidade} onChange={() => toggleCheckbox('entidade')} />
                    <label htmlFor="entidade">Entidade</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="vinculado" value="vinculado" checked={checkbox.vinculado} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="vinculado">Vinculado</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="conselheiro" value="conselheiro" checked={checkbox.conselheiro} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="conselheiro">Conselheiro</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="orgaoJulgador" value="orgaoJulgador" checked={checkbox.orgaoJulgador} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="orgaoJulgador">Órgão Julgador</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="encaminhamento" value="encaminhamento" checked={checkbox.encaminhamento} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="encaminhamento">Encaminhamento</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="definicao" value="definicao" checked={checkbox.definicao} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="definicao">Definição</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="prioridade" value="prioridade" checked={checkbox.prioridade} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="prioridade">Prioridade</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="meta" value="meta" checked={checkbox.meta} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="meta">Meta</label>
                </div>
                <div>
                    <input type="checkbox" id="checkBox" name="aguardando" value="aguardando" checked={checkbox.aguardando} onChange={() => toggleCheckbox('processo')} />
                    <label htmlFor="aguardando">Aguardando</label>
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
