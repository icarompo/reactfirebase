import Sidebar from "./Sidebar/Sidebar.tsx";
import Header from "./Header/Header.tsx";
import { useState } from "react";
import "./styles.css";

type LayoutProps = {
  children: React.ReactNode;
  pageName: string;
  onLogOut?: () => void;
};

const Layout = (props: LayoutProps) => {
  const [showText, setShowText] = useState(true);
  const [showMenu, setShowMenu] = useState("hidden");

  const handleToggleText = () => {
    setShowText(!showText);
  };

  const handleToggleMenu = () => {
    if (showMenu === "block") {
      setShowMenu("hidden");
    } else {
      setShowMenu("block");
    }
  };

  return (
    <div className="app">
      <div className={`${showMenu} md:block `}>
      <Sidebar onToggleText={handleToggleText}/>
      </div>
      <div className="w-full h-full absolute md:relative">
        <Header pageName={props.pageName} onHamburgerClick={handleToggleMenu} />
        <div className="app-content-body">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
