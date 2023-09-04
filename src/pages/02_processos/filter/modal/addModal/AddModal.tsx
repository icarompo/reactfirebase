import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import ProcessForm from "../form/Form.tsx";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../api/firebase-config.ts";
import {
  convertDateIn,
  convertDateOut,
} from "../../../../../utils/dateTypeConverter.ts";
import { useState, useEffect } from "react";
import "../form/modal.styles.css";

function AddProcessModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [newProcesso, setNewProcesso] = useState("");
  const [newAssunto, setNewAssunto] = useState("");
  const [newData, setNewData] = useState("");
  const [newDataDecisao, setNewDataDecisao] = useState("");
  const [newDias, setNewDias] = useState("");
  const [newAssessor, setNewAssessor] = useState("");
  const [newEntidade, setNewEntidade] = useState("");
  const [newVinculado, setNewVinculado] = useState("");
  const [newConselheiro, setNewConselheiro] = useState("");
  const [newOrgaoJulgador, setNewOrgaoJulgador] = useState("");
  const [newEncaminhamento, setNewEncaminhamento] = useState("");
  const [newDefinicao, setNewDefinicao] = useState("");
  const [newMeta, setNewMeta] = useState("");
  const [newPrioridade, setNewPrioridade] = useState("");
  const [newJulgador, setNewJulgador] = useState("");
  const appElement = document.getElementById("root");

  const fullFilledProcessToDb = {
    //Preenche os campos do processo para serem enviados ao banco de dados
    proc: Number(newProcesso),
    assunto: newAssunto,
    data: convertDateIn(newData),
    datadecisao: convertDateIn(newDataDecisao),
    dias: Number(newDias),
    assessor: Number(newAssessor),
    entidade: newEntidade,
    vinculado: newVinculado,
    conselheiro: newConselheiro,
    orgaojulgador: newOrgaoJulgador,
    encaminhamento: newEncaminhamento,
    definicao: newDefinicao,
    meta: newMeta,
    prioridade: newPrioridade,
    julgador: newJulgador,
  };

  const handleClearClick = () => {
    //Limpa os campos do formulário
    setNewProcesso("");
    setNewAssunto("");
    setNewData("");
    setNewDataDecisao("");
    setNewDias("");
    setNewAssessor("");
    setNewEntidade("");
    setNewVinculado("");
    setNewConselheiro("");
    setNewOrgaoJulgador("");
    setNewEncaminhamento("");
    setNewDefinicao("");
    setNewMeta("");
    setNewPrioridade("");
    setNewJulgador("");
  };

  const emptyProcessToLocal = {
    //Limpas os campos para o banco de dados localmente
    proc: 0,
    ano: "",
    assunto: "",
    data: "",
    datadecisao: "",
    dias: "",
    assessor: "",
    entidade: "",
    vinculado: "",
    conselheiro: "",
    orgaojulgador: "",
    encaminhamento: "",
    definicao: "",
    meta: "",
    prioridade: "",
    julgador: "",
  };
  const [process, setProcess] = useState<TipoProcesso>(emptyProcessToLocal);

  type TipoProcesso = {
    //Tipagem
    proc: number;
    ano: string;
    assunto: string;
    data: string;
    datadecisao: string;
    dias: string;
    assessor: string;
    entidade: string;
    vinculado: string;
    conselheiro: string;
    orgaojulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
    julgador: string;
  };

  const handleLocateClick = () => {
    if (Number(newProcesso) == 0) {
      alert("Digite um número de processo válido!");
    } else {
      getProcess();
    }
  };

  const createProcess = async () => {
    const dadosCollectionRef = collection(db, "dados");
    const querySnapshot = await getDocs(dadosCollectionRef);
    const existingProcess = querySnapshot.docs.find(doc => doc.data().proc === fullFilledProcessToDb.proc);
  
    if (existingProcess) {
      alert("Esse número de processo ja existe no banco de dados");
      return;
    }
  
    try {
      await addDoc(dadosCollectionRef, fullFilledProcessToDb);
      handleClearClick();
      closeModal();
      console.log("Documento adicionado com sucesso!");
      alert("Documento adicionado com sucesso!");
    } catch (error) {
      console.log("Erro ao adicionar o documento: ", error);
      alert("Erro ao adicionar o documento: ");
    }
  };

  const getProcess = async () => {
    const processRef = collection(db, "dados");
    const q = query(processRef, where("proc", "==", Number(newProcesso)));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setProcess(emptyProcessToLocal);
      alert("Processo não encontrado/Número de processo disponível");
    } else {
      querySnapshot.forEach((doc) => {
        setProcess(doc.data() as TipoProcesso);
      });
    }
  };

  useEffect(() => {
    if (Number(process.proc) === Number(newProcesso)) {
      setNewAssunto(process.assunto);
      setNewData(convertDateOut(process.data));
      setNewDataDecisao(convertDateOut(process.datadecisao));
      setNewDias(process.dias);
      setNewAssessor(process.assessor);
      setNewEntidade(process.entidade);
      setNewVinculado(process.vinculado);
      setNewConselheiro(process.conselheiro);
      setNewOrgaoJulgador(process.orgaojulgador);
      setNewEncaminhamento(process.encaminhamento);
      setNewDefinicao(process.definicao);
      setNewMeta(process.meta);
      setNewPrioridade(process.prioridade);
      setNewJulgador(process.julgador);
    }
  }, [process, newProcesso]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLocateClick();
    if (confirm("Deseja adicionar esses valores ao banco de dados?")) {
      createProcess();
    } else {
      alert("Cancelado!");
      console.log("Cancelado!");
    }
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
          <h2><AddIcon/> Adicionar Processo</h2>
          </div>
          <button className="closeModalButton" onClick={closeModal}>
            X
          </button>
          </div>
          <form
            onSubmit={handleFormSubmit}
            name="Adicionar processo"
            className="form"
          >
            <div className="columns">
            <div className="column1">
              <label className="label" htmlFor="proc">Processo:</label>
              <label className="label" htmlFor="ano">Ano:</label>
              <label className="label" htmlFor="assunto">Assunto:</label>
              <label className="label" htmlFor="data">Data de inserção:</label>
              <label className="label" htmlFor="datadecisao">Data de decisão:</label>
              <label className="label" htmlFor="dias">Dias:</label>
              <label className="label" htmlFor="assessor">Assessor:</label>
              <label className="label" htmlFor="entidade">Entidade:</label>
              <label className="label" htmlFor="vinculado">Vinculado:</label>
              <label className="label" htmlFor="conselheiro">Conselheiro:</label>
              <label className="label" htmlFor="julgador">Órgão Julgador:</label>
              <label className="label" htmlFor="encaminhamento">Encaminhamento:</label>
              <label className="label" htmlFor="julgador">Julgador:</label>
              <label className="label" htmlFor="definicao">Definição:</label>
              <label className="label" htmlFor="meta">Meta:</label>
              <label className="label" htmlFor="prioridade">Prioridade:</label>
            </div>
              <div className="column2">

                <input
                  onChange={(event) => {
                    setNewProcesso(event.target.value);
                  }}
                  className="input-form"
                  type="number"
                  placeholder="Processo..."
                />


              <ProcessForm 
            setNewAssunto={setNewAssunto} setNewData={setNewData} setNewDataDecisao={setNewDataDecisao} setNewDias={setNewDias}
            setNewAssessor={setNewAssessor}setNewEntidade={setNewEntidade}setNewVinculado={setNewVinculado}setNewConselheiro={setNewConselheiro}
            setNewOrgaoJulgador={setNewOrgaoJulgador}setNewEncaminhamento={setNewEncaminhamento}setNewDefinicao={setNewDefinicao}setNewMeta={setNewMeta}
            setNewPrioridade={setNewPrioridade}setNewJulgador={setNewJulgador} /*aguardando*/ newAssunto={newAssunto}newData={newData}newDataDecisao={newDataDecisao}
            newDias={newDias}newAssessor={newAssessor}newEntidade={newEntidade}newVinculado={newVinculado}newConselheiro={newConselheiro}newOrgaoJulgador={newOrgaoJulgador}
            newEncaminhamento={newEncaminhamento}newDefinicao={newDefinicao}newMeta={newMeta}newPrioridade={newPrioridade}newJulgador={newJulgador}/*aguardando*//>
            </div>
            </div>

            <div className="column">
              <button
                className="button"
                type="button"
                onClick={handleLocateClick}
              >
                Localizar
              </button>
              <button
                className="button"
                type="button"
                onClick={handleClearClick}
              >
                Limpar
              </button>
              <button
                className="button"
                id="addProcessFormButton"
                type="submit"
              >
                Adicionar
              </button>
            </div>

          </form>
        </ReactModal>
      )}
    </>
  );
}

function AddProcessButton() {
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
        {<AddIcon/>}
      </button>
      <AddProcessModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
}



export default AddProcessButton;

