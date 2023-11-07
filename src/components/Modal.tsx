import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import '@heroicons/react/24/solid'

interface StyledModalProps {
    icon: any;
    children: React.ReactNode;
}

const StyledModal = (props: StyledModalProps) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className=" justify-center items-center" onClick={handleOpen}>
        {props.icon}
      </button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white h-fit shadow-xl w-fit rounded flex items-center justify-center">
        {props.children}
        </div>
      </Modal>
    </div>
  );
}

export default StyledModal;


