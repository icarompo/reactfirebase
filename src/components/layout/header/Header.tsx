import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import GlobalContext from "../../../context/globalContext";

interface HeaderProps {
  pageName: string;
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

  return (
    <>
      <div className="h-30 bg-white border-b border-gray-300 text-black font-semibold p-4 flex items-center">
        <div className="text-container flex items-center">
          <h3 className="header-h3">{props.pageName}</h3>
        </div>
        <div className="header-buttons ml-auto mr-8 flex flex-col">
          <span className="user flex flex-col">
            Bem vindo {data?.user?.nome}
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
