# Traccia — React, progetto pratico: Meditation website

Testo della piattaforma start2impact, copiato il 12/11/2026. Va copiato anche nel repository del progetto come `TRACCIA.md`.

---

Dopo aver studiato e aver praticato passo dopo passo attraverso tutorial, è importante creare un proprio progetto per praticare realmente.

**Meditation website**

Meditare è importante e diverse persone lo consigliano per i benefici che porta. Per questo motivo, in questo progetto dovrai creare un sito che faciliti la meditazione. Il requisito indispensabile è un timer che l'utente può impostare, per determinare la durata dell'attività.

Guarda app simili per orientarti meglio e puoi aggiungere altre funzionalità come suoni di sottofondo.

API: Non necessario

**Ecco cosa dovrà includere il sito:**

- Timer programmabile dall'utente
- Il timer può essere fermato e riattivato
- Riferimenti alla meditazione (immagini, testo ecc…)
- UI e UX semplice e facile da usare
- Struttura dell'app organizzata e comprensibile
- Design responsive

**Bonus: Utilizza queste tecnologie**

Anche se il sito web che creerai non è complesso, sarebbe meglio utilizzare alcune delle tecnologie che hai studiato.

- React Router
- Axios
- React Hooks
- Redux o Context API

---

## Lista di controllo dei requisiti

| Requisito                                      | Obbligatorio | Stato    |
| ---------------------------------------------- | ------------ | -------- |
| Timer impostabile dall'utente                  | sì           | fatto    |
| Pausa e ripresa del timer                      | sì           | fatto    |
| Riferimenti alla meditazione (immagini, testi) | sì           | da fare  |
| UI/UX semplice                                 | sì           | in corso |
| Struttura dell'app organizzata                 | sì           | in corso |
| Design responsive                              | sì           | in corso |
| React Router                                   | bonus        | fatto    |
| Axios                                          | bonus        | da fare  |
| React Hooks                                    | bonus        | in corso |
| Redux o Context API                            | bonus        | fatto    |

## Progetto (definito il 12-13/11/2026)

### Riferimento di stile

Il timer di Headspace: design semplice, minimale e intuitivo. Durante la sessione, un cerchio che si svuota con il tempo al centro; pochi pulsanti e poche scritte.

### Pagine e navigazione

Nessuna navbar.

| Pagina         | Contenuto                                                | Navigazione                                                   |
| -------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| `HomePage`     | titolo, breve spiegazione dell'app                       | pulsante «Medita» verso il Timer, icona trofeo verso i Trofei |
| `TimerPage`    | scelta della durata, timer, riferimenti alla meditazione | icona casa                                                    |
| `TrophiesPage` | obiettivi sbloccati ed easter egg                        | icona casa                                                    |

La casa porta sempre alla Home, anche arrivando da un segnalibro. Collegamenti con `<Link>` di React Router; le icone senza testo hanno un `aria-label`.

### Albero dei componenti

```
main.jsx
└── BrowserRouter
    └── App
        ├── MeditationAppProvider (Context: sessioni e trofei) → Routes
        │   ├── HomePage
        │   ├── TimerPage         (fase della pagina, durata scelta, tempo che scorre)
        │   │   ├── DurationPicker
        │   │   ├── Timer         (cerchio che si svuota)
        │   │   ├── Controls      (pulsanti della fase)
        │   │   └── Ambience      (immagini e suoni)
        │   └── TrophiesPage
        └── Footer
```

I nomi dei sottocomponenti di `TimerPage` sono provvisori. La selezione e il timer sono fratelli: lo stato condiviso sta nel genitore `TimerPage` (_lifting state up_). Il tempo che scorre ogni secondo non va nel Context. Il Provider sta in un file proprio (`context/`) e non deve conoscere la pagina corrente.

### Fasi di `TimerPage`

| Fase           | Pulsanti (oltre alla casa)  | Evento         | Fase successiva                               |
| -------------- | --------------------------- | -------------- | --------------------------------------------- |
| `"Idle"`       | Avvia                       | Avvia          | `"Meditation"`                                |
| `"Meditation"` | Ricomincia, Pausa           | Ricomincia     | `"Meditation"` (tempo da zero, stessa durata) |
|                |                             | Pausa          | `"Pause"`                                     |
|                |                             | fine del timer | `"Finish"`                                    |
| `"Pause"`      | Riprendi, Termina           | Riprendi       | `"Meditation"`                                |
|                |                             | Termina        | `"Finish"` (chiusura anticipata)              |
| `"Finish"`     | Nuovo timer, link ai Trofei | Nuovo timer    | `"Idle"`                                      |

La rotella si vede solo in `"Idle"`. Immagini e suoni compaiono a sessione avviata; il suono parte al clic su Avvia, perché i browser bloccano l'audio che parte da solo. In pausa non c'è Ricomincia: si riprende e poi si ricomincia.

### Resoconto di sessione

```js
const session = {
  durationMs: 300000, // durata impostata
  elapsedMs: 180000, // tempo trascorso dall'ultimo restart
  restart: 1, // ripartenze da zero
  pause: 0, // pause
};
```

- Un restart non apre una nuova sessione: azzera `elapsedMs`, azzera `pause` e incrementa `restart`.
- Il resoconto si consegna al Context una volta sola: a fine timer, con Termina, oppure quando si lascia la pagina (funzione di pulizia dell'`useEffect` di `TimerPage`).
- Uscita dalla pagina (fatto il 26/11/2026): `sessionRef` contiene `{ phase, session }` ed è aggiornato da un effetto che dipende da tutti i valori che usa; un secondo effetto con `[]` legge il ref **dentro** la pulizia, così vede i valori attuali e non quelli del primo render (closure). Salva solo in `"Meditation"` o `"Pause"`: in `"Finish"` la sessione è già consegnata, in `"Idle"` non è iniziata (questo evita anche il salvataggio doppio del montaggio di prova di `StrictMode`). `addSession` è esclusa dalle dipendenze, con un commento e la deroga di ESLint: la prima versione resta valida perché aggiorna con `setSessions(prev => ...)`.
- Completata se `elapsedMs >= durationMs`. Nessuna tolleranza: il timer calcola il tempo con `Date.now()` e, a fine timer, imposta `elapsedMs` esattamente a `durationMs`. Una sessione chiusa con Termina prima della fine non è completata.
- Nessuna proprietà `finished`: il dato si ricava (_avoid redundant state_).
- Il Context tiene l'array delle sessioni e lo salva in `localStorage` con la chiave `meditation_app_sessions` (`JSON.stringify` / `JSON.parse`); la lettura iniziale avviene in una funzione passata a `useState`, dentro `try/catch`.

### Trofei

- Si ricavano ogni volta dall'array delle sessioni: non si salva a parte l'elenco degli sbloccati.
- **Neofita:** prima meditazione iniziata. Si sblocca alla pressione di Avvia, ma si notifica solo in `"Finish"` o nella pagina Trofei, mai durante la meditazione.
- **Senza pause:** sessione di una certa durata completata con `pause: 0`.
- Bonus Axios: elenco dei trofei in un file JSON in `public/`, caricato con Axios.
- La gamification si fa per ultima, dopo timer e responsive.

### Da ripassare

- Context API: react.dev, «Passing Data Deeply with Context».
- Stato condiviso: react.dev, «Sharing State Between Components» e «Choosing the State Structure».
- `useEffect` e funzione di pulizia: react.dev, «Synchronizing with Effects».
