import { useState, useEffect} from "react";
import './App.css'
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';

function App() {
  const [newProc, setNewProc] = useState(0);
  const [newAssunto, setNewAssunto] = useState("");
  const [newAno, setNewAno] = useState(0);
  const [newAssessor, setNewAssessor] = useState(0);
  const [dados, setDados] = useState([]);
  const dadosCollectionRef = collection(db, "dados");

  const createDados = async () => {
    await addDoc(dadosCollectionRef, {proc: newProc, assunto: newAssunto, ano: newAno, assessor: Number(newAssessor)})
    getDados();
  };

  const nextAssessor = async (id, assessor) => {
    const dadoDoc = doc(db, "dados", id);
    const newFields = {assessor: assessor + 1};
    await updateDoc(dadoDoc, newFields);
    getDados();
  };

  const prevAssessor = async (id, assessor) => {
    const dadoDoc = doc(db, "dados", id);
    const newFields = {assessor: assessor - 1};
    await updateDoc(dadoDoc, newFields);
    getDados();
  };

  const deleteProc = async (id) => {
    const dadoDoc = doc(db, "dados", id);
    await deleteDoc(dadoDoc);
    getDados();
  };

	const getDados = async () => {
		const data = await getDocs(dadosCollectionRef);
		// console.log(data);

		let DataBase = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

		DataBase.sort((a, b) => a.ano - b.ano)
		setDados(DataBase);
	};

  useEffect(() => {
    (async () => {
			await getDados()
		})()
  }, [])
  return (
    <>
      <div className='App'>

        <input placeholder="Número do processo..." onChange={(event) => {setNewProc(Number(event.target.value))}}></input>
        <input placeholder="Assunto..." onChange={(event) => {setNewAssunto(event.target.value)}}></input>
        <input placeholder="Ano..." onChange={(event) => {setNewAno(Number(event.target.value))}}></input>
        <input placeholder="Assessor..." onChange={(event) => {setNewAssessor(Number(event.target.value))}}></input>
        <button onClick={createDados}>Criar Usuario</button>

        <section className="datatable">
          <div className="items">
            <div className="col">Proc:</div>
            <div className="col">Assunto:</div>
            <div className="col">Ano:</div>
            <div className="col">Assessor:</div>
            <div className="col">Botoes: </div>
          </div>
          {dados.map((dado, index) => {
            return( 
            // eslint-disable-next-line react/jsx-key
            <div key={index} className="items">
              <div className="col">{dado.proc}</div>
              <div className="col">{dado.assunto}</div>
              <div className="col">{dado.ano}</div>
              <div className="col">{dado.assessor}</div>

              <div className="col">
                <button onClick={() => prevAssessor(dado.id, dado.assessor)}>-</button>
                <button onClick={() => nextAssessor(dado.id, dado.assessor)}>+</button>
                <button onClick={() => deleteProc(dado.id)}>Deletar Processo</button>
              </div>
            </div>

            );
            })}
        </section>
      </div> {/*App*/}
    </>
  )
}

export default App

