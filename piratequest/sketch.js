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
let gameStarted = false;

let port;
let writer, reader;
const encoder = new TextEncoder();
const decorder = new TextDecoder();

let xValue = 00;
let yValue = 00;
let isPressedButton = 1;
let cursor;
let redC = 100;
let greenC = 100;
let blueC = 100;
let pXvalue = 0;
let pYvalue = 0;

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
  if ("serial" in navigator) {
    textAlign(CENTER,CENTER);
    textSize(25);
    {
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
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  let button = createButton("Connect");
  button.position(350,10);
  button.mousePressed(connect);
  button.style('width','100px');
  button.style('height','50px');
  button.style('font-size', '20px');
  button.style('background-color', 'black');
  button.style('color', 'white');

   
    cursor = circle(xValue,yValue);
if(isPressedButton==0){
      buttonPressed();
    }
    if (reader && frameCount%3==0) {
      serialRead();
      joystickDragged();
    }

  if(writer&& frameCount%5===0){
    writer.write(encoder.encode(redC+","+greenC+","+blueC+"\n"));
  }
  if (isPlaying) {
    clear();
    bgSeq.start();
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
    text("Click the button to start!", width / 2, height / 2 - 20);
    textSize(20);
    text(`Score: ${score}`, width / 2, height / 2 + 20);
  }
}

function joystickDragged() {
  
  if (xValue > 55 || mouseY > 431) {
    strokeWeight(10);
    line(xValue, yValue, pXvalue, pYvalue);
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
    this.size = 30;
    this.x = width;
    this.y = random(height - this.size);
    this.speed = 5;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return (this.x + this.size < 0);
  }
  hits(player) {
    return (
      this.x < player.x + player.width &&
      this.x + this.size > player.x &&
      this.y < player.y + player.height &&
      this.y + this.size > player.y
    );
}
}
//mouse clicked changed to button pressed
function buttonPressed() {
  Tone.context.resume();
  if (!gameStarted) { // spacebar
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
async function serialRead()
 {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    let temp = splitTokens(value,',');
    pXvalue = xValue;
    pYvalue = yValue;
    xValue = temp[0];
    yValue = temp[1];
    console.log(xValue);
    console.log(yValue);
    isPressedButton = temp[2];    
  }
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
     .pipeThrough(new TextDecoderStream())
     .pipeThrough(new TransformStream(new LineBreakTransformer()))
     .getReader();
}

class LineBreakTransformer {
  constructor() {
    this.chunks = "";
  }

  transform(chunk, controller) {
    this.chunks += chunk;
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    controller.enqueue(this.chunks);
  }
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