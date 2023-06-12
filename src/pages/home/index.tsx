import Header from "../../assets/components/header/Header.tsx"; 

function Authentication() {
    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Endereço de email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Senha</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Lembrar-me</label>
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </>
    );
}

function Home() {
    return (
      
        <>
            <Header title="Controle E-Contas" subtitle="Página Principal"/>
        </>

    );
}

export default Home;