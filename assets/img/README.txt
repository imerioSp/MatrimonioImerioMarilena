FOTO DELLE LOCATION
===================

STATO ATTUALE: la scheda "Foto" delle tre location (Chiesa, Palazzo Belvedere,
Chiostro) è stata tolta perché i file chiesa.jpg, palazzo-belvedere.jpg e
chiostro.jpg non esistono (davano errore 404). Il sito mostra solo la "Mappa"
e il pulsante "Apri in Google Maps".

PER RIPRISTINARLA quando arrivano le foto:
1. Preparate le foto in formato WebP (o JPG), larghe circa 1200 px, sotto i 200 KB,
   con questi nomi:
   - chiesa.webp             (Chiesa di San Francesco d'Assisi al Vomero)
   - palazzo-belvedere.webp  (Palazzo Belvedere)
   - chiostro.webp           (Chiostro San Francesco)
2. In index.html, al posto del commento <!-- Scheda "Foto" rimossa ... -->,
   reinserite il pulsante della scheda e il pannello "photo" presenti nel
   commit 8d5346c, aggiornando src, width e height dell'immagine
   (es. width="1200" height="800").
   Il JavaScript delle schede (role="tab", aria-selected, frecce) li gestisce già.

ALTRE IMMAGINI
- og-cover.jpg (1200x630): anteprima per WhatsApp e social.
- apple-touch-icon.png (180x180): icona per "Aggiungi a Home" su iPhone.
- favicon.png, logo-im.png: monogramma.
