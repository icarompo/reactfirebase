import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import "./styles.css";

type LayoutProps = {
  children: React.ReactNode;
  pageName: string;
  onLogOut?: () => void;
};

const Layout = (props: LayoutProps) => {
  return (
<div className="app">
  <div className="app_navigation">
    <Navigation />
  </div>
  <div className="app-content">
    <div className="app-header">
      <Header pageName={props.pageName} />
    </div>
    {props.children}
  </div>
</div>
  )
};

export default Layout;
