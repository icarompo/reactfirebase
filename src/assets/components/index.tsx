import { useState, useEffect } from "react";
import { db } from "../lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { alpha, styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

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

function SearchProcessButton() {
  return (
    <Button
      style={{
        marginLeft: '10px',
        backgroundColor: '#e0e0e0', 
      }}
      variant="contained"
      startIcon={<SearchIcon />}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#a0a0a0'; 
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#e0e0e0'; 
      }}
    >
      Pesquisar Processo
    </Button>
  );
}
function AddProcessButton() {
  return (
    <Button
      style={{
        marginLeft: '10px',
        backgroundColor: '#00cc00',
      }}
      variant="contained"
      
      startIcon={<AddIcon />}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#009900'; 
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#00cc00'; 
      }}
    >
      Adicionar Processo
    </Button>
  );
}

function DeleteProcessButton() {
  return (
    <Button
      style={{
        marginLeft: '10px',
        backgroundColor: '#ff3333',
      }}
      variant="contained"
      startIcon={<DeleteIcon />}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#ff0000'; 
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#ff3333';
      }}
    >
     Excluir Processo 
    </Button>
  );
}

function TableFilter() {
  return (
    <div className="div" id="filter">
      <SearchProcessButton />
      <AddProcessButton />
      <DeleteProcessButton />
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
      } />
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
