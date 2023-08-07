import "./styles.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function Navigation() {
  return (
    <>
    <div className="navigation">
    <img src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png" alt="Logo do TCE-TO" className="logo"/>

      <div className="links" >
      <Link to="/">
        <HomeIcon className="navigation-icon"/>
      </Link>
      <Link to="/pessoal" className="link">
        Pessoal
      </Link>
      <Link to="/painel" className="link">
        Painel
      </Link>
      <Link to="/processos" className="link">
        Processos
      </Link>
      <Link to="/checagem" className="link">
        Checagem
      </Link>
      </div>
    </div>
    </>
  );
}

export default Navigation;
