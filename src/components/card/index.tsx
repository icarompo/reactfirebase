
import './styles.css'

interface CardProps {
    name: string;
    value: number;
    text: string;
    id: string;
    onClick: (tipo: string) => void;
}

function Card(props: CardProps) {

  const handleClick = () => {
    props.onClick('');
  }

const verificaCorCorpo = (id: string) => {
  if (id === "type-high-priority") {
    return "card-body-high-priority"
  } if (id === "type-middle-priority") {
    return "card-body-middle-priority"
  } else {
    return "card-body-low-priority"
  }
}

  return (
    <div className="card" id={verificaCorCorpo(props.id)} onClick={handleClick}>
     <h3 className='name-title' id={props.id}>{props.name}</h3>
     <h1 className='value'>{props.value}</h1>
     <p className='text'>{props.text}</p>
    </div>
  );
}

export default Card;