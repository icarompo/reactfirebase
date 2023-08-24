import { useEffect, useState, useContext, createContext, Dispatch, SetStateAction } from "react";
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
  data: dataType[];
  loading: boolean;
};

const dataContext = createContext<DataContextType | undefined>(undefined);
const [data, setData] = useState<dataType[]>([]);

export default dataContext;

export const DataProvider = ( children ) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const dadosCollectionRef = collection(db, "dados");
      const dadosQuery = query(dadosCollectionRef);
      const dadosSnapshot = await getDocs(dadosQuery); 
      const fetchedData: Array<dataType> = []; 
      dadosSnapshot.forEach((doc) => {
        const { id, ...rest } = doc.data() as dataType;
        fetchedData.push({ id: doc.id, ...rest });
      });
      setData(fetchedData); 
      setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

return (
  
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};