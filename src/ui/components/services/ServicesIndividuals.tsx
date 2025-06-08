import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Modal, Typography, Box } from '@mui/material';
import style from './ServicesIndividuals.module.scss'
import { Form } from '../form/Form';


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
            <Modal
                open={!!selectedService}
                onClose={() => setSelectedService(null)}
                aria-labelledby="service-description-title"
                aria-describedby="service-description-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '60%', sm: '80%', md: 400 },
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography id="service-description-title" variant="h6" component="h2">
                        {selectedService.title}
                    </Typography>
                    <Typography id="service-description-description" sx={{ mt: 2 }}>
                        {selectedService.description}
                    </Typography>
                    <Button variant="contained" onClick={() => setSelectedService(null)} style={{ marginTop: '20px' }}>
                        Закрыть
                    </Button>
                </Box>
            </Modal>
        )}

        <Button variant="contained" onClick={handlePopupOpen} style={{ marginTop: '20px' }}>
            Задать вопрос
        </Button>

        <Modal
            open={openPopup}
            onClose={handlePopupClose}
            aria-labelledby="question-form-title"
            aria-describedby="question-form-description"
        >
            <Form />
        </Modal>
    </div>
  )
}
