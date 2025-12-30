import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();
    const [shippingType, setShippingType] = useState('flat');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const updateQuantity = (item, delta) => {
        if (item.quantity + delta > 0) {
            addToCart(item, delta);
        }
    };

    const getShippingCost = () => {
        if (shippingType === 'flat') return 20.00;
        if (shippingType === 'local') return 5.00;
        return 0;
    };

    const finalTotal = cartTotal + getShippingCost();

    return (
        <div style={{ background: 'white', color: 'black', minHeight: '100vh', paddingTop: '0' }}>
            {/* Hero Section */}
            <section style={{
                height: '50vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(https://dotwork.qodeinteractive.com/wp-content/uploads/2018/05/elements-title-img-1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '80px'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(111, 107, 107, 0.82)'
                }} />
                <h1 style={{
                    color: 'white',
                    fontSize: 'clamp(3rem, 10vw, 8rem)',
                    fontWeight: 900,
                    zIndex: 1,
                    margin: 0
                }}>
                    CART
                </h1>
            </section>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 20px 100px' : '0 40px 100px' }}>
                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>YOUR CART IS CURRENTLY EMPTY.</h2>
                        <Link to="/shop">
                            <button style={{
                                background: 'black',
                                color: 'white',
                                border: 'none',
                                padding: '15px 35px',
                                fontWeight: 900,
                                letterSpacing: '0.1em',
                                cursor: 'pointer'
                            }}>RETURN TO SHOP</button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Table */}
                        <div style={{ width: '100%', overflowX: 'auto', marginBottom: '40px' }}>
                            <div style={{ minWidth: isMobile ? '700px' : 'auto' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '50px 100px 1fr 150px 150px 150px', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #eee', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    <div></div>
                                    <div></div>
                                    <div>Product</div>
                                    <div style={{ textAlign: 'center' }}>Price</div>
                                    <div style={{ textAlign: 'center' }}>Quantity</div>
                                    <div style={{ textAlign: 'right' }}>Subtotal</div>
                                </div>

                                {cartItems.map((item) => (
                                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '50px 100px 1fr 150px 150px 150px', alignItems: 'center', padding: '30px 0', borderBottom: '1px solid #eee' }}>
                                        <div onClick={() => removeFromCart(item.id)} style={{ cursor: 'pointer', color: '#ccc' }}><X size={20} /></div>
                                        <div style={{ width: '80px', height: '80px', background: '#f8f8f8', padding: '10px' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1rem' }}>{item.name}</div>
                                        <div style={{ textAlign: 'center', color: '#666' }}>{item.price}</div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div style={{ display: 'flex', border: '1px solid #eee', alignItems: 'center' }}>
                                                <div style={{ padding: '10px 15px', borderRight: '1px solid #eee', cursor: 'pointer' }} onClick={() => updateQuantity(item, -1)}><Minus size={14} /></div>
                                                <div style={{ width: '50px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</div>
                                                <div style={{ padding: '10px 15px', borderLeft: '1px solid #eee', cursor: 'pointer' }} onClick={() => updateQuantity(item, 1)}><Plus size={14} /></div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', fontWeight: 900 }}>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Coupon & Update */}
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', marginBottom: '80px', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: window.innerWidth < 480 ? 'column' : 'row', gap: '10px' }}>
                                <input type="text" placeholder="Coupon code" style={{ padding: '15px 20px', border: '1px solid #eee', outline: 'none', width: window.innerWidth < 480 ? '100%' : '200px' }} />
                                <button style={{ background: 'black', color: 'white', border: 'none', padding: '15px 30px', fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer', fontStyle: 'italic' }}>Apply coupon</button>
                            </div>
                            <button style={{ background: 'black', color: 'white', border: 'none', padding: '15px 40px', fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer', fontStyle: 'italic' }}>Update cart</button>
                        </div>

                        {/* Cart Totals */}
                        <div style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 900, marginBottom: '40px' }}>CART TOTALS</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 480 ? '1fr' : '200px 1fr', padding: '20px 0', borderBottom: '1px solid #eee', gap: '10px' }}>
                                <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>Subtotal</div>
                                <div style={{ color: '#666' }}>${cartTotal.toFixed(2)}</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 480 ? '1fr' : '200px 1fr', padding: '30px 0', borderBottom: '1px solid #eee', gap: '10px' }}>
                                <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>Shipping</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <input type="radio" id="flat" name="shipping" checked={shippingType === 'flat'} onChange={() => setShippingType('flat')} />
                                        <label htmlFor="flat" style={{ marginLeft: '10px' }}>Flat rate: $20.00</label>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <input type="radio" id="free" name="shipping" checked={shippingType === 'free'} onChange={() => setShippingType('free')} />
                                        <label htmlFor="free" style={{ marginLeft: '10px' }}>Free shipping</label>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <input type="radio" id="local" name="shipping" checked={shippingType === 'local'} onChange={() => setShippingType('local')} />
                                        <label htmlFor="local" style={{ marginLeft: '10px' }}>Local pickup: $5.00</label>
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        Shipping to <strong>India.</strong>
                                    </div>
                                    <div style={{ color: 'black', fontWeight: 900, marginTop: '5px', cursor: 'pointer' }}>Change address</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 480 ? '1fr' : '200px 1fr', padding: '20px 0', borderBottom: '1px solid #eee', gap: '10px' }}>
                                <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>Total</div>
                                <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>${finalTotal.toFixed(2)}</div>
                            </div>

                            <Link to="/checkout" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    marginTop: '40px',
                                    background: 'black',
                                    color: 'white',
                                    border: 'none',
                                    padding: '20px 40px',
                                    fontWeight: 900,
                                    letterSpacing: '0.1em',
                                    cursor: 'pointer',
                                    fontStyle: 'italic',
                                    width: '100%'
                                }}>Proceed to checkout</button>
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <footer style={{ background: '#111', color: 'white', padding: '100px 40px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>
                    ART<span style={{ fontStyle: 'italic', fontWeight: 300 }}>STUDIO</span>
                </h2>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px', opacity: 0.6 }}>
                    <span>BEHANCE</span>
                    <span>INSTAGRAM</span>
                    <span>TWITTER</span>
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: isMobile ? '20px' : '40px',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    fontWeight: 900
                }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>HOME</Link>
                    <span>ABOUT US</span>
                    <span>CONTACT US</span>
                    <span>PORTFOLIO</span>
                    <Link to="/blog" style={{ color: 'white', textDecoration: 'none' }}>BLOG</Link>
                    <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>SHOP</Link>
                </div>
            </footer>
        </div>
    );
};

export default CartPage;
