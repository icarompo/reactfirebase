import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase-config";
import { useState, useEffect } from "react";
import { format } from "date-fns";
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

  const [newProcesso, setNewProcesso] = useState("");
  const [newAno, setNewAno] = useState("");
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

    //ADD PROCESS
  const createProcesso = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dadosCollectionRef = collection(db, "dados");

    const formatData = (dateString: string): string => {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy');
    };

    try {
      await addDoc(dadosCollectionRef, {
        proc: Number(newProcesso),
        ano: Number(newAno),
        assunto: newAssunto,
        data: formatData(newData),
        datadecisao: formatData(newDataDecisao),
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
      });
      handleClearClick();
      closeModal();
      console.log("Documento adicionado com sucesso!");
      alert("Documento adicionado com sucesso!");
    } catch (error) {
      console.log("Erro ao adicionar o documento: ", error);
      alert("Erro ao adicionar o documento: ");
    }
  };

    //EDIT PROCESS
  type TipoProcesso = {
    proc: number;
    ano: string;
    assunto: string;
    data: string;
    dataDecisao: string;
    dias: string;
    assessor: string;
    entidade: string;
    vinculado: string;
    conselheiro: string;
    orgaoJulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
  };

  const [process, setProcess] = useState<TipoProcesso>({
    proc: 0,
    ano: "",
    assunto: "",
    data: "",
    dataDecisao: "",
    dias: "",
    assessor: "",
    entidade: "",
    vinculado: "",
    conselheiro: "",
    orgaoJulgador: "",
    encaminhamento: "",
    definicao: "",
    meta: "",
    prioridade: "",

  });

  const getProcess = async () => {
    const processRef = collection(db, "dados");
    const q = query(processRef, where("proc", "==", Number(newProcesso)));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      setProcess({
        proc: 0,
        ano: "",
        assunto: "",
        data: "",
        dataDecisao: "",
        dias: "",
        assessor: "",
        entidade: "",
        vinculado: "",
        conselheiro: "",
        orgaoJulgador: "",
        encaminhamento: "",
        definicao: "",
        meta: "",
        prioridade: "",

      });
    } else {
      querySnapshot.forEach((doc) => {
        setProcess( doc.data() as TipoProcesso );
        
      });
    }
  };

  useEffect(() => {
    if (Number(process.proc) === Number(newProcesso)) {
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
    } else {
      setButtonText("Adicionar");
      setButtonType("addProcessFormButton");
    }
  }, [process, newProcesso]);
  
  const handleLocateClick = () => {
    if (Number(newProcesso) == 0) {
      alert("Digite um número de processo válido!");
    } else {
      getProcess();
    }
  };

  //CLEAR INPUTS
  const handleClearClick = () => {
    setNewProcesso("");
    setNewAno("");
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
                <input onChange={(event) => {setNewProcesso(event.target.value);}}
                className="formRow" type="number" id="proc" name="proc" placeholder="Processo..." />
              </div>
              <div className="row">{/*ANO*/}
                <label className="label" htmlFor="ano">
                  Ano:
                </label>
                <input onChange={(event) => {setNewAno(event.target.value);}} 
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
                <input onChange={(event) => {setNewDias(event.target.value);}}
                className="formRow" type="number" id="dias" name="dias" placeholder="Dias..." value={newDias}/>
              </div>
              <div className="row">{/*ASSESSOR*/}
                <label className="label" htmlFor="assessor">
                  Assessor:
                </label>
                <input onChange={(event) => {setNewAssessor(event.target.value);}}
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
              <button className="button" type="button" onClick={handleClearClick}>
                Limpar
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
