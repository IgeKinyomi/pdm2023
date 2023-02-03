function setup() {
  createCanvas(430,430);
}

function draw() {
background(26,0,153);

fill(0,153,0);
stroke(255);
strokeWeight(7);
ellipse(215,215,225,225);

// star points
fill(255,0,0)
beginShape();
vertex(330,180)
vertex(250,180)
vertex(220,95)
vertex(180,180)
vertex(100,180)
vertex(165,235)
vertex(140,305)
vertex(215,265)
vertex(290,305)
vertex(265,235)
endShape(CLOSE);
}
