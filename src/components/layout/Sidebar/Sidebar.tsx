import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { set } from "date-fns";

type SidebarProps = {
  onToggleText?: () => void;
};

function Sidebar (props: SidebarProps): JSX.Element {
  const [sidebarWidth, setSidebarWidth] = useState("60");
  const [sidebarText, setSidebarText] = useState(true);
  const sidebarItems = [
    { to: "/", icon: <HomeIcon className="sidebar-icon" />, label: "Página Inicial" },
    { to: "/pessoal", icon: <PersonIcon className="sidebar-icon" />, label: "Página Pessoal" },
    { to: "/processos", icon: <TableRowsIcon className="sidebar-icon" />, label: "Processos" },
    { to: "/painel", icon: <DashboardIcon className="sidebar-icon" />, label: "Painel" },
    { to: "/checagem", icon: <LibraryAddCheckIcon className="sidebar-icon" />, label: "Tela de Checagem" },
  ];

  function toggleSidebar() {
    if (sidebarWidth === "60") {
      setSidebarWidth("20");
      setSidebarText(false);
    } else {
      setSidebarWidth("60");
      setSidebarText(true);
    }
  }

  return (
<div className={`Sidebar bg-primary w-${sidebarWidth} text-white h-screen transition-width duration-100 ease-in-out`}>
  <div className="Sidebar-header text-xl font-title h-24 border-b border-secondary">
    <img
      src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png"
      alt="Logo do TCE-TO"
      className="Header-logo w-10 h-12 mr-2"
    />
    <div className="Header-text">
      {sidebarText && <h3 className="transition-opacity duration-300 ease-in-out">Controle e-Contas</h3>}
    </div>
  </div>
  <div className="Sidebar-menu flex flex-col items-start mt-8 text-lg w-full">
    {sidebarItems.map((item, index) => (
      <Link key={index} to={item.to} className="link flex items-center p-2 w-full h-10 transition-transform transform hover:scale-105 hover:bg-secondary">
        {item.icon}
        {sidebarText && item.label}
      </Link>
    ))}
  </div>
  <div className="Sidebar-footer border-t border-secondary w-full h-24 flex items-end justify-end p-2">
      <button onClick={toggleSidebar} className="text-white">
        {sidebarWidth === "60" ? <ArrowBackIosSharpIcon /> : <ArrowForwardIosSharpIcon />}
      </button>
  </div>
</div>

  );
}

export default Sidebar;