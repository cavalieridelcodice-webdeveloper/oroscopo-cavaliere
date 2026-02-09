import React from 'react';
import './ZodiacIcon.css';

// Importazione delle immagini dei segni zodiacali
import arieteImg from '../../assets/images/ariete.jpg';
import toroImg from '../../assets/images/toro.jpg';
import gemelliImg from '../../assets/images/gemelli.jpg';
import cancroImg from '../../assets/images/cancro.jpg';
import leoneImg from '../../assets/images/leone.png';
import vergineImg from '../../assets/images/vergine.jpg';
import bilanciaImg from '../../assets/images/bilancia.jpg';
import scorpioneImg from '../../assets/images/scorpione.jpg';
import sagittarioImg from '../../assets/images/sagittario.jpg';
import capricornoImg from '../../assets/images/capricorno.jpg';
import acquarioImg from '../../assets/images/acquario.jpg';
import pesciImg from '../../assets/images/pesci.jpg';

const ZodiacIcon = ({ signId }) => {
  // Mappa degli ID dei segni zodiacali alle rispettive immagini
  const zodiacImages = {
    'aries': arieteImg,
    'taurus': toroImg,
    'gemini': gemelliImg,
    'cancer': cancroImg,
    'leo': leoneImg,
    'virgo': vergineImg,
    'libra': bilanciaImg,
    'scorpio': scorpioneImg,
    'sagittarius': sagittarioImg,
    'capricorn': capricornoImg,
    'aquarius': acquarioImg,
    'pisces': pesciImg
  };

  // Nomi italiani per alt text
  const zodiacNames = {
    'aries': 'Ariete',
    'taurus': 'Toro',
    'gemini': 'Gemelli',
    'cancer': 'Cancro',
    'leo': 'Leone',
    'virgo': 'Vergine',
    'libra': 'Bilancia',
    'scorpio': 'Scorpione',
    'sagittarius': 'Sagittario',
    'capricorn': 'Capricorno',
    'aquarius': 'Acquario',
    'pisces': 'Pesci'
  };

  const imageSrc = zodiacImages[signId];
  const altText = zodiacNames[signId] || 'Segno Zodiacale';

  return (
    <img
      src={imageSrc}
      alt={altText}
      className="zodiac-icon-img"
    />
  );
};

export default ZodiacIcon;