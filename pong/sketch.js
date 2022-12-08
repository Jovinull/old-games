// Variaveis da Bola
let xBall = 300;
let yBall = 200;
let diameter = 25;
let ray = diameter / 2;

// Variaveis da Velocidade da Bola
let ballSpeedX = 6;
let ballSpeedY = 6;

// Sons
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  
} // preload

// Placar
let myPoints = 0;
let opponentPoints = 0;

// Variaveis da Raquete
let xRacket = 5;
let yRacket = 150;
let weidtRacket = 10;
let heigthRacket = 90;
let collide = false;

// Variaveis do Oponente
let xRacketOpponent = 585;
let yRacketOpponent = 150;
let opponentSpeedY;
let chanceErrar = 0;

// Criação da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop();
} // setup

// A função principal, tudo que vai ser executado deve está aqui dentro
function draw() {
  background(0);
  drawBall();
  moveBall();
  edgeContact();
  drawRacket(xRacket, yRacket);
  drawRacket(xRacketOpponent, yRacketOpponent);
  moveRacket();
  moveRacketOpponent();
  //contactRacket();
  libContactRacket(xRacket, yRacket);
  libContactRacket(xRacketOpponent, yRacketOpponent);
  includePoints();
  //moveOpponentRacketMultplayer();
  markPoints();
  bolinhaNaoFicaPresa();
  
} // draw
  
function drawBall() {
  circle(xBall, yBall, diameter);
  
} // drawlBall

function moveBall() {
  xBall += ballSpeedX;
  yBall += ballSpeedY;
  
} // moveBall

function edgeContact() {
  if (xBall + ray > width || xBall - ray < 0) {
    ballSpeedX *= -1;
    
  }
  
  if (yBall + ray > height || yBall - ray < 0) {
    ballSpeedY *= -1;
    
  }
  
} // edgeContact

function drawRacket(x, y) {
 rect(x, y, weidtRacket, heigthRacket);
  
} // drawRacket

function moveRacket() {
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 10;
    
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 10;
    
  }
} // moveRacket

function moveRacketOpponent() {
  opponentSpeedY = yBall - yRacketOpponent - weidtRacket / 2 - 30;
  yRacketOpponent += opponentSpeedY - chanceErrar;
  calculaChanceErrar();
  
} // moveRacketOpponent

function calculaChanceErrar() {
  if (opponentPoints >= myPoints) {
    chanceErrar += 1
    if (chanceErrar >= 39){
    chanceErrar = 40
    }
  } else {
    chanceErrar -= 1
    if (chanceErrar <= 35){
    chanceErrar = 35
    }
  }
} // calculaChanceErrar

function contactRacket() {
  if (xBall - ray < xRacket + weidtRacket &&
      yBall - ray < yRacket + heigthRacket &&
      yBall + ray > yRacket) {
    
    ballSpeedX *= -1;
    raquetada.play();
    
  }
} //contactRacket

function libContactRacket(x, y) {
  collide = collideRectCircle(x, y, weidtRacket, 
                              heigthRacket, xBall, yBall, ray);
  if (collide) {
    ballSpeedX *= -1;
    raquetada.play();
    
  }
} // libRacketContact

function includePoints() {
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(255, 140, 0);
  rect(150, 10, 40, 20);
  fill(255);
  text(myPoints, 170, 26);
  fill(255, 140, 0);
  rect(450, 10, 40, 20);
  fill(255);
  text(opponentPoints, 470, 26);
  
} // includePoints

function markPoints() {
  if (xBall > 585) {
    myPoints += 1;
    ponto.play();
    
  }
  
  if (xBall < 15) {
    opponentPoints += 1;
    ponto.play();
    
  }
} // points


function bolinhaNaoFicaPresa(){
    if (xBall - ray < 0) {
      xBall = 23;
      
    }
}


function moveOpponentRacketMultplayer() {
  if (keyIsDown(87)) {
    yRacketOpponent -= 10;
    
  }
  
  if (keyIsDown(83)) {
    yRacketOpponent += 10;
    
  }
} // moveOpponentRacket