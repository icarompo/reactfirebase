import Header from "../../components/header/Header.tsx";
import Navigation from "../../components/navigation/Navigation.tsx";
import "./styles.css";

function Page() {
  return (
    <div className="page">
      </div>
  )
}
interface HomeProps {
  onLogOut: () => void;
}

function Home({ onLogOut }: HomeProps): JSX.Element {
  return (
    <>
      <div className="app">
        <Navigation />
        <div className="main-content">
          <Header subtitle="Página Principal" onLogOut={onLogOut} />
      <Page />
        </div>
      </div>
    </>
  );
}

export default Home;
