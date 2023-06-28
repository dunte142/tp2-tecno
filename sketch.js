//----CONFIGURACION-----
let AMP_MAX = 0.2;
let AMP_MIN = 0.02;

let AMORTIGUACION = 0.9; // factor de amortiguación de la señal

let mic;
let amp;
let haySonido = false;


let figura, fondo;
let figuraEspejada;

let obraT;

//----GESTOR----
let gestorAmp;

let obra = {
  img: 0,
  ancho: 500,
  alto: 500,
};

let graf1,graf2,graf3,graf4;

function preload() {
  figura = loadImage('img/obra armada tecno.png');
  fondo = loadImage('img/fondo1.jpg');
}

function setup() {
  createCanvas(1000, 1000);

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX); // inicilizo en goestor con los umbrales mínimo y máximo de la señal
  gestorAmp.f = AMORTIGUACION;

   //------MOTOR DE AUDIO-----
   userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  //obra.img = figura;
  imageMode(CENTER);


  mic = new p5.AudioIn();
  mic.start();

  figuraEspejada = createGraphics(figura.width,figura.height);
//figuraEspejada.begin();
figuraEspejada.background(255,0,0);
figuraEspejada.imageMode(CENTER);
figuraEspejada.push();
figuraEspejada.translate(figura.width/4,figura.height/4);
figuraEspejada.image(figura,0,0,figura.width/2,figura.height/2);
figuraEspejada.pop();
figuraEspejada.push();
figuraEspejada.translate(figura.width-figura.width/4,figura.height/4);
figuraEspejada.scale(-1,1);
figuraEspejada.image(figura,0,0,figura.width/2,figura.height/2);
figuraEspejada.pop();
figuraEspejada.push();
figuraEspejada.translate(figura.width-figura.width/4,figura.height-figura.height/4);
figuraEspejada.scale(-1,-1);
figuraEspejada.image(figura,0,0,figura.width/2,figura.height/2);
figuraEspejada.pop();
figuraEspejada.push();
figuraEspejada.translate(figura.width/4,figura.height-figura.height/4);
figuraEspejada.scale(1,-1);
figuraEspejada.image(figura,0,0,figura.width/2,figura.height/2);
figuraEspejada.pop();
obra.img = figuraEspejada;
  obraT = createGraphics(width, height);
  
 graf1=createGraphics(width/2,height/2);
 graf1.imageMode(CENTER);
 graf2=createGraphics(width/2,height/2);
 graf2.imageMode(CENTER);
 graf3=createGraphics(width/2,height/2);
 graf3.imageMode(CENTER);
 graf4=createGraphics(width/2,height/2);
 graf4.imageMode(CENTER);
}

let ampTest = 0;
let frecTest = 0;

function draw() {
  background(255);


  gestorAmp.actualizar(mic.getLevel());  
  amp = gestorAmp.filtrada;
  haySonido = amp > AMP_MIN;



  // Efecto de caleidoscopio
  //let t = map(amp, 0, 1, -PI, PI); // Mapea la amplitud al rango del ángulo de rotación

  if(haySonido){  // ESTADO
    ampTest = sin(frameCount*0.1);
    frecTest = sin(amp*frameCount*0.009);
  }

 
  
  

  let t = frecTest*PI;
  let factorEscala = map(ampTest,-1,1,1.3,2);
  // Caleidoscopio superior izquierdo
  graf1.push();
  graf1.translate(width / 4, height / 4);
  graf1.rotate(t);
  graf1.image(obra.img, 0, 0, obra.ancho*factorEscala, obra.alto*factorEscala);
  graf1.pop();

  // Caleidoscopio superior derecho
  graf2.push();
  graf2.translate(width / 4, height / 4);
  graf2.rotate(-t);
  graf2.image(obra.img, 0, 0, obra.ancho*factorEscala, obra.alto*factorEscala);
  graf2.pop();

  // Caleidoscopio inferior izquierdo
  graf3.push();
  graf3.translate(width / 4, height / 4);
  graf3.rotate(-t);
  graf3.image(obra.img, 0, 0, obra.ancho*factorEscala, obra.alto*factorEscala);
  graf3.pop();

  // Caleidoscopio inferior derecho
  graf4.push();
  graf4.translate(width / 4, height / 4);
  graf4.rotate(t);
  graf4.image(obra.img, 0, 0, obra.ancho*factorEscala, obra.alto*factorEscala);
  graf4.pop();

  image(graf1,width / 4, height / 4);
  image(graf2,width-width / 4, height / 4);
  image(graf3,width / 4, height-height / 4);
  image(graf4,width-width / 4, height-height / 4);
  // Control de movimiento horizontal
  mov = map(mouseX, 0, width, -50, 50);

  // Control de tamaño basado en la amplitud
  let tam = map(amp, 0, 1, 0.5, 2);
  //image(obra.img, width / 2, height / 2, obra.ancho * tam, obra.alto * tam);
  
}








 

