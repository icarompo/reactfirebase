import "./styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

type NavigationProps = {
  onToggleText?: () => void;
};

function Navigation (props: NavigationProps): JSX.Element {
  const [showText, setShowText] = useState(true);
  const [navigationWidth, setNavigationWidth] = useState("15%");
  const navigationItems = [
    { to: "/", icon: <HomeIcon className="navigation-icon" />, label: "Home" },
    { to: "/pessoal", icon: <PersonIcon className="navigation-icon" />, label: "Pessoal" },
    { to: "/processos", icon: <TableRowsIcon className="navigation-icon" />, label: "Processos" },
    { to: "/painel", icon: <DashboardIcon className="navigation-icon" />, label: "Painel" },
    { to: "/checagem", icon: <LibraryAddCheckIcon className="navigation-icon" />, label: "Checagem" },
  ];

  const toggleText = () => {
    setShowText(!showText);
    props.onToggleText;
    setNavigationWidth(showText ? "3rem" : "15%"); 
  };

  return (
    <div className='navigation' style={{ width: navigationWidth }} >
      <div className="menu-header">
        <img
          src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png"
          alt="Logo do TCE-TO"
          className="logo"
        />
        <div className="menu-header-text">
          {showText && (
            <>
              <h3>Controle</h3>
              <h3>E-Contas</h3>
            </>
          )}
        </div>
      </div>
      <div className="menu-links">
        {navigationItems.map((item, index) => (
          <Link key={index} to={item.to} className="link">
            {item.icon}
            {showText && item.label}
          </Link>
        ))}
      </div>
      <div className="menu-footer">
        <button className="toggle-button" onClick={toggleText}>
          {showText ? (
            <ArrowBackIosSharpIcon fontSize="small" />
          ) : (
            <ArrowForwardIosSharpIcon fontSize="small" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navigation;