import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/01_home/index";
import { db } from "./api/firebase-config";
import Login from "./pages/00_Login/Login";
import Check from "./pages/05_checagem/index";
import Personal from "./pages/02_pessoal/index";
import Dashboard from "./pages/04_painel/index";
import Processes from "./pages/03_processos";
import GlobalContext from "./context/globalContext";
import CustomizedSnackbars from "./components/Snackbar/Snackbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fetchUserData, fetchProcData } from "./utils/fetchedData";

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



const LOCAL_STORAGE_KEY_USERS = "usersData";
const LOCAL_STORAGE_KEY_PROC = "procData";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null as any);
  const [showLoginSuccessAlert, setShowLoginSuccessAlert] = useState(false);
  const [procData, setProcData] = useState(null as any);
  const [usersData, setUsersData] = useState(null as any);

  const handleLoginSucess = async () => {
    setShowLoginSuccessAlert(true);
    setIsAuthenticated(true);
  
    const localStorageUserData = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
    const localStorageProcData = localStorage.getItem(LOCAL_STORAGE_KEY_PROC);
  
    if (localStorageUserData && localStorageProcData) {
      // Usar dados do localStorage
      setUsersData(JSON.parse(localStorageUserData));
      setProcData(JSON.parse(localStorageProcData));
    } else {
      // Buscar dados no Firestore e atualizar o localStorage
      const usersData = await fetchUserData();
      const procData = await fetchProcData();
      setUsersData(usersData);
      setProcData(procData);
    }
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
                  <Layout pageName="Página Inicial" onLogOut={handleLogout}>
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

