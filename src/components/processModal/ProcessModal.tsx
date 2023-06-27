import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../api/firebase-config";
import { useState, useEffect } from "react";
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
  const appElement = document.getElementById("root");

  const convertDateIn = (dateString: String | undefined) => {
    //Converte a data para o formato do banco de dados

    if (dateString === undefined) {
      return "";
    }
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}/${month}/${year}`;
  };

  const convertDateOut = (dateString: String | undefined) => {
    //Converte a data para o formato do input do tipo date

    if (dateString === undefined) {
      return "";
    }
    const dateParts = dateString.split("/");
    const year = dateParts[2];
    const month = dateParts[1];
    const day = dateParts[0];
    return `${year}-${month}-${day}`;
  };

  const fullFilledProcessToDb = {
    //Preenche os campos do processo para serem enviados ao banco de dados
    proc: Number(newProcesso),
    ano: Number(newAno),
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
  };

  const handleClearClick = () => {
    //Limpa os campos do formulário
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

  type TipoEditaProcesso = {
    id: string;
  };
  const editProcess = async ({ id }: TipoEditaProcesso) => {
    const processDoc = doc(db, "dados", String(id));
    await updateDoc(processDoc, fullFilledProcessToDb);
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
      setButtonText("Editar");
      setButtonType("editProcessFormButton");
      setNewAno(process.ano);
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
    } else {
      setButtonText("Adicionar");
      setButtonType("addProcessFormButton");
    }
  }, [process, newProcesso]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLocateClick();

    if (buttonText == "Adicionar") {
      if (confirm("Deseja adicionar esses valores ao banco de dados?")) {
        createProcess();
      } else {
        alert("Cancelado!");
        console.log("Cancelado!");
      }
    } else {
      if (confirm("Deseja editar esses valores no banco de dados?")) {
        editProcess({ id: String(process.proc) });
      } else {
        alert("Cancelado!");
        console.log("Cancelado!");
      }
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
          <h2>{buttonText} Processo</h2>
          <button className="closeModalButton" onClick={closeModal}>
            X
          </button>
          <form onSubmit={handleFormSubmit} name="Adicionar processo" className="form">
            <div className="column">
              <div className="row">{/*PROCESSO*/}
                <label className="label" htmlFor="proc">
                  Processo:
                </label>
                <input onChange={(event) => {setNewProcesso(event.target.value);}}
                className="formRow" type="number" placeholder="Processo..." />
              </div>
              <div className="row">{/*ANO*/}
                <label className="label" htmlFor="ano">
                  Ano:
                </label>
                <input onChange={(event) => {setNewAno(event.target.value);}} 
                className="formRow" type="number" placeholder="Ano..." value={newAno}/>
              </div>
              <div className="row">{/*ASSUNTO*/}
                <label className="label" htmlFor="assunto">
                  Assunto:
                </label>
                <input onChange={(event) => {setNewAssunto(event.target.value);}}
                className="formRow" type="text"  placeholder="Assunto..." value={newAssunto}/>
              </div>
              <div className="row">{/*DATA INSERÇÃO*/}
                <label className="label" htmlFor="data">
                  Data de inserção:
                </label>
                <input onChange={(event) => {setNewData(event.target.value);}}
                className="formRow" type="date" placeholder="Data de inserção..." value={newData}/>
              </div>
              <div className="row">{/*DATA DECISÃO*/}
                <label className="label" htmlFor="datadecisao">
                  Data de decisão:
                </label>
                <input onChange={(event) => {setNewDataDecisao(event.target.value);}}
                className="formRow" type="date" placeholder="Data de decisão..." value={newDataDecisao}/>
              </div>
              <div className="row">{/*DIAS*/}
                <label className="label" htmlFor="dias">
                  Dias:
                </label>
                <input onChange={(event) => {setNewDias(event.target.value);}}
                className="formRow" type="number" placeholder="Dias..." value={newDias}/>
              </div>
              <div className="row">{/*ASSESSOR*/}
                <label className="label" htmlFor="assessor">
                  Assessor:
                </label>
                <input onChange={(event) => {setNewAssessor(event.target.value);}}
                className="formRow" type="number" placeholder="Assessor..." value={newAssessor}/>
              </div>
              <div className="row">{/*ENTIDADE*/}
                <label className="label" htmlFor="entidade">
                  Entidade:
                </label>
                <input onChange={(event) => {setNewEntidade(event.target.value);}} 
                className="formRow" type="text" placeholder="Entidade..." value={newEntidade}/>
              </div>
              <div className="row">{/*VINCULADO*/}
                <label className="label" htmlFor="vinculado">
                  Vinculado:
                </label>
                <input onChange={(event) => {setNewVinculado(event.target.value);}} 
                className="formRow" type="text" placeholder="Vinculado..." value={newVinculado}/>
              </div>
              <div className="row">{/*CONSELHEIRO*/}
                <label className="label" htmlFor="conselheiro">
                  Conselheiro:
                </label>
                <input onChange={(event) => {setNewConselheiro(event.target.value);}} 
                className="formRow" type="text" placeholder="Conselheiro.." value={newConselheiro}/>
              </div>
              <div className="row">{/*ÓRGAO JULGADOR*/}
                <label className="label" htmlFor="julgador">
                  Órgão Julgador:
                </label>
                <input onChange={(event) => {setNewOrgaoJulgador(event.target.value);}}
                className="formRow" type="text" placeholder="Órgão Julgador..." value={newOrgaoJulgador}/>
              </div>
              <div className="row">{/*ENCAMINHAMENTO*/}
                <label className="label" htmlFor="encaminhamento">
                  Encaminhamento:
                </label>
                <input onChange={(event) => {setNewEncaminhamento(event.target.value);}} 
                className="formRow" type="text" placeholder="Encaminhamento..." value={newEncaminhamento}/>
              </div>
              <div className="row">{/*DEFINIÇÃO*/}
                <label className="label" htmlFor="definicao">
                  Definição:
                </label>
                <input onChange={(event) => {setNewDefinicao(event.target.value);}} 
                className="formRow" type="text" placeholder="Definição..." value={newDefinicao}/>
              </div>
              <div className="row">{/*META*/}
                <label className="label" htmlFor="meta">
                  Meta:
                </label>
                <input onChange={(event) => {setNewMeta(event.target.value);}} 
                className="formRow" type="text" placeholder="Meta..." value={newMeta}/>
              </div>
              <div className="row">{/*PRIORIDADE*/}
                <label className="label" htmlFor="prioridade">
                  Prioridade:
                </label>
                <input onChange={(event) => {setNewPrioridade(event.target.value);}} 
                className="formRow" type="text" placeholder="Prioridade..." value={newPrioridade}/>
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
        {<AddIcon className="filter-icon" />}
        <span>Adicionar Processo</span>
      </button>
      <AddProcessModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
}

export default AddProcessButton;
