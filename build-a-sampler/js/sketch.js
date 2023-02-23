//Ige Kinyomi 2023

let sound1 = new Tone.Player("sounds/chicken.wav");

function setup() {
  createCanvas(400, 400);
  sound1.toDestination();
}

function draw() {
background (220);
}

function keyPressed() {
  sound1.start();
}