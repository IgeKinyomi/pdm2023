let player;
let ground;
let obstacles = [];
let coins = [];
let score = 0;
let lives = 3;
let isGameOver = false;
let isPlaying = false;
let gameStartTime;
let gameEndTime;

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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  if (isPlaying) {
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
    text("Press space to start", width / 2, height / 2 - 20);
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
    }
  
    hits(player) {
      return (
        this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.y + this.height > player.y
      );
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

function keyPressed() {
  if (keyCode === 32) { // spacebar
    if (isGameOver) {
      restartGame();
    } else if (!isPlaying) {
      startGame();
    } else {
      player.jump();
    }
  } else if (keyCode === UP_ARROW) {
    if (!isPlaying) {
      startGame();
    } else {
      player.jump();
    }
  }
}

function startGame() {
  isPlaying = true;
  gameStartTime = millis();
}

function gameOver() {
  isGameOver = true;
  isPlaying = false;
  gameEndTime = millis();
}

function restartGame() {
  isGameOver = false;
  isPlaying = true;
  score = 0;
  lives = 3;
  player = new Player();
  obstacles = [];
  coins = [];
  gameStartTime = millis();
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height - 50;
    this.width = 50;
    this.height = 50;
    this.yVelocity = 0;
    this.gravity = 1.5;
  }
  
  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }
  
  update() {
    this.yVelocity += this.gravity;
    this.y += this.yVelocity;
    
    // check for floor collision
    if (this.y + this.height > height) {
      this.y = height - this.height;
      this.yVelocity = 0;
    }
  }
  
  jump() {
    if (this.y + this.height == height) {
      this.yVelocity = -25;
    }
  }
}