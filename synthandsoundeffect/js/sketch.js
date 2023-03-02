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
const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
synth.connect(chorus); 
drum.connect(chorus);
metal.connect(chorus);
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
  slider = new Nexus.Slider('#slider' ,{
'size':[150,40] ,
'min': 0.1 ,
'max': 1 ,
'step': 0.1   
  });

  synth.release = 2;
  synth.resonance = 0.98;
//synth.harmonicity.value = 1.25
//play middle 'C' for duration of 8th note
synth.triggerAttackRelease("C4", "8n");
//delays the time in ms of chorus
slider.on('change', (v) =>{
 chorus.delayTime.value = v
})
}

//Don't put sounds in the draw function, it will make it weird
function draw() {
  background(254,216,177);
  text('Press keys (a-k) on your keyboard to create sounds!', 0, 200)
}

//console.log toPlay
function keyPressed(){
  Tone.start();
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay,0.5);
  metal.triggerAttackRelease("C3","8n",'+0.5' );
  drum.triggerAttackRelease("C2","8n", '+1' );
  
}



// put .value with param or signal 
//harmonicity 
// volume 