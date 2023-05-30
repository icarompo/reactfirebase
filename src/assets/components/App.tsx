import { useState, useEffect } from "react";
import { db } from "../lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import TableFilter from "./filter";
import '../styles/css/App.css';

const ODD_OPACITY = 0.1;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

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


function Table() {

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
      <StripedDataGrid sx={
        {
          backgroundColor: '#fff',
          color: '#000',
        }
      }rows={dado
      }getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }columns={
        [
          { field: 'proc', headerName: 'Processo', width: 75 },
          { field: 'ano', headerName: 'Ano', width:   75 },
          { field: 'assunto', headerName: 'Assunto', width: 350 },
          { field: 'data',  headerName: 'Data de inserção', width: 125 },
          { field: 'datadecisao', headerName: 'Data de decisão', width: 125 },
          { field: 'assessor', headerName: 'Assessor', width: 75 },
          { field: 'entidade', headerName: 'Entidade', width: 350 },
          { field: 'vinculado', headerName: 'Vinculado', width: 100 },
          { field: 'conselheiro', headerName: 'Conselheiro', width: 100 },
          { field: 'julgador', headerName: 'Órgão Julgador', width: 100 },
          { field: 'encaminhamento', headerName: 'Encaminhamento', width: 100 },
          { field: 'definicao', headerName: 'Definição', width: 100 },
          { field: 'meta', headerName: 'Meta', width: 75 },
        ]
      } 
      checkboxSelection
      disableRowSelectionOnClick
      />
    </div>
    </>
  );
}

function MainPage() {
  return (
    <>
      <Header title="Controle E-Contas" />
      <TableFilter />
      <Table />
    </>
  );
}

export default MainPage;
