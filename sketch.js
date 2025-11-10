// 🖼️ Liste de tes images locales
const images = [
  "images/caracter_Danctech_01.png",
  "images/caracter_Danctech_02.png",
  "images/caracter_Danctech_03.png",
  "images/caracter_Danctech_04.png",
  "images/caracter_Danctech_05.png"

];

const imgElement = document.getElementById("image");
const delayRange = document.getElementById("delayRange");
const delayValue = document.getElementById("delayValue");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let currentIndex = 0;
let intervalId = null;
let delay = parseInt(delayRange.value);

// 🕹️ Quand on change le curseur
delayRange.addEventListener("input", () => {
  delay = parseInt(delayRange.value);
  delayValue.textContent = (delay / 1000).toFixed(1); // Affiche en secondes
  if (intervalId) {
    clearInterval(intervalId);
    startSlideshow();
  }
});

// 🔄 Affiche l’image suivante (boucle automatique)
function showNextImage() {
  imgElement.classList.remove("show");

  setTimeout(() => {
    imgElement.src = images[currentIndex];
    imgElement.classList.add("show");
  }, 100);

  // On passe à l’image suivante en boucle
  currentIndex = (currentIndex + 1) % images.length;
}

// ▶️ Démarre le diaporama
function startSlideshow() {
  showNextImage();
  intervalId = setInterval(showNextImage, delay);
}

// ⏹️ Arrête le diaporama
function stopSlideshow() {
  clearInterval(intervalId);
}

// 🧠 Événements des boutons
startBtn.addEventListener("click", startSlideshow);
stopBtn.addEventListener("click", stopSlideshow);
