import AddIcon from "@material-ui/icons/Add";
import CustomDialog from "../../../../components/dialog";
import { useState } from "react";

function AddDialog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const title = 'Adcionar Processo';

  const content = (
    <>
      <form>
        <label>
          Nome:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );

  return (
    <>
      <button className="filter-button" type="button" onClick={handleOpen}>
        {<AddIcon />}
        </button>
      <CustomDialog
        open={open}
        onClose={setOpen}
        title={title}
        content={content}      
        />
    </>
  );
}

export default AddDialog;