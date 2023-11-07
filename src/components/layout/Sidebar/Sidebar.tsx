import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Página Inicial");
  const sidebarItems = [
    {
      to: "/",
      icon: <HomeIcon className="sidebar-icon" />,
      label: "Página Inicial",
    },
    {
      to: "/pessoal",
      icon: <PersonIcon className="sidebar-icon" />,
      label: "Pessoal",
    },
    {
      to: "/processos",
      icon: <TableRowsIcon className="sidebar-icon" />,
      label: "Processos",
    },
    {
      to: "/painel",
      icon: <DashboardIcon className="sidebar-icon" />,
      label: "Painel",
    },
    {
      to: "/checagem",
      icon: <LibraryAddCheckIcon className="sidebar-icon" />,
      label: "Checagem",
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (label: string) => {
    setSelectedItem(label);
  };

  return (
    <>
      <div
        className={`bg-tertiary md:bg-primary block w-${isExpanded ? '60' : '18'} border border-secondary md:border-none text-white h-screen transition-all duration-500`}
      >
        <div
          className={`shadow h-[6rem] flex items-center justify-start transition-all duration-500 p-0.5`}
        >
          <img
            src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png"
            alt="Logo do TCE-TO"
            className="Header-logo w-10 h-12 m-1"
          />
          {isExpanded && (
            <div className="flex flex-col">
            <h1 className="text-white font-bold font-title text-xl ml-1">
              Controle 
            </h1>
            <h1 className="text-white font-bold font-title text-xl ml-1">
              e-Contas
            </h1>
            </div>
          )}
        </div>

        <div className=" border-t border-b border-secondary h-[80%]">
          {sidebarItems.map((item) => (
            <Tooltip title={item.label} key={item.label} placement="right">
            <Link
              key={item.label}
              to={item.to}
              className={`hover:scale-105 hover:shadow hover:text-slate-50 p-2 flex items-center justify-start text-gray-400 font-highlight text-l font-semibold h-15 hover:bg-secondary ${
                selectedItem === item.label
                  ? "shadow text-slate-50 bg-secondary bg-opacity-100"
                  : ""
              }`}
              onClick={() => handleItemClick(item.label)}
            >
              <span className={`m-1`}>{item.icon}</span>
              {isExpanded && <span className="ml-4">{item.label}</span>}
            </Link>
            </Tooltip>
          ))}
        </div>
        <div className="h-auto text-right text-white hidden md:block">
          <Tooltip title={isExpanded ? 'Minimizar menu' : 'Expandir menu'} placement="right">
          <button
            className={`sidebar-toggle-button w-10 h-16 transition-all duration-500 rotate-${isExpanded ? '0' : '180'}`}
            onClick={toggleSidebar}
          >
            {<ArrowBackIosSharpIcon />}
          </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
