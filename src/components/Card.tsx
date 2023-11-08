
interface CardProps {
  name: string;
  value: number;
  text: string;
  id: string;
}

function Card(props: CardProps) {
  const verificaCorCorpo = (id: string) => {
    if (id === "card-header-high-priority") {
      return "bg-red-600 text-white";
    }
    if (id === "card-header-middle-priority") {
      return "bg-yellow-500 text-white";
    } else {
      return "bg-green-500 text-white";
    }
  };

  return (
    <div className={`bg-white rounded p-4 max-w-xs mx-auto ${verificaCorCorpo(props.id)}`}>
      <h3 className="text-lg font-semibold">{props.name}</h3>
      <h1 className="text-3xl font-bold mt-2">{props.value}</h1>
      <p className="text-sm text-center mt-2">{props.text}</p>
    </div>
  );
}

export default Card;
