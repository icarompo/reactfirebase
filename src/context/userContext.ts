import { createContext, Dispatch, SetStateAction } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";
import { userType } from "../App";

type UserContextType = {
  user: userType | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const userContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  setIsAuthenticated: () => {},
});

export default userContext;

export const fetchUserData = async (email: string) => {
  try {
    const usersRef = collection(db, "colaboradores");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
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

