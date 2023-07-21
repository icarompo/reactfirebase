import Header from "../../components/header/Header.tsx";
import PieChart from "../../components/piechart/PieChart";
import "./styles.css"

function Page() {

  interface PieChartData {
    label: string;
    value: number;
    color: string;
  }

  const data: PieChartData[] = [
    { label: "Slice 1", value: 130, color: "aqua" },
    { label: "Slice 2", value: 30, color: "orange" },
    { label: "Slice 3", value: 10, color: "yellow" },
    { label: "Slice 4", value: 0, color: "green" },
    { label: "Slice 5", value: 0, color: "blue" },
    { label: "Slice 6", value: 0, color: "yellow" },
  ];

  const pieChartRadius: number = 100;
  const strokeWidth: number = 3;
 

  return (
    <>
      <div>
      <PieChart data={data} radius={pieChartRadius} strokeWidth={strokeWidth} />
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
      <Header
        title="Controle E-Contas"
        subtitle="Painel"
        onLogOut={onLogOut}
      />
      <Page />
    </>
  );
}

export default Painel;
