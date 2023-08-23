import { createContext } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../api/firebase-config";

type TipoDado = {
    id: string;
    processo: number;
    assunto: string;
    data: Date;
    dataDecisao: Date;
    assessor: number;
    entidade: string;
    vinculado: string;
    dias: number;
    conselheiro: string;
    orgaoJulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
  };

const [dados, setDados] = useState<Array<TipoDado>>([]);

const dataContext = createContext<Array<TipoDado>>(dados);

export default dataContext;

export const fetchData = async () => {
    try {
        const dadosCollectionRef = collection(db, "dados");
      const dadosQuery = query(dadosCollectionRef);
      const dadosSnapshot = await getDocs(dadosQuery); // Busca os dados da coleção 'dados'
      const fetchedData: Array<TipoDado> = []; // Cria um array para armazenar os dados buscados
      dadosSnapshot.forEach((doc) => {
        // Percorre os documentos retornados
        const { id, ...rest } = doc.data() as TipoDado; // Extrai a propriedade 'id' e o restante das propriedades do documento
        fetchedData.push({ id: doc.id, ...rest }); // Adiciona o documento ao array de dados buscados
      });
      setDados(fetchedData); // Atualiza o estado 'dado' com os dados buscados
    } catch (error) {
      console.log(error);
    }
};