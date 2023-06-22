import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../api/firebase-config";
import { useState, useEffect, useRef } from "react";
import "./styles.css";

function AddProcessModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [buttonText, setButtonText] = useState("Adicionar");
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

    const dataTimestamp = Timestamp.fromDate(new Date(newData));
    const dataDecisaoTimestamp = Timestamp.fromDate(new Date(newDataDecisao));

    try {
      await addDoc(dadosCollectionRef, {
        processo: newProcesso,
        ano: newAno,
        assunto: newAssunto,
        data: dataTimestamp,
        dataDecisao: dataDecisaoTimestamp,
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
      alert("Documento adicionado com sucesso!");
    } catch (error) {
      console.log("Erro ao adicionar o documento: ", error);
      alert("Erro ao adicionar o documento: ");
    }
  };

  type TipoProcesso = {
    proc: number;
    ano: number;
    assunto: string;
    data: string;
    dataDecisao: string;
    dias: number;
    assessor: number;
    entidade: string;
    vinculado: string;
    conselheiro: string;
    orgaoJulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
    relatoria: number;
  };

  const [process, setProcess] = useState<TipoProcesso>({
    proc: 0,
    ano: 0,
    assunto: "",
    data: "",
    dataDecisao: "",
    dias: 0,
    assessor: 0,
    entidade: "",
    vinculado: "",
    conselheiro: "",
    orgaoJulgador: "",
    encaminhamento: "",
    definicao: "",
    meta: "",
    prioridade: "",
    relatoria: 0,
  });


  const getProcess = async () => {
    const processRef = collection(db, "dados");
    const q = query(processRef, where("proc", "==", newProcesso));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      setProcess({
        proc: 0,
        ano: 0,
        assunto: "",
        data: "",
        dataDecisao: "",
        dias: 0,
        assessor: 0,
        entidade: "",
        vinculado: "",
        conselheiro: "",
        orgaoJulgador: "",
        encaminhamento: "",
        definicao: "",
        meta: "",
        prioridade: "",
        relatoria: 0,
      });
    } else {
      querySnapshot.forEach((doc) => {
        setProcess( doc.data() as TipoProcesso );
        
      });
    }
  };

  useEffect(() => {
    if (process.proc === newProcesso) {
      setButtonText("Editar");
      setButtonType("editProcessFormButton");
      setNewAno(process.ano);
      setNewAssunto(process.assunto);
      setNewData(process.data);
      setNewDataDecisao(process.dataDecisao);
      setNewDias(process.dias);
      setNewAssessor(process.assessor);
      setNewEntidade(process.entidade);
      setNewVinculado(process.vinculado);
      setNewConselheiro(process.conselheiro);
      setNewOrgaoJulgador(process.orgaoJulgador);
      setNewEncaminhamento(process.encaminhamento);
      setNewDefinicao(process.definicao);
      setNewMeta(process.meta);
      setNewPrioridade(process.prioridade);
      setNewRelatoria(process.relatoria);

    } else {
      setButtonText("Adicionar");
      setButtonType("addProcessFormButton");


    }
  }, [process, newProcesso]);
  
  const handleLocateClick = () => {
    if (newProcesso === 0) {
      alert("Digite um número de processo válido!");
    } else {
      getProcess();
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
          <form onSubmit={createProcesso} name="Adicionar processo" className="form">
            <div className="column">
              <div className="row">{/*PROCESSO*/}
                <label className="label" htmlFor="proc">
                  Processo:
                </label>
                <input onChange={(event) => {setNewProcesso(Number(event.target.value));}}
                className="formRow" type="number" id="proc" name="proc" placeholder="Processo..." />
              </div>
              <div className="row">{/*ANO*/}
                <label className="label" htmlFor="ano">
                  Ano:
                </label>
                <input onChange={(event) => {setNewAno(Number(event.target.value));}} 
                className="formRow" type="number" id="ano" name="ano" placeholder="Ano..." value={newAno}/>
              </div>
              <div className="row">{/*ASSUNTO*/}
                <label className="label" htmlFor="assunto">
                  Assunto:
                </label>
                <input onChange={(event) => {setNewAssunto(event.target.value);}}
                className="formRow" type="text" id="assunto" name="assunto" placeholder="Assunto..." value={newAssunto}/>
              </div>
              <div className="row">{/*DATA INSERÇÃO*/}
                <label className="label" htmlFor="data">
                  Data de inserção:
                </label>
                <input onChange={(event) => {setNewData(event.target.value);}}
                className="formRow" type="date" id="data" name="data" placeholder="Data de inserção..." value={newData}/>
              </div>
              <div className="row">{/*DATA DECISÃO*/}
                <label className="label" htmlFor="datadecisao">
                  Data de decisão:
                </label>
                <input onChange={(event) => {setNewDataDecisao(event.target.value);}}
                className="formRow" type="date" id="datadecisao" name="datadecisao" placeholder="Data de decisão..." value={newDataDecisao}/>
              </div>
              <div className="row">{/*DIAS*/}
                <label className="label" htmlFor="dias">
                  Dias:
                </label>
                <input onChange={(event) => {setNewDias(Number(event.target.value));}}
                className="formRow" type="number" id="dias" name="dias" placeholder="Dias..." value={newDias}/>
              </div>
              <div className="row">{/*ASSESSOR*/}
                <label className="label" htmlFor="assessor">
                  Assessor:
                </label>
                <input onChange={(event) => {setNewAssessor(Number(event.target.value));}}
                className="formRow" type="number" id="assessor" name="assessor" placeholder="Assessor..." value={newAssessor}/>
              </div>
              <div className="row">{/*ENTIDADE*/}
                <label className="label" htmlFor="entidade">
                  Entidade:
                </label>
                <input onChange={(event) => {setNewEntidade(event.target.value);}} 
                className="formRow" type="text" id="entidade" name="entidade" placeholder="Entidade..." value={newEntidade}/>
              </div>
              <div className="row">{/*VINCULADO*/}
                <label className="label" htmlFor="vinculado">
                  Vinculado:
                </label>
                <input onChange={(event) => {setNewVinculado(event.target.value);}} 
                className="formRow" type="text" id="vinculado" name="vinculado" placeholder="Vinculado..." value={newVinculado}/>
              </div>
              <div className="row">{/*CONSELHEIRO*/}
                <label className="label" htmlFor="conselheiro">
                  Conselheiro:
                </label>
                <input onChange={(event) => {setNewConselheiro(event.target.value);}} 
                className="formRow" type="text" id="conselheiro" name="conselheiro" placeholder="Conselheiro.." value={newConselheiro}/>
              </div>
              <div className="row">{/*ÓRGAO JULGADOR*/}
                <label className="label" htmlFor="julgador">
                  Órgão Julgador:
                </label>
                <input onChange={(event) => {setNewOrgaoJulgador(event.target.value);}}
                className="formRow" type="text" id="julgador" name="julgador" placeholder="Órgão Julgador..." value={newOrgaoJulgador}/>
              </div>
              <div className="row">{/*ENCAMINHAMENTO*/}
                <label className="label" htmlFor="encaminhamento">
                  Encaminhamento:
                </label>
                <input onChange={(event) => {setNewEncaminhamento(event.target.value);}} 
                className="formRow" type="text" id="encaminhamento" name="encaminhamento" placeholder="Encaminhamento..." value={newEncaminhamento}/>
              </div>
              <div className="row">{/*DEFINIÇÃO*/}
                <label className="label" htmlFor="definicao">
                  Definição:
                </label>
                <input onChange={(event) => {setNewDefinicao(event.target.value);}} 
                className="formRow" type="text" id="definicao" name="definicao" placeholder="Definição..." value={newDefinicao}/>
              </div>
              <div className="row">{/*META*/}
                <label className="label" htmlFor="meta">
                  Meta:
                </label>
                <input onChange={(event) => {setNewMeta(event.target.value);}} 
                className="formRow" type="text" id="meta" name="meta" placeholder="Meta..." value={newMeta}/>
              </div>
              <div className="row">{/*PRIORIDADE*/}
                <label className="label" htmlFor="prioridade">
                  Prioridade:
                </label>
                <input onChange={(event) => {setNewPrioridade(event.target.value);}} 
                className="formRow" type="text" id="prioridade" name="prioridade" placeholder="Prioridade..." value={newPrioridade}/>
              </div>
              <div className="row">{/*RELATORIA*/}
                <label className="label" htmlFor="dias">
                  Relatoria:
                </label>
                <input onChange={(event) => {setNewRelatoria(Number(event.target.value));}} 
                className="formRow" type="number" id="relatoria" name="relatoria" placeholder="Relatoria..." value={newRelatoria}/>
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
                {buttonText}
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
