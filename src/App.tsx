import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, SetStateAction, Dispatch, createContext } from "react";
import Home from "./pages/home/index";
import Personal from "./pages/pessoal/index";
import Processes from "./pages/processos/index";
import Painel from "./pages/painel/index";
import Check from "./pages/checagem/index";
import Login from "./components/auth/Login";
import { fetchUserData, fetchProcData } from "./context/dataContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./api/firebase-config";

export type userType = {
  id: string;
  identificador: string;
  nome: string;
  email: string;
  tipo: string;
};

export type procType = {
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

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null as any);

  const [procData, setProcData] = useState(null as any);
  const [usersData, setUsersData] = useState(null as any);

  const handleLoginSucess = async () => {
    setIsAuthenticated(true);
    const usersData = await fetchUserData();
    const procData = await fetchProcData();
    setUsersData(usersData);
    setProcData(procData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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
    setUser: setUser,
    setIsAuthenticated: setIsAuthenticated,
  });

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        procData: procData,
        usersData: usersData,
        setUser: setUser as Dispatch<SetStateAction<userType | null>>,
        setIsAuthenticated: setIsAuthenticated as Dispatch<
          SetStateAction<boolean>
        >,
      }}
    >
        <Router>
          <Routes>
            <Route
              path="/login"
              element={<Login onLogIn={handleLoginSucess} />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home onLogOut={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/pessoal"
              element={
                isAuthenticated ? (
                  <Personal onLogOut={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/painel"
              element={
                isAuthenticated ? (
                  <Painel onLogOut={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/processos"
              element={
                isAuthenticated ? (
                  <Processes onLogOut={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/checagem"
              element={
                isAuthenticated ? (
                  <Check onLogOut={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <LoginListener setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>
        </Router>
    </GlobalContext.Provider>
  );
};
function LoginListener(props: { 
  setUser: Dispatch<SetStateAction<userType | null>>; 
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}) 
  {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user?.email;
        if (email == null) return;
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
          props.setUser(userData); // Salvar os dados do usuário no estado do contexto
          props.setIsAuthenticated && props.setIsAuthenticated(true);
        });
        navigate("/");
        console.log(user);
      } else {
        props.setUser(null);
        props.setIsAuthenticated && props.setIsAuthenticated(false);
        navigate("/login");
        console.log(user);
      }
    });
    return unsubscribe;
  }, []);
  return <div></div>;
}

