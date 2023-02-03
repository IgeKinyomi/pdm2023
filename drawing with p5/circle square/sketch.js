let rectHeight = 80;
//Declaring the height and creating the stroke of shapes.

let rectWidth; 

function setup() {
  createCanvas(200, 100);
  strokeWeight(1.5);
  rectWidth = (10,80);
  console.log(rectWidth)
}

function draw() {
  //The background color, circle, and square.
  background(100,255,65);
  ellipse(50, 50, 80, 80);
  fill(255);
  rect(110, 10, rectWidth, rectHeight);
}
