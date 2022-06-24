import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Fade } from '@mui/material';

import { hideAlert } from '../../redux/alert/alertSlice';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';

export const DisplayAlert = () => {
  const { open, message, type } = useAppSelector(state => state.alert);
  const dispatch = useAppDispatch();

  return (
    <Fade in={open}>
      <Alert
        elevation={1}
        severity={type}
        variant="filled"

        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => dispatch(hideAlert())}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ position: 'fixed', zIndex: '999999', top: '5rem', right: '50%', transform: 'translateX(50%)' }}
      >
        {message}
      </Alert>
    </Fade>
  )
}
