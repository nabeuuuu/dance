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
let delay = Math.round(1000 / 30); // 30 FPS par défaut
let timer;
let playing = false;
let drawingEnabled = false;
let currentShapeType = "bezier";
let shapeCount = 1;
let randomizeColors = false;

// ----------------------------
// SETUP
// ----------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  noFill();

  setupEventListeners();
}

function setupEventListeners() {
  // FPS Range
  const delayRange = document.getElementById("delayRange");
  const delayValue = document.getElementById("delayValue");
  
  if (delayRange) {
    delayRange.addEventListener("input", (e) => {
      const fps = parseInt(e.target.value, 10);
      delay = Math.round(1000 / fps);
      if (delayValue) delayValue.textContent = fps + " FPS";
      if (playing) {
        clearInterval(timer);
        timer = setInterval(nextImage, delay);
      }
      console.log("✅ FPS changé à:", fps);
    });
  }

  // Shape Count
  const shapeCountInput = document.getElementById("shapeCount");
  const shapeCountValue = document.getElementById("shapeCountValue");
  
  if (shapeCountInput) {
    shapeCountInput.addEventListener("input", (e) => {
      shapeCount = parseInt(e.target.value, 10);
      if (shapeCountValue) shapeCountValue.textContent = shapeCount;
      console.log("✅ Formes par frame:", shapeCount);
    });
  }

  // Randomize Colors
  const randomizeColorCheckbox = document.getElementById("randomizeColor");
  if (randomizeColorCheckbox) {
    randomizeColorCheckbox.addEventListener("change", (e) => {
      randomizeColors = e.target.checked;
      console.log("✅ Couleurs aléatoires:", randomizeColors ? "ON" : "OFF");
    });
  }

  // Color Palettes
  const colorButtons = {
    colorRed: "red",
    colorBlue: "blue",
    colorYellow: "yellow",
    colorGreen: "green",
    colorOrange: "orange",
    colorPurple: "purple"
  };

  Object.entries(colorButtons).forEach(([buttonId, colorName]) => {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener("click", () => {
        currentColorPalette = colorName;
        updateStrokeColor();
        console.log("✅ Couleur sélectionnée:", colorName);
      });
    }
  });

  // Shapes
  const shapeButtons = {
    circleBtn: "circle",
    squareBtn: "square",
    triangleBtn: "triangle",
    starBtn: "star",
    bezierBtn: "bezier"
  };

  Object.entries(shapeButtons).forEach(([buttonId, shapeName]) => {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener("click", () => {
        currentShapeType = shapeName;
        console.log("✅ Forme sélectionnée:", shapeName);
      });
    }
  });

  // Start / Stop
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  
  if (startBtn) startBtn.addEventListener("click", startSlideshow);
  if (stopBtn) stopBtn.addEventListener("click", stopSlideshow);

  // Clear
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      background(30);
      console.log("✅ Canvas effacé");
    });
  }

  // Save
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveCanvas("creative_dance_" + Date.now(), "jpg");
      console.log("✅ JPG sauvegardé");
    });
  }

  // Save GIF
  const saveGifBtn = document.getElementById("saveGifBtn");
  if (saveGifBtn) {
    saveGifBtn.addEventListener("click", () => {
      saveGif("creative_dance_" + Date.now(), 5);
      console.log("✅ GIF en cours de téléchargement");
    });
  }
}

// ----------------------------
// COULEURS
// ----------------------------
function updateStrokeColor() {
  if (randomizeColors) {
    strokeColorValue = random(colorPalettes[currentColorPalette]);
  } else {
    strokeColorValue = colorPalettes[currentColorPalette][0];
  }
}

// ----------------------------
// DRAW LOOP
// ----------------------------
function draw() {
  if (!drawingEnabled) {
    return;
  }

  strokeWeight(2);

  for (let i = 0; i < shapeCount; i++) {
    if (randomizeColors) {
      stroke(random(colorPalettes[currentColorPalette]));
    } else {
      stroke(strokeColorValue);
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
  bezier(random(windowWidth), random(windowHeight), 
         random(windowWidth), random(windowHeight),
         random(windowWidth), random(windowHeight), 
         random(windowWidth), random(windowHeight));
}

// ----------------------------
// SLIDESHOW
// ----------------------------
function startSlideshow() {
  if (!playing) {
    playing = true;
    drawingEnabled = true;
    
    const startMessage = document.getElementById("startMessage");
    if (startMessage) {
      startMessage.style.display = "none";
    }
    
    nextImage();
    timer = setInterval(nextImage, delay);
    console.log("🎬 Diaporama démarré");
  }
}

function stopSlideshow() {
  playing = false;
  drawingEnabled = false;
  clearInterval(timer);
  
  const startMessage = document.getElementById("startMessage");
  if (startMessage) {
    startMessage.style.display = "block";
  }
  
  console.log("⏹️ Diaporama arrêté");
}

function nextImage() {
  index = (index + 1) % imagePaths.length;
  const imgElement = document.getElementById("image");
  if (imgElement) {
    imgElement.src = imagePaths[index];
    imgElement.style.display = "block";
  }
}

// ----------------------------
// RESPONSIVE
// ----------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
