import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => (
    <div style={{ padding: '40px', color: 'white', backgroundColor: '#0b0e14', minHeight: '100vh', fontFamily: 'serif' }}>
        <Link to="/" style={{ color: '#fbbf24', textDecoration: 'none', display: 'inline-block', marginBottom: '20px', fontSize: '1.1rem', fontFamily: 'Cinzel, serif' }}>
            ← Torna alla Home
        </Link>
        <h1>Informativa sui Cookie</h1>
        <p>Questa Web App utilizza solo cookie tecnici e tecnologie simili (come il LocalStorage del browser).</p>
        <h2>Cosa sono i Cookie?</h2>
        <p>I cookie sono piccoli file di testo salvati sul tuo dispositivo che aiutano l'app a funzionare correttamente.</p>
        <h2>Utilizzo dei Cookie</h2>
        <ul>
            <li><strong>Cookie Tecnici:</strong> Necessari per ricordare le tue preferenze (es. il tuo segno zodiacale).</li>
            <li><strong>Cookie di Terze Parti:</strong> Google potrebbe utilizzare cookie per garantire la sicurezza del sito tramite Firebase.</li>
        </ul>
        <p>Puoi disabilitare i cookie dalle impostazioni del tuo browser, ma alcune funzioni dell'app potrebbero non funzionare correttamente.</p>
    </div>
);

export default CookiePolicy;
