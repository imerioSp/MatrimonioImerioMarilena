# Matrimonio Imerio & Marilena · 9 Ottobre 2027

Sito web statico responsive per il matrimonio di **Imerio & Marilena** (Sabato 9 Ottobre 2027, Napoli – Vomero), progettato nello stile della partecipazione stampata (carta cotone avorio, dettagli pesca cipria, sigillo in ceralacca e monogramma dorato **IM**).

## Struttura del Progetto

```text
matrimonio-imerio-marilena/
├── index.html               # Pagina principale
├── css/
│   └── style.css            # Foglio di stile completo (responsive mobile & desktop)
├── js/
│   └── main.js              # Countdown, mappe/foto, tab trasporti, modulo RSVP
├── assets/
│   └── img/
│       ├── logo-im.png      # Monogramma dorato IM (sfondo trasparente)
│       ├── favicon.png      # Icona per la scheda del browser
│       └── README.txt       # Istruzioni per aggiungere foto personali delle location
├── .nojekyll                # Disattiva Jekyll su GitHub Pages per un deploy pulito
├── .gitignore
└── README.md
```

## Come pubblicarlo su GitHub Pages (in 2 minuti)

### Opzione A · Senza usare comandi (direttamente dal browser)
1. Estrai lo ZIP sul tuo computer.
2. Accedi a [GitHub](https://github.com) e crea un nuovo repository **Public** (es. `matrimonio-imerio-marilena`).
3. Clicca su **uploading an existing file**.
4. Trascina tutti i file e le cartelle **contenuti dentro** `matrimonio-imerio-marilena/` (devi vedere `index.html`, `css/`, `js/`, `assets/`, `.nojekyll`, `README.md` direttamente nella radice del repository) e premi **Commit changes**.
5. Vai su **Settings → Pages** nel menu del repository.
6. Sotto **Build and deployment → Branch**, seleziona **`main`** e la cartella **`/ (root)`**, poi clicca **Save**.
7. Attendi 1–2 minuti e aggiorna la pagina: troverai il link pubblico (es. `https://tuoutente.github.io/matrimonio-imerio-marilena/`).

### Opzione B · Da terminale (Git)
```bash
cd matrimonio-imerio-marilena
git init
git add .
git commit -m "Prima versione sito matrimonio Imerio e Marilena"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/matrimonio-imerio-marilena.git
git push -u origin main
```
Poi attiva **Settings → Pages → Branch: `main` / `(root)`**.

## Personalizzazioni Rapide

* **Aggiungere foto reali delle location:** inserisci in `assets/img/` i file `chiesa.jpg`, `palazzo-belvedere.jpg` e `chiostro.jpg` (il sito li mostrerà automaticamente nel tab *Foto Location*).
* **Ricevere gli RSVP automaticamente via email (oltre a WhatsApp/Email):** crea un form gratuito su [formspree.io](https://formspree.io) e incolla l'URL nella costante `formspreeEndpoint` all'inizio di `js/main.js`.
* **Disattivare la demo temporanea:** vai su **Settings → Pages**, clicca sui tre puntini accanto a *Visit site* e seleziona **Unpublish site** (oppure elimina il repository da **Settings → General → Delete this repository**).
