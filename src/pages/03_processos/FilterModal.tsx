import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import StyledModal from "../../components/Modal";
import { Tooltip } from "@mui/material";

const AddModal = () => {
  return (
    <StyledModal
      icon={
        <Tooltip title="Filtrar Processos">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-300 hover:text-white hover:scale-110" />
        </Tooltip>
      }
    >
      <div className="">Opa</div>
    </StyledModal>
  );
};

export default AddModal;
