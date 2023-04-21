let drawColor = 'black';
let simpSynth, bgSeq, drawSeq;
let bgMelody = ["C4", "D4", "E4", "F4", "G4", "A4"];
let drawMelody = ["F3", "E3", "D3", "C3", "B3", "A3"];

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
  {

if ("serial" in navigator) {
  textAlign(CENTER,CENTER);
  textSize(25);
  }
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

   fill("red");
    cursor = circle(xValue,yValue);
if(isPressedButton==0){
      buttonPressed();
    }
    if (reader && frameCount%3==0) {
      serialRead();
    }

  if(writer&& frameCount%5===0){
    writer.write(encoder.encode(redC+","+greenC+","+blueC+"\n"));
  }
}
//mouseClicked to buttonPressed
function buttonPressed() {
  Tone.context.resume();
  if(xValue < 41)
  {
    if(yValue < 41) 
    {
      drawColor = 'red';
      drawMelody= ["F6","G6"];
    } else if(xValue < 81)
    {
      drawColor = 'orange';
      drawMelody=["F4","G4"];
    } else if(yValue < 121)
    {
      drawColor = 'yellow';
      drawMelody=["F3","G3"];
    } else if(xValue < 161)
    {
      drawColor = 'green';
      drawMelody=["F2","G2"];
    } else if(yValue < 201)
    {
      drawColor = 'cyan';
      drawMelody=["A5","B5"];
    } else if(yValue < 241)
    {
      drawColor = 'blue';
      drawMelody=["A6","B6"];
    } else if(yValue < 281)
    {
      drawColor = 'magenta';
      drawMelody=["A7","B7"];
    } else if(yValue < 321)
    {
      drawColor = 'brown';
      drawMelody=["C5","D5"];
    } else if(yValue < 361)
    {
      drawColor = 'white';
      drawMelody=["C6","D6"];
    } else if(yValue < 401)
    {
      drawColor = 'black';
      drawMelody=["C7","D7"];
    }
    drawSeq.add(0,drawMelody);
  } else {
    fill = drawColor;
    ellipse(xValue, yValue, 1, 1);
  }
}

function mouseDragged() {
  drawSeq.start();
  stroke(drawColor)
  if (xValue > 55 || mouseY > 431) {
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    let temp = splitTokens(value,',');
    xValue = temp[0];
    yValue = temp[1];
    isPressedButton = temp[1];    
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
 