let slider;

const synth = new Tone.Synth();
const drum = new Tone.MembraneSynth();
const metal = new Tone.MetalSynth({
  "frequency" : 45 ,
  "envelope" : {
    "attack" : 0.001 ,
    "decay" : 0.4 ,
    "release" :0.2
  } ,
  "harmonicity" : 8.5 ,
  "modulationIndex" : 40 ,
  "resonance" : 300 ,
  "octaves" : 1.5
});
const reverb = new Tone.JCReverb(0.4).toDestination();
synth.connect(reverb); 
drum.connect(reverb);
metal.connect(reverb);
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

  slider = new Nexus.Slider('#slider');
  synth.release = 2;
  synth.resonance = 0.98;
//synth.harmonicity.value = 1.25
//play middle 'C' for duration of 8th note
synth.triggerAttackRelease("C4", "8n");
//change value of reverb room size
slider.on('change', (v) => {
  reverb.roomSize.value = v;
})
}

//Don't put sounds in the draw function, it will make it weird
function draw() {
  background(200);
}
//console.log toPlay
functionkeyPressed(){
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay,0.5);
  metal.triggerAttackRelease("C3","8n",'+0.5' );
  drum.triggerAttackRelease("C2","8n", '+1' );
}


// put .value with param or signal 
//harmonicity 
// volume 