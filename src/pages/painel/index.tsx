import Header from "../../components/header/Header.tsx"; 

function Page() {
    return (
        <>
        </>
    );
}

interface PainelProps {
    onLogOut: () => void;
}

function Painel({ onLogOut } : PainelProps): JSX.Element {
    return (
        <>
            <Header title="Controle E-Contas" subtitle="Painel" onLogOut={onLogOut}/>
            <Page />
        </>
    );
}

export default Painel;