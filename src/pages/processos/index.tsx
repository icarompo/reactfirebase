import { useState, useEffect } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query } from "firebase/firestore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { /* GridRowId, */ ptBR } from "@mui/x-data-grid";
import TableFilter from "../../components/filter/filter.tsx";
import Header from "../../components/header/Header.tsx";
import "./styles.css";
import { StripedDataGrid } from "../../utils/stripedDataGrid.ts";
import Navigation from "../../components/navigation/Navigation.tsx";
import { format } from "date-fns";
import dataContext from "../../context/dataContext";
import { useContext } from 'react';

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ptBR
);

interface PageProps {
  definitionValue: string;
  filterValue: Array<string>;
}

function Page(props: PageProps) {
  type TipoDado = {
    id: string;
    processo: number;
    assunto: string;
    data: Date;
    dataDecisao: Date;
    assessor: number;
    entidade: string;
    vinculado: string;
    dias: number;
    conselheiro: string;
    orgaoJulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
  };

  const dados = useContext(dataContext);
  console.log(dados)

  useEffect(() => {
    console.log(dados)
  }, []);


  const filteredValues = (filterValue: string): TipoDado[] => {
    if (filterValue === "*") {
      console.log(dados)
      return dados;
    } else {
      console.log(dados)
      return dados.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === filterValue.toLowerCase()
      );
    }
  };

  return (
    <>
      <div className="proc-container">
          <ThemeProvider theme={theme}>
            <StripedDataGrid
              sx={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              rows={filteredValues(props.definitionValue)}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              columns={[
                { field: "processo", headerName: "Processo", width: 75 },
                { field: "assunto", headerName: "Assunto", width: 300 },
                { field: "assessor", headerName: "Assessor", width: 75 },
                {
                  field: "data",
                  headerName: "Data de inserção",
                  width: 125,
                  valueGetter: (params) => {
                    const timestamp = params.row.data; 
                    const date = new Date(timestamp.seconds * 1000); 
                    return format(date, "dd/MM/yyyy");
                  },
                },
                {
                  field: "dataDecisao",
                  headerName: "Data de decisão",
                  width: 125,
                  valueGetter: (params) => {
                    const timestamp = params.row.dataDecisao; 
                    const date = new Date(timestamp.seconds * 1000); 
                    return format(date, "dd/MM/yyyy");
                  },
                },
                
                { field: "entidade", headerName: "Entidade", width: 300 },
                { field: "vinculado", headerName: "Vinculado", width: 100 },
                { field: "conselheiro", headerName: "Conselheiro", width: 75 },
                { field: "julgador", headerName: "Julgador", width: 75 },
                { field: "orgaoJulgador", headerName: "Órgão Julgador", width: 100 },
                { field: "encaminhamento", headerName: "Encaminhamento", width: 100 },
                { field: "definicao", headerName: "Definição", width: 100 },
                { field: "dias", headerName: "Dias", width: 50 },
                { field: "meta", headerName: "Meta", width: 75 },
                { field: "prioridade", headerName: "Prioridade", width: 75 },
              ]}
              disableRowSelectionOnClick
            />
          </ThemeProvider>
        </div>
    </>
  );
}

interface ProcessesProps {
  onLogOut: () => void;
}

function Processes(props: ProcessesProps) {
  const [definitionValue, setDefinitionValue] = useState("relatoria");
  const [filterValue, setFilterValue] = useState([""]);

  const handleSelectChange = (value: string) => {
    setDefinitionValue(value);
  };

  const handleFilterChange = (value: Array<string>) => {
     setFilterValue(value);
   };

  return (
    <>
      <div className="app">
        <Navigation />
        <div className="main-content">
          <Header subtitle="Dados de Processos" onLogOut={props.onLogOut} />
          <TableFilter onSelectChange={handleSelectChange} onFilterChange={handleFilterChange}/>
          <Page definitionValue={definitionValue} filterValue={filterValue}/>
        </div>
      </div>
    </>
  );
}

export default Processes;
