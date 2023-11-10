import { PencilSquareIcon } from "@heroicons/react/24/solid";
import StyledModal from "../../components/Modal";
import { Tooltip } from "@mui/material";

const EditModal = () => {
  return (
    <StyledModal
      icon={
        <Tooltip title="Editar Processo">
          <PencilSquareIcon className="h-5 w-5 text-gray-300 hover:text-white hover:scale-110" />
        </Tooltip>
      }
    >
      <div className="">Opa</div>
    </StyledModal>
  );
};

export default EditModal;
