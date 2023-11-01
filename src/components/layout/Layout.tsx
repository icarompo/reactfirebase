import Sidebar from "./Sidebar/Sidebar.tsx";
import Header from "./Header/Header.tsx";
import { useState } from "react";

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
    <div className="flex w-screen h-screen">
      <div
        className={`fixed bg-opacity-40 inset-0 bg-black ${showMenu} md:hidden`}
        onClick={handleToggleMenu}
      ></div>
      <div className={`${showMenu} md:block absolute md:relative`}>
        <Sidebar onToggleText={handleToggleText} />
      </div>
      <div className="w-full h-full flex flex-col">
        <Header pageName={props.pageName} onHamburgerClick={handleToggleMenu} />
        <div className="">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
