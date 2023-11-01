import { useState } from "react";

type SelectLocationProps = {
  onSelectChange: (value: string) => void;
};

function SelectLocation(props: SelectLocationProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const colorRange = [
    ["bg-[#04b4f4] hover:bg-[#0390c9] text-[#ffffff]"],//relatoria
    ["bg-[#cc99ff] hover:bg-[#b380e0] text-[#ffffff]"],//sobrestad
    ["bg-[#fc9c34] hover:bg-[#e68a00] text-[#ffffff]"],//tramitando
    ["bg-[#9c3404] hover:bg-[#7f2c03] text-[#ffc000]"],//finalizado
    ["bg-[#03467d] hover:bg-[#1f2d6e] text-[#ffffff]"] //todos
]
  

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value);
    if (event.target.value === "sim") {
      setSelectedColor(3);
    } else if (event.target.value === "TRAMIT.") {
      setSelectedColor(2);
    } else if (event.target.value === "sobrest.") {
      setSelectedColor(1);
    } else if (event.target.value === "relatoria") {
      setSelectedColor(0);
    } else {
      setSelectedColor(4);
    }
  };

  return (
    <div>
      <select
        className={`${colorRange[selectedColor]} w-32 h-7 rounded-md cursor-pointer`}
        onChange={handleChange}
      >
        <option className={`${colorRange[4]}`} value="*">Todos</option>
        <option className={`${colorRange[3]}`} value="sim">Finalizados</option>
        <option className={`${colorRange[2]}`} value="TRAMIT.">Tramitando</option>
        <option className={`${colorRange[1]}`} value="sobrest.">Sobrestado</option>
        <option className={`${colorRange[0]}`} value="relatoria">Relatoria</option>
      </select>
    </div>
  );
}

export default SelectLocation;
