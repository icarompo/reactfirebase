import Header from "../../components/header/Header.tsx";
import PieChart from "../../components/piechart/PieChart";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query, where } from "firebase/firestore";
import Card from "../../components/card/index.tsx";
import SelectLocation from "../../components/select/Select.tsx";
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
  const [definicao, setDefinicao] = useState<string>("relatoria");
  const [ano, setAno] = useState<string>("2023");

  useEffect(() => {
    async function fetchData() {
      const dadosCollectionRef = collection(db, "dados"); // Referência para a coleção 'dados'
      const dadosQuery = query(dadosCollectionRef);
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

  const filteredValues = (definicao: string, ano: string): TipoDado[] => {
    if (definicao === "*" && ano === "*") {
      return dados;
    } else if (definicao === "*") {
      return dados.filter((Processo) => Processo.ano === Number(ano));
    } else if (ano === "*") {
      return dados.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === definicao.toLowerCase()
      );
    } else {
      return dados.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === definicao.toLowerCase() &&
          Processo.ano === Number(ano)
      );
    }
  };
  
  const findAssessor = (id: number) => {
    const userAssessor = user.find((item) => Number(item.identificador) === id);
    if (userAssessor) {
      return userAssessor?.nome;
    }
  };

  interface PieChartData { 
    label: string;
    value: number;
    color: string;
  }

  const data: PieChartData[] = [];

  const assessorData = [];
  const colors = ["#c6e0b4", "#b4c6e7", "#ffe699", "#dbdbdb", "#f8cbad", "#bdd7ee", "#cccc00", "#ffccff", "#66ff99", "#99ffcc", "#a6a6a6",];

  for (let i = 1; i <= 10; i++) {
    const filteredData = filteredValues(definicao, ano).filter((Processo) => Processo.assessor === i);
    assessorData.push(filteredData);
    const pieChartData: PieChartData = {
      label: findAssessor(i) ?? "",
      value: filteredData.length,
      color: colors[i - 1],
    };
    data.push(pieChartData);
  }

  const pieChartRadius: number = 100;
  const strokeWidth: number = 3;

  const handleSelectChange = (value: string) => {
    setDefinicao(value);
  };

  const handleDetalheClick = (assessor: TipoDado[]) => () => {
    const result = document.querySelector("#result-container") as HTMLDivElement;
    if (assessor.length != 0) {
    result.innerHTML = "";
    for (let i = 0; i < assessor.length; i++) {
      const div = document.createElement("div");
      div.classList.add("result-item");
      div.innerHTML = assessor[i].proc.toString();
      result.appendChild(div);
    }
  }
  else {
    result.innerHTML = "Nenhum processo encontrado";
  }};

  const handleAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAno(event.target.value);
  };

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
      console.log('opa');
    } else if (card === "meta") {
      console.log('opa');
    } else if (card === "prioridade") {
      console.log('opa');
    } else if (card === "anoAtual") {
      console.log('opa');
    }
  };

  return (
    <>
      <div className="painel-container">
        <div className="pie-chart-container">
          <div className="column">
            <div className="select">
              <SelectLocation onSelectChange={handleSelectChange} />
              <select
                className="ano"
                onChange={handleAnoChange}
                defaultValue={2023}
              >
                <option value="*">Todos</option>
                {Array.from({ length: 41 }, (_, index) => 1990 + index).map(
                  (ano) => (
                    <option key={ano} value={ano}>
                      {ano}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="pie-chart">
              <PieChart
                data={data}
                radius={pieChartRadius}
                strokeWidth={strokeWidth}
              />
            </div>
          </div>

          <div className="detalhes">
            {assessorData.map((assessor, index) => {
              const userAssessor = user.find(
                (item) => Number(item.identificador) === index + 1
              );

              if (userAssessor) {
                return (
                  <div
                    className="detalhe"
                    key={index}
                    onClick={handleDetalheClick(assessor)}
                  >
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

          <div className="column" id="result-container">
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
              value={8}
              text="Processos em meta"
              id={verificaPrioridade(8)}
              onClick={() => handleClick("meta")}
            />
            <Card
              name="Prioridade"
              value={2}
              text="Processos em prioridade"
              id={verificaPrioridade(2)}
              onClick={() => handleClick("prioridade")}
            />
            <Card
              name="2023"
              value={4}
              text="Processos do ano Atual"
              id={verificaPrioridade(4)}
              onClick={() => handleClick("anoAtual")}
            />
          </div>
          </div>

        </div>
      </div>
    </>
  );
}

interface PainelProps {
  onLogOut: () => void;
}

function Painel(props: PainelProps) {

  return (
    <>
      <Header title="Controle E-Contas" subtitle="Painel" onLogOut={props.onLogOut} />
      <Page/>
    </>
  );
}

export default Painel;
