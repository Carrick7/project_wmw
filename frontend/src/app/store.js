import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import shopping_listReducer from '../features/shopping_lists/shopping_listSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    shopping_lists: shopping_listReducer,
  },
});