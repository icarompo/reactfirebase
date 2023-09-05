import { FormEvent, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../@/components/ui/alert-dialog";

import "./styles.css";
interface LoginProps {
  onLogIn: () => void;
}

const Login = ({ onLogIn }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(email.trim() === "" || password.trim() === "")) {
      try {
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        onLogIn();
      } catch (error) {
        console.log(error);
        alert("Email ou senha incorretos");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={login}>
        <h1>Login</h1>
        <h2>Controle E-Contas</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Insira o email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Insira a Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AlertDialog>
          <AlertDialogTrigger>
            <button className="login-button" type="submit">
              Login
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Alert title</AlertDialogTitle>
              <AlertDialogDescription>Sucesso ao logar</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
};

export default Login;
