var towerImage,tower;
var doorImage,door;
var doorsGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var gameState="play"
function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300)
  tower.addImage("tower",towerImage);
  tower.velocityY=3;
  doorsGroup= new Group();
  climberGroup= new Group();
  invisibleBlockGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.5;
}
function draw(){
  background("white")
  if(gameState === "play" ){
    if(tower.y >400){
     tower.y=300;
     }
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-3
     }
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+3
     }
if(keyDown("space")){
   ghost.velocityY=-3;
   }
  ghost.velocityY=ghost.velocityY+0.8
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
   ghost.destroy();
  gameState="end";
   }
  spawndoors();
  drawSprites();
  }
  if(gameState==="end"){
    stroke("blue");
    fill("red");
    textSize(30);
    text("Game Over",230,250);
  }
}
function spawndoors(){
  if(frameCount %160===0){
    var door=createSprite(200,-50);
    door.addImage(doorImage);
    door.x=Math.round(random(120,400));
    door.velocityY=7;
    door.lifetime=800;
    doorsGroup.add(door);
    var climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.x=door.x;
    climber.velocityY=2;
    climber.lifetime=800;
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth+=1;
  var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}