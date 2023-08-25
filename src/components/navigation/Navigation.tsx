import "./styles.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

function Navigation() {
  return (
    <>
      <div className="navigation">
        <div className="menu-header">
          <img
            src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png"
            alt="Logo do TCE-TO"
            className="logo"
          />
          <div className="menu-header-text">
            <h3>Controle </h3>
            <h3>E-Contas</h3>
          </div>
        </div>
        <div className="links">
          <Link to="/" className="link">
            <HomeIcon className="navigation-icon" />
            Home
          </Link>
          <Link to="/pessoal" className="link">
            <PersonIcon className="navigation-icon" />
            Pessoal
          </Link>
          <Link to="/processos" className="link">
            <TableRowsIcon className="navigation-icon" />
            Processos
          </Link>
          <Link to="/painel" className="link">
            <DashboardIcon className="navigation-icon" />
            Painel
          </Link>
          <Link to="/checagem" className="link">
            <LibraryAddCheckIcon className="navigation-icon" />
            Checagem
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navigation;
