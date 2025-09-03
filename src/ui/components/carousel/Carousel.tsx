import React from 'react';
import Slider from 'react-slick';

import styles from './Carousel.module.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NextArrow } from './arrow/NextArrow';
import { PrevArrow } from './arrow/PrevArrow';
import { Box } from '@mui/material';

interface CarouselItemProps {
  images: string[];
  width?: string | number;
  height?: string | number;
  imgStyle?: React.CSSProperties;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  images,
  width = '100%',
  height = 400,
  imgStyle = {},
}) => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    fade: true,
    dots: false,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    useCss: true
  };

  // Преобразуем width и height в строки с px, если передали число
  const sliderStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <Box style={sliderStyle} className={styles.carouselWrapper}>
      <Slider {...settings} >
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              className={styles['carousel-image']}
              style={{
                ...imgStyle,
              }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};



