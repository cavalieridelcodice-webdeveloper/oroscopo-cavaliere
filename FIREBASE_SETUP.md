# Guida Setup Firebase per Oroscopo

## Obiettivo
Configurare Firebase Firestore per salvare gli oroscopi quotidiani generati dall'automazione.

## Passaggi

### 1. Crea Progetto Firebase

1. Vai su [console.firebase.google.com](https://console.firebase.google.com)
2. Clicca su **"Aggiungi progetto"** o **"Add project"**
3. Nome progetto: **"oroscopo-quotidiano"** (o nome a tua scelta)
4. Disabilita Google Analytics (non necessario per questo progetto)
5. Clicca su **"Crea progetto"**

### 2. Abilita Firestore Database

1. Nel menu laterale, vai su **"Build" > "Firestore Database"**
2. Clicca su **"Crea database"** o **"Create database"**
3. Modalità: Seleziona **"Inizia in modalità produzione"** (Start in production mode)
4. Posizione: Scegli **"europe-west1"** (Belgio) o la più vicina
5. Clicca su **"Abilita"**

### 3. Ottieni Credenziali Service Account

1. Vai su **Impostazioni progetto** (icona ingranaggio in alto a sinistra > "Project settings")
2. Vai alla tab **"Account di servizio"** o **"Service accounts"**
3. Clicca su **"Genera nuova chiave privata"** o **"Generate new private key"**
4. Conferma e scarica il file JSON
5. **IMPORTANTE**: Salva questo file in modo sicuro, contiene credenziali sensibili

### 4. Configura Variabili Ambiente

Dal file JSON scaricato, estrai questi valori e salvali nel file `.env.local`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
```

## Note Importanti

- **Non committare mai il file JSON nel repository Git**
- Il file `.env.local` è già nel `.gitignore`
- Le stesse variabili andranno configurate su Vercel quando faremo il deploy

## Free Tier Firebase

Il piano gratuito include:
- **50,000 letture/giorno**
- **20,000 scritture/giorno**
- **1 GB storage**

Più che sufficienti per salvare 12 oroscopi al giorno e servirli agli utenti!
