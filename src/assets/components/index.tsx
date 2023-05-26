import { useState, useEffect } from "react";
import { db } from "../lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps): JSX.Element {
  return (
    <div className="div">
      <h1>{title}</h1>
    </div>
  );
}

function Label({ title }: { title: string }) {
  return <label htmlFor={title}>{title}</label>;
}

function MyTable() {

  const [dado, setDado] = useState([]);
  const usersCollectionRef = collection(db, 'dados');


  useEffect(() => {
    const getDados = async () => {
      const data = await getDocs(usersCollectionRef);
      setDado((data.docs.map((doc: any) => ({ ...doc.data(), proc: doc.id }))) as any);
    }
    getDados();
  }, [])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Label title="Processo" /></TableCell>
            <TableCell><Label title="Ano" /></TableCell>
            <TableCell><Label title="Assunto" /></TableCell>
            <TableCell><Label title="Data" /></TableCell>
            <TableCell><Label title="Data de inserção" /></TableCell>
            <TableCell><Label title="Data de decisão" /></TableCell>
            <TableCell><Label title="Assessor" /></TableCell>
            <TableCell><Label title="Entidade" /></TableCell>
            <TableCell><Label title="Vinculado" /></TableCell>
            <TableCell><Label title="Conselheiro" /></TableCell>
            <TableCell><Label title="Órgão Julgador" /></TableCell>
            <TableCell><Label title="Encaminhamento" /></TableCell>
            <TableCell><Label title="Definição" /></TableCell>
            <TableCell><Label title="Prioridade" /></TableCell>
            <TableCell><Label title="Meta" /></TableCell>
            <TableCell><Label title="Aguardando" /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><input type="text" id="processo" name="processo" /></TableCell>
            <TableCell><input type="text" id="ano" name="ano" /></TableCell>
            <TableCell><input type="text" id="assunto" name="assunto" /></TableCell>
            <TableCell><input type="date" id="data" name="data" /></TableCell>
            <TableCell><input type="date" id="data-insercao" name="data-insercao" /></TableCell>
            <TableCell><input type="date" id="data-decisao" name="data-decisao" /></TableCell>
            <TableCell><input type="text" id="assessor" name="assessor" /></TableCell>
            <TableCell><input type="text" id="entidade" name="entidade" /></TableCell>
            <TableCell><input type="text" id="vinculado" name="vinculado" /></TableCell>
            <TableCell><input type="text" id="conselheiro" name="conselheiro" /></TableCell>
            <TableCell><input type="text" id="orgao-julgador" name="orgao-julgador" /></TableCell>
            <TableCell><input type="text" id="encaminhamento" name="encaminhamento" /></TableCell>
            <TableCell><input type="text" id="definicao" name="definicao" /></TableCell>
            <TableCell><input type="text" id="prioridade" name="prioridade" /></TableCell>
            <TableCell><input type="text" id="meta" name="meta" /></TableCell>
            <TableCell><input type="text" id="aguardando" name="aguardando" /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function DataTable(): JSX.Element {
  return (
    <section className="div">
      <MyTable />
    </section>
  );
}

function MainPage() {
  return (
    <>
      <Header title="Controle E-Contas" />
      <DataTable />
    </>
  );
}

export default MainPage;
