import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter  } from 'react-router-dom';
import {HomePage} from './ui/components/home/Home'
import { ServicesIndividuals } from './ui/components/services/ServicesIndividuals'
import { ServicesLegalEntities } from './ui/components//services/servicesLegalEntities/ServicesLegalEntities'
import { Blog } from './ui/components/blog/Blog'
import {CategoryPage} from './ui/components/blog/categoryPage/CategoryPage'
import {ArticlePage} from './ui/components/blog/categoryPage/articlePage/ArticlePage'
import { Provider } from 'react-redux';
import store, { useAppDispatch } from './store/store';
import { useEffect } from 'react';
import Parse from './common/parseClient';
import { fetchArticles } from './store/slice/fetchArticles';






export const App = () => {
    

    useEffect(() => {
    Parse.initialize(import.meta.env.VITE_APP_ID, import.meta.env.VITE_APP_JS_KEY);
    Parse.serverURL = "https://parseapi.back4app.com";
  }, []);


    return (
        <Provider store={store}>
            <BrowserRouter basename="/FairJusticeProject">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path='/blog' element={<Blog />} />
                            <Route path="/category/:category" element={<CategoryPage />} />
                            <Route path="/category/:category/:id" element={<ArticlePage />} />
                            <Route path="/services-individuals" element={<ServicesIndividuals />} />
                            <Route path="/services-legalentities" element={<ServicesLegalEntities />} />
                        </Routes>
            </BrowserRouter>
        </Provider>
    );
};



export default App
