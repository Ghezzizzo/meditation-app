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
| Axios                                          | bonus        | fatto    |
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
- **Neofita** (`firstMeditation`): almeno una sessione salvata. Poiché una sessione avviata si salva sempre (fine, Termina o uscita dalla pagina), vale come «prima meditazione iniziata»; si notifica solo in `"Finish"` o nella pagina Trofei, mai durante la meditazione.
- **Senza pause** (`noPause`): esiste almeno una sessione (`some`) completata, con `pause: 0` e `elapsedMs` di almeno `MIN_NO_PAUSE_MINUTES` (5). La soglia è una costante propria, indipendente da `DEFAULT_DURATION`: coincidono solo per caso.
- Bonus Axios (fatto il 26-27/11/2026): `public/trophies.json` con `id`, `title`, `icon` (nome di un'icona `lucide-react`), `description`, `rarity` (chiave dello stile: `common`, `rare`, `epic`, `hidden`), `rarityText` (testo mostrato, es. «Comune»), `isHidden`; nessuna regola nel JSON, perché un JSON non contiene funzioni. Il Provider lo carica una volta con `axios.get("/trophies.json")` in un effetto con `[]`, con la funzione `async` dichiarata dentro l'effetto, ed espone `trophies`, `loading` ed `error`. Controllo `Array.isArray(response.data)`: con un percorso sbagliato il server di Vite risponde con `index.html` e stato 200, non con un errore.
- Niente flag `ignore` nell'effetto di caricamento (scelta del 27/11/2026): con `[]` parte una sola volta in produzione e il doppio avvio di `StrictMode` produce due risposte identiche, quindi non c'è *race condition*. Da aggiungere se l'effetto avrà dipendenze.
- Regole in `src/utils/trophyRules.js`: un oggetto non esportato indicizzato per `id` e la funzione esportata `isTrophyUnlocked(trophy, sessions)`, che restituisce `false` con un `console.warn` se l'id non ha regola. `isCompleted` e `createSession` sono in `src/utils/sessions.js`.
- Trofei nuovi in `"Finish"`: sbloccati con tutte le sessioni e non con `sessions.slice(0, -1)`. Calcolati nel componente `NewTrophies` (fatto il 27/11/2026), che legge il Context: così `Result` resta di sola presentazione. Senza trofei nuovi restituisce `null` (niente messaggio «Nessun trofeo nuovo», che sarebbe rumore per chi li ha già tutti) e non ha un titolo proprio, per scelta. Le card sono `TrophyCard` in `src/components/`, condivisa con `TrophiesPage`; l'icona arriva come stringa dal JSON e passa da una mappa verso i componenti `lucide-react`.
- La gamification si fa per ultima, dopo timer e responsive.

### Da ripassare

- Context API: react.dev, «Passing Data Deeply with Context».
- Stato condiviso: react.dev, «Sharing State Between Components» e «Choosing the State Structure».
- `useEffect` e funzione di pulizia: react.dev, «Synchronizing with Effects».
