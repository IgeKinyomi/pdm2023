let port;
let writer, reader;
let slider; 

function setup() {
  createCanvas(400, 400);

  

  if ("serial" in navigator) {
    // The Web Serial API is supported.
    let button = createButton("connect");
    button.position(0,0);
    button.mousePressed(connect);

    slider = createSlider(0, 255, 127);
    slider.position(10,50);
    slider.style('width', '100px'); 
  }
}

function draw() {
  background(220);

  if(writer) {
writer.write(new Uint8Array([slider.value(),"\n"]))
  }
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });
}

