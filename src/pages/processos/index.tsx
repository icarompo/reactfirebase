import { useState, useEffect } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query } from "firebase/firestore";
import {
  alpha,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { DataGrid, GridRowId, gridClasses, ptBR } from "@mui/x-data-grid";
import TableFilter from "../../components/filter/Filter.tsx";
import Header from "../../components/header/Header.tsx";
import "./styles.css";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ptBR
);

const ODD_OPACITY = 0.1;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

interface TableProps {
  filterValue: string;
}

function Table({ filterValue }: TableProps) {
  type TipoDado = {
    id: string;
    proc: number;
    ano: number;
    assunto: string;
    data: Date;
    datadecisao: Date;
    assessor: number;
    entidade: string;
    vinculado: string;
    conselheiro: string;
    orgaoJulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
  };

  const [dados, setDados] = useState<Array<TipoDado>>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  useEffect(() => {
    async function fetchData() {
      const usersCollectionRef = collection(db, "dados"); // Referência para a coleção 'dados'
      const dadosQuery = query(usersCollectionRef);
      const dadosSnapshot = await getDocs(dadosQuery); // Busca os dados da coleção 'dados'
      const fetchedData: Array<TipoDado> = []; // Cria um array para armazenar os dados buscados
      dadosSnapshot.forEach((doc) => {
        // Percorre os documentos retornados
        const { id, ...rest } = doc.data() as TipoDado; // Extrai a propriedade 'id' e o restante das propriedades do documento
        fetchedData.push({ id: doc.id, ...rest }); // Adiciona o documento ao array de dados buscados
      });
      setDados(fetchedData); // Atualiza o estado 'dado' com os dados buscados
    }

    fetchData(); // Chama a função 'fetchData' para buscar os dados usando o hook useEffect
  }, []);

  const filteredValues = (filterValue: string): TipoDado[] => {
    if (filterValue === "*") {
      return dados;
    } else {
      return dados.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === filterValue.toLowerCase()
      );
    }
  };

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <ThemeProvider theme={theme}>
          <StripedDataGrid
            sx={{
              backgroundColor: "#fff",
              color: "#000",
            }}
            rows={filteredValues(filterValue)}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            columns={[
              { field: "proc", headerName: "Processo", width: 75 },
              { field: "ano", headerName: "Ano", width: 75 },
              { field: "assunto", headerName: "Assunto", width: 300 },
              { field: "data", headerName: "Data de inserção", width: 125 },
              { field: "datadecisao", headerName: "Data de decisão", width: 125, },
              { field: "assessor", headerName: "Assessor", width: 75 },
              { field: "entidade", headerName: "Entidade", width: 300 },
              { field: "vinculado", headerName: "Vinculado", width: 100 },
              { field: "conselheiro", headerName: "Conselheiro", width: 75 },
              { field: "orgaojulgador", headerName: "Órgão Julgador", width: 100, },
              { field: "encaminhamento", headerName: "Encaminhamento", width: 100, },
              { field: "definicao", headerName: "Definição", width: 100 },
              { field: "meta", headerName: "Meta", width: 75 },
              { field: "prioridade", headerName: "Prioridade", width: 75 },
            ]}
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
              setSelectedRows(ids);
            }}
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

function Processes({ onLogOut }: ProcessesProps) {
  const [filterValue, setFilterValue] = useState("relatoria");

  const handleSelectChange = (value: string) => {
    setFilterValue(value);
  };

  return (
    <>
      <Header
        title="Controle E-Contas"
        subtitle="Dados de Processos"
        onLogOut={onLogOut}
      />
      <TableFilter onSelectChange={handleSelectChange} />
      <Table filterValue={filterValue} />
    </>
  );
}

export default Processes;
