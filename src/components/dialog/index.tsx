import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type CustomDialogProps = {
    open: boolean;
    onClose: (value: boolean) => void;
    title: string;
    content: string;
}

export default function CustomDialog(props: CustomDialogProps) {
  const handleClose = () => {
    props.onClose(false);
  };

  return (
    <BootstrapDialog onClose={handleClose} open={props.open} aria-labelledby="customized-dialog-title">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <h3>{props.title}</h3>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <h3>{props.content}</h3>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Salvar Alterações
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}