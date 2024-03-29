import ReactModal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import ProcessForm from "../Form.tsx";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../../../api/firebase-config.ts";
import { useState, useEffect } from "react";
import "../form/modal.styles.css";

function EditProcessModal({
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
  const processRef = collection(db, "dados");


  const handleClearClick = () => {

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

  interface FieldData {
    field: string;
    value: any;
  }
  
  const fieldsToCheck: FieldData[] = [
    { field: "assunto", value: newAssunto },
    { field: "data", value: newData },
    { field: "datadecisao", value: newDataDecisao },
    { field: "dias", value: Number(newDias) },
    { field: "assessor", value: Number(newAssessor) },
    { field: "entidade", value: newEntidade },
    { field: "vinculado", value: newVinculado },
    { field: "conselheiro", value: newConselheiro },
    { field: "orgaojulgador", value: newOrgaoJulgador },
    { field: "encaminhamento", value: newEncaminhamento },
    { field: "definicao", value: newDefinicao },
    { field: "meta", value: newMeta },
    { field: "prioridade", value: newPrioridade },
    { field: "julgador", value: newJulgador },
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
        newPrioridade === "" &&
        newJulgador === ""
      ) {
        alert("Nenhum campo foi preenchido para editar");
      } else {
        if (confirm("Deseja alterar esses valores no banco de dados?")) {
          editProcess();
          alert("Processo(s) editado com sucesso!");
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
          <div className="modal-header">
            <div className="modal-title">
            <h2><EditIcon /> Editar Processo</h2>
            </div>
            <button className="closeModalButton" onClick={closeModal}>
              X
            </button>
          </div>
          <div id="proc-list"></div>
          <button
            type="button"
            id="remove-all-button"
            onClick={handleRemoveAllClick}
          >
            Remover todos
          </button>
          <form
            onSubmit={handleFormSubmit}
            name="Adicionar processo"
            className="form"
          >
            <div className="columns">
            <div className="column1">
              <label className="label" htmlFor="proc">Processo:</label>
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
                <div className="row">
                <input
                  onChange={(event) => {
                    setNewProcesso(event.target.value);
                  }}
                  type="number"
                  className="input-form"
                  placeholder="Processo..."
                />
                <button
                  className="addbutton"
                  type="button"
                  name="addNumber"
                  onClick={handleAddClick}
                >
                  +
                </button>
                </div>
              <ProcessForm
                setNewAssunto={setNewAssunto}
                setNewData={setNewData}
                setNewDataDecisao={setNewDataDecisao}
                setNewDias={setNewDias}
                setNewAssessor={setNewAssessor}
                setNewEntidade={setNewEntidade}
                setNewVinculado={setNewVinculado}
                setNewConselheiro={setNewConselheiro}
                setNewOrgaoJulgador={setNewOrgaoJulgador}
                setNewEncaminhamento={setNewEncaminhamento}
                setNewDefinicao={setNewDefinicao}
                setNewMeta={setNewMeta}
                setNewPrioridade={setNewPrioridade}
                setNewJulgador={setNewJulgador}
                newAssunto={newAssunto}
                newData={newData}
                newDataDecisao={newDataDecisao}
                newDias={newDias}
                newAssessor={newAssessor}
                newEntidade={newEntidade}
                newVinculado={newVinculado}
                newConselheiro={newConselheiro}
                newOrgaoJulgador={newOrgaoJulgador}
                newEncaminhamento={newEncaminhamento}
                newDefinicao={newDefinicao}
                newMeta={newMeta}
                newPrioridade={newPrioridade}
                newJulgador={newJulgador}
              />
            </div>
            </div>
            <div className="modal_buttons">
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
