import { FormEvent, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import CustomizedSnackbars from '../../components/Snackbar/Snackbar';
interface LoginProps {
  onLogIn: () => void;
}

const Login = ({ onLogIn }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); 
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(email.trim() === '' || password.trim() === '')) {
      try {
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        onLogIn();
      } catch (error) {
        console.log(error);
        setError('Email ou senha incorretos');
      }
    } else {
      setError('Preencha todos os campos');
    }
  };

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center">
    <form className="bg-white shadow-md rounded p-8 login-form" onSubmit={login}>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <h2 className="text-sm text-gray-600 mb-6">Controle e-Contas</h2>
      <input
        className="w-full py-2 px-4 border rounded mb-4 login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full py-2 px-4 border rounded mb-4 login-input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded login-button hover:bg-secondary"
        type="submit"
      >
        Login
      </button>
    </form>
    {error && <CustomizedSnackbars message={error} severity="error" />}
  </div>
  
  );
};

export default Login;