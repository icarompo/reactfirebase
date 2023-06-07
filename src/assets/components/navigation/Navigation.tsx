import './styles.css'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function Navigation() {

    return(
        <div className="navigation">
            <Link to="/" className="icon"><HomeIcon /></Link>
            <Link to="/pessoal" className="link">Pessoal</Link>
            <Link to="/painel" className="link">Painel</Link>
            <Link to="/processos" className="link">Processos</Link>
            <Link to="/checagem" className="link">Checagem</Link>
        </div>
    );
}

export default Navigation
