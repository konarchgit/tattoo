import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Facebook, Twitter, Instagram, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState('description');
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            setMainImage(product.image);
            window.scrollTo(0, 0);
        }
    }, [product]);

    if (!product) return <div style={{ padding: '200px', textAlign: 'center' }}>Product not found</div>;

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div style={{ background: 'white', color: 'black', minHeight: '100vh', paddingTop: '120px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

                {/* Product Main Section */}
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 992 ? '1fr' : '1.2fr 1fr', gap: window.innerWidth < 768 ? '40px' : '80px', marginBottom: '100px' }}>

                    {/* Left: Images */}
                    <div>
                        <div style={{
                            background: '#f8f8f8',
                            aspectRatio: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <motion.img
                                key={mainImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={mainImage}
                                alt={product.name}
                                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                            />
                            {product.tag && (
                                <div style={{
                                    position: 'absolute',
                                    top: '30px',
                                    right: '30px',
                                    background: 'black',
                                    color: 'white',
                                    padding: '5px 15px',
                                    fontSize: '0.8rem',
                                    fontWeight: 900,
                                    letterSpacing: '0.1em'
                                }}>
                                    {product.tag}
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {product.gallery?.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        background: '#f8f8f8',
                                        cursor: 'pointer',
                                        border: mainImage === img ? '2px solid black' : '2px solid transparent',
                                        padding: '5px'
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>{product.name}</h1>
                        <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{product.price}</div>

                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.8', margin: '10px 0' }}>
                            {product.description}
                        </p>

                        {product.tag === 'SOLD' ? (
                            <div style={{ color: '#ff2d55', fontWeight: 700, fontSize: '0.9rem' }}>Out of stock</div>
                        ) : (
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '10px' }}>
                                <div style={{ display: 'flex', border: '1px solid #eee' }}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '15px 20px', border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
                                    <input type="text" value={quantity} readOnly style={{ width: '50px', border: 'none', textAlign: 'center', fontWeight: 700 }} />
                                    <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '15px 20px', border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
                                </div>
                                <button
                                    onClick={() => addToCart(product, quantity)}
                                    style={{
                                        flex: 1,
                                        background: 'black',
                                        color: 'white',
                                        border: 'none',
                                        padding: '18px',
                                        fontWeight: 900,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer'
                                    }}>
                                    Add to cart
                                </button>
                            </div>
                        )}

                        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', fontWeight: 700 }}>
                            <div>SKU: <span style={{ color: '#888', fontWeight: 400 }}>{product.sku}</span></div>
                            <div>CATEGORY: <span style={{ color: '#888', fontWeight: 400 }}>{product.category}</span></div>
                            <div>TAGS: <span style={{ color: '#888', fontWeight: 400 }}>{product.tags?.join(', ')}</span></div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}><Facebook size={18} /></div>
                            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}><Twitter size={18} /></div>
                            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}><Instagram size={18} /></div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div style={{ marginBottom: '100px' }}>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '40px' }}>
                        {['description', 'additional information', 'reviews (0)'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '20px 40px',
                                    background: activeTab === tab ? '#111' : '#f8f8f8',
                                    color: activeTab === tab ? 'white' : 'black',
                                    border: 'none',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    flex: 1
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div style={{ minHeight: '150px' }}>
                        <AnimatePresence mode="wait">
                            {activeTab === 'description' && (
                                <motion.p
                                    key="desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    style={{ color: '#666', lineHeight: '1.8' }}
                                >
                                    {product.fullDescription}
                                </motion.p>
                            )}
                            {activeTab !== 'description' && (
                                <motion.div
                                    key="other"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ color: '#666' }}
                                >
                                    No data available for {activeTab}.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Related Products */}
                <div style={{ marginBottom: '100px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '40px' }}>Related products</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                        {relatedProducts.map(rp => (
                            <Link to={`/product/${rp.id}`} key={rp.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ background: '#f8f8f8', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                                        <img src={rp.image} alt={rp.name} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
                                    </div>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 900, margin: '5px 0' }}>{rp.name}</h4>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{rp.price}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
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
        </div>
    );
};

export default ProductDetail;
