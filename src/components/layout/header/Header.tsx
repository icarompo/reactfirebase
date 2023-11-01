import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import GlobalContext from "../../../context/globalContext";
import MenuIcon from "@mui/icons-material/Menu";

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
  };

  return (
    <>
      <div className="shadow w-full h-[6rem] bg-tertiary border-b border-gray-300 text-white font-semibold p-3 flex items-center">
        <button
          className="rounded-full hover:bg-[#4385bc] w-12 h-12 mr-2 transition-colors duration-100 md:hidden"
          onClick={onHamburguerClick}
          type="button"
        >
          {<MenuIcon fontSize="large" className="text-white"/>}
        </button>
        <div className="flex items-center">
          <h3>{props.pageName}</h3>
        </div>
        <div className="ml-auto mr-8 flex flex-col">
          <button className="underline cursor-pointer text-center">
            {data?.user?.nome}
          </button>
          <button
            className="logout-button w-full h-7 rounded-md bg-primary hover:bg-secondary text-white my-2 shadow"
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
