import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { alertReducer } from './alert/alertSlice';
import { userReducer } from './users/users';

export const baseUrl = 'http://localhost:3000/';
export const apiVersion = 'api/v1/';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
