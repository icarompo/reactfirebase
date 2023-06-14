import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/index.tsx";
import Personal from "./pages/pessoal/index.tsx";
import Painel from "./pages/painel/index.tsx";
import Processes from "./pages/processos/index.tsx";
import Check from "./pages/checagem/index.tsx";
import Login from "./components/auth/Login.tsx"

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSucess = () => {
    setIsAuthenticated(true);
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onSuccess={handleLoginSucess}/>} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login"/>} />
        <Route path="/pessoal" element={isAuthenticated ? <Personal /> : <Navigate to="/login"/>} />
        <Route path="/painel" element={isAuthenticated ? <Painel /> : <Navigate to="/login"/>} />
        <Route path="/processos" element={isAuthenticated ? <Processes /> : <Navigate to="/login"/> } />
        <Route path="/checagem" element={isAuthenticated ? <Check /> : <Navigate to="/login"/> } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
