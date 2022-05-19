var car;
var movingRoad;
var wallTop;
var wallBottom;
var traffic1;
var trafficGroup;
var x1 = 0;
var x2;
var scrollSpeed = 30;
let gameState = 'title';
var rolling;
var loadingImage1;
var loadingImage2;

//hello

function preload() {
  mytupi = loadFont('font/mytupiBOLD.ttf');
  menu = loadImage('images/menu.png');
  selection = loadImage('images/selection.png');
  loadingImage1 = loadImage('images/loading001.png');
  loadingImage2 = loadImage('images/loading002.png');
  loadingImage3 = loadImage('images/loading003.png');
  loadingImage4 = loadImage('images/loading004.png');
  ggscreen = loadImage('images/gg.png');
  movingRoad = loadImage('images/road.png');
  bird = loadImage('images/bird.png');
  traffic01 = loadImage('images/traffic01.png');
  traffic02 = loadImage('images/traffic02.png');
  traffic03 = loadImage('images/traffic03.png');
  traffic04 = loadImage('images/traffic04.png');
  traffic05 = loadImage('images/traffic05.png');
  traffic06 = loadImage('images/traffic06.png');
  traffic07 = loadImage('images/traffic07.png');
  rolling = loadAnimation('images/loading001.png', 'images/loading002.png');
  rolling2 = loadAnimation('images/loading003.png', 'images/loading004.png')
  credits = loadImage('images/credits.png');
  select1 = loadSound('sounds/select01.mp3');
  select2 = loadSound('sounds/select02.mp3');
  selectMusic = loadSound('sounds/selectmusic.mp3');
  whiteRev = loadSound('sounds/86rev.mp3');
  redRev = loadSound('sounds/300rev.mp3');
  gameMusic = loadSound('sounds/gamemusic.mp3');
  trafficSound = loadSound('sounds/highwaysound.mp3')
  crashSound = loadSound('sounds/crashsound.mp3');
}

function setup() {
  createCanvas(1280, 960);
  frameRate(60);
  x2 = width;

  //car sprite
  car = createSprite(width / 2, height / 2);
  car.addAnimation('driving', 'images/car001.png', 'images/car002.png');
  car.addAnimation('turnL', 'images/carL001.png', 'images/carL002.png');
  car.addAnimation('turnR', 'images/carR001.png', 'images/carR002.png');
  car.setCollider('rectangle', -513, -5, 225, 100);

  //car sprite 2
  car2 = createSprite(width / 2, height / 2);
  car2.addAnimation('driving2', 'images/car011.png', 'images/car012.png');
  car2.addAnimation('turnL2', 'images/carL011.png', 'images/carL012.png');
  car2.addAnimation('turnR2', 'images/carR011.png', 'images/carR012.png');
  car2.setCollider('rectangle', -513, -5, 225, 100);

  //invis top wall sprite
  wallTop = createSprite(0, 0, 1280, 70);
  wallTop.addAnimation('normal', 'images/inviswall01.png');
  wallTop.setCollider('rectangle', 640, 35, 1280, 70);

  //invis bottom wall sprite
  wallBottom = createSprite(0, 0, 1280, 70);
  wallBottom.addAnimation('normal', 'images/inviswall02.png');
  wallBottom.setCollider('rectangle', 640, 925, 1280, 70);

  //  loadingAnimation = createSprite;

  trafficGroup = new Group();
  score = 0

}


function draw() {
  switch (gameState) {
    case 'title':
      titleScreen();
      break;
    case 'selection':
      selectionScreen();
      break;
    case 'loading':
      loadingScreen();
      break;
    case 'loading2':
      loadingScreen2();
      break;
    case 'game1':
      gameStage1();
      break;
    case 'game2':
      gameStage2();
      break;
    case 'gameover':
      gameOver();
      break;
    case 'credits':
      creditsScreen();
      break;
  }
}

function keyPressed() {
  if (gameState === 'selection') {
    if (key === 'q' || key === 'Q') {
      // game1
      select2.play();
      whiteRev.play();
      gameState = 'loading'
      //value of time in miliseconds
      setTimeout(switchToGame1, 2200)
    } else if (key === 'e' || key === 'E') {
      //game2
      select2.play();
      redRev.play();
      gameState = 'loading2'
      //value of time in miliseconds
      setTimeout(switchToGame2, 2200)
    }
  }
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === 'x' || key === 'X') {
      select1.play();
      selectMusic.play();
      gameState = 'selection';
    }
  }
  if (gameState === 'gameover') {
    if (key === 'c' || key === 'C') {
      select1.play();
      gameState = 'credits'
    }
  }
  if (gameState === 'credits') {
    if (key === 'x' || key === 'X') {
      select1.play();
      gameState = 'title'
    }
  }
}

function titleScreen() {
  crashSound.stop();
  background(220);
  image(menu, 0, 0, 0, 0);
  textAlign(CENTER);
  textSize(55);
  textFont(mytupi);
  stroke(0);
  strokeWeight(6);
  fill(255, 255, 255);
  text('PRESS "X" TO START GAME', width / 2, height / 2.35);
}

function selectionScreen() {
  trafficSound.stop();
  crashSound.stop();
  background(220);
  image(selection, 0, 0, 0, 0);
}

function switchToLoading() {
  gameState = 'loading'
}

function loadingScreen() {
  selectMusic.stop();
  background(220);
  animation(rolling, 640, 480);
}

function loadingScreen2() {
  selectMusic.stop();
  background(220);
  animation(rolling2, 640, 480);
}

function switchToGame1() {
  selectMusic.stop();
  trafficSound.play();
  gameState = 'game1'
  gameMusic.play();
  car.position.x = 680;
  car.position.y = 483;
  car2.position.x = 680;
  car2.position.y = 483;
  score = 0;
}

function switchToGame2() {
  selectMusic.stop();
  trafficSound.play();
  gameState = 'game2'
  gameMusic.play();
  car.position.x = 680;
  car.position.y = 483;
  car2.position.x = 680;
  car2.position.y = 483;
  score = 0;
}

function gameStage1() {
  roadMoving();
  score = score + 1;

  //movement + turning animation
  if (keyDown('w')) {
    car.position.y = car.position.y - 10.5;
    car.changeAnimation('turnL');
  } else if (keyDown('s')) {
    car.position.y = car.position.y + 10.5;
    car.changeAnimation('turnR');
  } else {
    car.changeAnimation('driving')
  }

  //draws all sprites
  drawSprites();

  //removes car2
  car2.visible = false;
  car.visible = true;


  //side barrier death
  if (car.overlap(wallTop))
    die();
  if (car.overlap(wallBottom))
    die();

  for (var i = 0; i < trafficGroup.length; i++)
    if (trafficGroup[i].position.x < car.position.x - width / 0.5) {
      trafficGroup[i].remove()
    }
  if (car.overlap(trafficGroup)) {
    die();
  }
  trafficSpawn();

  push();
  textFont(mytupi);
  textSize(35);
  strokeWeight(2);
  stroke(0);
  fill(255, 255, 0);
  text("SCORE: " + score, 30, 55);
  pop();
}

function gameStage2() {
  roadMoving();
  score = score + 1;

  //movement + turning animation
  if (keyDown('w')) {
    car2.position.y = car2.position.y - 10.5;
    car2.changeAnimation('turnL2');
  } else if (keyDown('s')) {
    car2.position.y = car2.position.y + 10.5;
    car2.changeAnimation('turnR2');
  } else {
    car2.changeAnimation('driving2')
  }

  //draws all sprites
  drawSprites();

  //removes car
  car.visible = false;
  car2.visible = true;

  //side barrier death
  if (car2.overlap(wallTop))
    die();
  if (car2.overlap(wallBottom))
    die();

  for (var i = 0; i < trafficGroup.length; i++)
    if (trafficGroup[i].position.x < car2.position.x - width / 0.5) {
      trafficGroup[i].remove()
    }
  if (car2.overlap(trafficGroup)) {
    die();
  }
  trafficSpawn();

  push();
  textFont(mytupi);
  textSize(35);
  strokeWeight(2);
  stroke(0);
  fill(255, 255, 0);
  text("SCORE: " + score, 30, 55);
  pop();
}

function trafficSpawn() {
  //traffic1
  if (frameCount % 600 === 60) {
    var traffic1 = createSprite(1500, 170, 0, 0);
    traffic1.setCollider('rectangle', 0, 0, 220, 90);
    traffic1.addImage(traffic01);
    traffic1.lifetime = 200;
    trafficGroup.add(traffic1);
    traffic1.velocity.x = -(10 + 0.5 * score / 100);
  }
  //traffic2
  if (frameCount % 900 === 120) {
    var traffic2 = createSprite(1900, 325, 0, 0)
    traffic2.setCollider('rectangle', 0, -1, 215, 90);
    traffic2.addImage(traffic02);
    traffic2.lifetime = 200;
    trafficGroup.add(traffic2);
    traffic2.velocity.x = -(10 + 0.6 * score / 100);
  }
  //traffic3
  if (frameCount % 500 === 900) {
    var traffic3 = createSprite(1500, 785, 0, 0)
    traffic3.setCollider('rectangle', 0, -1, 215, 90);
    traffic3.addImage(traffic03);
    traffic3.lifetime = 200;
    trafficGroup.add(traffic3);
    traffic3.velocity.x = -(10 + 0.6 * score / 100);
  }
  //traffic4
  if (frameCount % 400 === 100) {
    var traffic4 = createSprite(1400, 630, 0, 0)
    traffic4.setCollider('rectangle', 0, 0, 267, 125);
    traffic4.addImage(traffic04);
    traffic4.lifetime = 200;
    trafficGroup.add(traffic4);
    traffic4.velocity.x = -(10 + 0.35 * score / 100);
  }
  //traffic5
  if (frameCount % 400 === 30) {
    var traffic5 = createSprite(1500, 630, 0, 0)
    traffic5.setCollider('rectangle', 0, 0, 267, 125);
    traffic5.addImage(traffic05);
    traffic5.lifetime = 200;
    trafficGroup.add(traffic5);
    traffic5.velocity.x = -(10 + 0.45 * score / 100);
  }
  //traffic6
  if (frameCount % 1000 === 150) {
    var traffic6 = createSprite(1500, 480, 0, 0)
    traffic6.setCollider('rectangle', 0, 0, 267, 125);
    traffic6.addImage(traffic06);
    traffic6.lifetime = 200;
    trafficGroup.add(traffic6);
    traffic6.velocity.x = -(10 + 0.45 * score / 100);
  }
  //traffic7
  if (frameCount % 770 === 110) {
    var traffic7 = createSprite(1450, 478, 0, 0)
    traffic7.setCollider('rectangle', 0, 0, 325, 135);
    traffic7.debug = mouseIsPressed;
    traffic7.addImage(traffic07);
    traffic7.lifetime = 200;
    trafficGroup.add(traffic7);
    traffic7.velocity.x = -(10 + 0.3 * score / 100);
  }
  //traffic8
  if (frameCount % 1700 === 1000) {
    var traffic8 = createSprite(1400, 478, 0, 0)
    traffic8.setCollider('rectangle', 0, 0, 325, 135);
    traffic8.debug = mouseIsPressed;
    traffic8.addImage(traffic03);
    traffic8.lifetime = 200;
    trafficGroup.add(traffic8);
    traffic8.velocity.x = -(10 + 0.6 * score / 100);
  }
  //traffic9
  if (frameCount % 900 === 320) {
    var traffic9 = createSprite(1800, 785, 0, 0)
    traffic9.setCollider('rectangle', 0, 0, 267, 125);
    traffic9.debug = mouseIsPressed;
    traffic9.addImage(traffic04);
    traffic9.lifetime = 200;
    trafficGroup.add(traffic9);
    traffic9.velocity.x = -(10 + 0.4 * score / 100);
  }
  //traffic10
  if (frameCount % 1000 === 250) {
    var traffic10 = createSprite(1500, 325, 0, 0)
    traffic10.setCollider('rectangle', 0, 0, 267, 125);
    traffic10.addImage(traffic06);
    traffic10.lifetime = 200;
    trafficGroup.add(traffic10);
    traffic10.velocity.x = -(10 + 0.5 * score / 100);
  }
}

function gameOver() {
  background(200);
  image(ggscreen, 0, 0, 0, 0);
  trafficGroup.removeSprites();
  textAlign(CENTER);
  textSize(55);
  textFont(mytupi);
  stroke(0);
  strokeWeight(6);
  fill(255, 10, 10);
  text("YOUR SCORE WAS " + score, width / 2, height / 1.55);
  text('PRESS "X" TO RESTART', width / 2, height / 1.3);
  push();
  textAlign(CENTER);
  textSize(25);
  textFont(mytupi);
  stroke(50);
  strokeWeight(5);
  fill(145, 145, 145);
  text('PRESS "C" TO VIEW CREDITS', width / 2, height / 1.12);
  pop();
}

function creditsScreen() {
  trafficSound.stop();
  crashSound.stop();
  image(credits, 0, 0, 0, 0);
}

//infinitely scrolling background
function roadMoving() {
  image(movingRoad, x1, 0, width + 12, height);
  image(movingRoad, x2, 0, width + 12, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }
}

function die() {
  gameMusic.stop();
  trafficSound.stop();
  crashSound.play();
  gameState = 'gameover'
}
