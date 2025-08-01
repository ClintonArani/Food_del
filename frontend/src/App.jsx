import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
       <ToastContainer />
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
