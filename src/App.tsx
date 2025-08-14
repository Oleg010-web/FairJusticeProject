import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { HomePage } from './ui/components/home/Home'
import { ServicesIndividuals } from './ui/components/services/ServicesIndividuals'
import { ServicesLegalEntities } from './ui/components/services/servicesLegalEntities/ServicesLegalEntities'
import { Blog } from './ui/components/blog/Blog'
import { CategoryPage } from './ui/components/blog/categoryPage/CategoryPage'
import { ArticlePage } from './ui/components/blog/categoryPage/articlePage/ArticlePage'
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector, RootState } from './store/store';
import { useEffect } from 'react';
import Parse from './common/parseClient';
import { fetchArticles } from './store/slice/fetchArticles';
import { toggleTheme } from './store/slice/themeSlice';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';



export const App = () => {

    const themeMode = useAppSelector((state: RootState) => state.theme.themeMode);

    const dispatch = useAppDispatch()

    const changeMode = () => {
        dispatch(toggleTheme())
    }

    const myTheme = createTheme({
        palette: {
            mode: themeMode,
        },
    })

    return (
        <ThemeProvider theme={myTheme}>
            <CssBaseline />
            <BrowserRouter basename="/FairJusticeProject">
                <Routes>
                    <Route path="/" element={<HomePage changeTheme={changeMode} />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/category/:category/:id" element={<ArticlePage />} />
                    <Route path="/services-individuals" element={<ServicesIndividuals />} />
                    <Route path="/services-legalentities" element={<ServicesLegalEntities />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};



export default App
