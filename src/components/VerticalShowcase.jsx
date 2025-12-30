/* Vertical Showcase Component - Main Slider */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import ShowcaseSlide from './ShowcaseSlide';
import { Sun, Bird, Heart, Diamond } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    {
        id: 1,
        image: '/assets/images/hero.png',
        title: 'ART STUDIO',
        subtitle: 'masters',
        type: 'title'
    },

    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1920&q=80',
        stats: [
            { year: '1982', text: 'FOUNDED OUR STUDIO' },
            { year: '1996', text: 'THE BEST TATTOO AWARD' },
            { year: '2001', text: 'OPENED A STUDIO IN LA' },
            { year: '2016', text: 'BECAME TATTOO LEADERS' }
        ],
        type: 'stats'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=1920&q=80',
        type: 'features',
        features: [
            { icon: Sun, title: 'SHAPES & COLORS', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ullamcorper get euismod orci cum sociis.' },
            { icon: Bird, title: 'TATTOO IDEAS', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ullamcorper get euismod orci cum sociis.' },
            { icon: Heart, title: 'BODY PIRCING', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ullamcorper get euismod orci cum sociis.' },
            { icon: Diamond, title: 'FULL SLEEVE TATTOO', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ullamcorper get euismod orci cum sociis.' }
        ]
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1920&q=80',
        type: 'artists',
        artists: [
            {
                name: 'NATHAN WALKER',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing ullamcorper get euismod orci cum sociis natoque penatibus et magnis dis parturient.',
                image: '/assets/images/artist_nathan.png'
            },
            {
                name: 'SHIRLEY JOHNSON',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing ullamcorper get euismod orci cum sociis natoque penatibus et magnis dis parturient.',
                image: '/assets/images/artist_shirley.png'
            },
            {
                name: 'JACK LANE',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing ullamcorper get euismod orci cum sociis natoque penatibus et magnis dis parturient.',
                image: '/assets/images/artist_jack.png'
            }
        ]
    },
    {
        id: 5,
        image: 'https://www.tattoosnewdelhi.com/images/tattoo-studios/banner-dwarka-tattoo-studio.jpg',
        type: 'reviews',
        reviews: [
            {
                name: 'PAUL WILLIS',
                role: 'ARTIST',
                quote: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum aenean imperdiet. Etiam ultricies vel luctus vel augue ultricies ullam libero corper. Nam luctus vel augue quis ante sagit luctus.',
                avatar: '/assets/images/reviewer_avatar.png'
            },
            {
                name: 'SARAH CONNOR',
                role: 'CUSTOMER',
                quote: 'Absolutely incredible work. The attention to detail and the artistic vision Nathan brings is unmatched. I will definitely be coming back for my next piece!',
                avatar: '/assets/images/artist_shirley.png'
            },
            {
                name: 'MIKE TYSON',
                role: 'CHAMPION',
                quote: 'Best tattoo studio in the world. The environment is clean, the artists are professional, and the results are stunning. Highly recommended to everyone.',
                avatar: '/assets/images/artist_jack.png'
            }
        ],
        illustration: '/assets/images/owl_sketch.png'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1479767574301-a01c78234a0c?auto=format&fit=crop&w=1920&q=80',
        type: 'contact',
        innerImage: '/assets/images/contact_studio.png',
        caption: 'Feel free to reach us.'
    },

    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1552627019-947c3789ffb5?auto=format&fit=crop&w=1920&q=80',
        title: 'MOST DURABLE',
        subtitle: 'TATTOOS',
        type: 'title'
    }
];

const VerticalShowcase = () => {
    return (
        <Swiper
            direction={'vertical'}
            slidesPerView={1}
            spaceBetween={0}
            mousewheel={true}
            pagination={{
                clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
            className="mySwiper"
            speed={1000}
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    {({ isActive }) => (
                        <ShowcaseSlide slide={slide} isActive={isActive} />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default VerticalShowcase;
