import Header from "../../components/header/Header.tsx"; 
import Navigation from "../../components/navigation/Navigation.tsx"; 

interface HomeProps {
    onLogOut: () => void;
  }

function Home({ onLogOut } : HomeProps): JSX.Element {
    return (
      
        <>
            <Header title="Controle E-Contas" subtitle="Página Principal" onLogOut={onLogOut}/>
            <Navigation />
        </>

    );
}

export default Home;