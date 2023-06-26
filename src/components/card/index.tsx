
import './styles.css'

interface CardProps {
    name: string;
    value: number;
    text: string;
}

function Card({name, value, text}: CardProps) {

  return (
    <div className="card">
     <h3 className='name-title'>{name}</h3>
     <h1 className='value'>{value}</h1>
     <p className='text'>{text}</p>
    </div>
  );
}

export default Card;