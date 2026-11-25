/**
 * Matrimonio Imerio & Marilena · 9 Ottobre 2027
 * Configurazione centrale e interazioni della pagina
 */
const CONFIG = {
  weddingDateISO: "2027-10-09T15:00:00+02:00",
  whatsappNumber: "393498194558",
  emailAddress: "imerio.spagnuolo@gmail.com",
  // OPZIONALE: inserisci il tuo endpoint gratuito Formspree (es. "https://formspree.io/f/xxxxxxxx")
  // per ricevere automaticamente ogni RSVP via email oltre ai pulsanti WhatsApp/Email.
  formspreeEndpoint: ""
};

document.addEventListener("DOMContentLoaded", () => {
  initHeaderAndMenu();
  initCountdown();
  initScrollReveal();
  initLocationMedia();
  initTravelTabs();
  initRsvpForm();
});

/* 1. Navigazione & Menu Mobile */
function initHeaderAndMenu() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

/* 2. Countdown Live al 9 Ottobre 2027 ore 15:00 */
function initCountdown() {
  const target = new Date(CONFIG.weddingDateISO).getTime();
  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minsEl = document.getElementById("cdMinutes");
  const secsEl = document.getElementById("cdSeconds");

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* 3. Animazione comparsa allo scorrimento */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

/* 4. Schede Location: toggle Mappa Reale / Foto Location + supporto foto reali */
function initLocationMedia() {
  document.querySelectorAll("[data-location]").forEach((card) => {
    const tabs = card.querySelectorAll(".media-tab");
    const panels = card.querySelectorAll(".media-panel");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.target;
        tabs.forEach((t) => t.classList.toggle("active", t === tab));
        panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === target));
      });
    });
  });

  // Gestione caricamento immagini reali in assets/img/ oppure da localStorage (anteprima locale)
  document.querySelectorAll(".location-photo").forEach((img) => {
    const key = img.dataset.photoKey;
    const saved = localStorage.getItem("wedding_photo_" + key);

    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });

    img.addEventListener("error", () => {
      if (saved && img.src !== saved) {
        img.src = saved;
      } else {
        img.classList.remove("loaded");
      }
    });

    // Se l'immagine del repo è già caricata in cache
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add("loaded");
    } else if (saved) {
      // Verifica se il file del repo manca; l'event handler error gestirà il fallback
    }
  });

  // Upload opzionale in locale per testare l'anteprima dal browser
  document.querySelectorAll(".local-photo-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const key = input.dataset.photoKey;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        try {
          localStorage.setItem("wedding_photo_" + key, dataUrl);
        } catch (e) {
          // Ignora se l'immagine supera la quota di localStorage
        }
        const img = document.querySelector(`.location-photo[data-photo-key="${key}"]`);
        if (img) {
          img.src = dataUrl;
          img.classList.add("loaded");
        }
      };
      reader.readAsDataURL(file);
    });
  });
}

/* 5. Tab "Come Arrivare" */
function initTravelTabs() {
  const tabs = document.querySelectorAll(".travel-tab");
  const panels = document.querySelectorAll(".travel-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.travel;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.id === "travel-" + key));
    });
  });
}

/* 6. Modulo RSVP Interattivo */
function initRsvpForm() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  const attendanceRadios = form.querySelectorAll('input[name="attendance"]');
  const attendanceDetails = document.getElementById("attendanceDetails");
  const childrenCount = document.getElementById("childrenCount");
  const childrenAgesWrap = document.getElementById("childrenAgesWrap");
  const childrenAgesGrid = document.getElementById("childrenAgesGrid");
  const statusEl = document.getElementById("formStatus");
  const resultBox = document.getElementById("rsvpResult");
  const summaryPreview = document.getElementById("summaryPreview");
  const btnWA = document.getElementById("btnSendWhatsApp");
  const btnEmail = document.getElementById("btnSendEmail");
  const btnCopy = document.getElementById("btnCopySummary");

  // Mostra/nascondi dettagli in base alla partecipazione
  attendanceRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const attending = form.querySelector('input[name="attendance"]:checked').value.startsWith("Sì");
      attendanceDetails.classList.toggle("hidden", !attending);
    });
  });

  // Campi dinamici per le età dei bambini
  childrenCount.addEventListener("change", () => {
    const count = parseInt(childrenCount.value, 10) || 0;
    childrenAgesGrid.innerHTML = "";
    childrenAgesWrap.classList.toggle("hidden", count === 0);

    for (let i = 1; i <= count; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.name = "childAge_" + i;
      input.placeholder = `Età bambino ${i} (es. 4 anni)`;
      childrenAgesGrid.appendChild(input);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";

    const guestName = document.getElementById("guestName").value.trim();
    if (!guestName) {
      statusEl.textContent = "Per favore inserisci il tuo Nome e Cognome.";
      document.getElementById("guestName").focus();
      return;
    }

    const attendance = form.querySelector('input[name="attendance"]:checked').value;
    const attending = attendance.startsWith("Sì");
    const adults = document.getElementById("adultsCount").value;
    const children = parseInt(childrenCount.value, 10) || 0;
    const ages = Array.from(childrenAgesGrid.querySelectorAll("input"))
      .map((el, idx) => (el.value.trim() ? `Bimbo ${idx + 1}: ${el.value.trim()}` : null))
      .filter(Boolean);
    const dietary = document.getElementById("dietary").value;
    const allergies = document.getElementById("allergies").value.trim() || "Nessuna";
    const hotel = form.querySelector('input[name="hotel"]:checked').value;
    const notes = document.getElementById("notes").value.trim();

    const lines = [
      "RSVP Matrimonio Imerio & Marilena (9 Ottobre 2027)",
      "--------------------------------------------------",
      `Ospite/i: ${guestName}`,
      `Presenza: ${attendance}`
    ];

    if (attending) {
      lines.push(`Adulti: ${adults}`);
      lines.push(`Bambini: ${children}${ages.length ? " (" + ages.join(", ") + ")" : ""}`);
      lines.push(`Menu: ${dietary}`);
      lines.push(`Allergie/Intolleranze: ${allergies}`);
      lines.push(`Hotel Chiostro San Francesco: ${hotel}`);
    }

    if (notes) {
      lines.push(`Note/Messaggio: ${notes}`);
    }

    const messageText = lines.join("\n");

    // Salva copia locale di sicurezza
    try {
      localStorage.setItem("rsvp_imerio_marilena_last", messageText);
    } catch (err) {
      // Ignora se storage non disponibile
    }

    // Aggiorna riepilogo e link di invio diretto
    summaryPreview.textContent = messageText;
    btnWA.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    btnEmail.href = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent("RSVP Matrimonio - " + guestName)}&body=${encodeURIComponent(messageText)}`;

    // Se è stato configurato Formspree, invia automaticamente in background
    if (CONFIG.formspreeEndpoint) {
      statusEl.textContent = "Invio automatico in corso...";
      try {
        const res = await fetch(CONFIG.formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            guestName,
            attendance,
            adults: attending ? adults : 0,
            children: attending ? children : 0,
            childrenAges: ages.join(", "),
            dietary: attending ? dietary : "-",
            allergies: attending ? allergies : "-",
            hotel: attending ? hotel : "-",
            notes
          })
        });
        statusEl.textContent = res.ok
          ? "Conferma registrata automaticamente! Puoi comunque inviarla anche su WhatsApp."
          : "Usa uno dei pulsanti qui sotto per inviare la conferma.";
      } catch {
        statusEl.textContent = "Usa uno dei pulsanti qui sotto per inviare la conferma.";
      }
    }

    resultBox.classList.remove("hidden");
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  btnCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summaryPreview.textContent);
      btnCopy.textContent = "Copiato!";
      setTimeout(() => {
        btnCopy.textContent = "Copia testo";
      }, 2000);
    } catch {
      btnCopy.textContent = "Seleziona e copia";
    }
  });
}
