import Navigation from "./navigation/index.tsx";
import Header from "./header/index.tsx";
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
        <Header pageName={props.pageName} />
        <div className="app-content-body">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
