import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/index.tsx';
import Personal from './pages/pessoal/index.tsx';
import Painel from './pages/painel/index.tsx';
import Processes from './pages/processos/index.tsx';
import Check from './pages/checagem/index.tsx';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pessoal" element={<Personal />} />
                <Route path="/painel" element={<Painel />} />
                <Route path="/processos" element={<Processes />} />
                <Route path="/checagem" element={<Check />} />
            </Routes>
        </Router>
    );
};