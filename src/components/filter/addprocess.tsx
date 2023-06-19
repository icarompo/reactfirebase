import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../api/firebase-config";
import { useState } from "react";

function AddProcessModal({isOpen, closeModal,}: {isOpen: boolean; closeModal: () => void; }) {
    
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
  const [newPrioridade, setNewPrioridade] = useState("");
  const dadosCollectionRef = collection(db, "dados");

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
      prioridade: newPrioridade,
    });
  };

  return (
    <>
      {isOpen && (
        <ReactModal className="modal" isOpen={isOpen} onRequestClose={closeModal}>
          <h2>Adicionar Processo</h2>
          <button className="closeModalButton" onClick={closeModal}>X</button>
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
                <label htmlFor="prioridade">Prioridade:</label>
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
                  onChange={(event) =>
                    setNewAssessor(Number(event.target.value))
                  }
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
                <input
                  onChange={(event) => setNewPrioridade(event.target.value)}
                  className="formRow"
                  type="text"
                  id="prioridade"
                  name="prioridade"
                  placeholder="Prioridade..."
                />
              </div>
              <div className="column">
                <button className="button" type="button">Próximo</button>
                <button className="button" type="button">Localizar</button>
                <button className="button" type="button">Verificar</button>
                <button className="button" type="button">Fechar</button>
              </div>
            </div>
            <button
              className="button"
              id="addProcessFormButton"
              type="submit"
              onClick={createProcesso}
            >
              Adicionar
            </button>
          </form>
        </ReactModal>
      )}
    </>
  );
}

function AddProcessButton({ openModal }: { openModal: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button type="button" className="button" id="addProcessButton" onClick={() => {openModal(); setModalOpen(true);}}>
        {<AddIcon className="icon" />}
        <span>Adicionar Processo</span>
      </button>
      <AddProcessModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
}

export default AddProcessButton;
