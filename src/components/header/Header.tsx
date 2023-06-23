import './styles.css';
import { Link } from 'react-router-dom';
import Navigation from "./Navigation.tsx";
import UserContext from "../../context/userContext";
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebase-config';
import { useNavigate } from 'react-router-dom'; 

interface HeaderProps {
    title: string;
    subtitle: string;
    onLogOut: () => void;
  }
  
  function Header({ title, subtitle, onLogOut }: HeaderProps): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = () => {
      signOut(auth).then(() => {
        onLogOut();
        console.log('Deslogado');
        navigate('/login');
      }).catch((error) => {
        console.log(error);
      });
    };

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
              <button className="logOutButton" onClick={logOut}>Sair</button>
            </div>
        </div>
        <Navigation />
      </>
    );
  }

export default Header;

