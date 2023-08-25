import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Home from "./pages/home/index";
import Personal from "./pages/pessoal/index";
import Processes from "./pages/processos/index";
import Painel from "./pages/painel/index";
import Check from "./pages/checagem/index";
import Login from "./components/auth/Login";
import userContext from "./context/userContext";
import dataContext from "./context/dataContext";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(undefined);

  type User = {
    identificador: string;
    nome: string;
    email: string;
    tipo: string;
  };

  type dataType = {
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

  const handleLoginSucess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    console.log("is authenticated: ", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser: setUser as Dispatch<SetStateAction<User | null>>,
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
      </Router>
          </dataContext.Provider>                   
    </userContext.Provider>
  );
};
