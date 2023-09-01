import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Home from "./pages/home/index";
import Personal from "./pages/pessoal/index";
import Processes from "./pages/processos/index";
import Painel from "./pages/painel/index";
import Check from "./pages/checagem/index";
import Login from "./components/auth/Login";
import userContext, { fetchUserData } from "./context/userContext";
import dataContext from "./context/dataContext";
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

export type dataType = {
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
  const [data, setData] = useState(undefined);

  const handleLoginSucess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };  

  return (
    <userContext.Provider
      value={{
        user,
        setUser: setUser as Dispatch<SetStateAction<userType | null>>,
        setIsAuthenticated: setIsAuthenticated as Dispatch<
          SetStateAction<boolean>
        >,
      }}
    >
      <dataContext.Provider
        value={{
          data,
          setData: setData as Dispatch<SetStateAction<dataType[] | undefined>>,
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
      </dataContext.Provider>
    </userContext.Provider>
  );
};
function LoginListener(props: { setUser: Dispatch<SetStateAction<userType | null>>; setIsAuthenticated: Dispatch<SetStateAction<boolean>>;}) {
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

