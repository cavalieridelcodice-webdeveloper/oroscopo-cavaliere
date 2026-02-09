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
    "Il coraggio è la tua bussola nel mare del cosmo.",
    "Il tuo Cosmo brucia con l'intensità di mille soli.",
    "Non temere l'eclissi, la tua luce interiore è inestinguibile.",
    "Le stelle non cadono, tracciano la rotta per chi sa sognare.",
    "Anche la notte più oscura cede il passo all'alba della giustizia.",
    "Il destino è un filo d'oro teso tra le mani del cercatore.",
    "La tua volontà è più dura della corazza più resistente.",
    "Risveglia il settimo senso e trasforma l'impossibile in realtà.",
    "Ogni cicatrice racconta la storia di una battaglia vinta nel nome dell'onore.",
    "Le orbite dei pianeti danzano al ritmo del tuo spirito indomito.",
    "La saggezza degli antichi risuona nel silenzio delle galassie.",
    "Sii come la stella polare: fermo, lucente e punto di riferimento.",
    "L'universo non ti ostacola, ti mette alla prova per renderti leggenda.",
    "Un cuore puro può spostare le montagne e deviare le comete.",
    "Ascolta il battito dell'universo, batte all'unisono con il tuo.",
    "La vera nobiltà risiede nel proteggere chi non può difendersi.",
    "Nessun abisso è troppo profondo per chi possiede ali di luce.",
    "Il Cosmo è infinito, proprio come il potenziale che porti dentro.",
    "Scolpisci il tuo nome tra gli astri con le azioni di oggi.",
    "L'equilibrio tra le forze celesti si riflette nella tua serenità.",
    "Non contare le stelle, fai in modo che ogni stella conti per te.",
    "L'energia del vuoto cosmico è il motore della tua determinazione.",
    "Oltre la nebulosa del dubbio, brilla la chiarezza del tuo scopo.",
    "Sei un frammento d'universo che ha deciso di brillare di luce propria."
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