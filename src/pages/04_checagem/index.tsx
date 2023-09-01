import Header from "../../components/header/Header.tsx"; 
import Navigation from "../../components/navigation/Navigation.tsx"; 

interface CheckProps {
    onLogOut: () => void;
}

function Check({ onLogOut } : CheckProps): JSX.Element {
    return (
        <>      
        <div className="app">
        <Navigation />
        <div className="main-content">
          <Header subtitle="Página de Checagem" onLogOut={onLogOut}/>
            </div>
        </div>
        </>
    );
}

export default Check;