//Var
let img; //  var for sprite 
let player; // var player object
let score = 0; // var player's score
let gameState = 0; // global variable to store the game state: 0 = home screen, 1 = playing, 2 = game over
let platform;
let coins;
let serial;
let xVal, yVal, buttonState;

// for music 
let simpSynth, bgSeq, drawSeq;
let bgMelody = ["C4", "D4", "E4", "F4", "G4", "A4"];
let drawMelody = ["F3", "E3", "D3", "C3", "B3", "A3"];

simpSynth = new Tone.Synth().toMaster();

bgSeq = new Tone.Sequence(function(time, note) {
  simpSynth.triggerAttackRelease(note, 0.5);
}, bgMelody, '4n');

drawSeq = new Tone.Sequence(function(time, note) {
  simpSynth.triggerAttackRelease(note, 0.5);
}, drawMelody, '4n');

if ("serial" in navigator) {
  textAlign(CENTER,CENTER);
  textSize(25);
}

//preload
function preload() {
  purplePirate= loadImage("piratequest-finalproj/libraries/PC Computer - Spelunky - Purple.png"); // load the sprite image
}

function setup() {
  createCanvas(800, 400);
  player = createSprite(width/2, height/2, 64, 64);
  player.addImage("piratequest-finalproj/libraries/PC Computer - Spelunky - Purple.png"); // set the sprite image
  textAlign(CENTER);
  textSize(32);
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

function draw() {
  background(220);
  if (gameState === 0) { // home screen
    fill(0);
    text('Press the SPACEBAR to start!', width/2, height/2);
    if (keyDown(' ')) { // start the game
      gameState = 1;
    }
  } else if (gameState === 1) { // playing
    player.velocity.y += 0.8; // gravity
    player.collide(platforms); // player collides with platforms
    platforms.overlap(coins, collectCoin); // collect coins
    drawSprites();
    textSize(16);
    text(`Score: ${score}`, 50, 50); // display score
    score++; // increment score
    if (player.position.y > height) { // player falls off screen
      gameState = 2;
    }
  } else if (gameState === 2) { // game over
    fill(0);
    text(`Game Over\nScore: ${score}`, width/2, height/2);
    noLoop();
// tone
    Tone.Transport.bpm.value = 90;
    Tone.Transport.start();

  }
}

function keyPressed() {
  if (gameState === 1 && key === ' ') { // jump while playing
    player.velocity.y = -16;
  }
}

function collectCoin(platform, coin) {
  coin.remove(); // remove coin from canvas
  score += 10; // increase score
}

// create platforms and coins
platforms = createGroup();
coins = createGroup();
for (let i = 0; i < 5; i++) {
  let platform = createSprite(random(width), random(height-50, height), random(100, 300), 20);
  platform.shapeColor = color(0, 255, 0);
  platform.velocity.x = random(-5, 5);
  platforms.add(platform);
  for (let j = 0; j < 3; j++) {
    let coin = createSprite(random(platform.position.x-platform.width/2+10, platform.position.x+platform.width/2-10), platform.position.y-20, 10, 10);
    coin.shapeColor = color(255, 255, 0);
    coins.add(coin);
  }
}
