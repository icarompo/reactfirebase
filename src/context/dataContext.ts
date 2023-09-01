import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";
import { userType, procType } from "../App";

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
    return fetchedData;
    console.log("data fetched");
  } catch (error) {
    console.log(error);
  }
};
