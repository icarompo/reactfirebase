import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export default function CustomizedSnackbars(props: Props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '20%' }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
      <Alert severity={props.severity}>{props.message}</Alert>
      </Snackbar>
    </Stack>
  );
}