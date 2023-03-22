let drawColor = 'black';
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
    Tone.Transport.bpm.value = 90;
    Tone.Transport.start();
  }

    
function draw() {
    
}

function mouseClicked() {
  Tone.context.resume();
  if(mouseX < 41)
  {
    if(mouseY < 41) 
    {
      drawColor = 'red';
      drawMelody= ["F6","G6"];
    } else if(mouseY < 81)
    {
      drawColor = 'orange';
      drawMelody=["F4","G4"];
    } else if(mouseY < 121)
    {
      drawColor = 'yellow';
      drawMelody=["F3","G3"];
    } else if(mouseY < 161)
    {
      drawColor = 'green';
      drawMelody=["F2","G2"];
    } else if(mouseY < 201)
    {
      drawColor = 'cyan';
      drawMelody=["A5","B5"];
    } else if(mouseY < 241)
    {
      drawColor = 'blue';
      drawMelody=["A6","B6"];
    } else if(mouseY < 281)
    {
      drawColor = 'magenta';
      drawMelody=["A7","B7"];
    } else if(mouseY < 321)
    {
      drawColor = 'brown';
      drawMelody=["C5","D5"];
    } else if(mouseY < 361)
    {
      drawColor = 'white';
      drawMelody=["C6","D6"];
    } else if(mouseY < 401)
    {
      drawColor = 'black';
      drawMelody=["C7","D7"];
    }
    drawSeq.add(0,drawMelody);
  } else {
    fill = drawColor;
    ellipse(mouseX, mouseY, 1, 1);
  }
}

function mouseDragged() {
  drawSeq.start();
  stroke(drawColor)
  if (mouseX > 55 || mouseY > 431) {
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

 