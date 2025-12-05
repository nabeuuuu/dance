// ----------------------------
// VARIABLES GLOBALES
// ----------------------------
let imagePaths = [
  "images/caracter_Danctech_01.png",
  "images/caracter_Danctech_02.png",
  "images/caracter_Danctech_03.png",
  "images/caracter_Danctech_04.png",
  "images/caracter_Danctech_05.png"
];
let index = 0;
let delay = 2000;
let timer;
let playing = false;
let drawingEnabled = false; // ✅ NOUVEAU : contrôler si le dessin est actif

let currentShapeType = "bezier";
let strokeColorValue = "#ff0000";

// ----------------------------
// SETUP
// ----------------------------
function setup() {
  // ✅ Canvas en plein écran
  createCanvas(windowWidth, windowHeight);
  background(30);
  noFill();

  // 🎮 EVENT LISTENERS CONTROLES
  const delayRange = document.getElementById("delayRange");
  const delayValue = document.getElementById("delayValue");
  const strokeColorInput = document.getElementById("strokeColor");
  
  if (delayRange) {
    delayRange.addEventListener("input", (e) => {
      const fps = parseInt(e.target.value, 10);
      delay = Math.round(1000 / fps); // ✅ Convertir FPS en milliseconds
      if (delayValue) delayValue.textContent = fps + " FPS";
      if (playing) restartSlideshow();
      console.log("FPS changé à:", fps, "| Delay:", delay, "ms");
    });
  }

  if (strokeColorInput) {
    strokeColorInput.addEventListener("input", (e) => {
      strokeColorValue = e.target.value;
      console.log("Couleur changée à:", strokeColorValue);
    });
  }

  document.getElementById("circleBtn").addEventListener("click", () => {
    currentShapeType = "circle";
    console.log("Forme: circle");
  });
  document.getElementById("squareBtn").addEventListener("click", () => {
    currentShapeType = "square";
    console.log("Forme: square");
  });
  document.getElementById("triangleBtn").addEventListener("click", () => {
    currentShapeType = "triangle";
    console.log("Forme: triangle");
  });
  document.getElementById("starBtn").addEventListener("click", () => {
    currentShapeType = "star";
    console.log("Forme: star");
  });
  document.getElementById("bezierBtn").addEventListener("click", () => {
    currentShapeType = "bezier";
    console.log("Forme: bezier");
  });

  document.getElementById("startBtn").addEventListener("click", startSlideshow);
  document.getElementById("stopBtn").addEventListener("click", stopSlideshow);

  document.getElementById("saveBtn").addEventListener("click", () => {
    save("creative_dance_" + Date.now() + ".jpg");
  });

  document.getElementById("saveGifBtn").addEventListener("click", () => {
    saveGif("creative_dance_" + Date.now(), 5); // 5 secondes de GIF
    console.log("🎬 GIF en cours de téléchargement...");
  });
}

// ----------------------------
// DRAW LOOP
// ----------------------------
function draw() {
  if (!drawingEnabled) {
    return;
  }

  stroke(strokeColorValue);
  strokeWeight(2);

  switch (currentShapeType) {
    case "circle":
      drawCircle();
      break;
    case "square":
      drawSquare();
      break;
    case "triangle":
      drawTriangle();
      break;
    case "star":
      drawStar();
      break;
    case "bezier":
      drawBezier();
      break;
  }
}

// ----------------------------
// FORMES
// ----------------------------
function drawStar() {
  let x = random(windowWidth);
  let y = random(windowHeight);
  let size = random(20, 80);
  let points = 5;
  
  push();
  translate(x, y);
  rotate(random(TWO_PI));
  
  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / points) {
    let sx1 = cos(i) * size;
    let sy1 = sin(i) * size;
    vertex(sx1, sy1);
    
    let sx2 = cos(i + TWO_PI / (points * 2)) * (size * 0.5);
    let sy2 = sin(i + TWO_PI / (points * 2)) * (size * 0.5);
    vertex(sx2, sy2);
  }
  endShape(CLOSE);
  
  pop();
}

function drawBezier() {
  bezier(random(windowWidth), random(windowHeight), random(windowWidth), random(windowHeight),
    random(windowWidth), random(windowHeight), random(windowWidth), random(windowHeight));
}

function drawCircle() {
  let x = random(windowWidth);
  let y = random(windowHeight);
  let size = random(20, 100);
  circle(x, y, size);
}

function drawSquare() {
  let x = random(windowWidth);
  let y = random(windowHeight);
  let size = random(20, 100);
  square(x, y, size);
}

function drawTriangle() {
  let x1 = random(windowWidth);
  let y1 = random(windowHeight);
  let x2 = random(windowWidth);
  let y2 = random(windowHeight);
  let x3 = random(windowWidth);
  let y3 = random(windowHeight);
  triangle(x1, y1, x2, y2, x3, y3);
}

// ----------------------------
// SLIDESHOW
// ----------------------------
function startSlideshow() {
  if (!playing) {
    playing = true;
    drawingEnabled = true;
    
    // ✅ Masquer le message de démarrage
    const startMessage = document.getElementById("startMessage");
    if (startMessage) {
      startMessage.classList.add("hidden");
    }
    
    nextImage();
    timer = setInterval(nextImage, delay);
    console.log("🎬 Diaporama démarré + dessin activé");
  }
}

function stopSlideshow() {
  playing = false;
  drawingEnabled = false;
  clearInterval(timer);
  
  // ✅ Afficher le message de démarrage à nouveau (optionnel)
  const startMessage = document.getElementById("startMessage");
  if (startMessage) {
    startMessage.classList.remove("hidden");
  }
  
  console.log("⏹️ Diaporama arrêté + dessin désactivé");
}

function restartSlideshow() {
  clearInterval(timer);
  timer = setInterval(nextImage, delay);
}

function nextImage() {
  index = (index + 1) % imagePaths.length;
  const imgElement = document.getElementById("image");
  if (imgElement) {
    imgElement.src = imagePaths[index];
  }
}

// ----------------------------
// RESPONSIVE
// ----------------------------
function windowResized() {
  // ✅ Redimensionne le canvas quand la fenêtre change
  resizeCanvas(windowWidth, windowHeight);
}
