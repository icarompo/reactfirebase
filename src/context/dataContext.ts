import { createContext } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";

type dataType = {
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

type DataContextType = {
  data: dataType[] | undefined;
};

const dataContext = createContext<DataContextType>({
  data: undefined
});

export default dataContext;

export const fetchData = async () => {
  try {
    const dataCollectionRef = collection(db, "dados");
    const dataQuery = query(dataCollectionRef);
    const querySnapshot = await getDocs(dataQuery);
    const fetchedData: Array<dataType> = [];
    querySnapshot.forEach((doc) => {
      const { id, ...rest } = doc.data() as dataType;
      fetchedData.push({ id: doc.id, ...rest });
    });
    return fetchedData;
    console.log("data fetched");
  } catch (error) {
    console.log(error);
  }
};