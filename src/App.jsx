import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getOroscopoDelGiorno } from './services/horoscopeService';
import Hero from './components/Hero/Hero';
import ZodiacGrid from './components/ZodiacGrid/ZodiacGrid';
import HoroscopeCard from './components/HoroscopeCard/HoroscopeCard';
import CosmicCursor from './components/CosmicCursor';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import './App.css';

function MainApp() {
  const [loading, setLoading] = useState(true);
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // 1. Splash Screen iniziale
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Funzione per gestire il click su un segno
  const handleSignClick = async (sign) => {
    setIsFetching(true);
    setSelectedSign(sign);

    try {
      const data = await getOroscopoDelGiorno(sign);
      setHoroscopeData(data);
    } catch (error) {
      console.error("Errore nel recupero oroscopo:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // 3. Chiusura modale
  const handleClose = () => {
    setSelectedSign(null);
    setHoroscopeData(null);
  };

  // Render dello Splash Screen
  if (loading) {
    return (
      <div className="splash-screen">
        <div className="loader-content">
          <img src="/android-chrome-192x192.png" alt="Logo" className="pulse-logo" />
          <h1 className="gold-text">L'Oroscopo del Cavaliere</h1>
          <p>Le stelle si stanno allineando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main">
      <CosmicCursor />

      {/* Hero section with zodiac orbit and sign personalities */}
      <Hero />

      <header className="app-header">
        <h1 className="app-title">Scegli il tuo Segno</h1>
        <div className="header-underline"></div>
      </header>

      <main className="container">
        <ZodiacGrid onSignSelect={handleSignClick} />

        {/* Mostriamo la card solo se un segno è selezionato */}
        {selectedSign && (
          <div className={`modal-overlay ${isFetching ? 'loading-data' : 'active'}`}>
            {isFetching ? (
              <div className="spinner-gold"></div>
            ) : (
              <HoroscopeCard
                sign={selectedSign}
                data={horoscopeData}
                onClose={handleClose}
              />
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p className="footer-notice">Le previsioni astrali si rinnovano quotidianamente con il sorgere di ogni nuovo giorno, a partire dalla mezzanotte.</p>
        <p>© 2026 L'Oroscopo del Cavaliere. Le stelle ti guidano.</p>
        <div className="footer-links">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <span className="separator">|</span>
          <Link to="/cookie" className="footer-link">Cookie Policy</Link>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookie" element={<CookiePolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;