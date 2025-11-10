# Dance

## L'idée
- Formes de personnages
- Couleurs
- [Réference](https://fr.pinterest.com/pin/5981412001723381/)

## Description de l'outil
L'outil servira a manipuler des personnages annimés qui dance sur differents fonds qu'on pourra également changer  tout comme le type de personnage. Il y'aura également une musique attribuer à chaque type de personnage qu'on pourra mixer grace à des curseurs.

## Les snippets 

découpage des bouts de code pour le projet (fonctionnalités) : 
- Placer des images after delay 
- Controle du fps (vitesse d'affichage)
- Mixer le son
  
  Quelques snippets à tester :


  **Changer la vitesse d'affichage**

  ```delayRange.addEventListener("input", () => {
  delay = parseInt(delayRange.value);
  delayValue.textContent = (delay / 1000).toFixed(1); // Affiche en secondes
  if (intervalId) {
    clearInterval(intervalId);
    startSlideshow();
  }});
```

**Appliquer un son avec des touches**



```let osc;
function setup() {
  createCanvas(400, 200);
  textAlign(CENTER, CENTER);
  text("Appuie sur une touche pour jouer un son", width/2, height/2);
  osc = new p5.Oscillator('sine');
}

function keyPressed() {
  osc.freq(map(keyCode, 65, 90, 200, 800)); // mappe A-Z sur fréquence
  osc.start();
  osc.amp(0.5, 0.1);
}

function keyReleased() {
  osc.amp(0, 0.2);
}```

