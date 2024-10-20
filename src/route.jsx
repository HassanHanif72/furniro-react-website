import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import ProductComparison from "./pages/ProductComparison"; // Fixed casing
import LoginForm from "./pages/Login";
import SignUp from "./pages/Signup";
import ProductDetails from "./components/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import AdminPanel from "./pages/AdminPanel";
import ToShip from "./pages/ToShip";

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} /> {/* Changed to lowercase */}
        <Route path="/signup" element={<SignUp />} /> {/* Changed to lowercase */}
        <Route path="/about" element={<About />} /> {/* Changed to lowercase */}
        <Route path="/shop" element={<Shop />} /> {/* Changed to lowercase */}
        <Route path="/contact" element={<Contact />} /> {/* Changed to lowercase */}
        <Route path="/cart" element={<Cart />} /> {/* Changed to lowercase */}
        <Route path="/wishlist" element={<Wishlist />} /> {/* Changed to lowercase */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/adminpanel" element={<AdminPanel />} /> {/* Changed to lowercase */}
        <Route path="/toshop" element={<ToShip />} /> {/* Changed to lowercase */}
        <Route path="/productcomparison" element={<ProductComparison />} /> {/* Fixed casing */}
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Changed to lowercase */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
