import "./styles.css";
import { format } from "date-fns";
import { ptBR } from "@mui/x-data-grid";
import { procType } from "../../App.tsx";
import { useState, useContext } from "react";
import { GridSortModel } from "@mui/x-data-grid";
import GlobalContext from "../../context/globalContext.ts";
import SelectLocation from "../../components/Select/Select.tsx";
import { StripedDataGrid } from "../../utils/stripedDataGrid.ts";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Personal() {
  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    ptBR
  );

  const data = useContext(GlobalContext);
  const [definicao, setDefinicao] = useState<string>("relatoria");

  const filter = data.procData?.filter((Processo) => Processo.assessor === Number(data?.user?.identificador));

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "definicao",
      sort: "asc",
    },
  ]);

  const handleSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  };

  const filteredValues = (filterValue: string): procType[] => {
    if (!filter) {
      return [];
    }
    if (filterValue === "*") {
      return filter;
    } else {
      return filter.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === filterValue.toLowerCase()
      );
    }
  };

  const handleSelectChange = (value: string) => {
    setDefinicao(value);
  };

  return (
    <>
          <SelectLocation onSelectChange={handleSelectChange}/>      
          <ThemeProvider theme={theme}>
            <StripedDataGrid
              sx={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              rows={filteredValues(definicao)}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              columns={[
                { field: "processo", headerName: "Processo", width: 75 },
                { field: "assunto", headerName: "Assunto", width: 300 },
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
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
            />
          </ThemeProvider>
    </>
  );
}

export default Personal;
