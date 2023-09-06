import "./styles.css";
import { useState } from "react";
import { format } from "date-fns";
import { useContext } from "react";
import { ptBR } from "@mui/x-data-grid";
import TableFilter from "./filter/filter.tsx";
import GlobalContext from "../../context/globalContext.ts";
import { StripedDataGrid } from "../../utils/stripedDataGrid.ts";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ptBR
);

function Processes() {
  type dataType = {
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

  const data = useContext(GlobalContext);

  const filteredValues = (filterValue: string): dataType[] => {
    if (!data.procData) {
      return [];
    }
    if (filterValue === "*") {
      return data.procData;
    } else {
      return data.procData.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === filterValue.toLowerCase()
      );
    }
  };

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
      <div className="proc-container">
        <TableFilter
          onSelectChange={handleSelectChange}
          onFilterChange={handleFilterChange}
        />
        <ThemeProvider theme={theme}>
          <StripedDataGrid
            sx={{
              backgroundColor: "#fff",
              color: "#000",
            }}
            rows={filteredValues(definitionValue)}
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

export default Processes;
