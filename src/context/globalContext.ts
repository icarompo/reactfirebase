import { userType, procType } from "../App";
import { Dispatch, SetStateAction, createContext } from "react";

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