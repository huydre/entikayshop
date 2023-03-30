import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import ProductDetails from '../pages/ProductDetails';
import Shop from '../pages/Shop';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import AddProducts from '../admin/AddProducts';
import AllProducts from '../admin/AllProducts';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';
import EditProduct from '../admin/EditProduct';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />

      <Route path='/*' element={<ProtectedRoute/>} >
        <Route path='checkout' element={<Checkout/>} />  
        <Route path='dashboard' element={<Dashboard/>} />  
        <Route path='dashboard/all-products' element={<AllProducts/>} />  
        <Route path='dashboard/add-products' element={<AddProducts/>} />  
        <Route path='dashboard/users' element={<Users/>} />  
        <Route path='dashboard/edit-product/:id' element={<EditProduct/>} />  
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

    </Routes>
  );
}

export default Routers;
