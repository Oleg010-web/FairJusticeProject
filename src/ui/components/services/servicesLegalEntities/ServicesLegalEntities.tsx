import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Modal, Typography, Box } from '@mui/material';
import { Form } from '../../form/Form';
import { ModalForm } from '../../modal/ModalForm';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../../store/store';
import { toggleTheme } from '../../../../store/slice/themeSlice';
import { Header } from '../../header/Header';
import { YandexMap } from '../../map/Map';
import { ServiceModal } from '../../modal/ServiceModal';

interface Service {
  id: string;
  title: string;
  description: string;
}

export const servicesList: Service[] = [
  { id: nanoid(), title: '• Юридическая консультация', description: 'Для компаний и ИП: профессиональный анализ рисков банкротства, стратегии реструктуризации бизнеса и минимизации потерь. Я помогу сохранить активы, оптимизировать долги. Надёжная поддержка для вашего бизнеса в кризисной ситуации.' },
  { id: nanoid(), title: '• Регистрация бизнеса', description: 'Запустите свой бизнес без хлопот: я помогу зарегистрировать ИП, ООО или другую форму — от подготовки документов до подачи в ФНС. Полный пакет услуг с проверкой на ошибки и консультациями, чтобы вы начали работу легально и уверенно. Быстро, доступно и с гарантией успеха!' },
  { id: nanoid(), title: '• Сопровождение сделок', description: 'Обеспечьте безопасность ваших сделок: юридическое сопровождение договоров, купли-продажи, аренды или инвестиций. Я проверю документы, минимизирую риски, защищу интересы и помогу избежать споров. Профессиональная поддержка на каждом этапе — для спокойного ведения бизнеса.' },
  { id: nanoid(), title: '• Проведение процедуры банкротства юридического лица', description: 'Полное сопровождение процедуры банкротства компании, включая подачу заявления, управление активами и ликвидацию для удовлетворения требований кредиторов.' },
  { id: nanoid(), title: '• Установление требований кредиторов в реестре требований кредиторов должника', description: 'Помощь в подтверждении и включении требований кредиторов в реестр в рамках банкротства юридического лица, обеспечивая их приоритетное удовлетворение.' },
  { id: nanoid(), title: '• Оспаривание необоснованных требований кредиторов при включении требований в реестр требований кредиторов должника', description: 'Оспаривание завышенных или необоснованных требований кредиторов в суде для защиты интересов должника и корректного формирования реестра.' },
  { id: nanoid(), title: '• Оспаривание сделок / защита от оспаривания сделок', description: 'Анализ и оспаривание сделок, совершенных перед банкротством, или защита от оспаривания законных операций для сохранения активов компании.' },
  { id: nanoid(), title: '• Привлечение контролирующих должника лиц к субсидиарной ответственности', description: 'Инициирование процедуры привлечения руководителей или контролирующих лиц компании к дополнительной ответственности за убытки, возникшие из-за их действий.' },
  { id: nanoid(), title: '• Защита от привлечения контролирующих должника лиц к субсидиарной ответственности', description: 'Представление интересов контролирующих должника лиц в суде для предотвращения привлечения к субсидиарной ответственности, защищая их от дополнительных финансовых обязательств.' },
];

export const ServicesLegalEntities = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openServicePopup, setOpenServicePopup] = useState(false);
  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(toggleTheme())
  }
  const navigate = useNavigate();

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    handleServicePopupOpen()
  };

  const handleServicePopupOpen = () => {
    setOpenServicePopup(!openServicePopup);
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
      <Header changeTheme={changeMode} />
      <Button
        variant="outlined"
        onClick={handleBackClick}
        style={{
          marginTop: '75px',
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
        <ServiceModal
          open={openServicePopup}
          onClose={handleServicePopupOpen}
          selectedService={selectedService}
        />
      )}

      <Button variant="contained" onClick={handlePopupOpen} style={{ marginTop: '20px' }}>
        Задать вопрос
      </Button>

      <ModalForm handleCloseModal={handlePopupClose} openModal={openPopup} />
      <YandexMap />
    </div>
  );
}
