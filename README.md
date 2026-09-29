# MeditAid 🧘‍♂️

MeditAid è una web app React/Vite dedicata alla meditazione. Offre un timer personalizzabile e tre tracce audio guidate: Gratitudine, Respiro e Rilassamento Profondo. Questo repository è stato esteso con un ciclo DevOps completo per il progetto finale del Master.

## Architettura

Il frontend è sviluppato con React 19 e Vite. Per l'esercitazione DevOps è stato aggiunto un piccolo servizio backend Node.js, usato per rappresentare un'architettura frontend + backend reale e containerizzabile.

```text
Browser
  |
  +--> React/Vite frontend :5173
  |
  +--> Node API :3001
          |
          +--> GET /health
          +--> GET /api/meditations
```

Il backend non contiene dati sensibili e mantiene volutamente una responsabilità minima. L'obiettivo del progetto è dimostrare il ciclo DevOps, non modificare il dominio funzionale originale di MeditAid.

## Ambienti

| Ambiente | Scopo | Implementazione |
|---|---|---|
| Development | sviluppo e test locali | Docker Compose, frontend + backend |
| Staging | verifica della modifica prima della produzione | Vercel Preview Deployment da Pull Request |
| Production | applicazione pubblica | Vercel Production Deployment dal branch `main` |

La separazione consente di validare il codice localmente, verificare una preview isolata e promuovere in produzione solo codice passato dalla CI.

## Scelte tecnologiche

### GitHub Actions

È stato scelto GitHub Actions perché il codice è ospitato su GitHub e permette di mantenere pipeline e repository nello stesso sistema. Il workflow esegue automaticamente linting, build applicativa, build dei container e deploy.

### Docker e Docker Compose

Docker rende riproducibile l'ambiente. Il frontend usa un Dockerfile multi-stage:

- target `development`: Vite dev server;
- target `build`: genera gli asset statici;
- target `production`: Nginx serve la build ottimizzata.

Docker Compose avvia insieme frontend e backend, rendendo l'ambiente locale indipendente dalla configurazione della macchina dello sviluppatore.

### Vercel

Vercel è stato scelto per il deploy del frontend Vite perché offre HTTPS, CDN globale, preview deployment e integrazione semplice con pipeline automatizzate. La pipeline usa Vercel CLI: il deploy non dipende da un'operazione manuale.

### UptimeRobot

UptimeRobot viene usato come monitor esterno dell'URL di produzione. Il monitor HTTP verifica periodicamente che l'app sia raggiungibile e segnala downtime o recovery.

### Sentry

Sentry raccoglie gli errori JavaScript lato browser. Il DSN viene passato tramite variabile d'ambiente e non viene scritto nel repository.

## Avvio locale

Prerequisiti:

- Docker con Docker Compose;
- in alternativa Node.js 22 per eseguire il solo frontend.

Crea il file locale delle variabili:

```bash
cp .env.example .env
```

Avvia tutto lo stack:

```bash
docker compose up --build
```

Servizi:

- frontend: http://localhost:5173
- backend healthcheck: http://localhost:3001/health
- backend API: http://localhost:3001/api/meditations

Per arrestare lo stack:

```bash
docker compose down
```

## Comandi frontend

Installazione riproducibile:

```bash
npm ci
```

Development server:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Build di produzione:

```bash
npm run build
```

Build manuale del container frontend:

```bash
docker build --target production -t meditaid-frontend .
```

Build manuale del backend:

```bash
docker build -t meditaid-backend ./server
```

## Secrets e variabili d'ambiente

Il file `.env` è escluso da Git tramite `.gitignore`. Nel repository è presente solo `.env.example`, che documenta i nomi delle variabili senza valori sensibili.

Variabili applicative:

```text
VITE_API_URL
VITE_SENTRY_DSN
VITE_APP_ENV
PORT
```

Secret richiesto da GitHub Actions per Vercel:

```text
VERCEL_TOKEN
```

Gli identificativi Vercel del progetto (`VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`) non sono credenziali e sono configurati direttamente nel workflow.

I secrets devono essere configurati in GitHub in **Settings → Secrets and variables → Actions**. GitHub maschera automaticamente nei log i valori registrati come secrets. Il workflow non stampa esplicitamente nessuna credenziale.

Prima della consegna verificare inoltre che `.env` non sia mai stato committato:

```bash
git log --all -- .env
```

L'output atteso è vuoto.

## Pipeline CI/CD

Workflow: `.github/workflows/ci-cd.yml`.

### Continuous Integration

La CI viene eseguita a ogni push su `main`, sul branch DevOps e sulle Pull Request verso `main`.

Passaggi principali:

1. checkout;
2. setup Node.js 22;
3. `npm ci`;
4. `npm run lint`;
5. `npm run build`;
6. build Docker del frontend;
7. build Docker del backend.

Se ESLint restituisce un errore, il comando termina con exit code diverso da zero e GitHub Actions blocca automaticamente i passaggi successivi.

### Staging

Per ogni Pull Request verso `main`, dopo una CI verde viene eseguito un Vercel Preview Deployment. Questa preview rappresenta l'ambiente staging.

### Production

Un push su `main` che supera la CI avvia il job `Deploy production`. Vercel CLI costruisce e pubblica automaticamente la nuova versione production.

## Error tracking con Sentry

Nel progetto Sentry viene inizializzato dal browser solo quando `VITE_SENTRY_DSN` è valorizzato.

Per generare in modo controllato un evento di prova, aprire l'app con:

```text
?sentry-test=1
```

Esempio:

```text
https://URL-PRODUCTION/?sentry-test=1
```

Dopo circa un secondo viene generato l'errore:

```text
MeditAid DevOps - Sentry test event
```

L'evento deve comparire nella dashboard Sentry e viene usato come prova dell'integrazione.

## Monitoraggio uptime

In UptimeRobot creare un monitor:

- Monitor Type: HTTP(s)
- URL: URL production Vercel
- Friendly Name: MeditAid Production

Interpretazione degli alert:

- **Up**: endpoint raggiungibile e risposta HTTP valida;
- **Down**: UptimeRobot non riesce a raggiungere il sito o riceve una risposta non valida;
- **Recovery**: il sito torna raggiungibile dopo un periodo di downtime.

In caso di alert Down, il primo controllo è la run GitHub Actions dell'ultimo deploy; successivamente si verificano deployment Vercel ed eventuali errori Sentry.

## Checklist della consegna

Prima di generare la presentazione PDF:

- [ ] repository GitHub aggiornato;
- [ ] CI verde su `main`;
- [ ] URL Vercel production funzionante;
- [ ] link alla run CD dell'ultimo deploy;
- [ ] screenshot della pipeline verde;
- [ ] monitor UptimeRobot attivo;
- [ ] screenshot UptimeRobot;
- [ ] progetto Sentry configurato;
- [ ] evento `MeditAid DevOps - Sentry test event` registrato;
- [ ] screenshot Sentry.

## Repository

https://github.com/arbone/MeditAid

## Autore

**Arbi Shehu**
