import { useState, useEffect } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query } from "firebase/firestore";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { GridRowId, ptBR } from "@mui/x-data-grid";
import TableFilter from "../../components/filter/filter.tsx";
import Header from "../../components/header/Header.tsx";
import "./styles.css";
import { StripedDataGrid } from "../../utils/stripedDataGrid.ts"

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ptBR
);

interface PageProps {
  filterValue: string;
}

function Page(props: PageProps) {
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
  const [selectedProcValues, setSelectedProcValues] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const usersCollectionRef = collection(db, "dados"); 
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

  const handleRowSelectionChange = (ids: GridRowId[]) => {
    setSelectedProcValues(ids.map((selectedRowId) => {
      const selectedRow = dados.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        return selectedRow.proc.toString();
      }
      return undefined;
    }) as string[]);
  };

useEffect(() => {
  console.log(selectedProcValues);
}, [selectedProcValues]);

  return (
    <>
    <div className="proc-container">
      <div className="proc-datagrid">
        <ThemeProvider theme={theme}>
          <StripedDataGrid
            sx={{
              backgroundColor: "#fff",
              color: "#000",
            }}
            rows={filteredValues(props.filterValue)}
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
              handleRowSelectionChange(ids);  
            }}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
    </>
  );
}

interface ProcessesProps {
  onLogOut: () => void;
}

function Processes(props: ProcessesProps) {
  const [filterValue, setFilterValue] = useState("relatoria");

  const handleSelectChange = (value: string) => {
    setFilterValue(value);
  };

  return (
    <>
      <Header
        title="Controle E-Contas"
        subtitle="Dados de Processos"
        onLogOut={props.onLogOut}
      />
      <TableFilter onSelectChange={handleSelectChange}/>
      <Page filterValue={filterValue}/>
    </>
  );
}

export default Processes;