let rectHeight = 35;
//Declaring the height and creating the stroke of shapes.


let rectWidth; 


function setup() {
  createCanvas(200, 100);
   noStroke();//turn off stroke
  rectWidth = (10,80);
  console.log(rectWidth)
}


function draw() {
  //The canvas color, pacman, and ghost.
  background(0);
  fill(255,255,90);//pacman color
  ellipse(50, 50, 80, 80);//pacman
  
  fill(248, 59, 50);//ghost head color
  ellipse(150, 50, 80, 80);//ghost
  
    fill(180);
  rect(110, 55, rectWidth, rectHeight);
  
  fill(0);//pacman mouth color
  triangle(50,50,10,90,10,20);//pacman cutout
  
  fill(248, 59, 50);
  rect(110, 55, rectWidth, rectHeight);//ghost bottom


  ellipseMode(RADIUS);
fill(255);
ellipse(130, 50, 14, 14); // Outer white ellipse
ellipseMode(CENTER);
fill(65, 105, 225);
ellipse(130, 50, 18, 18); // Inner blue ellipse
  
    ellipseMode(RADIUS);
fill(255);
ellipse(170, 50, 14, 14); // Outer white ellipse
ellipseMode(CENTER);
fill(65, 105, 225);
ellipse(170, 50, 18, 18); // Inner blue ellipse
}
