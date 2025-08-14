import { useEffect, useState } from 'react';
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
import { Box, createTheme, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { RootState, useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchArticles } from '../../../store/slice/fetchArticles';
import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';
import avatar1 from '../../../assets/images/avatar1.jpg';
import avatar2 from '../../../assets/images/avatar2.jpg';
import { Biography } from '../biography/Biography';
import { toggleTheme } from '../../../store/slice/themeSlice';


type ThemeMode = 'dark' | 'light'

type Props = {
  changeTheme: () => void
}

export const HomePage = ({changeTheme} : Props) => {


  return (
    <>
        <Header changeTheme={changeTheme}/>
        <CarouselItem images={[image1, image2, image3]} width={'100%'} height={'550px'} />
        <Card />
        <Services />
        <Biography images={[avatar1, avatar2]} bioText='Владислав Сергеевич Ивушкин — опытный юрист с более чем 10-летним стажем.Специализируется на гражданском праве и процессе банкротва физических и юридических лиц.Любит помогать людям и решать сложные задачи.' sliderWidth={'350px'} sliderHeight={'350px'} />
        <Box sx={{ padding: 2, marginTop: '10px' }}>
          <Form />
        </Box>
        <YandexMap />
    </>
  )
}
