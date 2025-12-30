import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, ChevronRight, Play, Link as LinkIcon, Quote } from 'lucide-react';
import { blogPosts, sidebarData } from '../data/blog';

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const PostStandard = ({ post }) => (
        <div style={{ marginBottom: '80px' }}>
            {post.image && (
                <div style={{ position: 'relative', marginBottom: '30px' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    {post.type === 'video' && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '50%' }}>
                            <Play fill="black" size={20} />
                        </div>
                    )}
                </div>
            )}
            <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '15px' }}>
                BY {post.author} {post.date} IN {post.category}, {post.comments} COMMENTS
            </div>
            <h2 style={{ fontSize: window.innerWidth < 768 ? '1.8rem' : '2.5rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.02em' }}>{post.title}</h2>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '25px', fontSize: '0.95rem' }}>{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                READ MORE <ChevronRight size={14} />
            </Link>
        </div>
    );

    const PostQuote = ({ post }) => (
        <div style={{ background: '#0b0b0b', color: 'white', padding: window.innerWidth < 480 ? '40px 30px' : '60px 80px', marginBottom: '80px', position: 'relative' }}>
            <Quote size={40} style={{ position: 'absolute', top: '40px', left: '40px', opacity: 0.2 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '20px', lineHeight: '1.5', position: 'relative' }}>{post.quote}</h3>
            <div style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>- {post.author}</div>
        </div>
    );

    const PostLink = ({ post }) => (
        <div style={{ background: '#0b0b0b', color: 'white', padding: '40px', marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '50%' }}>
                <LinkIcon size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, margin: 0, letterSpacing: '0.1em' }}>{post.title}</h3>
        </div>
    );

    return (
        <div style={{ background: 'white', color: 'black', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                height: '50vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(https://dotwork.qodeinteractive.com/wp-content/uploads/2018/05/blog-title-img-1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '100px'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(111, 107, 107, 0.7)'
                }} />
                <h1 style={{ color: 'white', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, zIndex: 1, margin: 0 }}>
                    RIGHT SIDEBAR
                </h1>
            </section>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: window.innerWidth < 768 ? '0 20px 100px' : '0 40px 100px', display: 'grid', gridTemplateColumns: window.innerWidth < 992 ? '1fr' : '1fr 300px', gap: '60px' }}>

                {/* Main Content */}
                <div>
                    {blogPosts.map(post => {
                        if (post.type === 'standard' || post.type === 'video') return <PostStandard key={post.id} post={post} />;
                        if (post.type === 'quote') return <PostQuote key={post.id} post={post} />;
                        if (post.type === 'link') return <PostLink key={post.id} post={post} />;
                        return null;
                    })}

                    {/* Pagination */}
                    <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                        <div style={{ width: '35px', height: '35px', background: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>1</div>
                        <div style={{ width: '35px', height: '35px', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>2</div>
                        <div style={{ width: '35px', height: '35px', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>3</div>
                        <div style={{ width: '35px', height: '35px', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={16} /></div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside>
                    {/* Author Box */}
                    <div style={{ border: '1px solid #eee', padding: '40px 30px', textAlign: 'center', marginBottom: '60px' }}>
                        <img
                            src={sidebarData.author.image}
                            alt={sidebarData.author.name}
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '25px' }}
                        />
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '15px', letterSpacing: '0.1em' }}>{sidebarData.author.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: '1.6', marginBottom: '25px' }}>{sidebarData.author.bio}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                            <Facebook size={14} style={{ cursor: 'pointer' }} />
                            <Twitter size={14} style={{ cursor: 'pointer' }} />
                            <Instagram size={14} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>

                    {/* Categories */}
                    <div style={{ marginBottom: '60px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '30px', letterSpacing: '0.1em' }}>CATEGORIES</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {sidebarData.categories.map(cat => (
                                <div key={cat} style={{ fontSize: '0.85rem', color: '#888', cursor: 'pointer', transition: 'color 0.3s' }}>{cat}</div>
                            ))}
                        </div>
                    </div>

                    {/* Latest Posts */}
                    <div style={{ marginBottom: '60px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '30px', letterSpacing: '0.1em' }}>LATEST POSTS</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {sidebarData.latestPosts.map((lp, i) => (
                                <div key={i}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '5px' }}>{lp.date}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#888', cursor: 'pointer' }}>{lp.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '30px', letterSpacing: '0.1em' }}>TAGS</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {sidebarData.tags.map(tag => (
                                <div key={tag} style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.1em', cursor: 'pointer' }}>{tag}</div>
                            ))}
                        </div>
                    </div>
                </aside>
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

export default BlogPage;
