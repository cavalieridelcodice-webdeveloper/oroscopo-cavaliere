import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../index.css'

/**
 * REGISTRAZIONE SERVICE WORKER
 * Questo blocco permette all'app di essere installata sul telefono
 * e di funzionare senza internet (modalità aereo).
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Il percorso '/sw.js' punta al file che hai creato nella cartella public
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✨ Il Cosmo è con noi: Service Worker registrato!', registration.scope);
      })
      .catch((error) => {
        console.error('💥 Errore nel risvegliare il Service Worker:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)