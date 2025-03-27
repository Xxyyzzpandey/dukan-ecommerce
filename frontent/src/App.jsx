import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/showproduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/productdetails";
import Navbar from "./components/navbar";
import SearchProduct from "./components/product/searchproduct";
import Register from "./components/user/register";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import Login from "./components/user/login";
import Profile from "./components/user/profile";
import Cart from './components/cart'
import Address from './components/address'
import Checkout from './components/checkout'
import OrderConfirmation from './components/orderconformation'

const App = () => {
  // const {} = useContext(AppContext)
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/oderconfirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
