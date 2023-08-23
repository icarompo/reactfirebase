import { useState } from "react"

type SelectLocationProps = {
    onSelectChange: (value: string) => void;
  };
  

function SelectLocation(props: SelectLocationProps) {
    const [selectedOption, setSelectedOption] = useState("relatoria");
    const [selectedId, setSelectedId] = useState("selectRelatoria");
  
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedOption(event.target.value as string);
      props.onSelectChange(event.target.value as string); // Chama a função de callback com o valor selecionado
      if (event.target.value == "relatoria") {setSelectedId("selectRelatoria")}
      else if (event.target.value == "sobrest.") {setSelectedId("selectSobrestado")}
      else if (event.target.value == "TRAMIT.") {setSelectedId("selectTramitando")}
      else if (event.target.value == "sim") {setSelectedId("selectFinalizado")}
      else {setSelectedId("selectTodos")}
    };
  
    return (
      <div>
        <select
          className="select"
          id={selectedId}
          value={selectedOption}
          onChange={handleChange}
        >
          <option id="selectTodos" value="*">Todos</option>
          <option id="selectFinalizado" value="sim">Finalizados</option>
          <option id="selectTramitando" value="TRAMIT.">Tramitando</option>
          <option id="selectSobrestado" value="sobrest.">Sobrestado</option>
          <option id="selectRelatoria" value="relatoria">Relatoria</option>
        </select>
      </div>
    );
  }

export default SelectLocation;