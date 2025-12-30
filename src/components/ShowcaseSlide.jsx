import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Bird, Heart, Diamond, Facebook, Instagram, Twitter } from 'lucide-react';

const ShowcaseSlide = ({ slide, isActive }) => {
    const [currentReview, setCurrentReview] = useState(0);

    const nextReview = () => {
        if (slide.reviews) {
            setCurrentReview((prev) => (prev + 1) % slide.reviews.length);
        }
    };

    const prevReview = () => {
        if (slide.reviews) {
            setCurrentReview((prev) => (prev - 1 + slide.reviews.length) % slide.reviews.length);
        }
    };

    const review = slide.reviews ? slide.reviews[currentReview] : null;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000'
        }}>
            {/* Background Image with Zoom-out Animation */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.5 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 1
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Content Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 5%'
            }}>
                {slide.type === 'title' && (
                    <motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            animate={isActive ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 8rem)',
                                lineHeight: 0.8,
                                margin: 0
                            }}
                        >
                            {slide.title}
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            animate={isActive ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(2rem, 8vw, 6rem)',
                                fontStyle: 'italic',
                                fontWeight: 300,
                                textTransform: 'lowercase',
                                marginTop: '-10px',
                                color: 'rgba(255,255,255,0.8)'
                            }}
                        >
                            {slide.subtitle}
                        </motion.h3>
                    </motion.div>
                )}

                {slide.type === 'stats' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        width: '100%',
                        gap: '40px'
                    }}>
                        {slide.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{
                                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                                    fontWeight: 900
                                }}>
                                    {stat.year}
                                </span>
                                <span style={{
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.2em',
                                    opacity: 0.7,
                                    marginTop: '10px'
                                }}>
                                    {stat.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                )}

                {slide.type === 'features' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        width: '100%',
                        gap: '20px',
                        maxWidth: '1200px'
                    }}>
                        {slide.features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '20px',
                                        cursor: 'pointer'
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => alert(`Clicked: ${feature.title}`)}
                                >
                                    <div style={{ marginBottom: '30px', position: 'relative' }}>
                                        <motion.div
                                            whileHover={{ rotate: 135 }}
                                            transition={{ duration: 0.4 }}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '80px',
                                                height: '80px',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                rotate: '45deg',
                                                zIndex: -1
                                            }}
                                        />
                                        <Icon size={40} strokeWidth={1} color="white" />
                                    </div>
                                    <h4 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: 900,
                                        marginBottom: '15px',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {feature.title}
                                    </h4>
                                    <p style={{
                                        fontSize: '0.8rem',
                                        lineHeight: '1.6',
                                        opacity: 0.6,
                                        maxWidth: '200px'
                                    }}>
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {slide.type === 'contact' && (
                    <div style={{
                        display: 'flex',
                        width: '100vw',
                        height: '100vh',
                        maxWidth: '1200px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '5vw'
                    }}>
                        {/* Left Side: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isActive ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5, duration: 1 }}
                            style={{
                                flex: '1',
                                height: '50%',
                                minHeight: '400px',
                                overflow: 'hidden',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <img
                                src={slide.innerImage}
                                alt="Studio"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                padding: '20px 0',
                                textAlign: 'left',
                                fontSize: '0.8rem',
                                opacity: 0.6,
                                letterSpacing: '0.1em'
                            }}>
                                {slide.caption}
                            </div>
                        </motion.div>

                        {/* Right Side: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isActive ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.7, duration: 1 }}
                            style={{
                                flex: '1',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase' }}>YOUR NAME HERE</label>
                                <input type="text" style={{
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px dotted rgba(255,255,255,0.3)',
                                    color: 'white',
                                    padding: '10px 0',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase' }}>YOUR EMAIL HERE</label>
                                <input type="email" style={{
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px dotted rgba(255,255,255,0.3)',
                                    color: 'white',
                                    padding: '10px 0',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase' }}>YOUR MESSAGE HERE</label>
                                <textarea style={{
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px dotted rgba(255,255,255,0.3)',
                                    color: 'white',
                                    padding: '10px 0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    minHeight: '80px',
                                    resize: 'none'
                                }} />
                            </div>

                            <motion.button
                                whileHover={{ x: 10 }}
                                style={{
                                    alignSelf: 'flex-start',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    marginTop: '20px'
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert('Message Sent!');
                                }}
                            >
                                Send message <span style={{ fontSize: '1.5rem' }}>→</span>
                            </motion.button>
                        </motion.div>
                    </div>
                )}

                {slide.type === 'artists' && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: '1200px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '60px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={isActive ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{ textAlign: 'center' }}
                        >
                            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '30px' }}>
                                OUR ARTIST
                            </h2>
                            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.5)', margin: '0 auto', borderBottom: '1px dotted rgba(255,255,255,0.8)' }} />
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            width: '100%',
                            gap: '40px'
                        }}>
                            {slide.artists.map((artist, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
                                    transition={{ delay: 0.7 + index * 0.2, duration: 0.8 }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: '0.9',
                                        overflow: 'hidden',
                                        marginBottom: '5px',
                                        background: '#111'
                                    }}>
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.6 }}
                                            src={artist.image}
                                            alt={artist.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '10px', textTransform: 'uppercase' }}>
                                        {artist.name}
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.6, marginBottom: '20px' }}>
                                        {artist.bio}
                                    </p>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <Facebook size={16} strokeWidth={1.5} style={{ cursor: 'pointer', opacity: 0.7 }} />
                                        <Instagram size={16} strokeWidth={1.5} style={{ cursor: 'pointer', opacity: 0.7 }} />
                                        <Twitter size={16} strokeWidth={1.5} style={{ cursor: 'pointer', opacity: 0.7 }} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {slide.type === 'reviews' && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: '1200px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '40px',
                        position: 'relative'
                    }}>
                        {/* Decorative Illustration Background */}
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isActive ? { opacity: 0.05, scale: 1 } : {}}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            src={slide.illustration}
                            style={{
                                position: 'absolute',
                                bottom: '-20%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '600px',
                                pointerEvents: 'none',
                                zIndex: -1
                            }}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={isActive ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{ textAlign: 'center' }}
                        >
                            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>
                                REVIEWS
                            </h2>
                        </motion.div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            gap: '40px',
                            zIndex: 10
                        }}>
                            {/* Left Arrow */}
                            <motion.div
                                whileHover={{ scale: 1.2, x: -5 }}
                                onClick={prevReview}
                                style={{ cursor: 'pointer', fontSize: '3rem', opacity: 0.5, userSelect: 'none' }}
                            >
                                ‹
                            </motion.div>

                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '30px',
                                minHeight: '350px'
                            }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentReview}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '30px'
                                        }}
                                    >
                                        {/* Reviewer Avatar with quote icon */}
                                        <div style={{ position: 'relative' }}>
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    borderRadius: '50%',
                                                    overflow: 'hidden',
                                                    border: '2px solid rgba(255,255,255,0.1)',
                                                    background: '#111'
                                                }}
                                            >
                                                <img
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </motion.div>
                                            <div style={{
                                                position: 'absolute',
                                                right: '-10px',
                                                bottom: '20px',
                                                background: 'black',
                                                padding: '5px',
                                                borderRadius: '50%'
                                            }}>
                                                <span style={{ fontSize: '1.5rem' }}>”</span>
                                            </div>
                                        </div>

                                        <p style={{
                                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                            lineHeight: '1.8',
                                            maxWidth: '800px',
                                            fontStyle: 'italic',
                                            color: '#ccc',
                                            margin: 0
                                        }}>
                                            {review.quote}
                                        </p>

                                        <div style={{ textAlign: 'center' }}>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                ~ {review.name}, {review.role}
                                            </h4>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Pagination Dots */}
                                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                    {slide.reviews.map((_, i) => (
                                        <motion.div
                                            key={i}
                                            onClick={() => setCurrentReview(i)}
                                            animate={{
                                                scale: i === currentReview ? 1.5 : 1,
                                                opacity: i === currentReview ? 1 : 0.3
                                            }}
                                            style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: 'white',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right Arrow */}
                            <motion.div
                                whileHover={{ scale: 1.2, x: 5 }}
                                onClick={nextReview}
                                style={{ cursor: 'pointer', fontSize: '3rem', opacity: 0.5, userSelect: 'none' }}
                            >
                                ›
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative side labels */}
            <div style={{
                position: 'absolute',
                right: '40px',
                top: '50%',
                transform: 'translateY(-50%) rotate(90deg)',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                opacity: 0.4,
                zIndex: 3
            }}>
                Your Body Is Your Canvas
            </div>
        </div>
    );
};

export default ShowcaseSlide;
