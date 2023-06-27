import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;
