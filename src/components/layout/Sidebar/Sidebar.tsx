import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

type SidebarProps = {
  onToggleText?: () => void;
};

function Sidebar (props: SidebarProps): JSX.Element {
  const [showText, setShowText] = useState(true);
  const [sidebarWidth, setSideBarWidth] = useState("16%");
  const sidebarItems = [
    { to: "/", icon: <HomeIcon className="sidebar-icon" />, label: "Página Inicial" },
    { to: "/pessoal", icon: <PersonIcon className="sidebar-icon" />, label: "Página Pessoal" },
    { to: "/processos", icon: <TableRowsIcon className="sidebar-icon" />, label: "Processos" },
    { to: "/painel", icon: <DashboardIcon className="sidebar-icon" />, label: "Painel" },
    { to: "/checagem", icon: <LibraryAddCheckIcon className="sidebar-icon" />, label: "Tela de Checagem" },
  ];

  const toggleText = () => {
    props.onToggleText;
    setSideBarWidth(showText ? "3rem" : "16%"); 
    setShowText(!showText);
  };

  return (
<div className="bg-primary w-28" style={{ width: sidebarWidth }}>
  <div className=" border-b-secondary  flex items-center p-2 w-full h-200 text-white text-lg">
    <img
      src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png"
      alt="Logo do TCE-TO"
      className="logo w-10 h-12 mr-2"
    />
    <div className="menu-header-text">
      {showText && <h3>Controle e-Contas</h3>}
    </div>
  </div>
  <div className="menu-links flex flex-col items-start mt-8 text-white text-lg w-full">
    {sidebarItems.map((item, index) => (
      <Link key={index} to={item.to} className="link flex items-center p-2 w-full h-10 transition-transform transform hover:scale-105">
        {item.icon}
        {showText && item.label}
      </Link>
    ))}
  </div>
  <div className=" border-t border-blue-900 w-full h-10 flex items-end justify-end p-2">
    <button className="toggle-button bg-transparent border-none text-white">
      {showText ? <ArrowBackIosSharpIcon fontSize="small" /> : <ArrowForwardIosSharpIcon fontSize="small" />}
    </button>
  </div>
</div>

  );
}

export default Sidebar;