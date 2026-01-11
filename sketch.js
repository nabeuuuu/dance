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

// ✅ NOUVEAU : Palette de couleurs primaires et secondaires avec teintes
let colorPalettes = {
  red: ["#FF0000", "#FF4444", "#FF8888", "#FF1111", "#CC0000", "#990000"],
  blue: ["#0000FF", "#4444FF", "#8888FF", "#1111FF", "#0000CC", "#000099"],
  yellow: ["#FFFF00", "#FFFF44", "#FFFF88", "#FFFF11", "#CCCC00", "#999900"],
  green: ["#00FF00", "#44FF44", "#88FF88", "#11FF11", "#00CC00", "#009900"],
  orange: ["#FF8800", "#FFAA44", "#FFBB88", "#FF9911", "#CC6600", "#994400"],
  purple: ["#AA00FF", "#BB44FF", "#CC88FF", "#BB11FF", "#8800CC", "#660099"]
};

let currentColorPalette = "red";
let strokeColorValue = "#FF0000";

let index = 0;
let delay = 2000;
let timer;
let playing = false;
let drawingEnabled = false;

let currentShapeType = "bezier";
let shapeCount = 1;
let randomizeColors = false; // ✅ NOUVEAU : option pour aleatoire

// ----------------------------
// SETUP
// ----------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  noFill();

  // 🎮 EVENT LISTENERS CONTROLES
  const delayRange = document.getElementById("delayRange");
  const delayValue = document.getElementById("delayValue");
  const shapeCountInput = document.getElementById("shapeCount");
  const shapeCountValue = document.getElementById("shapeCountValue");
  const randomizeColorCheckbox = document.getElementById("randomizeColor"); // ✅ NOUVEAU
  
  if (delayRange) {
    delayRange.addEventListener("input", (e) => {
      const fps = parseInt(e.target.value, 10);
      delay = Math.round(1000 / fps);
      if (delayValue) delayValue.textContent = fps + " FPS";  // ✅ AJOUTEZ CETTE LIGNE
      if (playing) restartSlideshow();  // ✅ AJOUTEZ CETTE LIGNE
      console.log("FPS changé à:", fps, "| Delay:", delay, "ms");
    });
  }

  // ✅ NOUVEAU : Event listeners pour les couleurs primaires et secondaires
  document.getElementById("colorRed").addEventListener("click", () => {
    currentColorPalette = "red";
    updateStrokeColor();
    console.log("Palette: Rouge");
  });
  document.getElementById("colorBlue").addEventListener("click", () => {
    currentColorPalette = "blue";
    updateStrokeColor();
    console.log("Palette: Bleu");
  });
  document.getElementById("colorYellow").addEventListener("click", () => {
    currentColorPalette = "yellow";
    updateStrokeColor();
    console.log("Palette: Jaune");
  });
  document.getElementById("colorGreen").addEventListener("click", () => {
    currentColorPalette = "green";
    updateStrokeColor();
    console.log("Palette: Vert");
  });
  document.getElementById("colorOrange").addEventListener("click", () => {
    currentColorPalette = "orange";
    updateStrokeColor();
    console.log("Palette: Orange");
  });
  document.getElementById("colorPurple").addEventListener("click", () => {
    currentColorPalette = "purple";
    updateStrokeColor();
    console.log("Palette: Violet");
  });

  // ✅ NOUVEAU : Checkbox pour aleatoire
  if (randomizeColorCheckbox) {
    randomizeColorCheckbox.addEventListener("change", (e) => {
      randomizeColors = e.target.checked;
      console.log("Couleurs aléatoires:", randomizeColors ? "ON" : "OFF");
    });
  }

  if (shapeCountInput) {
    shapeCountInput.addEventListener("input", (e) => {
      shapeCount = parseInt(e.target.value, 10);
      if (shapeCountValue) shapeCountValue.textContent = shapeCount;  // ✅ COMPLÉTEZ CETTE LIGNE
      console.log("Nombre de formes changé à:", shapeCount);
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

  document.getElementById("clearBtn").addEventListener("click", () => {
    background(30);
    console.log("🗑️ Canvas effacé");
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    save("creative_dance_" + Date.now() + ".jpg");
  });

  document.getElementById("saveGifBtn").addEventListener("click", () => {
    saveGif("creative_dance_" + Date.now(), 5);
    console.log("🎬 GIF en cours de téléchargement...");
  });
}

// ✅ NOUVEAU : Fonction pour mettre à jour la couleur
function updateStrokeColor() {
  if (randomizeColors) {
    strokeColorValue = random(colorPalettes[currentColorPalette]);
  } else {
    strokeColorValue = colorPalettes[currentColorPalette][0]; // couleur principale
  }
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

  for (let i = 0; i < shapeCount; i++) {
    // ✅ MODIFIÉ : Change de couleur à chaque forme si randomizeColors est ON
    if (randomizeColors) {
      stroke(random(colorPalettes[currentColorPalette]));
    }

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
      startMessage.style.display = "none";  // ✅ AJOUTEZ CETTE LIGNE
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
    startMessage.style.display = "block";  // ✅ AJOUTEZ CETTE LIGNE
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
