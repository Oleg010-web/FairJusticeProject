import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Modal, Typography, Box } from '@mui/material';
import style from './ServicesIndividuals.module.scss'
import { Form } from '../form/Form';
import { ModalForm } from '../modal/ModalForm';


interface Service {
  id: number;
  title: string;
  description: string;
}

const servicesList: Service[] = [
  { id: 1, title: 'Консультация', description: 'Описание услуги Консультация...' },
  { id: 2, title: 'Представительство', description: 'Описание услуги Представительство...' },
  { id: 3, title: 'Помощь в оформлении документов', description: 'Описание услуги Помощь в оформлении документов...' },
];

export const ServicesIndividuals = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);;
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handlePopupOpen = () => {
    setOpenPopup(true);
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
  };

  const handleBackClick = () => {
    navigate('/');
  };

return (
    <div style={{ padding: '20px' }}>
        <Button 
            variant="outlined" 
            onClick={handleBackClick} 
            style={{ 
                marginBottom: '20px', 
                borderColor: '#1976d2' // Цвет границы кнопки (по умолчанию цвет Material UI)
            }}
        >
            Назад
        </Button>
        <Typography variant="h4" gutterBottom>
            Услуги для физических лиц
        </Typography>
        <List>
            {servicesList.map((service) => (
                <ListItem
                    key={service.id}
                    component="button"
                    onClick={() => handleServiceClick(service)}
                    sx={{ 
                        textAlign: 'left',
                        borderRadius: '8px', // Закругленные края 
                        border: '1px solid #1976d2', // Цвет границы
                        marginBottom: '10px', // Отступ между элементами списка
                        padding: '10px', // Внутренние отступы
                        '&:hover': {
                            backgroundColor: '#e3f2fd' // Цвет при наведении
                        }
                    }}
                >
                    <ListItemText primary={service.title} />
                </ListItem>
            ))}
        </List>

        {selectedService && (
            <ModalForm handleCloseModal={handlePopupClose} openModal={openPopup}/>
        )}

        <Button variant="contained" onClick={handlePopupOpen} style={{ marginTop: '20px' }}>
            Задать вопрос
        </Button>

      <ModalForm handleCloseModal={handlePopupClose} openModal={openPopup}/>
    </div>
  )
}
