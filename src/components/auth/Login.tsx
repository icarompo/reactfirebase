import { FormEvent, useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, inMemoryPersistence } from 'firebase/auth';
import userContext, { fetchUserData } from '../../context/userContext.ts';
import dataContext, { fetchData } from '../../context/dataContext.ts';
import './styles.css';
interface LoginProps {
  onLogIn: () => void;
}

const Login = ({ onLogIn }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setData } = useContext(dataContext);
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(email.trim() === '' || password.trim() === '')) {
      try {
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        onLogIn();
        try {
        fetchData(setData);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
        alert('Email ou senha incorretos');
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={login}>
        <h1>Login</h1>
        <h2>Controle E-Contas</h2>
        <input
          className='login-input'
          type='email'
          placeholder='Insira o email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='login-input'
          type='password'
          placeholder='Insira a Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
