import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { alertReducer } from './alert/alertSlice';
import { commentReducer } from './comments/commentSlice';
import { postReducer } from './stories/storySlice';
import { userReducer } from './users/users';

export const baseUrl = 'https://healthcare-system-api.herokuapp.com/';
// https://healthcare-system-api.herokuapp.com/ production URL
export const apiVersion = 'api/v1/';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
