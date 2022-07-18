import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import shopping_listReducer from '../features/shopping_lists/shopping_listSlice';
import receipt_listReducer from '../features/receipt_lists/receipt_listSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shopping_lists: shopping_listReducer,
    receipt_lists: receipt_listReducer,
    products: productReducer,
  },
});
