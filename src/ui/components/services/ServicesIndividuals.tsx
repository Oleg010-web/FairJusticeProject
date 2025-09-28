import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalForm } from '../modal/ModalForm';
import { Header } from '../header/Header';
import { YandexMap } from '../map/Map';
import { useAppDispatch } from '../../../store/store';
import { toggleTheme } from '../../../store/slice/themeSlice';
import { ServiceModal } from '../modal/ServiceModal';


interface Service {
  id: string;
  title: string;
  description: string;
}

const servicesList: Service[] = [
  { id: nanoid(), title: '• Консультация', description: 'Получите персональную консультацию от опытного юриста: разберём вашу финансовую ситуацию, объясним, как списать долги без потери имущества, и подскажем шаги для выхода из долговой ямы. Конфиденциально и без обязательств — начните путь к финансовой свободе уже сегодня!' },
  { id: nanoid(), title: '• Представительство', description: 'Доверьте защиту своих интересов квалифицированному юристу и арбитражному управляющему: полное представительство в суде, арбитражных процедурах и переговорах с кредиторами. Я отстою ваши права, соберу доказательства и добьюсь наилучшего исхода — от списания долгов до восстановления платежеспособности.' },
  { id: nanoid(), title: '• Помощь в оформлении документов', description: 'Экономьте время и нервы: я подготовлю, проверю и подаду все необходимые документы в соответствующие инстанции, органы — от заявления о банкротстве до отчётов и соглашений. Точная юридическая помощь без ошибок, чтобы процедура прошла гладко и быстро, с соблюдением всех норм закона.' },
  { id: nanoid(), title: '• Проведение процедуры банкротства должника гражданина', description: 'Полное сопровождение процесса банкротства физического лица, включая подачу заявления, взаимодействие с судом и кредиторами, а также управление имуществом для достижения освобождения от долгов.' },
  { id: nanoid(), title: '• Установление требований кредиторов в реестре требований кредиторов должника', description: 'Помощь в подтверждении и включении обоснованных требований кредиторов в официальный реестр в рамках процедуры банкротства, чтобы обеспечить их учет и удовлетворение.' },
  { id: nanoid(), title: '• Оспаривание необоснованных требований кредиторов при включении требований в реестр требований кредиторов должника', description: 'Представление интересов должника в суде для исключения завышенных или неправомерных требований кредиторов из реестра, защищая интересы клиента.' },
  { id: nanoid(), title: '• Оспаривание сделок / защита от оспаривания сделок', description: 'Анализ и оспаривание подозрительных сделок должника, совершенных перед банкротством, или защита от попыток кредиторов оспорить законные сделки для сохранения имущества.' },
  { id: nanoid(), title: '• Исключение имущества из конкурсной массы должника', description: 'Помощь в исключении определенного имущества (например, единственного жилья или необходимых вещей) из конкурсной массы, чтобы оно не было продано для погашения долгов.' },
  { id: nanoid(), title: '• Признание требований кредиторов общими обязательствами с супругом (ой)', description: 'Инициирование процесса признания долгов общими обязательствами супругов, что позволяет распределить ответственность за долги между обоими супругами.' },
  { id: nanoid(), title: '• Защита от признания требований кредиторов общими обязательствами с супругом (ой)', description: 'Представление интересов клиента в суде для предотвращения признания долгов общими, защищая личные активы и финансы от совместной ответственности.' },
  { id: nanoid(), title: '• Утверждение плана реструктуризации долгов гражданина', description: 'Разработка и помощь в утверждении плана реструктуризации долгов, который позволяет должнику погашать задолженность в рассрочку без полного банкротства.' },
];

export const ServicesIndividuals = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);;
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
  )
}
