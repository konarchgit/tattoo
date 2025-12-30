import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
    { title: 'HOME', path: '/' },
    { title: 'SHOP', path: '/shop' },
    { title: 'BLOG', path: '/blog' },
    { title: 'PAGES', path: '#' }
];

const FullscreenMenu = ({ isOpen, toggleMenu }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        background: '#0b0b0b',
                        zIndex: 900,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        color: 'white'
                    }}
                >
                    {/* Background Illustration Placeholder */}
                    <div style={{
                        position: 'absolute',
                        bottom: '5%',
                        right: '5%',
                        opacity: 0.1,
                        pointerEvents: 'none'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80"
                            alt="Background"
                            style={{ width: '400px' }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                        textAlign: 'center'
                    }}>
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <Link
                                    to={item.path}
                                    onClick={toggleMenu}
                                    style={{
                                        fontSize: '5rem',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        transition: 'color 0.3s ease',
                                        textDecoration: 'none',
                                        color: 'white',
                                        display: 'block'
                                    }}
                                    className="menu-link"
                                >
                                    <motion.span whileHover={{ scale: 1.1, color: '#999' }}>
                                        {item.title}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        display: 'flex',
                        gap: '40px',
                        fontSize: '0.9rem',
                        letterSpacing: '0.2em',
                        opacity: 0.6
                    }}>
                        <span>INSTAGRAM</span>
                        <span>FACEBOOK</span>
                        <span>TWITTER</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FullscreenMenu;
