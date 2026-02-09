# L'Oroscopo del Cavaliere

Un'applicazione React elegante per l'oroscopo giornaliero.

## 📁 Struttura del Progetto

Il progetto segue rigorosamente la struttura richiesta:

- **src/components/**: Contiene i componenti UI divisi per cartelle (Hero, ZodiacGrid, ecc.), ognuno con il proprio file JSX e CSS.
- **src/services/**: Contiene `horoscopeService.js`, il cuore logico dell'applicazione.
- **src/data/**: Contiene i dati statici dei segni zodiacali.
- **src/assets/images/**: Posizione per l'immagine `hero-oroscopo.png`.

## ⚙️ Funzionamento Tecnico

### 1. Gestione dello Stato (App.jsx)
L'app utilizza `useState` per tracciare:
- `selectedSign`: Il segno zodiacale cliccato dall'utente.
- `horoscopeData`: I dati (testo, data, numero fortunato) generati per quel segno.

### 2. Aggiornamento Giornaliero (horoscopeService.js)
La funzione `getOroscopoDelGiorno` implementa una logica deterministica ma dinamica:
- Crea un "seed" univoco combinando la data di oggi (es. 2023-10-27) e l'ID del segno.
- Usa questo seed per generare numeri pseudo-casuali.
- Seleziona frasi diverse da array predefiniti (Umore, Amore, Lavoro) basandosi su questi numeri.
- **Risultato**: Se ricarichi la pagina oggi, l'oroscopo per l'Ariete sarà sempre lo stesso. Domani cambierà automaticamente.

### 3. Caching (LocalStorage)
Per ottimizzare e persistere i dati durante la navigazione:
- Prima di generare un oroscopo, il service controlla `localStorage` con una chiave tipo `horoscope_2023-10-27_aries`.
- Se esiste, restituisce i dati salvati.
- Se non esiste (o è un nuovo giorno), ne genera uno nuovo e lo salva.

## 🚀 Come Pubblicare su GitHub Pages

1. Inizializza il repo git.
2. Assicurati di avere `vite` configurato con il `base` corretto in `vite.config.js` se necessario (es. `base: '/nome-repo/'`).
3. Esegui `npm run build`.
4. Carica la cartella `dist` o usa una GitHub Action per il deploy.

## 🖼 Immagini
Assicurati di inserire il file `hero-oroscopo.png` nella cartella `src/assets/images/`. Se non presente, la Hero section mostrerà un colore di sfondo blu scuro di fallback.
