var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,ghostJump,spookySound;
var invisibleBlock, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  //spookySound.loop();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;
  
  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climbersGroup = new Group();

}

function draw() {
  background(200);
  spawndoor();
  if(tower.y > 400)
  {
    tower.y = 300;
  }
  ghost.velocityY += 1;
  if(gameState = "play")
  {
   if(keyDown("UP_ARROW"))
   {
     ghost.velocityY -= 1.2;
     ghost.changeImage(ghostJump);
   }
   if(keyDown("LEFT_ARROW"))
   {
     ghost.x -= 1;
   }
   if(keyDown("RIGHT_ARROW"))
   {
     ghost.x += 1;
   }
   if(ghost.y>600){
     gameState = "end";
   }
  }
  if(gameState === "end"){
    ghost.destroy();
    tower.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    text("Game Over",200,200);
    textSize(20);
    stroke("yellow");
    fill("yellow");
  }
  ghost.collide(invisibleBlockGroup)
  drawSprites();
}
function spawndoor(){
  if(frameCount % 340 == 0){
    var door = createSprite(Math.round(random(80,400)),40,10,10);
    door.addImage("door",doorImg)
    console.log(door.depth);
    var climber = createSprite(door.x,80,10,10);
    climber.addImage("climber",climberImg)
    console.log(door.depth);
    invisibleBlock = createSprite(door.x,90,80,1);
    invisibleBlock.visible = false;
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleBlock.lifetime = 600;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}