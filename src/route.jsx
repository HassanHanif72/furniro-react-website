import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Productcomparison from "./pages/ProductComparison";
import LoginForm from "./pages/Login";
import SignUp from "./pages/Signup";
import ProductDetails from "./components/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";  // Import ScrollToTop component
import AdminPanel from "./pages/AdminPanel";
import ToShip from "./pages/ToShip";

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop /> {/* Add ScrollToTop here */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="About" element={<About />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Product/:id" element={<ProductDetails />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/ToShip" element={<ToShip />} />
          <Route path="/ProductComparison" element={<Productcomparison />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
