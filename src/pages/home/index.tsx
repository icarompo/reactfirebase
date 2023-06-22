import Header from "../../components/header/Header.tsx"; 

interface HomeProps {
    onLogOut: () => void;
  }

function Home({ onLogOut } : HomeProps): JSX.Element {
    return (
      
        <>
            <Header title="Controle E-Contas" subtitle="Página Principal" onLogOut={onLogOut}/>
        </>

    );
}

export default Home;