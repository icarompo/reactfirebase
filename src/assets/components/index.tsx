import { useState, useEffect } from "react";
import { db } from "../lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
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

function Input({ title }: { title: string }) {
  return <input type="text" id={title} />;
}

function MyTable() {

  const [dado, setDado] = useState<any[]>([]);
  const usersCollectionRef = collection(db, 'dados');

  useEffect(() => {
    const getDados = async () => {
      const data = await getDocs(usersCollectionRef);
      setDado(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })));
    }

    getDados();
  }, [])

  return (
    
    <>
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid sx={
        {
          backgroundColor: '#fff',
          color: '#000',
        }
      } rows={dado} columns={
        [
          { field: 'proc', headerName: 'Processo', width: 150 },
          { field: 'ano', headerName: 'Ano', width: 150 },
          { field: 'assunto', headerName: 'Assunto', width: 150 },
          { field: 'data',  headerName: 'Data de inserção', width: 150 },
          { field: 'datadecisao', headerName: 'Data de decisão', width: 150 },
          { field: 'assessor', headerName: 'Assessor', width: 150 },
          { field: 'entidade', headerName: 'Entidade', width: 150 },
          { field: 'vinculado', headerName: 'Vinculado', width: 150 },
          { field: 'conselheiro', headerName: 'Conselheiro', width: 150 },
          { field: 'julgador', headerName: 'Órgão Julgador', width: 150 },
          { field: 'encaminhamento', headerName: 'Encaminhamento', width: 150 },
          { field: 'definicao', headerName: 'Definição', width: 150 },
          { field: 'meta', headerName: 'Meta', width: 150 },
        ]
      } />
    </div>

    </>
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
