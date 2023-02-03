function setup() {
  createCanvas(200, 200);
  colorMode(RGB, 255, 255, 255, 1)
   noStroke();//turn off stroke

}

function draw() {
  //Transparent circles.
  background(0);
  
  

colorMode(RGB, 255, 255, 255, 1);
background(255);
noStroke;
  
fill(0,255,5,0.3);//right color
ellipse(130, 125, 100, 100);//right circle
  
fill(0,0,255,0.3);//left color
ellipse(70, 130, 100, 100);//left circle
  
fill(255,0,5,0.3);//top color
ellipse(100, 70, 100, 100);//top circle
  
}

