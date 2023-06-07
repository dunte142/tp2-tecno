//---SONIDO CONFIG---------------------------------------------------------------------------1--------------------
let AMP_MAX= 0.1;
let AMP_MIN= 0.02;


//ENTRADA DE AUDIO
let mic;

//AMPLITUD
let amp;
let haySonido = false;


let x , y, mov
let figura,fondo 


let obra = {
  img : 0,
  x : 250,
  y : 250,
  ancho : 480,
  alto : 480,
}

function preload(){
  figura = loadImage('img/obra armada tecno.png')
  fondo = loadImage('img/fondo1.jpg')

}

function setup() {
  createCanvas(1000,1000);
  obra.img = figura;
  push()
  imageMode(CORNER)
  image(fondo,0,0,windowWidth,windowHeight)
  pop()
  imageMode(CENTER)
  mov=0
  mic = new p5.AudioIn();
  mic.start();


}

function draw() {
  haySonido = amp > AMP_MIN;
  AntesHabiaSonido = haySonido;
  amp = mic.getLevel();

  let x = height - amp * height;
  
  if(haySonido == false){
  push()
  imageMode(CORNER)
  image(fondo,0,0,windowWidth,windowHeight)
  pop()
  }

  if(haySonido){

      
    push() //superior izquierdo
    translate(250,250)
    rotate(radians(-x))
    
    image(obra.img , 0+mov, 0, obra.ancho , obra.alto)
    pop()
  

  push() //inferior izquierdo
    translate(250,750)
    rotate(radians(x));
    image(obra.img , 0+mov, 0 , obra.ancho , obra.alto)
  pop()






  push()//superior derecho
    translate(width-250,height/4)
    rotate(radians(-x));
    image(obra.img , 0-mov, 0 , obra.ancho , obra.alto)
  pop()


  push()//inferior derecho
    translate(width-250,height-250)
    rotate(radians(x));
    image(obra.img , 0-mov, 0 , obra.ancho , obra.alto)
  pop()

   

   }




 




}




  /*
                push()//medio superior 
                  translate(windowWidth/2,windowHeight/2-200)
                  rotate(radians(mouseX));
                  image(obra.img , 0, 0 , obra.ancho , obra.alto)
                pop()

                push()//medio inferior 
                  translate(windowWidth/2,windowHeight/2+300)
                  rotate(radians(mouseX));
                  image(obra.img , 0, 0 , obra.ancho , obra.alto)
                pop()
      
  */






