import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './users/users';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
