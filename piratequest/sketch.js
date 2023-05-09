let player;
let ground;
let obstacles = [];
let coins = [];
let score = 0;
let lives = 3;
let isGameOver = false;
let gameStarted = false;
let gameStartTime;
let gameEndTime;
//music
let simpSynth, bgSeq, drawSeq;
let bgMelody = ["C4", "D4", "E4", "F4", "G4", "A4"];
let drawMelody = ["F3", "E3", "D3", "C3", "B3", "A3"];

simpSynth = new Tone.Synth().toMaster();

bgSeq = new Tone.Sequence(function(time, note) {
  simpSynth.triggerAttackRelease(note, 0.5);
  console.log(note);
}, bgMelody, '4n');

drawSeq = new Tone.Sequence(function(time, note) {
  simpSynth.triggerAttackRelease(note, 0.5);
  console.log(note);
}, drawMelody, '4n');
//add sprite and new font
//function preload() {
 // font = loadFont('Prompt', sans-serif);

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200, 200, 200);
  player = new Player();
  ground = new Ground();
  obstacles.push(new Obstacle());

  textSize(20);
  fill(0, 0, 0); //text color
  textAlign(RIGHT, TOP);
  //bg color
  background(0, 0, 255);
   // Set the text font to Prompt
   //textFont(font);
   Tone.Transport.bpm.value = 90;
   Tone.Transport.start();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  if (gameStarted && lives > 0) {
    clear();
    background(0, 0, 255); // Set the background color to blue
    player.show();
    player.update();
    ground.show();
    if (frameCount % 60 == 0) {
      let obstacle = new Obstacle();
      obstacles.push(obstacle);
      if (frameCount % 120 == 0) {
        let coin = new Coin();
        coins.push(coin);
      }
    }
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();
      if (obstacles[i].hits(player)) {
        lives--;
        if (lives == 0) {
          gameOver();
        }
        obstacles.splice(i, 1);
      } else if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
        score++;
      }
    }
    for (let i = coins.length - 1; i >= 0; i--) {
      coins[i].show();
      coins[i].update();
      if (coins[i].hits(player)) {
        coins.splice(i, 1);
        score += 10;
      } else if (coins[i].offscreen()) {
        coins.splice(i, 1);
      }
    }
    textSize(20);
    text(`Score: ${score}`, width - 10, 10);
    text(`Lives: ${lives}`, width - 10, 40);
  } else if (isGameOver) {
    clear();
    textSize(40);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2 - 20);
    textSize(20);
    text(`Score: ${score}`, width / 2, height / 2 + 20);
  } else {
    clear();
    textSize(40);
    textAlign(CENTER);
    text("Click the mouse to start!", width / 2, height / 2 - 20);
    textSize(20);
    text(`Score: ${score}`, width / 2, height / 2 + 20);
  }
}

class Obstacle {
    constructor() {
      this.width = 20;
      this.height = 60;
      this.x = width;
      this.y = height - this.height - 20;
      this.speed = 5;
    }

  
    show() {
      rect(this.x, this.y, this.width, this.height);
    }
  
    update() {
      this.x -= this.speed;
    }
      offscreen() {
        return (this.x + this.width < 0);
      }
  
    hits(player) {
      return (
        this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.y + this.height > player.y
      );
    }
}

class Ground {
  constructor() {
    this.x1 = 0;
    this.y1 = height - 50;
    this.x2 = width;
    this.y2 = height;
  }
  
  show() {
    fill(0, 200, 0); // set the ground color to green
    rect(this.x1, this.y1, this.x2, this.y2);
  }
}
class Coin {
  constructor() {
    this.r = 25;
    this.x = width;
    this.y = height - this.r;
    this.speed = 10;
    this.collected = false;
  }

  show() {
    ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.r;
  }

  hits(player) {
    if (!this.collected && collideRectCircle(player.x, player.y, player.r, player.r, this.x, this.y, this.r * 2)) {
      this.collected = true;
      return true;
    }
    return false;
  }
}

function mouseClicked() {
  Tone.context.resume();
    if (!gameStarted) {
      gameStarted = true;
      obstacles.push(new Obstacle());
      coins.push(new Coin());
      loop();
    }
  }

function startGame() {
  gameStarted = true;
  gameStartTime = millis();
}

function gameOver() {
  isGameOver = true;
  gameStarted = true;
  gameEndTime = millis();
}

function restartGame() {
  isGameOver = false;
  gameStarted = true;
  score = 0;
  lives = 3;
  player = new Player();
  obstacles = [];
  coins = [];
  gameStartTime = millis();
}

class Player {
  constructor() {
    this.r = 50;
    this.x = this.r;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 1.5;
  }

  display() {
    rect(this.x, this.y, this.r, this.r);
  }

  jump() {
    if (this.y == height - this.r) {
      this.vy = -25;
    }
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }
}
