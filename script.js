"use strict";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const elements = {
  body: document.body,
  opening: $("#opening"),
  experience: $("#experience"),
  openSurprise: $("#openSurprise"),
  music: $("#birthdayMusic"),
  musicControl: $("#musicControl"),
  cake: $("#cake"),
  makeWish: $("#makeWish"),
  wishReveal: $("#wishReveal"),
  heartButton: $("#heartButton"),
  heartMessage: $("#heartMessage"),
  giftBox: $("#giftBox"),
  openGift: $("#openGift"),
  finale: $("#finale"),
  replayMagic: $("#replayMagic"),
  fxLayer: $("#fxLayer")
};

function makeStars() {
  const fragment = document.createDocumentFragment();
  const count = reducedMotion ? 30 : 70;
  for (let index = 0; index < count; index += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--speed", `${2 + Math.random() * 5}s`);
    star.style.animationDelay = `${Math.random() * -5}s`;
    fragment.appendChild(star);
  }
  $("#stars").appendChild(fragment);
}

function loadImage(path, container, className, alt) {
  const image = new Image();
  image.className = className;
  image.alt = alt;
  image.decoding = "async";
  image.onload = () => {
    const fallback = $(".photo-fallback", container);
    if (fallback) fallback.remove();
    container.prepend(image);
  };
  image.src = path;
}

function loadLocalPhotos() {
  const portraitFrame = $("#portraitFrame");
  const portrait = $("#darikaPhoto");
  const showPortrait = () => portraitFrame.classList.add("has-photo");
  const showFallback = () => portraitFrame.classList.remove("has-photo");

  portrait.addEventListener("load", showPortrait);
  portrait.addEventListener("error", showFallback);
  if (portrait.complete) {
    if (portrait.naturalWidth > 0) showPortrait();
    else showFallback();
  }

  $$(".memory-card").forEach((card, index) => {
    loadImage(card.dataset.image, $(".memory-photo", card), "memory-image", `អនុស្សាវរីយ៍ដ៏ស្រស់ស្អាតជាមួយដារីកា រូបទី ${index + 1}`);
  });
}

async function toggleMusic(forcePlay = false) {
  try {
    if (elements.music.paused || forcePlay) {
      await elements.music.play();
      elements.musicControl.classList.add("is-playing");
      elements.musicControl.setAttribute("aria-pressed", "true");
      elements.musicControl.setAttribute("aria-label", "ផ្អាកតន្ត្រីថ្ងៃកំណើត");
    } else {
      elements.music.pause();
      elements.musicControl.classList.remove("is-playing");
      elements.musicControl.setAttribute("aria-pressed", "false");
      elements.musicControl.setAttribute("aria-label", "ចាក់តន្ត្រីថ្ងៃកំណើត");
    }
  } catch {
    elements.musicControl.classList.remove("is-playing");
    elements.musicControl.setAttribute("aria-pressed", "false");
    elements.musicControl.setAttribute("aria-label", "មិនទាន់មានតន្ត្រីថ្ងៃកំណើត — សូមបន្ថែម birthday.mp3");
  }
}

function addHearts(amount = 18) {
  if (reducedMotion) amount = Math.min(amount, 6);
  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > .3 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${.55 + Math.random() * 1.2}rem`;
    heart.style.opacity = `${.25 + Math.random() * .65}`;
    heart.style.setProperty("--duration", `${4 + Math.random() * 4}s`);
    heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    heart.style.animationDelay = `${Math.random() * .8}s`;
    elements.fxLayer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

function confetti(amount = 70) {
  if (reducedMotion) amount = Math.min(amount, 12);
  const colors = ["#ef9eb5", "#e8c47a", "#fff5e8", "#b55b88", "#f07b9c"];
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--color", colors[index % colors.length]);
    piece.style.setProperty("--duration", `${2.4 + Math.random() * 2.4}s`);
    piece.style.setProperty("--drift", `${-140 + Math.random() * 280}px`);
    piece.style.animationDelay = `${Math.random() * .7}s`;
    elements.fxLayer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function fireworks(amount = 5) {
  if (reducedMotion) amount = 1;
  const colors = ["#ef9eb5", "#e8c47a", "#fff0cb"];
  for (let burstIndex = 0; burstIndex < amount; burstIndex += 1) {
    window.setTimeout(() => {
      const burst = document.createElement("span");
      burst.className = "firework";
      burst.style.left = `${15 + Math.random() * 70}%`;
      burst.style.top = `${12 + Math.random() * 55}%`;
      for (let sparkIndex = 0; sparkIndex < 14; sparkIndex += 1) {
        const spark = document.createElement("i");
        spark.style.setProperty("--angle", `${sparkIndex * (360 / 14)}deg`);
        spark.style.setProperty("--distance", `${45 + Math.random() * 45}px`);
        spark.style.setProperty("--spark", colors[burstIndex % colors.length]);
        burst.appendChild(spark);
      }
      elements.fxLayer.appendChild(burst);
      window.setTimeout(() => burst.remove(), 1100);
    }, burstIndex * 350);
  }
}

function revealExperience() {
  elements.opening.classList.add("is-opening");
  elements.body.classList.remove("is-locked");
  elements.experience.removeAttribute("inert");
  elements.experience.setAttribute("aria-hidden", "false");
  elements.musicControl.hidden = false;
  toggleMusic(true);
  addHearts(24);
  window.setTimeout(() => {
    elements.opening.hidden = true;
    $("#birthday").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    $("#birthday-title").focus({ preventScroll: true });
  }, reducedMotion ? 0 : 850);
}

function makeWish() {
  if (elements.cake.classList.contains("candles-out")) return;
  elements.cake.classList.add("candles-out");
  elements.makeWish.disabled = true;
  elements.makeWish.querySelector("span:last-child").textContent = "បំណងត្រូវបានបួងសួងរួចហើយ";
  elements.wishReveal.classList.add("show");
  confetti();
  fireworks();
  addHearts(18);
}

function revealHeart() {
  const opening = !elements.heartButton.classList.contains("is-open");
  elements.heartButton.classList.toggle("is-open", opening);
  elements.heartButton.setAttribute("aria-expanded", String(opening));
  elements.heartMessage.classList.toggle("open", opening);
  if (opening) addHearts(12);
}

function openGift() {
  if (elements.giftBox.classList.contains("open")) return;
  elements.giftBox.classList.add("open");
  elements.openGift.disabled = true;
  elements.openGift.querySelector("span:first-child").textContent = "សម្រាប់អូន ដារីកា";
  addHearts(24);
  fireworks(3);
  window.setTimeout(() => {
    elements.finale.classList.add("show");
    elements.finale.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => elements.finale.classList.add("animate"));
    elements.finale.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, reducedMotion ? 100 : 1100);
}

function setupRevealObserver() {
  if (!("IntersectionObserver" in window) || reducedMotion) {
    $$(".reveal, .letter-line").forEach((element) => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.classList.contains("letter-line")
        ? $$(".letter-line").indexOf(entry.target) * 70
        : 0;
      window.setTimeout(() => entry.target.classList.add("visible"), Math.min(delay, 450));
      observer.unobserve(entry.target);
    });
  }, { threshold: .15, rootMargin: "0px 0px -5%" });
  $$(".reveal, .letter-line").forEach((element) => observer.observe(element));
}

elements.openSurprise.addEventListener("click", revealExperience);
elements.musicControl.addEventListener("click", () => toggleMusic());
elements.makeWish.addEventListener("click", makeWish);
elements.heartButton.addEventListener("click", revealHeart);
elements.openGift.addEventListener("click", openGift);
elements.replayMagic.addEventListener("click", () => { confetti(90); fireworks(7); addHearts(28); });
elements.music.addEventListener("pause", () => elements.musicControl.classList.remove("is-playing"));
elements.music.addEventListener("play", () => elements.musicControl.classList.add("is-playing"));

makeStars();
loadLocalPhotos();
setupRevealObserver();
