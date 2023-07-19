
import './styles.css'

interface CardProps {
    name: string;
    value: number;
    text: string;
    id: string;
}

function Card({name, value, text, id}: CardProps) {

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
    <div className="card" id={verificaCorCorpo(id)}>
     <h3 className='name-title' id={id}>{name}</h3>
     <h1 className='value'>{value}</h1>
     <p className='text'>{text}</p>
    </div>
  );
}

export default Card;