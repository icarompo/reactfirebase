import { useState } from "react";
import { format } from "date-fns";
import { useContext } from "react";
import GlobalContext from "../../context/globalContext.ts";
import StyledDataGrid from "../../components/DataGrid.tsx";
import SelectLocation from "../../components/Select.tsx";

import AddModal from "./AddModal.tsx";
import EditModal from "./EditModal.tsx";
import FilterModal from "./FilterModal.tsx";

function Processes() {
  type dataType = {
    id: string;
    processo: number;
    assunto: string;
    data: Date;
    dataDecisao: Date;
    assessor: number;
    entidade: string;
    vinculado: string;
    dias: number;
    conselheiro: string;
    orgaoJulgador: string;
    encaminhamento: string;
    definicao: string;
    meta: string;
    prioridade: string;
  };

  const data = useContext(GlobalContext);

  const filteredValues = (filterValue: string): dataType[] => {
    if (!data.procData) {
      return [];
    }
    if (filterValue === "*") {
      return data.procData;
    } else {
      return data.procData.filter(
        (Processo) =>
          Processo.definicao &&
          Processo.definicao.toLowerCase() === filterValue.toLowerCase()
      );
    }
  };

  const [definitionValue, setDefinitionValue] = useState("relatoria");

  const handleSelectChange = (value: string) => {
    setDefinitionValue(value);
  };


  return (
    <section className="flex flex-col gap-3">
      <div className="p-1 bg-primary w-fit h-9 rounded flex flex-row gap-2">
        <SelectLocation onSelectChange={handleSelectChange} />
        <div className="w-fit flex flex-row items-center justify-center gap-3">
          <AddModal />
          <EditModal />
          <FilterModal />
        </div>
      </div>
      <StyledDataGrid
        checkboxselection={false}
        disablerowselection={true}
        rows={filteredValues(definitionValue)}
        columns={[
          { field: "processo", headerName: "Processo", width: 75 },
          { field: "assunto", headerName: "Assunto", width: 300 },
          { field: "assessor", headerName: "Assessor", width: 75 },
          {
            field: "data",
            headerName: "Data de inserção",
            width: 125,
            valueGetter: (params) => {
              const timestamp = params.row.data;
              const date = new Date(timestamp.seconds * 1000);
              return format(date, "dd/MM/yyyy");
            },
          },
          {
            field: "dataDecisao",
            headerName: "Data de decisão",
            width: 125,
            valueGetter: (params) => {
              const timestamp = params.row.dataDecisao;
              const date = new Date(timestamp.seconds * 1000);
              return format(date, "dd/MM/yyyy");
            },
          },
          { field: "entidade", headerName: "Entidade", width: 300 },
          { field: "vinculado", headerName: "Vinculado", width: 100 },
          { field: "conselheiro", headerName: "Conselheiro", width: 75 },
          { field: "julgador", headerName: "Julgador", width: 75 },
          {
            field: "orgaoJulgador",
            headerName: "Órgão Julgador",
            width: 100,
          },
          {
            field: "encaminhamento",
            headerName: "Encaminhamento",
            width: 100,
          },
          { field: "definicao", headerName: "Definição", width: 100 },
          { field: "dias", headerName: "Dias", width: 50 },
          { field: "meta", headerName: "Meta", width: 75 },
          { field: "prioridade", headerName: "Prioridade", width: 75 },
        ]}
      />
    </section>
  );
}

export default Processes;
