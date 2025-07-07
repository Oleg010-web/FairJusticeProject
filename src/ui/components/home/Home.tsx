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
import { Box, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchArticles } from '../../../store/slice/fetchArticles';
import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';
import avatar1 from '../../../assets/images/avatar1.jpg';
import avatar2 from '../../../assets/images/avatar2.jpg';
import { Biography } from '../biography/Biography';




export const HomePage = () => {
  const { success, items, loading } = useAppSelector(state => state.article);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   Parse.initialize(import.meta.env.VITE_APP_ID, import.meta.env.VITE_APP_JS_KEY);
  //   Parse.serverURL = "https://parseapi.back4app.com";
  // }, []);


  return (
    <>
      <Header />
      <CarouselItem images={[image1, image2, image3]} width={'100%'} height={'550px'}/>
      <Card />
      <Services />
      <Biography images={[avatar1, avatar2]} bioText='Владислав Сергеевич Ивушкин — опытный юрист с более чем 10-летним стажем.Специализируется на гражданском праве и процессе банкротва физических и юридических лиц.Любит помогать людям и решать сложные задачи.' sliderWidth={'350px'} sliderHeight={'350px'} />
      <Box component={Paper} elevation={3} sx={{ padding: 2, marginTop: '10px', backgroundColor: 'transparent', border: '2px solid', borderColor: '#708090', }}>
        <Form />
      </Box>
      <YandexMap />
    </>
  )
}
