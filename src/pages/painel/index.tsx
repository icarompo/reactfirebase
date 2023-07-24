import Header from "../../components/header/Header.tsx";
import PieChart from "../../components/piechart/PieChart";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./styles.css";

function Page() {
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

  useEffect(() => {
    async function fetchData() {
      const dadosCollectionRef = collection(db, "dados"); // Referência para a coleção 'dados'
      const dadosQuery = query(
        dadosCollectionRef,
        where("definicao", "==", "relatoria")
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

  type TipoUser = {
    id: string;
    identificador: string;
    nome: string;
    email: string;
    tipo: string;
  };

  const [user, setUser] = useState<Array<TipoUser>>([]);

  useEffect(() => {
    async function fetchUsers() {
      const usersCollectionRef = collection(db, "colaboradores"); // Referência para a coleção 'users'
      const usersSnapshot = await getDocs(usersCollectionRef); // Busca os dados da coleção 'users'
      const fetchedUser: Array<TipoUser> = [];
      usersSnapshot.forEach((doc) => {
        const { id, ...rest } = doc.data() as TipoUser; // Extrai a propriedade 'identificador' e o restante das propriedades do documento
        fetchedUser.push({ id: doc.id, ...rest }); // Atualiza o estado 'user' com os dados buscados
      });
      setUser(fetchedUser); // Atualiza o estado 'user' com os dados buscados
    }
    fetchUsers(); // Chama a função 'fetchUsers' para buscar os dados usando o hook useEffect
  }, []);

  interface PieChartData {
    label: string;
    value: number;
    color: string;
  }

  const data: PieChartData[] = [];

  const assessorData = [];
  const colors = [
    "#c6e0b4",
    "#b4c6e7",
    "#ffe699",
    "#dbdbdb",
    "#f8cbad",
    "#bdd7ee",
    "#cccc00",
    "#ffccff",
    "#66ff99",
    "#99ffcc",
    "#a6a6a6",
  ];

  for (let i = 1; i <= 11; i++) {
    const filteredData = dados.filter((Processo) => Processo.assessor === i);
    assessorData.push(filteredData);

    const assessorLabel = `Assessor ${i}`;
    const pieChartData: PieChartData = {
      label: assessorLabel,
      value: filteredData.length,
      color: colors[i - 1],
    };

    data.push(pieChartData);
  }

  const pieChartRadius: number = 100;
  const strokeWidth: number = 3;

  return (
    <>
      <div className="painel-container">
        <div className="pie-chart">
          <div className="grafico">
            <PieChart
              data={data}
              radius={pieChartRadius}
              strokeWidth={strokeWidth}
            />
          </div>

          <div className="detalhes">
            {assessorData.map((assessor, index) => {
              const userAssessor = user.find(
                (item) => Number(item.identificador) === index + 1
              );

              if (userAssessor) {
                return (
                  <div className="detalhe" key={index}>
                    <div className="assessor-info">
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: colors[index],
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "5px",
                          verticalAlign: "middle",
                        }}
                      ></span>
                      <h3>
                        {userAssessor?.identificador} {userAssessor?.nome}
                      </h3>
                    </div>
                  </div>
                );
              } else {
                return null; // Não exibir nada caso o assessor não tenha o identificador entre 1 e 11
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

interface PainelProps {
  onLogOut: () => void;
}

function Painel({ onLogOut }: PainelProps): JSX.Element {
  return (
    <>
      <Header title="Controle E-Contas" subtitle="Painel" onLogOut={onLogOut} />
      <Page />
    </>
  );
}

export default Painel;
