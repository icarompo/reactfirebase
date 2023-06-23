import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Home from "./pages/home/index";
import Personal from "./pages/pessoal/index";
import Painel from "./pages/painel/index";
import Processes from "./pages/processos/index";
import Check from "./pages/checagem/index";
import Login from "./components/auth/Login";
import UserContext from "./context/userContext";



export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  type User = {
    identificador: string;
    nome: string;
    email: string;
    tipo: string;
  };

  const handleLoginSucess = () => {
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  useEffect(() => {
    console.log('is authenticated: ', isAuthenticated);
  }, [isAuthenticated])

  return (
    <UserContext.Provider value={{
      user,//fix the issue on setUser below using type "User"
      setUser: setUser as Dispatch<SetStateAction<User | null>>,
      setIsAuthenticated: setIsAuthenticated as Dispatch<SetStateAction<boolean>>,
     }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogIn={handleLoginSucess} />} />
          <Route path="/" element={isAuthenticated ? <Home onLogOut={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/pessoal" element={isAuthenticated ? <Personal onLogOut={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/painel" element={isAuthenticated ? <Painel onLogOut={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/processos" element={isAuthenticated ? <Processes onLogOut={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/checagem" element={isAuthenticated ? <Check onLogOut={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
