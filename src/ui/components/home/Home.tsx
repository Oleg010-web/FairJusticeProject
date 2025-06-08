import { useEffect } from 'react';
import '../../../App.css';
import reactLogo from './assets/react.svg';
import { Form } from '../form/Form';
import viteLogo from '/vite.svg';
import { Header } from '../header/Header';
// @ts-ignore
import Parse from 'parse/dist/parse.min.js';
import { CarouselItem } from '../carousel/Carousel';
import { Card } from '../introduce/Card';
import { Services } from '../attendance/Services'
import { YandexMap } from '../map/Map';




export const HomePage = () => {

  useEffect(() => {
    Parse.initialize(import.meta.env.VITE_APP_ID, import.meta.env.VITE_APP_JS_KEY);
    Parse.serverURL = "https://parseapi.back4app.com";
  }, []); 

  return (
    <>
      <Header />
      <CarouselItem />
      <Card />
      <Services />
      <Form />
      <YandexMap />
    </>
  )
}
