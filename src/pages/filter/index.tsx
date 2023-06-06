import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import "./style.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../assets/api/firebase-config";

function SearchProcessButton() {
  return (
    <button type="button" className="button" id="searchButton">
      {<SearchIcon className="icon" />}
      <span>Pesquisar Processo</span>
    </button>
  );
}

function AddProcessModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [newProcesso, setNewProcesso] = useState(0);
  const [newAno, setNewAno] = useState(0);
  const [newAssunto, setNewAssunto] = useState("");
  const [newData, setNewData] = useState("");
  const [newDataDecisao, setNewDataDecisao] = useState("");
  const [newAssessor, setNewAssessor] = useState(0);
  const [newEntidade, setNewEntidade] = useState("");
  const [newVinculado, setNewVinculado] = useState("");
  const [newConselheiro, setNewConselheiro] = useState("");
  const [newOrgaoJulgador, setNewOrgaoJulgador] = useState("");
  const [newEncaminhamento, setNewEncaminhamento] = useState("");
  const [newDefinicao, setNewDefinicao] = useState("");
  const [newMeta, setNewMeta] = useState("");
  const dadosCollectionRef = collection(db, "dados");

  //turn into async createProcesso

  const createProcesso = async () => {
    await addDoc(dadosCollectionRef, {
      processo: newProcesso,
      ano: newAno,
      assunto: newAssunto,
      data: newData,
      dataDecisao: newDataDecisao,
      assessor: newAssessor,
      entidade: newEntidade,
      vinculado: newVinculado,
      conselheiro: newConselheiro,
      orgaoJulgador: newOrgaoJulgador,
      encaminhamento: newEncaminhamento,
      definicao: newDefinicao,
      meta: newMeta,
    });
  }

  return (
    <>
      {isOpen && (
        <ReactModal
          className="modal"
          isOpen={isOpen}
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
                  onChange={(event) => setNewProcesso(Number(event.target.value))}
                  className="formRow"
                  type="number"
                  id="proc"
                  name="proc"
                  placeholder="Processo..."
                />
                <input 
                  onChange={(event) => setNewAno(Number(event.target.value))}
                  className="formRow" 
                  type="number" 
                  id="ano" 
                  name="ano" 
                  placeholder="Ano..."
                />
                <input
                  onChange={(event) => setNewAssunto(event.target.value)}
                  className="formRow"
                  type="text"
                  id="assunto"
                  name="assunto"
                  placeholder="Assunto..."
                />
                <input 
                  onChange={(event) => setNewData(event.target.value)}
                  className="formRow" 
                  type="date" 
                  id="data" 
                  name="data"
                  placeholder="Data de inserção..." 
                />
                <input
                  onChange={(event) => setNewDataDecisao(event.target.value)}
                  className="formRow"
                  type="date"
                  id="datadecisao"
                  name="datadecisao"
                  placeholder="Data de decisão..."
                />
                <input
                  onChange={(event) => setNewAssessor(Number(event.target.value))}
                  className="formRow"
                  type="number"
                  id="assessor"
                  name="assessor"
                  placeholder="Assessor..."
                />
                <input 
                  onChange={(event) => setNewEntidade(event.target.value)}
                  className="formRow"
                  type="text"
                  id="entidade"
                  name="entidade"
                  placeholder="Entidade..."
                />
                <input
                  onChange={(event) => setNewVinculado(event.target.value)}
                  className="formRow"
                  type="text"
                  id="vinculado"
                  name="vinculado"
                  placeholder="Vinculado..."
                />
                <input
                  onChange={(event) => setNewConselheiro(event.target.value)}
                  className="formRow"
                  type="text"
                  id="conselheiro"
                  name="conselheiro"
                  placeholder="Conselheiro..."
                />
                <input
                  onChange={(event) => setNewOrgaoJulgador(event.target.value)}
                  className="formRow"
                  type="text"
                  id="julgador"
                  name="julgador"
                  placeholder="Órgão Julgador..."
                />
                <input
                  onChange={(event) => setNewEncaminhamento(event.target.value)}
                  className="formRow"
                  type="text"
                  id="encaminhamento"
                  name="encaminhamento"
                  placeholder="Encaminhamento..."
                />
                <input
                  onChange={(event) => setNewDefinicao(event.target.value)}
                  className="formRow"
                  type="text"
                  id="definicao"
                  name="definicao"
                  placeholder="Definição..."
                />
                <input 
                  onChange={(event) => setNewMeta(event.target.value)}
                  className="formRow" 
                  type="text" 
                  id="meta" 
                  name="meta" 
                  placeholder="Meta..."
                />
              </div>
              <div className="column">
                <button className="button" type="button">
                  Próximo
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
            <button className="button" id="addProcessFormButton" type="submit" onClick={createProcesso}>
              Adicionar
            </button>
          </form>
        </ReactModal>
      )}
    </>
  );
}

function AddProcessButton({ openModal }: { openModal: () => void }) {
  return (
    <button
      type="button"
      className="button"
      id="addProcessButton"
      onClick={openModal}
    >
      {<AddIcon className="icon" />}
      <span>Adicionar Processo</span>
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
      <AddProcessModal isOpen={modalOpen} closeModal={closeModal} />
      <SelectLocation onSelectChange={handleSelectChange} />
    </div>
  );
}

export default TableFilter;
