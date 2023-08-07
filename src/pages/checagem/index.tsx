import Header from "../../components/header/Header.tsx"; 
import Navigation from "../../components/navigation/Navigation.tsx"; 

interface CheckProps {
    onLogOut: () => void;
}

function Check({ onLogOut } : CheckProps): JSX.Element {
    return (
        <>
            <Header title="Controle E-Contas" subtitle="Página de Checagem" onLogOut={onLogOut}/>
            <Navigation />
        </>
    );
}

export default Check;