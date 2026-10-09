// ==========================================
// 1. CUSTOMIZE YOUR ENGAGEMENT INVITATION
// ==========================================

const COUPLE_NAMES = "Rahul & Anjali";

const MONOGRAM_LEFT = "R";
const MONOGRAM_SYMBOL = "♡";
const MONOGRAM_RIGHT = "A";

const EVENT_DATE = "2026-11-15T17:00:00+05:30";
const EVENT_DATE_TEXT = "Sunday, 15 November 2026";
const EVENT_TIME_TEXT = "5:00 PM IST";

const VENUE_NAME = "ROYAL COURT BANQUET HALL";

const VENUE_ADDRESS =
  "Dahisar Pool Bridge, Bapu Bagve Rd, next to Kaveri Building, opp. Dahisar, Kandarpada, Dahisar West, Mumbai, Maharashtra 400068";

const WHATSAPP_NUMBER = "";

const RSVP_MESSAGE = `Hello! We'd like to RSVP for ${COUPLE_NAMES}'s engagement on ${EVENT_DATE_TEXT}.`;

const MUSIC_FILE = "music.mp3";

// ==========================================
// 2. SAFE ELEMENT HELPERS
// ==========================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

function setText(selector, text) {
  const element = $(selector);
  if (element) element.textContent = text;
}

function setLink(selector, url) {
  const element = $(selector);
  if (element) element.href = url;
}

// ==========================================
// 3. PAGE TITLE AND META DESCRIPTION
// ==========================================

document.title = `${COUPLE_NAMES} | Engagement Invitation`;

const description = $('meta[name="description"]');

if (description) {
  description.content =
    `Join us to celebrate ${COUPLE_NAMES}'s engagement on ${EVENT_DATE_TEXT}. ` +
    "View the invitation, venue details, and RSVP.";
}

// ==========================================
// 4. COUPLE NAMES EVERYWHERE
// ==========================================

$$(".coupleNamesText").forEach((element) => {
  element.textContent = COUPLE_NAMES;
});

// ==========================================
// 5. COMMON MONOGRAM EVERYWHERE
// ==========================================

function renderMonogram(element) {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(document.createTextNode(MONOGRAM_LEFT + " "));

  const symbol = document.createElement("span");
  symbol.className = "monogram-heart";
  symbol.textContent = MONOGRAM_SYMBOL;

  fragment.appendChild(symbol);

  fragment.appendChild(document.createTextNode(" " + MONOGRAM_RIGHT));

  // Preserve existing child elements such as subtitles.
  element.prepend(fragment);
}

$$("[data-monogram]").forEach(renderMonogram);

// Update the wax seal monogram, if the envelope exists.
const sealMonogram = $(".seal-monogram");

if (sealMonogram) {
  sealMonogram.replaceChildren();

  sealMonogram.append(document.createTextNode(MONOGRAM_LEFT + " "));

  const heart = document.createElement("span");
  heart.textContent = MONOGRAM_SYMBOL;

  sealMonogram.append(heart, document.createTextNode(" " + MONOGRAM_RIGHT));
}

// ==========================================
// 6. EVENT DATE AND TIME
// ==========================================

$$(".eventDateText").forEach((element) => {
  element.textContent = EVENT_DATE_TEXT;
});

setText("#eventTime", `Ceremony begins at ${EVENT_TIME_TEXT}`);
setText("#eventTimeDetail", EVENT_TIME_TEXT);

// ==========================================
// 7. VENUE AND GOOGLE MAPS
// ==========================================

setText("#venueName", VENUE_NAME);
setText("#venueAddress", VENUE_ADDRESS);

const mapQuery = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS}`);

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

setLink("#mapLink", mapUrl);
setLink("#mapLink2", mapUrl);

// ==========================================
// 8. COUNTDOWN TIMER
// ==========================================

const target = new Date(EVENT_DATE).getTime();

function updateCountdown() {
  const distance = target - Date.now();

  const values =
    distance <= 0
      ? [0, 0, 0, 0]
      : [
          Math.floor(distance / 86400000),
          Math.floor((distance % 86400000) / 3600000),
          Math.floor((distance % 3600000) / 60000),
          Math.floor((distance % 60000) / 1000),
        ];

  ["days", "hours", "minutes", "seconds"].forEach((id, index) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = String(values[index]).padStart(2, "0");
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// 9. MOBILE NAVIGATION
// ==========================================

const menuToggle = $("#menuToggle");
const nav = $("#nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==========================================
// 10. BACKGROUND MUSIC
// ==========================================

const audio = $("#backgroundMusic");
const musicToggle = $("#musicToggle");

if (audio && musicToggle) {
  audio.src = MUSIC_FILE;

  musicToggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();

        musicToggle.innerHTML = "♫ <span>Pause Music</span>";
        musicToggle.setAttribute("aria-pressed", "true");
      } catch {
        alert(
          `Music could not be played. Make sure ${MUSIC_FILE} ` +
            "exists in your website folder."
        );
      }
    } else {
      audio.pause();

      musicToggle.innerHTML = "♫ <span>Play Music</span>";
      musicToggle.setAttribute("aria-pressed", "false");
    }
  });

  audio.addEventListener("ended", () => {
    musicToggle.innerHTML = "♫ <span>Play Music</span>";
    musicToggle.setAttribute("aria-pressed", "false");
  });
}

// ==========================================
// 11. WHATSAPP SHARING
// ==========================================

function getInvitationUrl() {
  return window.location.href;
}

const shareWhatsApp = $("#shareWhatsApp");

if (shareWhatsApp) {
  shareWhatsApp.addEventListener("click", () => {
    const message =
      `You're invited to ${COUPLE_NAMES}'s engagement on ` +
      `${EVENT_DATE_TEXT}! 💍 ${getInvitationUrl()}`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
}

// ==========================================
// 12. COPY INVITATION LINK
// ==========================================

const copyLink = $("#copyLink");

if (copyLink) {
  copyLink.addEventListener("click", async () => {
    const status = $("#copyStatus");

    try {
      await navigator.clipboard.writeText(getInvitationUrl());

      if (status) {
        status.textContent = "Invitation link copied!";
      }
    } catch {
      if (status) {
        status.textContent =
          "Copy the website URL from your browser address bar.";
      }
    }
  });
}

// ==========================================
// 13. WHATSAPP RSVP
// ==========================================

const rsvpUrl = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RSVP_MESSAGE)}`
  : `https://wa.me/?text=${encodeURIComponent(RSVP_MESSAGE)}`;

setLink("#rsvpLink", rsvpUrl);

// ==========================================
// 14. ENVELOPE OPENING ANIMATION 💌
// ==========================================

(() => {
  const scene = $("#envelopeScene");
  const openButton = $("#openEnvelopeBtn");
  const replayButton = $("#replayEnvelopeBtn");
  const coupleNames = $("#envelopeCoupleNames");
  const footnote = $("#envelopeFootnote");

  // Do nothing if the envelope section is not in the HTML.
  if (!scene || !openButton || !replayButton) return;

  // Keep the revealed names connected to the main configuration.
  if (coupleNames) {
    coupleNames.textContent = COUPLE_NAMES;
  }

  function openEnvelope() {
    scene.classList.add("is-open");

    openButton.setAttribute("aria-expanded", "true");
    openButton.disabled = true;

    replayButton.hidden = false;

    if (footnote) {
      footnote.textContent = "♡ With love, from the happy couple ♡";
    }
  }

  function resetEnvelope() {
    scene.classList.remove("is-open");

    openButton.setAttribute("aria-expanded", "false");
    openButton.disabled = false;

    replayButton.hidden = true;

    if (footnote) {
      footnote.replaceChildren();

      const leftHeart = document.createElement("span");
      leftHeart.textContent = "♡";

      const rightHeart = document.createElement("span");
      rightHeart.textContent = "♡";

      footnote.append(
        leftHeart,
        document.createTextNode(" A message from our hearts to yours "),
        rightHeart
      );
    }
  }

  openButton.addEventListener("click", openEnvelope);
  replayButton.addEventListener("click", resetEnvelope);
})();

// ==========================================
// 15. ENTRANCE AND SCROLL ANIMATIONS
// ==========================================

const animationStyles = document.createElement("style");

animationStyles.textContent = `
  @keyframes fadeDown {
    from {
      opacity: 0;
      transform: translateY(-18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(28px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gentleZoom {
    from {
      opacity: 0;
      transform: scale(0.94);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes lampSway {
    0%, 100% {
      transform: rotate(3deg);
    }
    50% {
      transform: rotate(-3deg);
    }
  }

  .site-header {
    animation: fadeDown 0.8s ease both;
  }

  .hero-copy {
    animation: fadeUp 1s ease 0.15s both;
  }

  .hero .corner {
    animation: gentleZoom 1s ease 0.5s both;
  }

  .hero .lamp-one {
    transform-origin: top center;
    animation: lampSway 4s ease-in-out 1s infinite;
  }

  .hero .lamp-two {
    transform-origin: top center;
    animation: lampSway 4.8s ease-in-out 0.5s infinite;
  }

  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(24px) scale(0.985);
    transition:
      opacity 0.8s ease,
      transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .reveal-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .gallery-card {
    transition:
      transform 0.35s ease,
      box-shadow 0.35s ease;
  }

  .gallery-card:hover {
    transform: translateY(-7px) scale(1.025);
  }

  .button,
  .share-button,
  .music-btn {
    transition:
      transform 0.25s ease,
      opacity 0.25s ease;
  }

  .button:hover,
  .share-button:hover,
  .music-btn:hover {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }

    .reveal-on-scroll {
      opacity: 1;
      transform: none;
    }
  }
`;

document.head.appendChild(animationStyles);

// ==========================================
// 16. REVEAL SECTIONS WHEN SCROLLING
// ==========================================

const revealElements = $$(
  [
    ".story-photo",
    ".story-copy",
    ".details-copy",
    ".ganesha",
    ".gallery > .eyebrow",
    ".gallery > h2",
    ".gallery > .ornament",
    ".gallery-card",
    ".gallery-note",
    ".location-card",
    ".rsvp-card",
    ".envelope-section",
    ".scratch-section",
    "footer",
  ].join(", ")
);

revealElements.forEach((element, index) => {
  element.classList.add("reveal-on-scroll");

  if (element.classList.contains("gallery-card")) {
    element.style.transitionDelay = `${(index % 4) * 100}ms`;
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// ==========================================
// 17. SCRATCH TO REVEAL ENGAGEMENT DATE ✨
// ==========================================

(() => {
  const canvas = $("#scratchCanvas");
  const card = $("#scratchCard");
  const hint = $("#scratchHint");
  const resetButton = $("#scratchReset");
  const dateText = $("#scratchDateText");

  // This section is optional.
  if (!canvas || !card || !hint || !resetButton || !dateText) {
    return;
  }

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!ctx) return;

  let isScratching = false;
  let isRevealed = false;
  let lastPoint = null;
  let scratchCheckCounter = 0;

  dateText.textContent = EVENT_DATE_TEXT;

  function setupScratchCard() {
    const rect = card.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    const width = rect.width;
    const height = rect.height;

    // Champagne-gold foil.
    const gradient = ctx.createLinearGradient(0, 0, width, height);

    gradient.addColorStop(0, "#b78636");
    gradient.addColorStop(0.2, "#f8e6a8");
    gradient.addColorStop(0.42, "#c99a48");
    gradient.addColorStop(0.65, "#f6df99");
    gradient.addColorStop(1, "#ad792b");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle foil texture.
    for (let i = 0; i < 700; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      ctx.fillStyle =
        Math.random() > 0.5 ? "rgba(255,255,255,0.16)" : "rgba(99,58,10,0.08)";

      ctx.fillRect(x, y, Math.random() * 2 + 0.5, 1);
    }

    // Decorative border.
    ctx.strokeStyle = "rgba(105,66,17,0.65)";
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, width - 30, height - 30);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#5c3610";

    ctx.font = "26px Georgia";
    ctx.fillText("✧  ♡  ✧", width / 2, height / 2 - 25);

    ctx.font = "600 13px Montserrat, sans-serif";
    ctx.fillText("SCRATCH HERE", width / 2, height / 2 + 15);

    ctx.font = "12px Georgia";
    ctx.fillText("A DATE TO REMEMBER", width / 2, height / 2 + 42);
  }

  function getPointerPosition(event) {
    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function scratchTo(point) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 38;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();

    if (lastPoint) {
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
    lastPoint = point;
    scratchCheckCounter++;

    if (scratchCheckCounter % 12 === 0) {
      checkScratchProgress();
    }
  }

  function checkScratchProgress() {
    if (isRevealed) return;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let transparent = 0;
    const totalPixels = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 50) transparent++;
    }

    if (transparent / totalPixels > 0.4) {
      revealDate();
    }
  }

  function revealDate() {
    if (isRevealed) return;

    isRevealed = true;
    isScratching = false;
    lastPoint = null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.style.pointerEvents = "none";
    card.classList.add("revealed");

    hint.textContent = "♡ Surprise revealed! Save the date! ♡";
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (isRevealed) return;

    isScratching = true;
    lastPoint = null;

    if (canvas.setPointerCapture) {
      canvas.setPointerCapture(event.pointerId);
    }

    scratchTo(getPointerPosition(event));
    event.preventDefault();
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!isScratching || isRevealed) return;

    scratchTo(getPointerPosition(event));
    event.preventDefault();
  });

  function stopScratching() {
    if (!isScratching) return;

    isScratching = false;
    lastPoint = null;

    if (!isRevealed) {
      checkScratchProgress();
    }
  }

  canvas.addEventListener("pointerup", stopScratching);
  canvas.addEventListener("pointercancel", stopScratching);
  canvas.addEventListener("lostpointercapture", stopScratching);

  resetButton.addEventListener("click", () => {
    isScratching = false;
    isRevealed = false;
    lastPoint = null;
    scratchCheckCounter = 0;

    card.classList.remove("revealed");
    canvas.style.pointerEvents = "auto";

    hint.textContent = "✨ Rub here with your finger or mouse";

    setupScratchCard();
  });

  setupScratchCard();

  // Rebuild the foil if the card changes size.
  let resizeTimeout;

  window.addEventListener("resize", () => {
    if (isRevealed) return;

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      setupScratchCard();
    }, 150);
  });
})();
