import React from 'react';
import Slider from 'react-slick';
import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';

import styles from './Carousel.module.scss';

// Импорт стилей слайдера
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NextArrow } from './arrow/NextArrow';
import { PrevArrow } from './arrow/PrevArrow';

const images = [image1, image2, image3];

export const CarouselItem = () => {
  const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 1000,
  fade: true,
  dots: true,
  pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

  return (
    <Slider {...settings} className={styles.slide}>
      {images.map((img, idx) => (
        <div key={idx}>
          <img
            src={img}
            alt={`Slide ${idx + 1}`}
            className={styles['carousel-image']}
          />
        </div>
      ))}
    </Slider>
  );
};

