import { FormEvent, useState } from 'react';
import { auth } from '../../api/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import './styles.css';
import axios from 'axios';

interface LoginProps {
  onSuccess: () => void;
}

const Login = ({onSuccess}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(email.trim() === '' || password.trim() === '')) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        onSuccess();
        navigate('/');

        // Envia o Refresh Token para o servidor para definir o cookie
        const idToken = await userCredential.user.getIdToken(/* forceRefresh */ true);
        axios
          .post('/set-refresh-token', { refreshToken: idToken })
          .then(() => {
            console.log('Refresh Token definido como cookie HttpOnly.');
          })
          .catch((error) => {
            console.log('Erro ao definir o Refresh Token como cookie:', error);
          });
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
            <form onSubmit={login}>
            <h1>Login</h1>
            <h2>Controle E-Contas</h2>
            <input type='email' placeholder='Insira o email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' placeholder='Insira a Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' >Login</button>
            </form>
        </div>
    );
}

export default Login;