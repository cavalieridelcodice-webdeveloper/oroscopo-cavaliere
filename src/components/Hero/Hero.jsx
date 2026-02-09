import React, { useState } from 'react';
import './Hero.css';
import heroImg from '../../assets/images/hero.jpg';
import SignPersonalityNav from '../SignPersonalityNav/SignPersonalityNav';
import SignPersonalityModal from '../SignPersonalityModal/SignPersonalityModal';


// Importazione immagini dei segni zodiacali
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

const Hero = () => {
  const [selectedPersonalitySign, setSelectedPersonalitySign] = useState(null);
  // Array di frasi ispirazionali
  const dailyQuotes = [
    "La tua armatura è forgiata nel fuoco delle stelle.",
    "Un vero cavaliere scrive il proprio destino ogni giorno.",
    "Le costellazioni guidano il tuo cammino verso la vittoria.",
    "La forza non è solo nella spada, ma nel cuore di chi la impugna.",
    "Guarda il cielo: i pianeti oggi tramano per il tuo successo.",
    "Ogni sfida è un'opportunità per mostrare il tuo valore.",
    "Il coraggio è la tua bussola nel mare del cosmo."
  ];

  const zodiacSigns = [
    { id: 'ariete', img: arieteImg },
    { id: 'toro', img: toroImg },
    { id: 'gemelli', img: gemelliImg },
    { id: 'cancro', img: cancroImg },
    { id: 'leone', img: leoneImg },
    { id: 'vergine', img: vergineImg },
    { id: 'bilancia', img: bilanciaImg },
    { id: 'scorpione', img: scorpioneImg },
    { id: 'sagittario', img: sagittarioImg },
    { id: 'capricorno', img: capricornoImg },
    { id: 'acquario', img: acquarioImg },
    { id: 'pesci', img: pesciImg }
  ];

  // Logica per cambiare frase ogni giorno in base alla data
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const dailyQuote = dailyQuotes[dayOfYear % dailyQuotes.length];

  return (
    <section className="hero">
      <SignPersonalityNav onSignSelect={setSelectedPersonalitySign} />

      <SignPersonalityModal
        sign={selectedPersonalitySign}
        onClose={() => setSelectedPersonalitySign(null)}
      />

      {/* Immagine di sfondo con animazione zoom */}
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${heroImg})` }}
      ></div>

      {/* Overlay per scurire leggermente l'immagine e far leggere il testo */}
      <div className="hero-overlay"></div>

      {/* Mobile Special Effects: Stars & Shooting Star */}
      <div className="mobile-stars">
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
        <div className="star star-6"></div>
        <div className="star star-7"></div>
        <div className="star star-8"></div>
        <div className="shooting-star shooting-star-1"></div>
        <div className="shooting-star shooting-star-2"></div>
      </div>

      {/* Container per l'orbita zodiacale */}
      <div className="zodiac-orbit-container">
        <div className="zodiac-orbit-ring">
          {zodiacSigns.map((sign, index) => (
            <div
              key={sign.id}
              className="zodiac-orbit-spoke"
              style={{ transform: `rotate(${index * 30}deg)` }}
            >
              <div className="zodiac-orbit-distance">
                <div className="zodiac-orbit-counter-spin">
                  <div
                    className="zodiac-orbit-correction"
                    style={{ transform: `rotate(-${index * 30}deg)` }}
                  >
                    <div
                      className="zodiac-orbit-item"
                      style={{ backgroundImage: `url(${sign.img})` }}
                      title={sign.id}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenitore dei testi */}
      <div className="hero-content">
        <h1 className="hero-title">L'Oroscopo del Cavaliere</h1>
        <div className="hero-divider"></div>
        <p className="hero-subtitle">{dailyQuote}</p>
      </div>

      {/* Indicatore di scroll */}
      <div className="scroll-indicator">
        <span>&#8964;</span>
      </div>
    </section>
  );
};

export default Hero;