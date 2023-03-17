let drawColor;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(240, 240, 240);
    stroke(255);
    fill('red');
    rect(2, 2,40,40);
    fill('orange');
    rect(2, 42,40,40);
    fill('yellow');
    rect(2, 82,40,40);
    fill('green');
    rect(2, 122,40,40);
    fill('cyan');
    rect(2, 162,40,40);
    fill('blue');
    rect(2, 202,40,40);
    fill('magenta');
    rect(2, 242,40,40);
    fill('brown');
    rect(2, 282,40,40);
    fill('white');
    rect(2, 322,40,40);
    fill('black');
    rect(2, 362,40,40);
  }
  
function draw() {
    
}

function mouseClicked() {
  if(mouseX < 41)
  {
    if(mouseY < 41) 
    {
      drawColor = 'red';
    } else if(mouseY < 81)
    {
      drawColor = 'orange';
    } else if(mouseY < 121)
    {
      drawColor = 'yellow';
    } else if(mouseY < 161)
    {
      drawColor = 'green';
    } else if(mouseY < 201)
    {
      drawColor = 'cyan';
    } else if(mouseY < 241)
    {
      drawColor = 'blue';
    } else if(mouseY < 281)
    {
      drawColor = 'magenta';
    } else if(mouseY < 321)
    {
      drawColor = 'brown';
    } else if(mouseY < 361)
    {
      drawColor = 'white';
    } else if(mouseY < 401)
    {
      drawColor = 'black';
    }
  } else {
    fill = drawColor;
    ellipse(mouseX, mouseY, 1, 1);
  }
}

function mouseDragged() {
  stroke(drawColor)
  if (mouseX > 55 || mouseY > 431) {
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
