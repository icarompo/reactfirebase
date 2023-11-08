import { collection, query, getDocs  } from "firebase/firestore";
import { userType, procType } from "../App";
import { db } from "../api/firebase-config";

export const fetchUserData = async () => {
  try {
    const usersRef = collection(db, "colaboradores");
    const userQuery = query(usersRef);
    const querySnapshot = await getDocs(userQuery);
    const fetchedData: Array<userType> = [];
    querySnapshot.forEach((doc) => {
      const userData = {
        id: doc.id,
        identificador: doc.data().identificador,
        nome: doc.data().nome,
        email: doc.data().email,
        tipo: doc.data().tipo,
      } as userType;
      fetchedData.push(userData);
    });
    return fetchedData;
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

    console.log("Process data fetched from Firestore");
    return fetchedData;
  } catch (error) {
    console.log(error);
  }
};
