import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface StyledDataGridProps {
  rows: any[];
  columns: GridColDef[];
  checkboxselection: boolean;
  disablerowselection: boolean;
}

const StyledDataGrid = (props: StyledDataGridProps) => {
  return (
    <div className='w-full h-full'>
      <DataGrid
        autoHeight
        sx={{ width: '100%', overflowX: 'scroll'}}
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columnBuffer={5}
        pageSizeOptions={[5]}
        disableVirtualization
        checkboxSelection={props.checkboxselection}
        disableRowSelectionOnClick={props.disablerowselection}
      />
      </div>
  );
}

export default StyledDataGrid;