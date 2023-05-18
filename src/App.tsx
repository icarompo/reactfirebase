import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 10000000000000);
  }

  return (
    <div>
      <h1>Counters that update simultaneously</h1>
      <MyButton count={count} onClick={handleClick}/>
      <MyButton count={count} onClick={handleClick}/>
    </div>
  );
}

export default App

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}