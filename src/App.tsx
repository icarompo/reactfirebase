import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
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

  const handleLoginSucess = () => {
    setIsAuthenticated(true);
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onSuccess={handleLoginSucess} />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/pessoal" element={isAuthenticated ? <Personal /> : <Navigate to="/login" />} />
          <Route path="/painel" element={isAuthenticated ? <Painel /> : <Navigate to="/login" />} />
          <Route path="/processos" element={isAuthenticated ? <Processes /> : <Navigate to="/login" />} />
          <Route path="/checagem" element={isAuthenticated ? <Check /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
