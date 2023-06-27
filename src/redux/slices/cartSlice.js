import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';
import useAuth from '../../custom-hooks/useAuth';
import { doc } from 'firebase/firestore';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice)
            + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity),0);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id)
        state.totalQuantity = state.totalQuantity - existingItem.quantity 
      }
  
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity),0);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      state.totalQuantity = state.totalQuantity + 1;
      existingItem.quantity ++;
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity),0);
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem.quantity > 1) {
        state.totalQuantity = state.totalQuantity - 1;
        existingItem.quantity --;
      }
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity),0);
    },
    extraReducers: (builder) => {
      builder.addCase(fetchCartFromFirestore.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.totalQuantity = initialState.totalQuantity;
        state.totalAmount = initialState.totalAmount;
      });
      builder.addCase(fetchCartFromFirestore.rejected, (state, action) => {
        console.error('Failed to fetch cart data from Firestore:', action.payload);
      });
    },
    updateCart: (state, action) => {
      const cartData = action.payload;

      if (cartData) {
        state.cartItems = cartData.cartItems || [];
        state.totalAmount = cartData.totalAmount || 0;
        state.totalQuantity = cartData.totalQuantity || 0;
      } else {
        // Nếu không có dữ liệu giỏ hàng, đặt về trạng thái ban đầu
        state.cartItems = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
      }
    },
  },
});

export const fetchCartFromFirestore = createAsyncThunk(
  'cart/fetchCartFromFirestore',
  async (_, { rejectWithValue }) => {
    try {
      const {currentUser} = useAuth()
      const cartSnapshot = await getDocs(doc(db, 'carts', currentUser.uid));
      const cartData = cartSnapshot.exists() ? cartSnapshot.data() : null;
      return cartData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
