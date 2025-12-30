import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
            }}
        >
            <Link to={`/product/${product.id}`} style={{ width: '100%', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{
                    width: '100%',
                    aspectRatio: '1',
                    background: '#f8f8f8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                }} className="product-image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: '80%',
                            height: '80%',
                            objectFit: 'contain'
                        }}
                    />

                    {product.tag && (
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'black',
                            color: 'white',
                            padding: '2px 10px',
                            fontSize: '0.7rem',
                            fontWeight: 900,
                            letterSpacing: '0.1em'
                        }}>
                            {product.tag}
                        </div>
                    )}

                    <div className="product-overlay" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px',
                        opacity: 0,
                        transition: '0.3s'
                    }}>
                        <div style={{ background: 'white', padding: '10px', borderRadius: '50%', color: 'black' }}><Eye size={20} /></div>
                        <div style={{ background: 'white', padding: '10px', borderRadius: '50%', color: 'black' }}><Heart size={18} /></div>
                        <div
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); }}
                            style={{ background: 'white', padding: '10px', borderRadius: '50%', color: 'black' }}
                        >
                            <ShoppingBag size={18} />
                        </div>
                    </div>
                </div>
            </Link>

            <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '5px', color: '#111' }}>{product.name}</h4>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>{product.category}</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {product.oldPrice && (
                    <span style={{ fontSize: '0.9rem', color: '#bbb', textDecoration: 'line-through' }}>{product.oldPrice}</span>
                )}
                <span style={{ fontSize: '0.9rem', color: '#111', fontWeight: 700 }}>{product.price}</span>
            </div>
        </motion.div>
    );
};

const Shop = () => {
    const [sortBy, setSortBy] = React.useState('default');
    const [sortedProducts, setSortedProducts] = React.useState([...products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let newProducts = [...products];
        if (sortBy === 'price-low') {
            newProducts.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        } else if (sortBy === 'price-high') {
            newProducts.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        }
        setSortedProducts(newProducts);
    }, [sortBy]);

    return (
        <div style={{ background: 'white', color: 'black', minHeight: '100vh', paddingTop: '0' }}>
            {/* Hero Section */}
            <section style={{
                height: '60vh',
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
                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                    fontWeight: 900,
                    zIndex: 1,
                    margin: 0
                }}>
                    SHOP LIST
                </h1>
            </section>

            {/* Product Grid */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 40px 100px'
            }}>
                {/* Simple Bar with search/filter (visual) */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '60px',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '20px'
                }}>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Showing 1–{sortedProducts.length} of 24 results</p>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                outline: 'none',
                                appearance: 'none',
                                paddingRight: '20px'
                            }}
                        >
                            <option value="default">Default sorting</option>
                            <option value="price-low">Sort by price: low to high</option>
                            <option value="price-high">Sort by price: high to low</option>
                        </select>
                        <span style={{
                            position: 'absolute',
                            right: '0',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '0.7rem',
                            pointerEvents: 'none'
                        }}>▼</span>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px 30px'
                }}>
                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                background: '#111',
                color: 'white',
                padding: '100px 40px',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>
                    DOT<span style={{ fontStyle: 'italic', fontWeight: 300 }}>Work.</span>
                </h2>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px', opacity: 0.6 }}>
                    <span>BEHANCE</span>
                    <span>INSTAGRAM</span>
                    <span>TWITTER</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
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

            {/* Global CSS for hover effects */}
            <style>{`
        .product-image-container:hover .product-overlay {
          opacity: 1 !important;
        }
        .product-image-container:hover img {
          transform: scale(1.05);
          transition: 0.5s;
        }
      `}</style>
        </div>
    );
};

export default Shop;
