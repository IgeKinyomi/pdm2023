//canvas
function setup() {
  createCanvas(600, 200);
  frameRate(60);
  textSize(24);
}

//game variables
let score = 0;
let lives = 3;
let timer = 0;
let gameState = "welcome";

// define game objects
let player;
let obstacles = [];

// welcome screen
function drawWelcomeScreen() {
  background(255);
  fill(0);
  textAlign(CENTER);
  text("Press Space to Start", width / 2, height / 2);
}

// game over screen
function drawGameOverScreen() {
  background(255);
  fill(0);
  textAlign(CENTER);
  text("Game Over!", width / 2, height / 2 - 30);
  text("Score: " + score, width / 2, height / 2);
  text("Press Space to Restart", width / 2, height / 2 + 30);
}

//game loop
function drawGame() {
  background(255);
  
  // update the player
  player.update();
  player.show();
  
  // update and show the obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    
    // check for collision with player
    if (obstacles[i].hits(player)) {
      lives--;
      obstacles.splice(i, 1);
      
      // end game if no lives left
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
    
    // remove obstacles that have gone off screen
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }
  
  // add new obstacles
  if (frameCount % 60 == 0) {
    obstacles.push(new Obstacle());
  }
  
  //game info
  fill(0);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);
  text("Lives: " + lives, 20, 60);
  text("Time: " + timer, 20, 90);
  
  // update timer
  if (frameCount % 60 == 0) {
    timer++;
  }
}

// handle keyboard input
function keyPressed() {
  if (keyCode == 32) {
    if (gameState == "welcome") {
      player = new Player();
      gameState = "playing";
    } else if (gameState == "gameover") {
      score = 0;
      lives = 3;
      timer = 0;
      obstacles = [];
      gameState = "welcome";
    }
  }
}

// define the main game loop
function draw() {
  if (gameState == "welcome") {
    drawWelcomeScreen();
  } else if (gameState == "playing") {
    drawGame();
  } else if (gameState == "gameover") {
    drawGameOverScreen();
  }
}
