import AddIcon from "@material-ui/icons/Add";
import CustomDialog from "../../../../components/dialog";
import { useState } from "react";

function AddDialog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        {<AddIcon />}
        </button>
      <CustomDialog
        open={open}
        onClose={setOpen}
        title="Título Personalizado"
        content="Conteúdo Personalizado"
      />
    </>
  );
}

export default AddDialog;