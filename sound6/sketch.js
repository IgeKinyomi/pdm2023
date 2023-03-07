// Set up Tone
let nxDial,nxButton; 

// fourth sound assignment, bug squish or paint app and add music sound effects
// Tone.Transport.stop() in console lets you test 
//Tone.Transport.bpm.value  or Tone.transport.bpm(400,0) - and ex
let synth = newTone.PolySynth().toDestination();

let pattern = newTone.Pattern(function (time,note) {
  synth.triggerAttackRelease(note, 0.25, time);
}, ['C4','D4','E4','F4','G4','A4']);

const synthA new.Tone
const synthB
function setup() {.toDes
  createCanvas(400, 400);
}

function draw() {
  background(220);

 if ((frameCount % 60) === 0) {
  pitch = random(300, 1000);
}

  text('press spacebar to initialize audio!', 100, 100);

}

function keyPressed(){
if (keyCode == 32 && initTone === true) {
  console.log('spacebar pressed'); 
  Tone.start();
  initTone = false;
  }
}


//oscillators are always on
function mousePressed() {
  console.log('pressed');
  ampEnv.triggerAttackRelease('4n');
osc.frequency.setValueAtTime(pitch+200, '+1');
ampEnv.triggerAttackRelease('4n', '+1');

if (mouseY >200) {
  noiseEnv.triggerAttackRelease(0.5);
  }
}