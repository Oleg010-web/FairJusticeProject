import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from './ui/components/home/Home'
import { ServicesIndividuals } from './ui/components/services/ServicesIndividuals'
import { ServicesLegalEntities } from './ui/components//services/servicesLegalEntities/ServicesLegalEntities'
import reactLogo from './assets/react.svg';
import { Form } from './ui/components/form/Form';
import viteLogo from '/vite.svg';
import { Header } from './ui/components/header/Header';
// @ts-ignore
import Parse from 'parse/dist/parse.min.js';
import { CarouselItem } from './ui/components/carousel/Carousel';
import { Card } from './ui/components/introduce/Card';
import { Services } from './ui/components/attendance/Services'
import { Provider } from 'react-redux';
import store from './store/store';




export const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services-individuals" element={<ServicesIndividuals />} />
                    <Route path="/services-legalentities" element={<ServicesLegalEntities />} />
                </Routes>
            </Router>
        </Provider>
    );
};



export default App
