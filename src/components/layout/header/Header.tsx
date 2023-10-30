import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import GlobalContext from "../../../context/globalContext";
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  pageName: string;
  onHamburgerClick?: () => void;
}

function Header(props: HeaderProps): JSX.Element {
  const data = useContext(GlobalContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Deslogado");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onHamburguerClick = () => {
    props.onHamburgerClick?.();
  }

  return (
    <>
      <div className=" w-full h-[6rem] bg-[#2e77b4] border-b border-gray-300 text-white font-semibold p-4 flex items-center">
        <button type="button" onClick={onHamburguerClick} className="rounded-full hover:bg-[#4385bc] w-12 h-12 mr-2 transition-colors duration-100 md:hidden">
          {<MenuIcon fontSize="large" className="text-white"/>}
        </button>
        <div className="text-container flex items-center">
          <h3 className="header-h3">{props.pageName}</h3>
        </div>
        <div className="header-buttons ml-auto mr-8 flex flex-col">
          <span className="user flex flex-col">
            Bem vindo 
          </span>
          <span className="user flex flex-col">
          {data?.user?.nome}
          </span>
          <button
            className="logout-button w-full h-7 rounded-md bg-primary hover:bg-secondary text-white my-2"
            onClick={logOut}
          >
            Sair
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
