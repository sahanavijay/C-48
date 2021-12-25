var ground;
var lander,lander_img;
var bg_img;
var thrust,crash,land;
var rcs_left;
var rcs_right;
//create variable for obstacle & obstacleimage
var obstacle, obstacleimage;
//create variable for lz image
var lz_image,lz
var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;
var timer;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash= loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("landing1.png" ,"landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  normal = loadAnimation("normal.png");
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");

  //Load animation of obstacle & lzimage
  obstacleimage = loadImage("obstacle.png");
  lz_image = loadImage("lz.png");
  thrust.playing= true;
  thrust.looping= false;
  land.looping = false;
  crash.looping = false; 
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup() 
{
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;

  thrust.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  rcs_left.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200)

  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('crashing',crash);
  lander.addAnimation('landing',land);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right',rcs_right);
  ground = createSprite(500,690,1000,20);

  //Create sprite for obstacle,add image, scale it,set the collider
  obstacle = createSprite(320,530,50,100);
  obstacle.addImage(obstacleimage);
  obstacle.scale=0.5;
  obstacle.setCollider("rectangle",0,100,300,300); 
  //create sprite for lz,add image,scale it & set the collider
  lz = createSprite(880,610,50,30);
  lz.addImage(lz_image);
  lz.scale=0.3;
  lz.setCollider("rectangle",0,180,400,100);

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Horizontal Velocity: " +round(vx,2),800,50);
  text("Fuel: "+fuel,800,25);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();

  vy +=g;
  lander.position.y+=vy;
  lander.position.x +=vx;

  //Write instruction if lander collide obstacle it should change animation
  if(lander.collide(obstacle)===true)
  {
    lander.changeAnimation('crashing');
    stop();
  }

  //write instruction to detect landing;
  var d=dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
  console.log(d);
  if(d<=35&&(vy<2&&vy>-2)&&(vx<2&&vx>-2))
  {
    console.log("landed");
    vx=0;
    vy=0;
    g=0;
    lander.changeAnimation('landing');
  }
  //Write instruction if lander collide ground it should change animation
  if(lander.collide(ground)===true)
  {
    console.log("collided");
    vx=0;
    vy=0;
    g=0;
  }
  
   

  drawSprites();
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx += 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx -= 0.2;
  fuel-=1;
}
//Create a function stop
function stop()
{
  vx=0;
  vy=0;
  g=0;
  fuel=0;
}