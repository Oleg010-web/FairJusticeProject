import React from 'react';
import { Carousel } from 'antd';
import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const images = [
  image1,
  image2,
  image3,
];
export const CarouselAnt: React.FC = () => (
  <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
    {images.map((image, index) => {
      return (
        <div key={index} style={{ width: '100%', height: '160px', backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
          <h3 style={contentStyle}>Item {index + 1}</h3>
        </div>
      );
    })}
  </Carousel>
);