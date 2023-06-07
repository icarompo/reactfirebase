import './styles.css';
import { Link } from 'react-router-dom';
import Navigation from "../navigation/Navigation.tsx";

interface HeaderProps {
    title: string;
    subtitle: string;
  }
  
  function Header({title, subtitle}: HeaderProps): JSX.Element {
    return (
      <>
        <div className="header">
          <Link to="/">
            <img src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png" alt="Logo do TCE-TO" className="logo"/>
          </Link>
          <div className="text-container">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
          </div>
        </div>
        <Navigation />
      </>
    );
  }

export default Header;