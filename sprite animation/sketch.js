let spelunkyCharater, greenCharacter, ninjaCharacter, blueCharacter;
let array = [];

function preload() {
 //loading sprite sheets 
   spelunkyCharater = loadImage("../spritecharacters/SpelunkyGuy.png");
   blueCharacter = loadImage("../spritecharacters/Blue.png");
   greenCharacter = loadImage("../spritecharacters/Green.png");
   ninjaCharacter = loadImage("../spritecharacters/Ninja.png"); 
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
    // scale problem (-1)
    imageMode(CENTER);

    spelunkyCharater = new Character(spelunkyChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    blueCharacter = new Character(blueChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    greenCharacter = new Character(greenChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    ninjaCharacter = new Character(ninjaChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    
    let choices = [35, 70]
    for(let i = 0; i < 20; i++) {
      array[i] = new Cloud(random(0, window.innerWidth), 70, random(1, 2));
    }
    for(let i = 20; i < 40; i++) {
      array[i] = new Cloud(random(0, window.innerWidth), 35, random(1, 2));
    }
    
}
function draw() {
  background(220);

  blueCharacter.draw();
  greenCharacter.draw();
  spelunkyCharater.draw();
  ninjaCharacter.draw();

  for(let i=0; i < 10; i++) {
    animations[i].draw();
  }
}
function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    greenCharacter.go(1);
    blueCharacter.go(1);
    spelunkyCharacter.go(1);
    ninjaCharacter.go(1);

  } else if (keyCode == LEFT_ARROW) {
    greenCharacter.go(1);
    blueCharacter.go(1);
    spelunkyCharacter.go(1);
    ninjaCharacter.go(1);

  }
}

function keyReleased() {
  greenCharacter.go(1);
  blueCharacter.go(1);
  spelunkyCharacter.go(1);
  ninjaCharacter.go(1);
}

class Cloud {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 40, 20);
    ellipse(this.x+30, this.y, 40, 20);
    ellipse(this.x+60, this.y, 40, 20);
    ellipse(this.x+15, this.y-10, 40, 20);
    ellipse(this.x+45, this.y-10, 40, 20);

    this.x += this.speed;

    if(this.x > window.innerWidth + 100) {
      this.x = -100;
    }
  }

}

class Character {
  constructor(character, x, y, speed) {
    this.character = character;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
    this.speed = speed;
  }

  draw() {
    push();
    translate(this.x,this.y);
    scale(this.facing, 1);

    if(this.move == 0) {
      image(this.character, 0, 0, 80, 80, 0, 0, 80, 80);
    } else {
      image(this.character, 0, 0, 80, 80, 80 * (this.sx + 1), 0, 80, 80);
    }


    if(frameCount % (7 - (round(this.speed - 2))) == 0) {
      this.sx = (this.sx + 1) % 8;
    }

    if(this.x > window.innerWidth) {
      this.move = -(this.move);
      this.facing = -(this.facing);
    }

    if(this.x < 0) {
      this.move = -(this.move);
      this.facing = -(this.facing);
    }

    this.x += this.speed * this.move;
    pop();
  }

  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  stop() {
    this.move = 0;
  }
}