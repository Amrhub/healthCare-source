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
    clearAlert: (state) => {
      state.open = false;
      state.message = '';
      state.type = undefined;
    },
  },
});

export const { clearAlert, setAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
