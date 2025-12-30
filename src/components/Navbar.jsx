import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Trash2, Instagram, Twitter } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const { cartCount, cartItems, cartTotal, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const isLightPage = location.pathname === '/shop' || location.pathname.startsWith('/product/') || location.pathname === '/cart' || location.pathname === '/checkout' || location.pathname === '/blog';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: scrolled ? '20px 40px' : '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: scrolled ? (isLightPage && !isOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(11, 11, 11, 0.95)') : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? (isLightPage && !isOpen ? '1px solid #eee' : '1px solid rgba(255,255,255,0.1)') : '1px solid transparent',
        color: isLightPage && !isOpen ? 'black' : 'white',
        pointerEvents: 'none'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', pointerEvents: 'auto' }}>
          <h1 style={{
            fontSize: scrolled ? '1.5rem' : '2rem',
            fontWeight: 900,
            cursor: 'pointer',
            margin: 0,
            transition: 'font-size 0.4s'
          }}>
            ART<span style={{ fontStyle: 'italic', fontWeight: 300 }}>STUDIO</span>
          </h1>
        </Link>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', pointerEvents: 'auto' }}>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '20px', marginRight: '20px' }} className="nav-socials">
            <Instagram size={18} style={{ cursor: 'pointer' }} />
            <Twitter size={18} style={{ cursor: 'pointer' }} />
            <div style={{ fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>Bē</div>
          </div>

          {/* Cart Icon */}
          <div
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ShoppingBag size={scrolled ? 24 : 28} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: isLightPage && !isOpen ? 'black' : 'white',
                color: isLightPage && !isOpen ? 'white' : 'black',
                fontSize: '0.7rem',
                fontWeight: 900,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </div>

          <div
            onClick={toggleMenu}
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s'
            }}
          >
            {isOpen ? <X size={scrolled ? 28 : 32} /> : <Menu size={scrolled ? 28 : 32} />}
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(5px)',
                zIndex: 1100
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '400px',
                height: '100vh',
                background: 'white',
                zIndex: 1200,
                boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                color: 'black',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>SHOPPING CART</h2>
                <X size={24} onClick={() => setIsCartOpen(false)} style={{ cursor: 'pointer' }} />
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <p style={{ color: '#888', fontStyle: 'italic' }}>No products in the cart.</p>
                    <button
                      onClick={() => { setIsCartOpen(false); location.pathname !== '/shop' && window.location.assign('/shop'); }}
                      style={{
                        marginTop: '20px',
                        background: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '12px 25px',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}>
                      RETURN TO SHOP
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {cartItems.map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: '#f8f8f8', padding: '10px' }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>{item.name}</h4>
                          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                            {item.quantity} × {item.price}
                          </div>
                        </div>
                        <Trash2
                          size={18}
                          style={{ cursor: 'pointer', color: '#ccc' }}
                          onClick={() => removeFromCart(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div style={{ padding: '40px', borderTop: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontWeight: 900 }}>
                    <span>SUBTOTAL:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/cart" onClick={() => setIsCartOpen(false)} style={{ textDecoration: 'none' }}>
                      <button style={{
                        width: '100%',
                        background: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '18px',
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        cursor: 'pointer'
                      }}>VIEW CART</button>
                    </Link>
                    <Link to="/checkout" onClick={() => setIsCartOpen(false)} style={{ textDecoration: 'none' }}>
                      <button style={{
                        width: '100%',
                        background: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '18px',
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        cursor: 'pointer'
                      }}>CHECKOUT</button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
