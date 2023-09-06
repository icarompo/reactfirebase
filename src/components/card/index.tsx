import "./styles.css";

interface CardProps {
  name: string;
  value: number;
  text: string;
  id: string;
}

function Card(props: CardProps) {

  const verificaCorCorpo = (id: string) => {
    if (id === "card-header-high-priority") {
      return "card-body-high-priority";
    }
    if (id === "card-header-middle-priority") {
      return "card-body-middle-priority";
    } else {
      return "card-body-low-priority";
    }
  };

  return (
    <div className="card">
      <div className="card-header" id={props.id}>
        <h3 className="name-title">{props.name}</h3>
      </div>
      <div className="card-body" id={verificaCorCorpo(props.id)}>
        <h1 className="value">{props.value}</h1>
        <p className="text">{props.text}</p>
      </div>
    </div>
  );
}

export default Card;
