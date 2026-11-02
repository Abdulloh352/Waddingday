const translations = {
  "uz-Latn": {
    coverEyebrow: "SIZ UCHUN, MEHR BILAN", coverTitle: "Hurmatli<br />mehmonimiz!", coverPrompt: "Sovg'ani ochish uchun bosing",
    heroNote: "BIR KUN · BIR HAYOT", heroEyebrow: "NIKOH TO'YIGA TAKLIFNOMA", heroBottom: "Quvonchimizga sherik bo'ling",
    dateKicker: "KUNNI BELGILAB QO'YING", dateTitle: "Bizning baxtli kunimiz", countdownLabel: "TO'YGA QADAR", days: "KUN", hours: "SOAT", minutes: "DAQIQA", seconds: "SONIYA", countdownNote: "Har lahza bizni uchrashuvimizga yaqinlashtiradi",
    scheduleStart: "17:00 da to'y boshlanadi",
    venueKicker: "MANZILIMIZ", yandex: "Yandex Xaritalar", google: "Google Maps",
    rsvpKicker: "SIZNI KUTAMIZ", rsvpTitle: "Kelasizmi?", rsvpCopy: "Iltimos, 14-noyabrgacha javobingizni bildiring.", nameLabel: "Ismingiz", namePlaceholder: "Ism va familiya", attendanceLabel: "Ishtirokingiz", attendYes: "Albatta kelaman", attendNo: "Afsuski, kela olmayman", guestCountLabel: "Necha kishi?", messageLabel: "Tilaklaringiz", messagePlaceholder: "Yurakdan chiqqan so'zlaringiz...", submit: "JAVOBNI YUBORISH", footerMessage: "Sizni kutamiz!", modalKicker: "SMS YUBORISH UCHUN TAYYOR", modalDone: "YOPISH", smsReadyTitle: "SMS tayyorlandi", smsReadyCopy: "Telefoningizdagi SMS ilovasida yuborish tugmasini bosing. Sayt SMS yuborilganini tekshira olmaydi.", modalYes: "Rahmat, {name}! Siz bilan bu kunni baham ko'rishni intiqlik bilan kutamiz.", modalNo: "Javobingiz uchun rahmat, {name}. Sizni sog'inamiz!", copyLabel: "Raqamni nusxalash", musicOn: "Musiqani yoqish", musicOff: "Musiqani to'xtatish", coverLabel: "Taklifnomani ochish"
  },
  "uz-Cyrl": {
    coverEyebrow: "СИЗ УЧУН, МЕҲР БИЛАН", coverTitle: "Ҳурматли<br />меҳмонимиз!", coverPrompt: "Совғани очиш учун босинг",
    heroNote: "БИР КУН · БИР ҲАЁТ", heroEyebrow: "НИКОҲ ТЎЙИГА ТАКЛИФНОМА", heroBottom: "Қувончимизга шерик бўлинг",
    dateKicker: "КУННИ БЕЛГИЛАБ ҚЎЙИНГ", dateTitle: "Бизнинг бахтли кунимиз", countdownLabel: "ТЎЙГА ҚАДАР", days: "КУН", hours: "СОАТ", minutes: "ДАҚИҚА", seconds: "СОНИЯ", countdownNote: "Ҳар лаҳза бизни учрашувимизга яқинлаштиради",
    scheduleStart: "Тўй 17:00 да бошланади",
    venueKicker: "МАНЗИЛИМИЗ", yandex: "Яндекс Хариталари", google: "Google Хариталар",
    rsvpKicker: "СИЗНИ КУТАМИЗ", rsvpTitle: "Келасизми?", rsvpCopy: "Илтимос, 14-ноябргача жавобингизни билдиринг.", nameLabel: "Исмингиз", namePlaceholder: "Исм ва фамилия", attendanceLabel: "Иштирокингиз", attendYes: "Албатта келаман", attendNo: "Афсуски, кела олмайман", guestCountLabel: "Неча киши?", messageLabel: "Тилакларингиз", messagePlaceholder: "Юракдан чиққан сўзларингиз...", submit: "ЖАВОБНИ ЮБОРИШ", footerMessage: "Сизни кутамиз!", modalKicker: "SMS ЮБОРИШ УЧУН ТАЙЁР", modalDone: "ЁПИШ", smsReadyTitle: "SMS тайёрланди", smsReadyCopy: "Телефонингиздаги SMS иловасида юбориш тугмасини босинг. Сайт SMS юборилганини текшира олмайди.", modalYes: "Раҳмат, {name}! Сиз билан бу кунни баҳам кўришни интиқлик билан кутамиз.", modalNo: "Жавобингиз учун раҳмат, {name}. Сизни соғинамиз!", copyLabel: "Рақамни нусхалаш", musicOn: "Мусиқани ёқиш", musicOff: "Мусиқани тўхтатиш", coverLabel: "Таклифномани очиш"
  }
};

let currentLanguage = "uz-Latn";
let audioContext;
let musicTimer;
let noteIndex = 0;
const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translations[language][element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translations[language][element.dataset.i18nPlaceholder];
  });
  document.querySelectorAll(".language-button").forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector(".music-button").setAttribute("aria-label", translations[language][musicTimer ? "musicOff" : "musicOn"]);
  document.querySelector(".music-button").title = translations[language][musicTimer ? "musicOff" : "musicOn"];
  document.querySelector("#open-gift").setAttribute("aria-label", translations[language].coverLabel);
}

document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));

function makePetals() {
  for (let index = 0; index < 38; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty("--drift", `${Math.random() * 150 - 75}px`);
    petal.style.animationDelay = `${Math.random() * 1.1}s`;
    petal.style.animationDuration = `${1.6 + Math.random() * 1.5}s`;
    petal.style.backgroundColor = ["#d995a0", "#e7bdba", "#c77f89", "#e6d2ae"][index % 4];
    document.body.append(petal);
    petal.addEventListener("animationend", () => petal.remove(), { once: true });
  }
}

document.querySelector("#open-gift").addEventListener("click", () => {
  const cover = document.querySelector("#cover");
  const invitation = document.querySelector("#invitation");
  cover.classList.add("is-opening");
  makePetals();
  window.setTimeout(() => {
    cover.classList.add("is-hidden");
    invitation.classList.add("is-visible");
    invitation.setAttribute("aria-hidden", "false");
    document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
  }, 850);
});

function renderCalendar() {
  const days = document.querySelector("#calendar-days");
  const firstDay = new Date(2026, 10, 1).getDay();
  const mondayOffset = (firstDay + 6) % 7;
  const monthLength = new Date(2026, 11, 0).getDate();
  for (let blank = 0; blank < mondayOffset; blank += 1) days.append(document.createElement("span"));
  for (let date = 1; date <= monthLength; date += 1) {
    const cell = document.createElement("span");
    cell.textContent = date;
    if (date === 15) {
      cell.className = "wedding-day";
      cell.setAttribute("aria-label", "15 November, wedding day");
    }
    days.append(cell);
  }
}

function updateCountdown() {
  const now = new Date();
  let wedding = new Date(2026, 10, 15, 18, 0, 0);
  if (wedding <= now) wedding = new Date(2027, 10, 15, 18, 0, 0);
  const secondsLeft = Math.max(0, Math.floor((wedding - now) / 1000));
  document.querySelector("#days").textContent = String(Math.floor(secondsLeft / 86400)).padStart(3, "0");
  document.querySelector("#hours").textContent = String(Math.floor((secondsLeft % 86400) / 3600)).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(secondsLeft % 60).padStart(2, "0");
}

function playNote() {
  if (!audioContext || audioContext.state !== "running") return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.value = melody[noteIndex % melody.length];
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.07);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 1.2);
  noteIndex += 1;
}

document.querySelector("#music-toggle").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  if (musicTimer) {
    window.clearInterval(musicTimer);
    musicTimer = undefined;
    await audioContext.suspend();
    button.classList.remove("is-playing");
  } else {
    audioContext ??= new window.AudioContext();
    await audioContext.resume();
    playNote();
    musicTimer = window.setInterval(playNote, 1350);
    button.classList.add("is-playing");
  }
  button.setAttribute("aria-label", translations[currentLanguage][musicTimer ? "musicOff" : "musicOn"]);
  button.title = translations[currentLanguage][musicTimer ? "musicOff" : "musicOn"];
});

const confirmation = document.querySelector("#confirmation");
document.querySelector("#rsvp-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = String(formData.get("name")).trim();
  const attending = formData.get("attendance") === "yes";
  const attendanceText = translations[currentLanguage][attending ? "attendYes" : "attendNo"];
  const message = String(formData.get("message")).trim();
  const smsBody = [
    "To'y RSVP",
    `${translations[currentLanguage].nameLabel}: ${name}`,
    `${translations[currentLanguage].attendanceLabel}: ${attendanceText}`,
    `${translations[currentLanguage].guestCountLabel}: ${formData.get("guests")}`,
    message ? `${translations[currentLanguage].messageLabel}: ${message}` : ""
  ].filter(Boolean).join("\n");
  document.querySelector("#modal-title").textContent = translations[currentLanguage].smsReadyTitle;
  document.querySelector("#modal-copy").textContent = translations[currentLanguage].smsReadyCopy;
  confirmation.showModal();
  window.location.href = `sms:+998900386444?body=${encodeURIComponent(smsBody)}`;
});
document.querySelector("#close-modal").addEventListener("click", () => confirmation.close());
document.querySelector("#modal-done").addEventListener("click", () => confirmation.close());
confirmation.addEventListener("click", (event) => {
  if (event.target === confirmation) confirmation.close();
});

renderCalendar();
updateCountdown();
window.setInterval(updateCountdown, 1000);