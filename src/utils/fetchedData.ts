import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { userType, procType } from "../App";
import { db } from "../api/firebase-config";

const LOCAL_STORAGE_KEY_USERS = "usersData";
const LOCAL_STORAGE_KEY_PROC = "procData";

export const fetchUserData = async () => {
  try {
    // Verifica se há dados no localStorage
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
    if (localStorageData) {
      const parsedData: Array<userType> = JSON.parse(localStorageData);
      console.log("Users data fetched from localStorage");
      return parsedData;
    } else {

    // Se não houver dados no localStorage, busca no Firestore
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

    // Salva os dados no localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(fetchedData));

    return fetchedData;
  }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProcData = async () => {
  let cont =0;
  try {
    // Verifica se há dados no localStorage
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY_PROC);
    if (localStorageData) {
      const parsedData: Array<procType> = JSON.parse(localStorageData);
      cont = cont + 1;
      console.log(cont);
      return parsedData;
    } else {
    // Se não houver dados no localStorage, busca no Firestore
    const dataCollectionRef = collection(db, "dados");
    const procQuery = query(dataCollectionRef);
    const querySnapshot = await getDocs(procQuery);
    const fetchedData: Array<procType> = [];
    querySnapshot.forEach((doc) => {
      const { id, ...rest } = doc.data() as procType;
      fetchedData.push({ id: doc.id, ...rest });
    });

    // Salva os dados no localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY_PROC, JSON.stringify(fetchedData));

    console.log("Process data fetched from Firestore");
    return fetchedData;
  }
  } catch (error) {
    console.log(error);
  }
};

// Função para monitorar alterações no Firestore e atualizar o localStorage
export const listenForFirestoreChanges = () => {
  const usersRef = collection(db, "colaboradores");
  const dataCollectionRef = collection(db, "dados");

  // Monitorar alterações em "colaboradores"
  onSnapshot(usersRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added" || change.type === "modified" || change.type === "removed") {
        // Buscar e atualizar os dados no localStorage
        fetchUserData().then((userData) => {
          localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(userData));
        });
      }
    });
  });

  // Monitorar alterações em "dados"
  onSnapshot(dataCollectionRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added" || change.type === "modified" || change.type === "removed") {
        // Buscar e atualizar os dados no localStorage
        fetchProcData().then((procData) => {
          localStorage.setItem(LOCAL_STORAGE_KEY_PROC, JSON.stringify(procData));
        });
      }
    });
  });
};
