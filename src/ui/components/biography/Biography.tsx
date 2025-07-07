import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';

import styles from './Biography.module.scss';
import { CarouselItem } from '../carousel/Carousel';

interface BiographyProps {
  images: string[];
  bioText: string;
  sliderWidth?: string | number;
  sliderHeight?: string | number;
}

export const Biography: React.FC<BiographyProps> = ({
  images,
  bioText,
  sliderWidth = 400,
  sliderHeight = 300,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Для мобильных устройств уменьшим размеры слайдера
  const mobileSliderWidth = typeof sliderWidth === 'number' ? Math.min(sliderWidth, 300) : '100%';
  const mobileSliderHeight = typeof sliderHeight === 'number' ? Math.min(sliderHeight, 200) : 'auto';

  return (
    <Box
      className={styles.biographyWrapper}
      sx={{
        p: 2,
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h3" align="center" sx={{ fontSize: 30, marginBottom: 7 }}>
        Обо мне
      </Typography>
      <Grid
        container spacing={4} alignItems="center" justifyContent="center" direction={isMobile ? 'column' : 'row'} sx={{ width: '100%' }}
      >
        {/* Слайдер в отдельном Grid item */}

        <Grid size={{ xs: 12, sm: 6, md: 5 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CarouselItem
            images={images}
            width={isMobile ? mobileSliderWidth : sliderWidth}
            height={isMobile ? mobileSliderHeight : sliderHeight}
            imgStyle={{ borderRadius: '12px', filter: 'brightness(0.9)' }}
          />
        </Grid>



        {/* Текст в отдельном Grid item */}

        <Grid size={{ xs: 12, sm: 6, md: 5 }} sx={{ maxWidth: 450, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant="body1"
            className={styles.bioText}
            sx={{ wordWrap: 'break-word', whiteSpace: 'normal', color: 'whitesmoke' }}
          >
            {bioText}
          </Typography>
        </Grid>

      </Grid>
    </Box>
  );
};



