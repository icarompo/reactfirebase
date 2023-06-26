import Header from "../../components/header/Header.tsx"; 

interface PainelProps {
    onLogOut: () => void;
}

function Painel({ onLogOut } : PainelProps): JSX.Element {
    return (
        <>
            <Header title="Controle E-Contas" subtitle="Painel" onLogOut={onLogOut}/>
        </>
    );
}

export default Painel;