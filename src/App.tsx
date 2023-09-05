import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Home from "./pages/00_home/index";
import Personal from "./pages/01_pessoal/index";
import Processes from "./pages/02_processos/index";
import Dashboard from "./pages/03_painel/index";
import Check from "./pages/04_checagem/index";
import Login from "./components/auth/Login";
import GlobalContext from "./context/globalContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./api/firebase-config";
import { fetchUserData, fetchProcData } from "./utils/fetchedData";
import CustomizedSnackbars from "./components/snackbar";
import Layout from "./components/layout";

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
  const [showLoginSuccessAlert, setShowLoginSuccessAlert] = useState(false);
  const [procData, setProcData] = useState(null as any);
  const [usersData, setUsersData] = useState(null as any);

  const handleLoginSucess = async () => {
    setShowLoginSuccessAlert(true);
    setIsAuthenticated(true);
    const usersData = await fetchUserData();
    const procData = await fetchProcData();
    setUsersData(usersData);
    setProcData(procData);
    console.log('login success')
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };  

  return (
    <>
     {showLoginSuccessAlert && (
      <CustomizedSnackbars severity="success" message="Login bem-sucedido!" />
    )}
    <GlobalContext.Provider
      value={{
        user: user,
        procData: procData,
        usersData: usersData,
        setUser: setUser as Dispatch<SetStateAction<userType | null>>,
        setIsAuthenticated: setIsAuthenticated as Dispatch<SetStateAction<boolean>>,
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
                  <Layout pageName="Home" onLogOut={handleLogout}>
                  <Home />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/pessoal"
              element={
                isAuthenticated ? (
                  <Layout pageName="Pessoal" onLogOut={handleLogout}>
                  <Personal />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/painel"
              element={
                isAuthenticated ? (
                  <Layout pageName="Painel" onLogOut={handleLogout}>
                  <Dashboard />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/processos"
              element={
                isAuthenticated ? (
                  <Layout pageName="Processos" onLogOut={handleLogout}>
                  <Processes />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/checagem"
              element={
                isAuthenticated ? (
                  <Layout pageName="Checagem" onLogOut={handleLogout}>
                  <Check />
                  </Layout>
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
    </>
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
          props.setUser(userData); 
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

