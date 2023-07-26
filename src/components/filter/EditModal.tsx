import ReactModal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import ProcessForm from "./form/Form.tsx";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../api/firebase-config";
import { useState, useEffect } from "react";
import {
  convertDateIn,
  convertDateOut,
} from "../../utils/dateTypeConverter.ts";
import "./form/modal.styles.css";

function EditProcessModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
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
  const processRef = collection(db, "dados");


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

  interface FieldData {
    field: string;
    value: string;
  }
  
  const fieldsToCheck: FieldData[] = [
    { field: "ano", value: newAno },
    { field: "assunto", value: newAssunto },
    { field: "data", value: newData },
    { field: "datadecisao", value: newDataDecisao },
    { field: "dias", value: newDias },
    { field: "assessor", value: newAssessor },
    { field: "entidade", value: newEntidade },
    { field: "vinculado", value: newVinculado },
    { field: "conselheiro", value: newConselheiro },
    { field: "orgaojulgador", value: newOrgaoJulgador },
    { field: "encaminhamento", value: newEncaminhamento },
    { field: "definicao", value: newDefinicao },
    { field: "meta", value: newMeta },
    { field: "prioridade", value: newPrioridade },
  ];

  const [procList, setProcList] = useState<Array<{ id: string, proc: number }>>([]);

  const getProcess = async () => {
    const q = query(processRef, where("proc", "==", Number(newProcesso)));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Processo não encontrado");
    } else {
      const newProcList = [] as Array<{ id: string; proc: number }>;
      querySnapshot.forEach((doc) => {
        newProcList.push({ id: doc.id, proc: doc.data().proc });
      });
      setProcList([...procList, ...newProcList]);
    }
  };

  const editProcess = async () => {
    const filteredFields = fieldsToCheck.filter((item) => {
      return item.value; // Verifica se o valor é "truthy"
    });
  
    const updatedFields = filteredFields.reduce((acc, item) => {
      return { ...acc, [item.field]: item.value };
    }, {});
  
    console.log(updatedFields);
    
    procList.forEach(async (item) => {
      const docRef = doc(db, "dados", item.id);
      await updateDoc(docRef, updatedFields);
    });

    console.log(`Processos ${procList.forEach((item) => {console.log(item.proc.toString())})} editado com sucesso!`)
  
    handleClearClick();
  };

  const procDiv: HTMLElement | null = document.getElementById("proc-list");
  
  useEffect(() => {
    if (procDiv) {
      procDiv.innerHTML = "";
      procList.forEach((item) => {
        const div = document.createElement("div");
        div.className = "proc-item";
        div.innerHTML = item.proc.toString();
  
        const button = document.createElement("button");
        button.innerHTML = "X";
        button.className = "remove-button";
        button.addEventListener("click", () => removeProcess(item.id));
        div.appendChild(button);
  
        procDiv.appendChild(div);
      });
    }
    console.log(procList);
  }, [procList]);
  
  const removeProcess = (id: String) => {
    setProcList(procList.filter((item) => item.id !== id));
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (procList.length === 0) {
      alert("Adicione um processo!");
    } else {
      if (
        newAno === "" &&
        newAssunto === "" &&
        newData === "" &&
        newDataDecisao === "" &&
        newDias === "" &&
        newAssessor === "" &&
        newEntidade === "" &&
        newVinculado === "" &&
        newConselheiro === "" &&
        newOrgaoJulgador === "" &&
        newEncaminhamento === "" &&
        newDefinicao === "" &&
        newMeta === "" &&
        newPrioridade === ""
      ) {
        alert("Nenhum campo foi preenchido para editar");
      } else {
        if (confirm("Deseja alterar esses valores no banco de dados?")) {
          editProcess();
        } else {
          alert("Cancelado!");
          console.log("Cancelado!");
        }
      }
    }
  };

  const handleAddClick = () => {
    if (Number(newProcesso) == 0) {
      alert("Digite um número de processo válido!");
    } else {
      if (procList.find((item) => item.proc == Number(newProcesso))) {
        alert("Processo já adicionado!");
      } else {
      getProcess();
      }
    }
  };
  
  const handleRemoveAllClick = () => {
    setProcList([]);
  }

  return (
    <>
      {isOpen && (
        <ReactModal
          className="modal"
          isOpen={isOpen}
          onRequestClose={closeModal}
          appElement={appElement as HTMLElement}
        >
          <h2>Editar Processo</h2>
          <button className="closeModalButton" onClick={closeModal}>
            X
          </button>
          <div id="proc-list"></div>
          <button type="button" id="remove-all-button" onClick={handleRemoveAllClick}>Remover todos</button>
          <form
            onSubmit={handleFormSubmit}
            name="Adicionar processo"
            className="form"
          >
            <div className="column">
              <div className="row">
                {/*PROCESSO*/}
                <label className="label" htmlFor="proc">
                  Processo:
                </label>
                <input
                  onChange={(event) => {
                    setNewProcesso(event.target.value);
                  }}
                  type="number"
                  className="formRowProc"
                  placeholder="Processo..."
                />
                <button className="addbutton" type="button" name="addNumber" onClick={handleAddClick}>+</button>
              </div>

              <ProcessForm setNewAno={setNewAno} setNewAssunto={setNewAssunto} setNewData={setNewData} setNewDataDecisao={setNewDataDecisao} setNewDias={setNewDias}
            setNewAssessor={setNewAssessor}setNewEntidade={setNewEntidade}setNewVinculado={setNewVinculado}setNewConselheiro={setNewConselheiro}
            setNewOrgaoJulgador={setNewOrgaoJulgador}setNewEncaminhamento={setNewEncaminhamento}setNewDefinicao={setNewDefinicao}setNewMeta={setNewMeta}
            setNewPrioridade={setNewPrioridade}newAno={newAno}newAssunto={newAssunto}newData={newData}newDataDecisao={newDataDecisao}newDias={newDias}
            newAssessor={newAssessor}newEntidade={newEntidade}newVinculado={newVinculado}newConselheiro={newConselheiro}newOrgaoJulgador={newOrgaoJulgador}
            newEncaminhamento={newEncaminhamento}newDefinicao={newDefinicao}newMeta={newMeta}newPrioridade={newPrioridade}/>
            
            </div>
            <div className="column">
              <button
                className="button"
                type="button"
                onClick={handleClearClick}
              >
                Limpar
              </button>
              <button
                className="button"
                id="editProcessFormButton"
                type="submit"
              >
                Editar
              </button>
            </div>
          </form>
        </ReactModal>
      )}
    </>
  );
}

function EditProcessButton() {
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
        {<EditIcon />}
      </button>
      <EditProcessModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
}

export default EditProcessButton;
