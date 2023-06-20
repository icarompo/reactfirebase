import { createContext, Dispatch, SetStateAction } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";

type User = {
  identificador: string;
  nome: string;
  email: string;
  tipo: string;
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;

export const fetchUserData = async (email: string, setUser: (user: User | null) => void) => {
  try {
    const usersRef = collection(db, "colaboradores");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userData = {
        identificador: doc.data().identificador,
        nome: doc.data().nome,
        email: doc.data().email,
        tipo: doc.data().tipo,
      };
      setUser(userData); // Salvar os dados do usuário no estado do contexto
    });
  } catch (error) {
    console.log(error);
  }
};

