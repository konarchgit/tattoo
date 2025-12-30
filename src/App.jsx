import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FullscreenMenu from './components/FullscreenMenu';
import VerticalShowcase from './components/VerticalShowcase';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import BlogPage from './components/BlogPage';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="App">
          <Navbar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <FullscreenMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <main>
            <Routes>
              <Route path="/" element={<VerticalShowcase />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
