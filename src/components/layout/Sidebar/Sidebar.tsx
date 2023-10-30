import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { set } from "date-fns";

type SidebarProps = {
  onToggleText?: () => void;
};

const Sidebar = (props: SidebarProps) => {
  const [sidebarWidth, setSidebarWidth] = useState("60");
  const [sidebarPadding, setSidebarPadding] = useState("3");
  const [sidebarText, setSidebarText] = useState(true);
  const sidebarItems = [
    { to: "/", icon: <HomeIcon className="sidebar-icon" />, label: "Página Inicial"},
    { to: "/pessoal", icon: <PersonIcon className="sidebar-icon" />, label: "Pessoal"},
    { to: "/processos", icon: <TableRowsIcon className="sidebar-icon" />, label: "Processos"},
    { to: "/painel", icon: <DashboardIcon className="sidebar-icon" />, label: "Painel"},
    { to: "/checagem", icon: <LibraryAddCheckIcon className="sidebar-icon" />, label: "Checagem"},
  ];

  function toggleSidebar() {
    if (sidebarWidth === "60") {
      setSidebarWidth("18");
      setSidebarPadding("2");
      setSidebarText(false);
    } else {
      setSidebarWidth("60");
      setSidebarPadding("3");
      setSidebarText(true);
    }
  }

  return (
    <>
<div className={`bg-primary block w-${sidebarWidth} text-white h-full transition-all duration-500`}>
        <div className={` h-[6rem] flex items-center justify-start p-${sidebarPadding} transition-all duration-500`}>
          <img
            src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png"
            alt="Logo do TCE-TO"
            className="Header-logo w-10 h-12"
          />
          {sidebarText && <h1 className="text-white font-bold font-title text-xl text-start w-3/6 sm:text ml-4">Controle e-Contas</h1>}
        </div>

        <div className="border border-secondary h-4/6">
          {sidebarItems.map((item) => (
            <Link
              to={item.to}
              className=" hover:scale-105 hover:rounded p-2 flex items-center justify-start text-white font-highlight text-l font-semibold h-16 hover:bg-secondary "
            >
              <span className={`m-1`}>{item.icon}</span>
              {sidebarText && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </div>
        <div className="h-auto text-right text-white">
          <button
            className="sidebar-toggle-button w-10 h-10 transition-transform duration-500"
            onClick={toggleSidebar}>
          {sidebarText ? <ArrowBackIosSharpIcon/> : <ArrowForwardIosSharpIcon/>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
