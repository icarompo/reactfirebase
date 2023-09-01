import Header from "../../components/header/Header.tsx";
import PieChart from "../../components/piechart/PieChart";
import { useEffect, useState, useContext } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs } from "firebase/firestore";
import Card from "../../components/card/index.tsx";
import SelectLocation from "../../components/select/Select.tsx";
import Navigation from "../../components/navigation/Navigation.tsx";
import { procType, userType } from "../../App.tsx";
import dataContext from "../../context/dataContext.ts";
import "./styles.css";

function Page() {

  const { procData: data, setData } = useContext(dataContext);
  const [definicao, setDefinicao] = useState<string>("relatoria");
  const [ano, setAno] = useState<string>("*");

  const [user, setUser] = useState<Array<userType>>([]);

  useEffect(() => {
    async function fetchUsers() {
      const usersCollectionRef = collection(db, "colaboradores"); // Referência para a coleção 'users'
      const usersSnapshot = await getDocs(usersCollectionRef); // Busca os dados da coleção 'users'
      const fetchedUser: Array<userType> = [];
      usersSnapshot.forEach((doc) => {
        const { id, ...rest } = doc.data() as userType; // Extrai a propriedade 'identificador' e o restante das propriedades do documento
        fetchedUser.push({ id: doc.id, ...rest }); // Atualiza o estado 'user' com os dados buscados
      });
      setUser(fetchedUser); // Atualiza o estado 'user' com os dados buscados
    }
    fetchUsers(); // Chama a função 'fetchUsers' para buscar os dados usando o hook useEffect
  }, []);

  const filteredValues = (filterValue: string): procType[] => {
    if (!data) {
      return [];
    }
    if (filterValue === "*") {
      return data;
    } else {
      return data.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === filterValue.toLowerCase()
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

  const pieData: PieChartData[] = [];

  const assessorData = [];
  const colors = ["#c6e0b4", "#b4c6e7", "#ffe699", "#dbdbdb", "#f8cbad", "#bdd7ee", "#cccc00", "#ffccff", "#66ff99", "#99ffcc", "#a6a6a6",];

  for (let i = 1; i <= 10; i++) {
    const filteredData = filteredValues(definicao).filter((Processo) => Processo.assessor === i);
    assessorData.push(filteredData);
    const pieChartData: PieChartData = {
      label: findAssessor(i) ?? "",
      value: filteredData.length,
      color: colors[i - 1],
    };
    pieData.push(pieChartData);
  }

  const pieChartRadius: number = 100;
  const strokeWidth: number = 3;

  const handleSelectChange = (value: string) => {
    setDefinicao(value);
  };

  
    let filteredData = filteredValues(definicao);
    const meta = filteredData.filter((Processo) => Processo.meta === "sim").length;
    const prioridade = filteredData.filter((Processo) => Number(Processo.prioridade) === 1).length;
    const vinculado = filteredData.filter((Processo) => Processo.vinculado === "PRINCIPAL" || Processo.vinculado === "principal").length;
    
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
    }};

  const handleDetalheClick = (index: Array<procType>) => () => {
    const resultContainer = document.getElementById("result-container") as HTMLDivElement;
    if (index.length > 0) {
      resultContainer.innerHTML = ''; 

      index.forEach((item) => {
      const processNumberDiv = document.createElement('div') as HTMLDivElement;
      processNumberDiv.classList.add('process-number');
      processNumberDiv.innerHTML = `${item.processo}`; 
      resultContainer.appendChild(processNumberDiv);
      });
    } else {
      resultContainer.innerHTML = 'Usuário não tem processos atribuídos nesta definição';
    }
    console.log();
  };

  return (
    <>
      <div className="painel-container">

      <div className="filter-container">
              <SelectLocation onSelectChange={handleSelectChange} />
              <select
                className="ano"
                onChange={handleAnoChange}
                defaultValue={"*"}
              >
                <option value="*"> Anos </option>
                {Array.from({ length: 41 }, (_, index) => 1990 + index).map(
                  (ano) => (
                    <option key={ano} value={ano}>
                      
                      {ano}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="cards">
            <Card
              name="Processos"
              value={filteredData.length}
              text="Quantidade de processos no total"
              id={verificaPrioridade(filteredData.length)}
            />
            <Card
              name="Meta"
              value={meta}
              text="Processos em meta"
              id={verificaPrioridade(meta)}
            />
            <Card
              name="Prioridade"
              value={prioridade}
              text="Processos em prioridade"
              id={verificaPrioridade(prioridade)}
            />
            <Card
              name="Vinculado"
              value={vinculado}
              text="Processos Principais"
              id={verificaPrioridade(vinculado)}
            />
          </div>

        <div className="pie-chart-container">
          <div className="pie-chart">

              <PieChart
                data={pieData}
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
                return null; 
              }
            })}
          </div>
          <div className="column" id="result-container">
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
      <div className="app">
        <Navigation />
        <div className="main-content">
          <Header subtitle="Painel" onLogOut={props.onLogOut} />
          <Page />
        </div>
      </div>
    </>
  );
}

export default Painel;
