import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";
import { userType, procType } from "../App";
import { Dispatch, SetStateAction, createContext } from "react";

export const fetchUserData = async () => {
  try {
    const usersRef = collection(db, "colaboradores");
    const userQuery = query(usersRef);
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      const userData = {
        id: doc.id,
        identificador: doc.data().identificador,
        nome: doc.data().nome,
        email: doc.data().email,
        tipo: doc.data().tipo,
      };
      console.log("user data fetched");
      return userData;
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProcData = async () => {
  try {
    const dataCollectionRef = collection(db, "dados");
    const procQuery = query(dataCollectionRef);
    const querySnapshot = await getDocs(procQuery);
    const fetchedData: Array<procType> = [];
    querySnapshot.forEach((doc) => {
      const { id, ...rest } = doc.data() as procType;
      fetchedData.push({ id: doc.id, ...rest });
    });
    console.log("process data fetched");
    return fetchedData;
  } catch (error) {
    console.log(error);
  }
};

type DataContextType = {
  user: userType | null;
  procData: procType[] | null;
  usersData: userType[] | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const GlobalContext = createContext<DataContextType>({
  user: null,
  procData: null,
  usersData: null,
  setUser: null as any,
  setIsAuthenticated: null as any,
});

export default GlobalContext;