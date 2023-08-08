import Header from "../../components/header/Header.tsx";
import Navigation from "../../components/navigation/Navigation.tsx";
import "./styles.css";

interface HomeProps {
  onLogOut: () => void;
}

function Home({ onLogOut }: HomeProps): JSX.Element {
  return (
    <>

    <div className="app">
        <Navigation />
        <div className="main-content">
          <Header
            subtitle="Página Principal"
            onLogOut={onLogOut}
          />
          <div className="Home"></div>
        </div>
        </div>
    </>
  );
}

export default Home;
