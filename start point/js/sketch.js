let initTone = true;
let pitch 

// Set up Tone
let osc = new Tone.AMOscillator(600, 'sine', 'sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);


let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(gain);

//noise, filter, envelope
let noiseFilter = new Tone.Filter(800,'lowpass').connect(noiseEnv);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

 if (frameCount % 60)
  text('press spacebar to initialize audio!', 100, 200);
}

function keyPressed(){
if (keyCode == 32 && initTone === true){
  console.log('spacebar pressed'); 
  Tone.start();
  initTone = false;
}
}


//oscillators are always on
function mousePressed() {
  console.log('pressed');
  ampEnv.triggerAttackRelease(0.5);
osc.frequency.setValueAtTime(pitch+200, '+1');
ampEnv.triggerAttackRelease('4n', '+1');

if (mouseY >200)
}