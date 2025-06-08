import { Box, Card, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';

import styles from './Carousel.module.scss';
const images = [
  image1,
  image2,
  image3,
];

export const CarouselItem = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [slides, setSlides ]= useState([...images, images[0]]); // Добавим первый элемент в конец

  return (
    <Carousel
    infiniteLoop
    autoPlay={true}
    showArrows={true}
    showThumbs={false}
    interval={3000}
    transitionTime={500}
    swipeable
    className={styles.slide}
  > 
      <CardMedia>
        <img src={image1} className={styles['carousel-image']} alt={`Slide`} />
      </CardMedia>
      <CardMedia>
        <img src={image2} className={styles['carousel-image']} alt={`Slide`} />
      </CardMedia>
      <CardMedia>
        <img src={image3} className={styles['carousel-image']}  alt={`Slide`} />
      </CardMedia>
  </Carousel>
  );
};

