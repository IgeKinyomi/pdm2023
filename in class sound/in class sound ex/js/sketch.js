const synth = new Tone.Synth():
// code base
//Key notes connecting with keyboard letters as a piano
let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
  
}

function setup() {
  createCanvas(400, 400);
  synth.toDestination();
}

function mousePressed() {
  Tone.start();
}


//Don't put sounds in the draw function, it will make it weird
function draw() {
  background(220);
}
functionkeyPressed(){
  let whatNote = notes[key]

  //console.log whatNot
synth.triggerAttackRelease(whatNote, "8n")  
}


// put .value with param or signal 
//harmonicity 
// volume 