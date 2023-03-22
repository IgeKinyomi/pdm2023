let drawColor;
let clickNoise, simpSynth, bgSeq, drawseq;
let bgSound = ["G4", "B4", "D4", "F4", "G4", "D5"];
let drawSound = ["D4", "F5", "A5", "C4", "D4", "A4"];

function preload() {
  clickNoise = new Tone.Player('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2034654/Water%2BBlip.mp3').toMaster();

simpSynth = new Tone.Synth({
    oscillator: {
      type: "triangle"
    },
    envelope: {
      attack: 0.8,
      decay: 0.1,
      sustain: 2.5,
      release: 1.5
    }
  }).toMaster();

  bgSeq = new Tone.Sequence(function(time, note) {
    simpSynth.triggerAttackRelease(note, 0.5);
    console.log(note);
  }, bgSound, '4n');

  drawSeq = new Tone.Sequence(function(time, note) {
    simpSynth.triggerAttackRelease(note, 0.5);
    console.log(note);
  }, drawMelody, '4n');

  Tone.Transport.bpm.value = 90;
  Tone.Transport.start();
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(240, 240, 240);
    bgMus();
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
  for (let i = 0; i < colorPallet.length; i++) {
    noStroke();
    fill(colorPallet[i]);
    if (i === 7) {
      strokeWeight(1);
      stroke(0);
    }
    rect(0, (i * 50), 50, 50);
  }
  stroke(colorChoice);
  strokeWeight(10);
  if (mouseIsPressed) {
    if (mouseX > 50) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}
  
// changes color
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
  colorPick();
  if (mouseX > 51) {
    drawMus();
  }
}

function mouseReleased() {
  bgMus();
  }
  
  function drawMus() {
    bgSeq.stop();
    drawSeq.start();
  }
  
  function bgMus() {
    drawSeq.stop();
    bgSeq.start();
  }
  
  function colorPick() {
    if (mouseX < 50 && mouseY < 400) {
      clickNoise.start();
      console.log('click!');
  
      if (mouseY < 50) {
        colorChoice = 'black';
        console.log('color changed to ' + colorChoice);
      } else if (mouseY > 50 && mouseY < 100) {
        colorChoice = 'red';
        console.log('color changed to ' + colorChoice);
      } else if (mouseY > 100 && mouseY < 150) {
        colorChoice = 'green';
        console.log('color changed to ' + colorChoice);
      } else if (mouseY > 150 && mouseY < 200) {
        colorChoice = 'blue';
        console.log('color changed to ' + colorChoice);
      } else if (mouseY > 200 && mouseY < 250) {
        colorChoice = 'yellow';
        console.log('color changed to ' + colorChoice);
      } else if (mouseY > 250 && mouseY < 300) {
        colorChoice = 'orange';
        console.log('color changed to ' + colorChoice);
      } else if (mouseY > 300 && mouseY < 350) {
        colorChoice = 'purple';
        console.log('color changed to ' + colorChoice);
      } else if (mouseY > 350 && mouseY < 400) {
        colorChoice = 'white';
        console.log('color changed to ' + colorChoice);
      }
    }
  }
// add sound here?
function mouseDragged() {
  stroke(drawColor)
  if (mouseX > 55 || mouseY > 431) {
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
//put sound triggers instead of buttons 
function mousePressed() {
  console.log('pressed');
  ampEnv.triggerAttackRelease('4n');
osc.frequency.setValueAtTime(pitch+200, '+1');
ampEnv.triggerAttackRelease('4n', '+1');

if (mouseY >200) {
  noiseEnv.triggerAttackRelease(0.5);
  }
}

 