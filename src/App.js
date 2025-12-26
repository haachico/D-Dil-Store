import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Intro from "./Pages/Intro";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import ProtectedRoute from "./Components/ProtectedRoute";
// import Login from "./Pages/Login";
import Reviews from "./Pages/Reviews";
import About from "./Pages/About";
import HostLayout from "./Components/HostLayout";
import Electronics from "./Pages/Electronics";
import Cosmetics from "./Pages/Cosmetics";
import Groceries from "./Pages/Groceries";
import HomeDecor from "./Pages/HomeDecor";
import DetailsPage from "./Pages/DetailsPage";
import Checkout from "./Pages/Checkout";
import Error from "./Pages/Error";
import Signup from "./Pages/auth/Signup";
import Login from "./Pages/auth/Login";

export default function App() {
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="auth" element={<Login />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="cosmetics" element={<Cosmetics />} />
            <Route path="groceries" element={<Groceries />} />
            <Route path="homedecor" element={<HomeDecor />} />
            <Route path="products/:productId" element={<DetailsPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} />
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Reviews />} />
              <Route path="about" element={<About />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}
