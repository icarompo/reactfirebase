import LoadingScreen from "../../components/LoadingScreen";

function Home() {
  return (
    <div className="page">
      <LoadingScreen />
      <h1 className="font-content text-3xl">Controle e-Contas</h1>
      <h2 className="font-content text-lg">Seja bem-vindo!</h2>
      <p className="font-content text-lg">
        Para começar, selecione uma das opções no menu lateral.
      </p>
    </div>
  );
}

export default Home;
