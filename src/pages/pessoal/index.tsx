import { useState, useEffect, useContext } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../../components/header/Header.tsx";
import Card from "../../components/card/index.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptBR } from "@mui/x-data-grid";
import { StripedDataGrid } from "../../utils/stripedDataGrid.ts"
import UserContext from "../../context/userContext";

import "./styles.css";

function Painel() {

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
  ).length;
  const anoAtual = dados.filter((Processo) => Processo.ano === 2023).length;
  const prioridade = dados.filter(
    (Processo) => Processo.prioridade.toLowerCase() === "alta"
  ).length;

  const verificaPrioridade = (quantidade: number) => {
    if (quantidade > 3 && quantidade <= 6) {
      return "type-middle-priority"
    } else if (quantidade > 6) {
      return "type-high-priority"
    } else {
      return "type-low-priority"
    }
  }

  return (
    <>
      <div className="personal-container">
        <div className="container-header"></div>
        <div className="container-body">
          <Card
            name="Processos"
            value={dados.length}
            text="Quantidade de processos abertos"
            id={verificaPrioridade(dados.length)}
          />
          <Card
            name="Meta"
            value={meta}
            text="Quantidade de processos em meta"
            id={verificaPrioridade(meta)}
          />
          <Card
            name="Prioridade"
            value={prioridade}
            text="Quantidade de processos em prioridade"
            id={verificaPrioridade(prioridade)}
          />
          <Card
            name="2023"
            value={anoAtual}
            text="Quantidade de processos pessoais do ano atual na relatoria"
            id={verificaPrioridade(anoAtual)}
          />

    <div className="datagrid" >
        <ThemeProvider theme={theme}>
          <StripedDataGrid
            sx={{
              backgroundColor: "#fff",
              color: "#000",
            }}
            rows={dados}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            columns={[
              { field: "proc", headerName: "Processo", width: 75 },
              { field: "ano", headerName: "Ano", width: 75 },
              { field: "assunto", headerName: "Assunto", width: 300 },
              { field: "data", headerName: "Data de inserção", width: 125 },
              { field: "datadecisao", headerName: "Data de decisão", width: 125, },
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
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>

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
      <Painel />
    </>
  );
}

export default Personal;
