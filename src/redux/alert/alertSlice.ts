import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  message: string;
  type: AlertColor | undefined;
  open: boolean;
}

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    message: '',
    type: undefined,
    open: false,
  } as IState,
  reducers: {
    setAlert: (state, action: PayloadAction<{ message: string; type: AlertColor }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.open = true;
    },
    hideAlert: (state) => {
      state.open = false;
    }
  },
});

export const { setAlert, hideAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
