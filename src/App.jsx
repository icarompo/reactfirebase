import { useState, useEffect } from "react";
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
  };

  const nextAssessor = async (id, assessor) => {
    const dadoDoc = doc(db, "dados", id);
    const newFields = {assessor: assessor + 1};
    await updateDoc(dadoDoc, newFields);
  };

  const prevAssessor = async (id, assessor) => {
    const dadoDoc = doc(db, "dados", id);
    const newFields = {assessor: assessor - 1};
    await updateDoc(dadoDoc, newFields);
  };

  const deleteProc = async (id) => {
    const dadoDoc = doc(db, "dados", id);
    await deleteDoc(dadoDoc);
  };

	const getDados = async () => {
		const data = await getDocs(dadosCollectionRef);
		// console.log(data);

		let newData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

		newData.sort((a, b) => a.ano - b.ano)
		setDados(newData);
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

        {dados.map((dado, index) => {
          return( 
          // eslint-disable-next-line react/jsx-key
          <div key={index} id="data" className="data">
						<p>Proc: {dado.proc} | Assunto: {dado.assunto}</p>
						<p>| Ano: {dado.ano} | Assessor: {dado.assessor}</p>
						<div className="data_buttons">
							<button onClick={() => prevAssessor(dado.id, dado.assessor)}>-</button>
							<button onClick={() => nextAssessor(dado.id, dado.assessor)}>+</button>
							<button onClick={() => deleteProc(dado.id)}>Deletar Processo</button>
						</div>
          </div>
          );
          })}
      </div>
    </>
  )
}

export default App

