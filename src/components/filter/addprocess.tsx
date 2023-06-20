import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../api/firebase-config";
import { useState } from "react";
import "./styles.css";

function AddProcessModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [status, setStatus] = useState("Adicionar");
  const [buttonType, setButtonType] = useState("addProcessFormButton");
  const [newProcesso, setNewProcesso] = useState(0);
  const [newAno, setNewAno] = useState(0);
  const [newAssunto, setNewAssunto] = useState("");
  const [newData, setNewData] = useState("");
  const [newDataDecisao, setNewDataDecisao] = useState("");
  const [newDias, setNewDias] = useState(0);
  const [newAssessor, setNewAssessor] = useState(0);
  const [newEntidade, setNewEntidade] = useState("");
  const [newVinculado, setNewVinculado] = useState("");
  const [newConselheiro, setNewConselheiro] = useState("");
  const [newOrgaoJulgador, setNewOrgaoJulgador] = useState("");
  const [newEncaminhamento, setNewEncaminhamento] = useState("");
  const [newDefinicao, setNewDefinicao] = useState("");
  const [newMeta, setNewMeta] = useState("");
  const [newPrioridade, setNewPrioridade] = useState("");
  const [newRelatoria, setNewRelatoria] = useState(0);

  const createProcesso = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dadosCollectionRef = collection(db, "dados");

    try {
      await addDoc(dadosCollectionRef, {
        processo: newProcesso,
        ano: newAno,
        assunto: newAssunto,
        data: newData,
        dataDecisao: newDataDecisao,
        dias: newDias,
        assessor: newAssessor,
        entidade: newEntidade,
        vinculado: newVinculado,
        conselheiro: newConselheiro,
        orgaoJulgador: newOrgaoJulgador,
        encaminhamento: newEncaminhamento,
        definicao: newDefinicao,
        meta: newMeta,
        prioridade: newPrioridade,
        relatoria: newRelatoria,
      });

      setNewProcesso(0);
      setNewAno(0);
      setNewAssunto("");
      setNewData("");
      setNewDataDecisao("");
      setNewDias(0);
      setNewAssessor(0);
      setNewEntidade("");
      setNewVinculado("");
      setNewConselheiro("");
      setNewOrgaoJulgador("");
      setNewEncaminhamento("");
      setNewDefinicao("");
      setNewMeta("");
      setNewPrioridade("");
      setNewRelatoria(0);

      closeModal();
      console.log("Documento adicionado com sucesso!");
    } catch (error) {
      console.log("Erro ao adicionar o documento: ", error);
    }
  };

const handleLocateClick = () => {
  if (newProcesso === 0) {
    alert("Digite um número de processo válido!");
  } else { 
  setStatus("Editar");
  setButtonType("editProcessFormButton");
  }
};

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
          <form
            onSubmit={createProcesso}
            name="Adicionar processo"
            className="form"
          >
            <div className="column">
              <div className="row">{/*PROCESSO*/}
                <label className="label" htmlFor="proc">
                  Processo:
                </label>
                <input
                  onChange={(event) => {
                    setNewProcesso(Number(event.target.value));
                  }}
                  className="formRow"
                  type="number"
                  id="proc"
                  name="proc"
                  placeholder="Processo..."
                />
              </div>
              <div className="row">{/*ANO*/}
                <label className="label" htmlFor="ano">
                  Ano:
                </label>
                <input
                  onChange={(event) => {
                    setNewAno(Number(event.target.value));
                  }}
                  className="formRow"
                  type="number"
                  id="ano"
                  name="ano"
                  placeholder="Ano..."
                />
              </div>
              <div className="row">{/*ASSUNTO*/}
                <label className="label" htmlFor="assunto">
                  Assunto:
                </label>
                <input
                  onChange={(event) => {
                    setNewAssunto(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="assunto"
                  name="assunto"
                  placeholder="Assunto..."
                />
              </div>
              <div className="row">{/*DATA INSERÇÃO*/}
                <label className="label" htmlFor="data">
                  Data de inserção:
                </label>
                <input
                  onChange={(event) => {
                    setNewData(event.target.value);
                  }}
                  className="formRow"
                  type="date"
                  id="data"
                  name="data"
                  placeholder="Data de inserção..."
                />
              </div>
              <div className="row">{/*DATA DECISÃO*/}
                <label className="label" htmlFor="datadecisao">
                  Data de decisão:
                </label>
                <input
                  onChange={(event) => {
                    setNewDataDecisao(event.target.value);
                  }}
                  className="formRow"
                  type="date"
                  id="datadecisao"
                  name="datadecisao"
                  placeholder="Data de decisão..."
                />
              </div>
              <div className="row">{/*DIAS*/}
                <label className="label" htmlFor="dias">
                  Dias:
                </label>
                <input
                  onChange={(event) => {
                    setNewDias(Number(event.target.value));
                  }}
                  className="formRow"
                  type="number"
                  id="dias"
                  name="dias"
                  placeholder="Dias..."
                />
              </div>
              <div className="row">{/*ASSESSOR*/}
                <label className="label" htmlFor="assessor">
                  Assessor:
                </label>
                <input
                  onChange={(event) => {
                    setNewAssessor(Number(event.target.value));
                  }}
                  className="formRow"
                  type="number"
                  id="assessor"
                  name="assessor"
                  placeholder="Assessor..."
                />
              </div>
              <div className="row">{/*ENTIDADE*/}
                <label className="label" htmlFor="entidade">
                  Entidade:
                </label>
                <input
                  onChange={(event) => {
                    setNewEntidade(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="entidade"
                  name="entidade"
                  placeholder="Entidade..."
                />
              </div>
              <div className="row">{/*VINCULADO*/}
                <label className="label" htmlFor="vinculado">
                  Vinculado:
                </label>
                <input
                  onChange={(event) => {
                    setNewVinculado(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="vinculado"
                  name="vinculado"
                  placeholder="Vinculado..."
                />
              </div>
              <div className="row">{/*CONSELHEIRO*/}
                <label className="label" htmlFor="conselheiro">
                  Conselheiro:
                </label>
                <input
                  onChange={(event) => {
                    setNewConselheiro(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="conselheiro"
                  name="conselheiro"
                  placeholder="Conselheiro..."
                />
              </div>
              <div className="row">{/*ÓRGAO JULGADOR*/}
                <label className="label" htmlFor="julgador">
                  Órgão Julgador:
                </label>
                <input
                  onChange={(event) => {
                    setNewOrgaoJulgador(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="julgador"
                  name="julgador"
                  placeholder="Órgão Julgador..."
                />
              </div>
              <div className="row">{/*ENCAMINHAMENTO*/}
                <label className="label" htmlFor="encaminhamento">
                  Encaminhamento:
                </label>
                <input
                  onChange={(event) => {
                    setNewEncaminhamento(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="encaminhamento"
                  name="encaminhamento"
                  placeholder="Encaminhamento..."
                />
              </div>
              <div className="row">{/*DEFINIÇÃO*/}
                <label className="label" htmlFor="definicao">
                  Definição:
                </label>
                <input
                  onChange={(event) => {
                    setNewDefinicao(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="definicao"
                  name="definicao"
                  placeholder="Definição..."
                />
              </div>
              <div className="row">{/*META*/}
                <label className="label" htmlFor="meta">
                  Meta:
                </label>
                <input
                  onChange={(event) => {
                    setNewMeta(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="meta"
                  name="meta"
                  placeholder="Meta..."
                />
              </div>
              <div className="row">{/*PRIORIDADE*/}
                <label className="label" htmlFor="prioridade">
                  Prioridade:
                </label>
                <input
                  onChange={(event) => {
                    setNewPrioridade(event.target.value);
                  }}
                  className="formRow"
                  type="text"
                  id="prioridade"
                  name="prioridade"
                  placeholder="Prioridade..."
                />
              </div>
              <div className="row">{/*RELATORIA*/}
                <label className="label" htmlFor="dias">
                  Relatoria:
                </label>
                <input
                  onChange={(event) => {
                    setNewRelatoria(Number(event.target.value));
                  }}
                  className="formRow"
                  type="number"
                  id="relatoria"
                  name="relatoria"
                  placeholder="Relatoria..."
                />
              </div>
            </div>
            <div className="column">
              <button className="button" type="button">
                Próximo
              </button>
              <button className="button" type="button" onClick={handleLocateClick}>
                Localizar
              </button>
              <button className="button" type="button">
                Verificar
              </button>
              <button className="button" type="button">
                Fechar
              </button>
              <button
                className="button"
                id={buttonType}
                type="submit"
              >
                {status}
              </button>
            </div>
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
      <button
        type="button"
        className="button"
        id="addProcessButton"
        onClick={() => {
          openModal();
          setModalOpen(true);
        }}
      >
        {<AddIcon className="icon" />}
        <span>Adicionar Processo</span>
      </button>
      <AddProcessModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
}

export default AddProcessButton;
