import { useState, useEffect } from "react";
import { db } from "../../api/firebase-config.ts";
import { collection, getDocs, query } from "firebase/firestore";
import Header from "../../components/header/Header.tsx"; 

  function Painel() {

    type TipoUsuario = {
        id: string,
        nome: string,
        email: string,
        senha: string,
        tipo: string,
    }

    const [usuarios, setUsuarios] = useState<Array<TipoUsuario>>([]);
    useEffect(() => {
        async function fetchData() {
          const usersCollectionRef = collection(db, 'colaboradores'); 
          const userQuery = query(usersCollectionRef);
          const userSnapshot = await getDocs(userQuery);
          const fetchedData: Array<TipoUsuario> = []; 
          userSnapshot.forEach((doc) => { 
            const { id, ...rest } = doc.data() as TipoUsuario; 
            fetchedData.push({ id: doc.id, ...rest }); 
          });
          setUsuarios(fetchedData); 
        }
      
        fetchData(); 
      }, []);

      const handleClick = () => {
        const pessoaldiv = document.querySelector('.personal-container') as HTMLDivElement;
        pessoaldiv.innerHTML = `${(usuarios.map((usuario) => {
          return (
            `<div class="personal-card">
              <h1>${usuario.nome}</h1>
              <h1>${usuario.email}</h1>
              <h1>${usuario.tipo}</h1>
            </div>`
          );
        })).join('')}`
        console.log(usuarios);
      }

    type TipoDado = {
      id: string,
      proc: number,
      ano: number,
      assunto: string,
      data: Date,
      datadecisao: Date,
      assessor: number,
      entidade: string,
      vinculado: string,
      conselheiro: string,
      orgaoJulgador: string,
      encaminhamento: string,
      definicao: string,
      meta: string,
    }

    const [dados, setDados] = useState<Array<TipoDado>>([]);
    useEffect(() => {
        async function fetchData() {
          const usersCollectionRef = collection(db, 'dados'); // Referência para a coleção 'dados'
          const dadosQuery = query(usersCollectionRef);
          const dadosSnapshot = await getDocs(dadosQuery); // Busca os dados da coleção 'dados'
          const fetchedData: Array<TipoDado> = []; // Cria um array para armazenar os dados buscados
          dadosSnapshot.forEach((doc) => { // Percorre os documentos retornados
            const { id, ...rest } = doc.data() as TipoDado; // Extrai a propriedade 'id' e o restante das propriedades do documento
            fetchedData.push({ id: doc.id, ...rest }); // Adiciona o documento ao array de dados buscados
          });
          setDados(fetchedData); // Atualiza o estado 'dado' com os dados buscados
        }
      
        fetchData(); // Chama a função 'fetchData' para buscar os dados usando o hook useEffect
      }, []);

    return (
        <>
            <div className="personal-container">
      <button type="button" onClick={handleClick}></button>

            </div>
        </>
    );
}

function Personal() {
    return (
        <>
            <Header title="Controle E-Contas" subtitle="Página Pessoal"/>
            <Painel/>
        </>
    );
}

export default Personal;