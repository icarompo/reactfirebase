import './styles.css';
import { Link } from 'react-router-dom';
import Navigation from "../navigation/Navigation.tsx";
import UserContext from "../../context/userContext";
import { useContext, useEffect } from 'react';

interface HeaderProps {
    title: string;
    subtitle: string;

  }
  
  function Header({title, subtitle }: HeaderProps): JSX.Element {
    const { user } = useContext(UserContext);
  
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
          <div className="header-buttons">
            <span className="user">Bem vindo {user?.nome}</span>
            <Link to="/login">
              <button className="login-button">Sair</button>
            </Link>
            </div>
        </div>
        <Navigation />
      </>
    );
  }

export default Header;