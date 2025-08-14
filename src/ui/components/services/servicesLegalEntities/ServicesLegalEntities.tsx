import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Modal, Typography, Box } from '@mui/material';
import { Form } from '../../form/Form';
import { ModalForm } from '../../modal/ModalForm';

interface Service {
  id: number;
  title: string;
  description: string;
}

export const servicesList: Service[] = [
  { id: 1, title: 'Юридическая консультация', description: 'Описание услуги Юридическая консультация...' },
  { id: 2, title: 'Регистрация бизнеса', description: 'Описание услуги Регистрация бизнеса...' },
  { id: 3, title: 'Сопровождение сделок', description: 'Описание услуги Сопровождение сделок...' },
];

export const ServicesLegalEntities = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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
              borderColor: '#1976d2' 
          }}
      >
          Назад
      </Button>
      <Typography variant="h4" gutterBottom>
          Услуги для юридических лиц
      </Typography>
      <List>
          {servicesList.map((service) => (
              <ListItem
                  key={service.id}
                  component="button"
                  onClick={() => handleServiceClick(service)}
                  sx={{ 
                      textAlign: 'left',
                      borderRadius: '8px',
                      border: '1px solid #1976d2',
                      marginBottom: '10px',
                      padding: '10px',
                      '&:hover': {
                          backgroundColor: '#e3f2fd'
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
  );
}
