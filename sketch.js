var mario,mario_running,mario_collided;
var ground,grounImage;
var invisibleGround;
var bg;
var brick,brickImage,bricksGroup;
var score = 0,life = 3
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,
    obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImage,restartImage,restart;

function preload(){
 mario_running = loadAnimation("mario00.png","mario01.png","mario02.png");
  
  groundImage = 
    loadImage("ground2.png");
  
  bg = loadImage("bg.jpg"); 
  
  brickImage = loadImage("brick.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
  mario_collided = loadImage("mario03.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
}
function setup(){
  createCanvas(600,350);
  mario = createSprite(50,295,20,50);
  mario.addAnimation("running",mario_running);
  mario.addImage("collided",mario_collided);
  mario.scale = 1.5;
  
  ground = createSprite(300,330,600,20);
  ground.addImage("ground",groundImage);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  

  
 invisibleGround = createSprite(300,300,600,10);
  invisibleGround.visible = false;
  bricksGroup = createGroup();
  obstaclesGroup = createGroup();
}
function draw(){
  background(bg);
  textSize(18);
  fill(0);
  text("Score : " +score,490,30);
  text("Life : " +life,490,50);
  if(gameState === PLAY){
    
    mario.changeAnimation("running",mario_running)
    
if(keyDown("space") && mario.y > 250 ){
  mario.velocityY = -12;      
}
  mario.velocityY = mario.velocityY +0.8;
    
  ground.velocityX = -6;
  if(ground.x < 0){
    ground.x = ground.width / 2 ;
  }
  mario.collide(invisibleGround);
  spawnBricks();
  for(var i = 0; i< bricksGroup.length;i++){
    if(bricksGroup.get(i).isTouching(mario)){
      bricksGroup.get(i).remove();
      score = score+1;
      
    }
  }
  spawnObstacles();
  for(var i = 0; i< obstaclesGroup.length;i++){
   if(obstaclesGroup.get(i).isTouching(mario)){
     obstaclesGroup.get(i).remove();
     life = life-1;
   } 
    
  }
    if(life === 0){
      gameState = END;
    }
  }//end of PLAY if
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
 
   mario.changeImage("collided",mario_collided);
    ground.velocityX = 0;
    mario.velocityY = 0;
    bricksGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    bricksGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }      
  }//end of END if
  drawSprites();
  
   
}

function spawnBricks(){
  
  if(frameCount%60 === 0){
    brick = createSprite(600,120,30,10);
    brick.addImage("brick",brickImage);
    brick.velocityX = -5;
    brick.y = Math.round(random(120,160));             brick.lifetime = 200;
    mario.depth = brick.depth+1;
    bricksGroup.add(brick);
  }
}

function spawnObstacles(){
 
  if(frameCount%60 === 0){
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    obstacle.y = Math.round(random(130,200));
    var ran_no = Math.round(random(1,4));
    switch (ran_no){
      case 1 : obstacle.addImage(obstacle1);
               break;
      case 2 : obstacle.addImage(obstacle2);
               break;
      case 3 : obstacle.addImage(obstacle3);
               break;         
      case 4 : obstacle.addImage(obstacle4);
               break;      
    } 
    obstacle.scale = 0.7;
    obstacle.lifetime = 300
    mario.depth = obstacle.depth+1
    obstaclesGroup.add(obstacle)
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  
  score = 0;
  life = 3;
}