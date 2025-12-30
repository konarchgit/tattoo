import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const { cartItems, cartTotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('check');
    const shippingCost = 20.00; // Simplified for checkout demo
    const finalTotal = cartTotal + shippingCost;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const InputField = ({ label, placeholder, required, half }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase' }}>
                {label} {required && <span style={{ color: '#ff2d55' }}>*</span>}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                style={{
                    padding: '15px 20px',
                    border: '1px solid #eee',
                    outline: 'none',
                    fontSize: '0.9rem',
                    width: '100%'
                }}
            />
        </div>
    );

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
                    fontSize: 'clamp(2rem, 10vw, 8rem)',
                    fontWeight: 900,
                    zIndex: 1,
                    margin: 0
                }}>
                    CHECKOUT
                </h1>
            </section>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: window.innerWidth < 768 ? '0 20px 100px' : '0 40px 100px' }}>

                {/* Notices */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
                    <div style={{ padding: '20px 30px', border: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
                        Returning customer? <span style={{ color: 'black', fontWeight: 700, cursor: 'pointer' }}>Click here to login</span>
                    </div>
                    <div style={{ padding: '20px 30px', border: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
                        Have a coupon? <span style={{ color: 'black', fontWeight: 700, cursor: 'pointer' }}>Click here to enter your code</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 992 ? '1fr' : '1.2fr 1fr', gap: window.innerWidth < 768 ? '40px' : '80px' }}>

                    {/* Billing Details */}
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '40px' }}>BILLING DETAILS</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: window.innerWidth < 480 ? 'column' : 'row', gap: '20px' }}>
                                <InputField label="First name" required />
                                <InputField label="Last name" required />
                            </div>
                            <InputField label="Company name (optional)" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase' }}>Country / Region <span style={{ color: '#ff2d55' }}>*</span></label>
                                <select style={{ padding: '15px 20px', border: '1px solid #eee', outline: 'none', background: 'white' }}>
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                </select>
                            </div>
                            <InputField label="Street address" placeholder="House number and street name" required />
                            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" style={{ padding: '15px 20px', border: '1px solid #eee', outline: 'none' }} />
                            <InputField label="Town / City" required />
                            <InputField label="State" placeholder="Select an option..." required />
                            <InputField label="PIN Code" required />
                            <InputField label="Phone" required />
                            <InputField label="Email address" required />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                <input type="checkbox" id="create-account" />
                                <label htmlFor="create-account" style={{ fontSize: '0.9rem', color: '#888' }}>Create an account?</label>
                            </div>
                        </div>

                        <div style={{ marginTop: '60px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                                <input type="checkbox" id="ship-different" style={{ width: '18px', height: '18px' }} />
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>SHIP TO A DIFFERENT ADDRESS?</h2>
                            </div>
                            <InputField label="Order notes (optional)" placeholder="Notes about your order, e.g. special notes for delivery." />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h2 style={{ fontSize: window.innerWidth < 768 ? '1.8rem' : '2rem', fontWeight: 900, marginBottom: '40px' }}>YOUR ORDER</h2>
                        <div style={{ border: '1px solid #eee', padding: window.innerWidth < 480 ? '20px' : '40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '20px', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                                <span>PRODUCT</span>
                                <span>SUBTOTAL</span>
                            </div>

                            {cartItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
                                    <span style={{ textTransform: 'uppercase' }}>{item.name} <span style={{ color: 'black', fontWeight: 900 }}> × {item.quantity}</span></span>
                                    <span style={{ color: 'black', fontWeight: 700 }}>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #eee', fontWeight: 900, fontSize: '0.9rem' }}>
                                <span>SUBTOTAL</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <div style={{ padding: '20px 0', borderBottom: '1px solid #eee' }}>
                                <div style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: '15px' }}>SHIPPING</div>
                                <div style={{ fontSize: '0.8rem', color: '#666', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Flat rate: $20.00</span>
                                        <input type="radio" checked readOnly />
                                    </div>
                                    <div>Shipping to India.</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px 0', fontWeight: 900, fontSize: '1.2rem' }}>
                                <span>TOTAL</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>

                            {/* Payment Methods */}
                            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ background: '#f8f8f8', padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                        <input
                                            type="radio"
                                            id="check"
                                            name="payment"
                                            checked={paymentMethod === 'check'}
                                            onChange={() => setPaymentMethod('check')}
                                        />
                                        <label htmlFor="check" style={{ fontWeight: 900, fontSize: '0.9rem' }}>Check payments</label>
                                    </div>
                                    {paymentMethod === 'check' && (
                                        <p style={{ fontSize: '0.8rem', color: '#666', margin: 0, lineHeight: '1.6' }}>
                                            Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                        <input
                                            type="radio"
                                            id="paypal"
                                            name="payment"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={() => setPaymentMethod('paypal')}
                                        />
                                        <label htmlFor="paypal" style={{ fontWeight: 900, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            PayPal <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="PayPal" style={{ height: '30px' }} />
                                        </label>
                                    </div>
                                    {paymentMethod === 'paypal' && (
                                        <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.</p>
                                    )}
                                </div>

                                <button style={{
                                    marginTop: '20px',
                                    background: 'black',
                                    color: 'white',
                                    border: 'none',
                                    padding: '20px',
                                    fontWeight: 900,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    fontStyle: 'italic'
                                }}>
                                    Place order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                background: '#111',
                color: 'white',
                padding: window.innerWidth < 768 ? '60px 20px' : '100px 40px',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: window.innerWidth < 768 ? '2rem' : '2.5rem', fontWeight: 900, marginBottom: '20px' }}>
                    ART<span style={{ fontStyle: 'italic', fontWeight: 300 }}>STUDIO</span>
                </h2>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px', opacity: 0.6 }}>
                    <span>BEHANCE</span>
                    <span>INSTAGRAM</span>
                    <span>TWITTER</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: window.innerWidth < 768 ? '20px' : '40px',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    fontWeight: 900
                }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>HOME</Link>
                    <span>ABOUT US</span>
                    <span>CONTACT US</span>
                    <span>PORTFOLIO</span>
                    <span>BLOG</span>
                    <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>SHOP</Link>
                </div>
            </footer>
        </div>
    );
};

export default CheckoutPage;
