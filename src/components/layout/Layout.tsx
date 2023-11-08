import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { useState } from "react";

type LayoutProps = {
  children: React.ReactNode;
  pageName: string;
  onLogOut?: () => void;
};

const Layout = (props: LayoutProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggleMenu = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="flex w-screen h-screen static">
      <div
        className={`fixed bg-opacity-40 inset-0 bg-black ${isHidden ? 'hidden' : 'block'} md:hidden`}
        onClick={handleToggleMenu}
      ></div>
      <div className={`${isHidden ? 'hidden' : 'block'} md:block fixed md:relative`}>
        <Sidebar />
      </div>
      <div className="w-full h-full flex flex-col">
        <Header pageName={props.pageName} onHamburgerClick={handleToggleMenu} />
        <div className={`p-3 h-auto w-full ${isHidden ? 'block' : 'hidden'} relative md:block`}>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
