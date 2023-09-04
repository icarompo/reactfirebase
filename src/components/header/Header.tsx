import './styles.css';
import { useContext } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import GlobalContext from "../../context/globalContext";
interface HeaderProps {
    subtitle: string;
    onLogOut: () => void;
  }
  
  function Header({ subtitle, onLogOut }: HeaderProps): JSX.Element {
    const data = useContext(GlobalContext);
    const auth = getAuth();
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
            <h3 className='header-h3'>{subtitle}</h3>
          </div>
          <div className="header-buttons">
            <span className="user">Bem vindo {data?.user?.nome}</span>
              <button className="logout-button" onClick={logOut}>Sair</button>
            </div>
        </div>

      </>
    );
  }

export default Header;

