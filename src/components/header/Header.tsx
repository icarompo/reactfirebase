import './styles.css';
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

          <div className="text-container">
            <h2 className='header-h2'>{title}</h2>
            <h3 className='header-h3'>{subtitle}</h3>
          </div>
          <div className="header-buttons">
            <span className="user">Bem vindo {user?.nome}</span>
              <button className="logout-button" onClick={logOut}>Sair</button>
            </div>
        </div>

      </>
    );
  }

export default Header;

