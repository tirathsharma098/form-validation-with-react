import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';
import currentUserReducer from './currentUser';

const store = configureStore({
  reducer: {
    users: userReducer, currentUser: currentUserReducer
  },
});

export default store;
