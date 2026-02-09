import React from 'react';
import { zodiacSigns } from '../../data/zodiacSigns';
import './ZodiacGrid.css';

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

const ZodiacGrid = ({ onSignSelect }) => {
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

  return (
    <section className="zodiac-grid-container">
      <div className="zodiac-grid">
        {zodiacSigns.map((sign) => (
          <div
            key={sign.id}
            className="zodiac-card"
            style={{ backgroundImage: `url(${zodiacImages[sign.id]})` }}
            onClick={() => onSignSelect(sign)}
          >
            <div className="zodiac-card-overlay"></div>
            <div className="zodiac-card-content">
              <h3 className="zodiac-name">{sign.name}</h3>
              <span className="zodiac-dates">{sign.dates}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZodiacGrid;