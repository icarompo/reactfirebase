import { useState, useEffect, useContext } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../../components/header/Header.tsx";
import Card from "../../components/card/index.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptBR } from "@mui/x-data-grid";
import { StripedDataGrid } from "../../utils/stripedDataGrid.ts";
import UserContext from "../../context/userContext";
import { GridSortModel } from "@mui/x-data-grid";

import "./styles.css";

function Page() {
  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    ptBR
  );

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

  const { user } = useContext(UserContext);
  const [dados, setDados] = useState<Array<TipoDado>>([]);

  useEffect(() => {
    async function fetchData() {
      const dadosCollectionRef = collection(db, "dados"); // Referência para a coleção 'dados'
      const dadosQuery = query(
        dadosCollectionRef,
        where("assessor", "==", user?.identificador)
      );
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

  const meta = dados.filter(
    (Processo) => Processo.meta.toLowerCase() === "sim"
  );
  const anoAtual = dados.filter((Processo) => Processo.ano === 2023);
  const prioridade = dados.filter(
    (Processo) => Processo.prioridade.toLowerCase() === "alta"
  );

  const [dataGrid, setDataGrid] = useState<Array<TipoDado>>(dados);;

  const verificaPrioridade = (quantidade: number) => {
    if (quantidade > 3 && quantidade <= 6) {
      return "card-header-middle-priority";
    } else if (quantidade > 6) {
      return "card-header-high-priority";
    } else {
      return "card-header-low-priority";
    }
  };

  const handleClick = (card: string) => {
    if (card === "processos") {
      setDataGrid(dados);
    } else if (card === "meta") {
      setDataGrid(meta);
    } else if (card === "prioridade") {
      setDataGrid(prioridade);
    } else if (card === "anoAtual") {
      setDataGrid(anoAtual);
    }
  };

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'definicao',
      sort: 'asc',
    },
  ]);

  const handleSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  };

  useEffect(() => {
    setDataGrid(dados);
  }, [dados]);

  return (
    <>
        <div className="personal-container">
          <div className="cards">
            <Card
              name="Processos"
              value={dados.length}
              text="Processos pessoais"
              id={verificaPrioridade(dados.length)}
              onClick={() => handleClick("processos")}
            />
            <Card
              name="Meta"
              value={meta.length}
              text="Processos em meta"
              id={verificaPrioridade(meta.length)}
              onClick={() => handleClick("meta")}
            />
            <Card
              name="Prioridade"
              value={prioridade.length}
              text="Processos em prioridade"
              id={verificaPrioridade(prioridade.length)}
              onClick={() => handleClick("prioridade")}
            />
            <Card
              name="2023"
              value={anoAtual.length}
              text="Processos do ano Atual"
              id={verificaPrioridade(anoAtual.length)}
              onClick={() => handleClick("anoAtual")}
            />
          </div>

          <div className="datagrid">
            <ThemeProvider theme={theme}>
              <StripedDataGrid
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                rows={dataGrid}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                columns={[
                  { field: "proc", headerName: "Processo", width: 75 },
                  { field: "ano", headerName: "Ano", width: 75 },
                  { field: "assunto", headerName: "Assunto", width: 300 },
                  { field: "data", headerName: "Data de inserção", width: 125 },
                  {
                    field: "datadecisao",
                    headerName: "Data de decisão",
                    width: 125,
                  },
                  { field: "entidade", headerName: "Entidade", width: 300 },
                  { field: "vinculado", headerName: "Vinculado", width: 100 },
                  {
                    field: "conselheiro",
                    headerName: "Conselheiro",
                    width: 75,
                  },
                  {
                    field: "orgaojulgador",
                    headerName: "Órgão Julgador",
                    width: 100,
                  },
                  {
                    field: "encaminhamento",
                    headerName: "Encaminhamento",
                    width: 100,
                  },
                  { field: "definicao", headerName: "Definição", width: 100 },
                  { field: "meta", headerName: "Meta", width: 75 },
                  { field: "prioridade", headerName: "Prioridade", width: 75 },
                ]}

                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
              />
            </ThemeProvider>
          </div>
        </div>
    </>
  );
}

interface PersonalProps {
  onLogOut: () => void;
}

function Personal({ onLogOut }: PersonalProps) {
  return (
    <>
      <Header
        title="Controle E-Contas"
        subtitle="Página Pessoal"
        onLogOut={onLogOut}
      />
      <Page />
    </>
  );
}

export default Personal;
