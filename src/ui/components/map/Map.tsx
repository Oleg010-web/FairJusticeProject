import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';

declare const ymaps: any;
export const YandexMap = () => {
    const isMapInitialized = useRef(false); // Флаг для отслеживания инициализации карты
    useEffect(() => {
        const loadYandexMaps = () => {
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=9f73cf9b-54d2-4a7e-802d-e6b461275484'; // Ваш API ключ
            script.onload = () => {
                if (!isMapInitialized.current) {
                    ymaps.ready(init);
                }
            };
            document.body.appendChild(script);
        };

        const init = () => {
            isMapInitialized.current = true; // Установите флаг, когда карта инициализирована
            const mapElement = document.getElementById('map');

            // Проверяем, что элемент существует и не инициализирован
            if (mapElement && mapElement.childNodes.length > 0) return;
            const myLatLng = [55.746188, 37.654709]; // Москва, Россия

            // Создайте новую карту
            const map = new ymaps.Map('map', {
                center: myLatLng,
                zoom: 17
            });

            // Создайте маркер
            const placemark = new ymaps.Placemark(myLatLng, {
                hintContent: 'Ваш адрес',
                balloonContent: 'Это ваш адрес!'
            });

            // Добавьте маркер на карту
            map.geoObjects.add(placemark);
        };

        loadYandexMaps();
    }, []);

    return (
        <Box component={Paper} elevation={3} sx={{ padding: 2, marginTop: '50px' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Наши контакты:
            </Typography>

            <Box sx={{ textAlign: 'left', marginBottom: '20px' }}>
                <Typography variant="body1" gutterBottom>
                    <strong>Адрес:</strong> ул. Примерная, 123, г. Москва
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Телефон:</strong> +7 (123) 456-78-90
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Режим работы:</strong> Пн - Пт: 09:00 - 18:00
                </Typography>
            </Box>
            <Box
                id="map"
                sx={{ height: '400px', width: '100%' }}
            />
        </Box >
    );
};


