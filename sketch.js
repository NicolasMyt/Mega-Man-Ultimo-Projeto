MegaManAnimation = ''
MegaManAnimationTimer = 0
MegaManSpeedY = 0
isOnGround = false
MegaManSpeedX = 0
MegaManLandSoundPlaying = false
MegaManSlideTimer = 0
MegaManDirection = 1
MegaManAnimationName = ''

//Player Sensors
var MegaManMask;
var MegaManSprite;
var MegaManSensorLeft;
var MegaManSensorRight;
var MegaManSensorTop;
var MegaManSensorDown;

var ground;
var BackGroundCollides;
var BackGroundImage;
var Collider;




var ShotTimer = 0

var Bullets;

//Groups
var BulletsGroup;
var Enemys;



function preload(){
  MegaManWalk = loadImage('assets/Mega Man/MegaManWalk.png')
  MegaManWalk2 = loadAnimation('assets/Mega Man/MegaManWalk1.png','assets/Mega Man/MegaManWalk2.png','assets/Mega Man/MegaManWalk3.png','assets/Mega Man/MegaManWalk2.png')
  MegaManIdle = loadAnimation('assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle2.png')
  MegaManJump = loadImage('assets/Mega Man/MegaManJump.png')
  MegaManSlideImage = loadImage('assets/Mega Man/MegaManSlide.png')




  MegaManNBullet = loadImage('assets/Objects/Weapons/NBullet.png')

  MegaManWalkShot = loadImage('assets/Mega Man/MegaManWalkShot.png')
  MegaManWalk2Shot = loadAnimation('assets/Mega Man/MegaManWalk1Shot.png','assets/Mega Man/MegaManWalk2Shot.png','assets/Mega Man/MegaManWalk3Shot.png','assets/Mega Man/MegaManWalk2Shot.png')
  MegaManIdleShot = loadImage('assets/Mega Man/MegaManIdleShot.png')
  MegaManJumpShot = loadImage('assets/Mega Man/MegaManJumpShot.png')
  MegaManSlideImageShot = loadImage('assets/Mega Man/MegaManSlide.png')

  BackGroundImage = loadImage('assets/Background/Background.png')
  BackGroundImage2 = loadImage('assets/Background/BackgroundCollide.png')
  BackGroundCollides = createSprite(0,0)
  BackGroundCollides.addImage(BackGroundImage2,'Image')




  //Load sounds
  MegaManLandSound = loadSound('assets/MegaManSounds/06 - MegamanLand.wav')
  MegaManShotSound = loadSound('assets/MegaManSounds/05 - MegaBuster.wav')

}
function setup() {
  //createCanvas(256,240);
  createCanvas(windowWidth,windowHeight);
  frameRate(60)
  pixelDensity(5)
  
  ground = createSprite(0,300,1280,20)
  ground2 = createSprite(1280,270,1280,20)
  ground3 = createSprite(0,220,1280,20)
  Collider = new Group()
  BulletsGroup = new Group()
  Enemys = new Group()
  Collider.add(ground)
  Collider.add(ground2)
  Collider.add(ground3)


  MegaManMask = createSprite(200,250,15,24)
  MegaManMask.visible = false

  Enemy1 = createSprite(300,250,15,14)

  MegaManSprite = createSprite(200,200)
  MegaManSprite.addImage('Walking',MegaManWalk)
  MegaManSprite.addAnimation('Walking2',MegaManWalk2)
  MegaManSprite.addAnimation('Idle',MegaManIdle)
  MegaManSprite.addImage('Jump',MegaManJump)
  MegaManSprite.addImage('Slide',MegaManSlideImage)

  Bullets = createSprite(MegaManMask.position.x,MegaManMask.position.y)
  Bullets.remove()

  MegaManSprite.addImage('WalkingShot',MegaManWalkShot)
  MegaManSprite.addAnimation('Walking2Shot',MegaManWalk2Shot)
  MegaManSprite.addImage('IdleShot',MegaManIdleShot)
  MegaManSprite.addImage('JumpShot',MegaManJumpShot)

  MegaManSensorLeft = createSprite(MegaManMask.position.x + 9,MegaManMask.position.y,MegaManMask.width/4,MegaManMask.height/1.4)
  MegaManSensorLeft.shapeColor = 'red'
  MegaManSensorLeft.visible = false
  
  MegaManSensorRight = createSprite(MegaManMask.position.x - 9,MegaManMask.position.y,MegaManMask.width/4,MegaManMask.height/1.4)
  MegaManSensorRight.shapeColor = 'blue'
  MegaManSensorRight.visible = false 
  
  MegaManSensorTop = createSprite(MegaManMask.position.x,MegaManMask.position.y - 10,MegaManMask.width,MegaManMask.height/8)
  MegaManSensorTop.shapeColor = 'Yellow'
  MegaManSensorTop.visible = false

  MegaManSensorDown = createSprite(MegaManMask.position.x,MegaManMask.position.y + 10,MegaManMask.width,MegaManMask.height/10)
  MegaManSensorDown.shapeColor = 'Yellow'
  MegaManSensorDown.visible = true

}
function draw(){
  background(0);

  push()
  textAlign(CENTER)
    text('Controls: Z to jump + X to shoot + C to slide', MegaManMask.position.x, MegaManMask.position.y - height/3);
    fill('red')
  pop()



  //Position Sensores and Mega man Sprite
  MegaManMask.position.x =  MegaManMask.position.x
  MegaManMask.position.y = MegaManMask.position.y
   
  MegaManSprite.position.x = MegaManMask.position.x
  MegaManSprite.position.y = MegaManMask.position.y

  MegaManSensorLeft.position.x = floor(MegaManMask.position.x) - 9
  MegaManSensorLeft.position.y = floor(MegaManMask.position.y)

  MegaManSensorRight.position.x = floor(MegaManMask.position.x) + 9
  MegaManSensorRight.position.y = floor(MegaManMask.position.y)

  MegaManSensorTop.position.x = floor(MegaManMask.position.x)
  MegaManSensorTop.position.y = floor(MegaManMask.position.y) - MegaManMask.height/2 - 2

  MegaManSensorDown.position.x = floor(MegaManMask.position.x)
  MegaManSensorDown.position.y = floor(MegaManMask.position.y) + MegaManMask.height/2
  MegaManSensorDown.visible = false


  camera.position.x = MegaManMask.position.x
  camera.position.y = MegaManMask.position.y


  image(BackGroundImage,0,0)

  if(!MegaManMask.isTouching(Collider)){
    isOnGround = false

    MegaManLandSoundPlaying = false
    if(MegaManMask.velocity.y < 4){
      MegaManMask.velocity.y += 0.2
    }
  }
  else{
    if(MegaManMask.isTouching(Collider)){
      isOnGround = true
      MegaManMask.velocity.y = 0
      if (MegaManLandSoundPlaying == false){
        MegaManLandSoundPlaying = true
        MegaManLandSound.play()
      }
    }
  }

  if (MegaManAnimationTimer > 0){
    MegaManAnimationTimer -= 1
    if(!isOnGround){
      MegaManAnimationTimer = -1
    }
  }

  if (MegaManSensorLeft.isTouching(Collider)&& MegaManMask.velocity.x < 0 || MegaManSensorRight.isTouching(Collider) && MegaManMask.velocity.x > 0){
    MegaManMask.velocity.x = 0
  }
  if(MegaManSensorTop.isTouching(Collider) && MegaManMask.velocity.y < 0){
    MegaManMask.velocity.y = 0
  }
  if (MegaManSlideTimer == 0){

    if(keyDown('LEFT_ARROW') && !MegaManSensorLeft.isTouching(Collider)){
      MegaManMask.velocity.x = -2
    }
    if(keyDown('RIGHT_ARROW') && !MegaManSensorRight.isTouching(Collider)){
      MegaManMask.velocity.x = 2
    }
    if(MegaManMask.velocity.x < 0 && !keyDown('LEFT_ARROW') || MegaManMask.velocity.x > 0 && !keyDown('RIGHT_ARROW')){
      MegaManMask.velocity.x = 0
    }
    //Jump
    if (isOnGround == true && !MegaManSensorTop.isTouching(Collider)){
      if(keyWentDown('z') || keyWentDown('UP_ARROW')){

        MegaManMask.velocity.y = -5
      }
    }
  }
  else{
    if (MegaManSlideTimer > 0){
      MegaManSlideTimer -= 1
      MegaManMask.velocity.x = 4 * MegaManDirection
    }
  }

  if (isOnGround == true && MegaManSlideTimer == 0){
    if (!MegaManSensorLeft.isTouching(Collider) && MegaManDirection == -1 || !MegaManSensorRight.isTouching(Collider) && MegaManDirection == 1){
      if(keyWentDown('c') || keyWentDown('down')){
        MegaManSlideTimer = 20
      }
    }
  }
  //cancel slide
  if (MegaManSlideTimer > 0){
    if (isOnGround == false || MegaManSensorLeft.isTouching(Collider) && MegaManDirection == -1 || MegaManSensorRight.isTouching(Collider) && MegaManDirection == 1){
      MegaManSlideTimer = 0
      MegaManMask.velocity.x = 0
    }
  }
  //Shot
  if (ShotTimer == 0){
    if(keyWentDown('x')){
      ShotTimer = 5
      MegaManShotSound.play()
      createBullets(MegaManDirection)
    }
  }
  else{
    if(ShotTimer > 0){
      ShotTimer -= 1
    }
  }
  

  MegaManSprite.mirrorX(MegaManDirection)
  //Animations
  if (MegaManMask.velocity.x < 0){
    MegaManDirection = -1
  }
  if (MegaManMask.velocity.x > 0){
    MegaManDirection = 1
  }
  
  if(isOnGround == false){
    if(ShotTimer == 0){
      MegaManSprite.changeImage('Jump',MegaManJump)
    }
    else{
      MegaManSprite.changeImage('JumpShot',MegaManJumpShot)
    }
    MegaManAnimation = 'Jump'
  }
  else{
    if (MegaManMask.velocity.x == 0){
      if(ShotTimer == 0){
        MegaManSprite.changeAnimation('Idle',MegaManIdle)
      }
      else{
        MegaManSprite.changeAnimation('IdleShot',MegaManIdleShot)
      }
      MegaManAnimation = 'Idle'
    }
    else{

      if(MegaManAnimation != 'Walking' && MegaManAnimation != "Walking2"){
        if(ShotTimer == 0){
          MegaManSprite.changeAnimation('Walking',MegaManWalk)
        }
        else{
          MegaManSprite.changeAnimation('WalkingShot',MegaManWalkShot)
        }
        MegaManAnimation = 'Walking'
        MegaManAnimationTimer = 2
      }

      if(MegaManAnimation == 'Walking' && MegaManAnimationTimer == 0 || MegaManAnimation == 'Walking2'){
        if(ShotTimer == 0){
          MegaManSprite.changeAnimation('Walking2',MegaManWalk2)
        }
        else{
          MegaManSprite.changeAnimation('Walking2Shot',MegaManWalk2Shot)
        }
        MegaManAnimation = 'Walking2'
      }
      if (MegaManSlideTimer > 0){
        MegaManSprite.changeImage('Slide',MegaManSlideImage)
        MegaManAnimation = 'Slide'
      }
    }
  }
  drawSprites();
}


function createBullets(BulletDirection){
  Bullets = createSprite(MegaManMask.position.x + (22 * BulletDirection),MegaManMask.position.y - 2)
  Bullets.addImage('Bullet',MegaManNBullet)
  Bullets.velocity.x = 5 * BulletDirection
  Bullets.mirrorX(BulletDirection)
  BulletsGroup.add(Bullets)
}







