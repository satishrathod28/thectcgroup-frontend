'use client'
// components/SwiperSlider.js
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from 'next/image';

import gal1 from '@/images/caa1.jpg'
import gal2 from '@/images/caa2.jpg'
import pt1 from '@/images/t1.svg'
import pt2 from '@/images/t2.svg'

const CareerGallery = () => {
  const slides = [
    { id: 1, content: gal1 },
    { id: 2, content: gal2 },
    { id: 1, content: gal1 },
    { id: 2, content: gal2 },
    { id: 1, content: gal1 },
    { id: 2, content: gal2 },
  ];

  return (
    <section className='sec pt-0'>
        <div className='career-gal-container'>
            <Image src={pt1} alt="" />
            <Image src={pt2} alt="" />
        <Swiper
            // modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            // navigation
            loop={true}
            centeredSlides={true}
            onSlideChange={() => console.log('Slide changed')}
            onSwiper={(swiper) => console.log(swiper)}
            className='career-gal-swiper'
            breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2.5 },
                768: { slidesPerView: 3.5 },
                1024: { slidesPerView: 2.5 },
            }}
        >
            {slides.map((slide, index) => (
            <SwiperSlide key={index}>
                <div className="gal-img">
                    {
                        slide?.content ?
                        <Image src={slide?.content} alt="" />
                        : ''
                    }
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
    </section>
  );
};

export default CareerGallery;
