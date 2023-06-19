import { useState, useEffect } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../../components/header/Header.tsx";
import Card from "../../components/card/index.tsx"
import './styles.css'

import UserContext from "../../context/userContext";
import { useContext } from "react";

function Painel() {
  type TipoDado = {
    id: string;
    proc: number;
    ano: number;
    assunto: string;
    data: Date;
    datadecisao: Date;
    assessor: number;
    entidade: string;
    vinculado: string;
    conselheiro: string;
    orgaoJulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
  };

  const { user } = useContext(UserContext);
  const [dados, setDados] = useState<Array<TipoDado>>([]);

  useEffect(() => {
    async function fetchData() {
      const dadosCollectionRef = collection(db, "dados"); // Referência para a coleção 'dados'
      const dadosQuery = query(
        dadosCollectionRef,
        where("assessor", "==", user?.identificador)
      );
      const dadosSnapshot = await getDocs(dadosQuery); // Busca os dados da coleção 'dados'
      const fetchedData: Array<TipoDado> = []; // Cria um array para armazenar os dados buscados
      dadosSnapshot.forEach((doc) => { // Percorre os documentos retornados
        const { id, ...rest } = doc.data() as TipoDado; // Extrai a propriedade 'id' e o restante das propriedades do documento
        fetchedData.push({ id: doc.id, ...rest }); // Adiciona o documento ao array de dados buscados
      });
      setDados(fetchedData); // Atualiza o estado 'dado' com os dados buscados
    }
    fetchData(); // Chama a função 'fetchData' para buscar os dados usando o hook useEffect
  }, []);
/* 
  console.log(user?.identificador)
  console.log(dados);
*/

const meta = (dados.filter((Processo) => Processo.meta.toLowerCase() === "sim").length);
const anoAtual = (dados.filter((Processo) => Processo.ano === 2023).length);
const prioridade = (dados.filter((Processo) => Processo.prioridade.toLowerCase() === "alta").length);


  return (
    <>
      <div className="personal-container">
        <div className="container-header">
    
        </div>
          <div className="container-body">
            <Card name="Processos" value={dados.length} text="Quantidade de processos pessoais"/>
            <Card name="Meta" value={meta} text="Quantidade de processos pessoais em meta"/>
            <Card name="Prioridade" value={prioridade} text="Quantidade de processos pessoais em prioridade"/>
            <Card name="2023" value={anoAtual} text="Quantidade de processos pessoais do ano atual"/>
          </div>
      </div>
    </>
  );
}

function Personal() {
  return (
    <>
      <Header title="Controle E-Contas" subtitle="Página Pessoal" />
      <Painel />
    </>
  );
}

export default Personal;
