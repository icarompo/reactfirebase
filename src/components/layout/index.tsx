import Navigation from "./navigation/index.tsx";
import Header from "./header/Header.tsx";
import { useState } from "react";
import "./styles.css";

type LayoutProps = {
  children: React.ReactNode;
  pageName: string;
  onLogOut?: () => void;
};

const Layout = (props: LayoutProps) => {
  const [showText, setShowText] = useState(true);

  const handleToggleText = () => {
    setShowText(!showText);
  };

  return (
    <div className="app">
        <Navigation onToggleText={handleToggleText} />
      <div className="app-content">
        <div className="app-header">
          <Header pageName={props.pageName} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
