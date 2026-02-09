import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => (
    <div style={{ padding: '40px', color: 'white', backgroundColor: '#0b0e14', minHeight: '100vh', fontFamily: 'serif' }}>
        <Link to="/" style={{ color: '#fbbf24', textDecoration: 'none', display: 'inline-block', marginBottom: '20px', fontSize: '1.1rem', fontFamily: 'Cinzel, serif' }}>
            ← Torna alla Home
        </Link>
        <h1>Informativa sulla Privacy</h1>
        <p>La tua privacy è importante per noi. Questa Web App è un progetto amatoriale ispirato ai Cavalieri dello Zodiaco.</p>
        <h2>Dati Raccolti</h2>
        <p>Non raccogliamo dati personali identificativi (nome, email, posizione). L'app potrebbe memorizzare localmente sul tuo dispositivo il segno zodiacale selezionato per migliorare l'esperienza d'uso.</p>
        <h2>Servizi di Terze Parti</h2>
        <p>Utilizziamo <strong>Google Gemini AI</strong> per generare i testi dell'oroscopo e <strong>Google Firebase</strong> per ospitare l'applicazione. Questi servizi possono raccogliere dati tecnici anonimi per scopi statistici.</p>
        <p>Ultimo aggiornamento: Febbraio 2026</p>
    </div>
);

export default PrivacyPolicy;
