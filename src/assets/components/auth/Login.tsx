import { FormEvent, useState } from 'react';
import { auth } from '../../api/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 

interface LoginProps {
  onSuccess: () => void;
}

const Login = ({onSuccess}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      onSuccess();
      navigate('/');
    }).catch((error) => {
      console.log(error);
    }
    );
  }

    return (
        <div className='login-container'>
            <form onSubmit={login}>
            <h1>Login</h1>
            <input type='email' placeholder='Insira o email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' placeholder='Insira a Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' >Login</button>
            </form>
        </div>
    );
}

export default Login;