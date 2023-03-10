//Ige Kinyomi Build a Sampler 2023

let sounds = new Tone.Players({

  "cheer": "sounds/cheer.mp3",
  "clap": "sounds/clap.mp3",
  "jolly": "sounds/jolly.mp3",
  "drop": "sounds/water.mp3"

})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["cheer", "clap", "jolly", "drop"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;


function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index*50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })


}

function draw() {
  background(224, 176, 255);
  text('Press each button for sound and slide the bars below.', 0, 200)

}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}