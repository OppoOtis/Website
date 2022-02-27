class Player{
    constructor(width, height,color,x,y,xVelocity,yVelocity){
        this.width = width
        this.height = height
        this.color = color
        this.x = x
        this.y = y
        this.xVelocity = xVelocity
        this.yVelocity = yVelocity
    }

    draw(){
        c.beginPath()
        c.rect(this.x,this.y,this.width,this.height)
        c.fillStyle = this.color
        c.fill()
    }

    update(){
        playerPhysics()
        subStates.colliding = false;
        subStates.collisionDirection.top = false;
        subStates.collisionDirection.bottom = false;
        subStates.collisionDirection.left = false;
        subStates.collisionDirection.right = false;
        subStates.isGround = false;
        subStates.isClimbable = false;
        subStates.isLiquid = false;
        subStates.isSlippery = false;
        subStates.onlyLiquid = 0;
        for (let i = 0; i < walkableCollidersArray.length; i++) {
          collisionDetection(walkableCollidersArray[i])
        }
        checkMovementType()
        console.log();
    }
}

var subStates = {
  colliding:false,
  collisionDirection:{
    top:false,
    bottom:false,
    right:false,
    left:false
  },
  isGround:false,
  isClimbable:false,
  isLiquid:false,
  isSlippery:false,

  onlyLiquid:0,

  onGround:false,
  climbing:false,
  swimming:false,

  jumped:false,
  coyoteWall:0.1,
  left:false,
  right:false,
  coyoteGround:0.1,
  swimDelay:0.2,
  keepSlipperySpeed:false
}

function playerPhysics(){
  if(controller.jump == false){
    subStates.jumped = false;
  }
  if(subStates.swimming){
    performSwim()
  }else{
    if(subStates.climbing){
      performClimb()
    }else{
      performWalk()
    }
  }
  if(player.y > canvas.height - player.height){
    player.y = canvas.height - player.height;
    player.yVelocity = 0;
    if(controller.jump == false && subStates.climbing == false){
      subStates.onGround = true;
    }
  }
  if(player.x < 0){
    player.x = 0;
    player.xVelocity = 0;
  }
  if(player.x+player.width>canvas.width){
    player.x = canvas.width-player.width;
    player.xVelocity = 0;
  }
}

//player movements
//walk
function performWalk(){
  var xFriction = 0.9;
  var yFriction = 0.99;
  var velocity = 0.5;
  var gravity = 0.3;
  var slowness = 1;

  if(subStates.isSlippery){
    subStates.keepSlipperySpeed = true;
  }else{
    subStates.keepSlipperySpeed = false;
  }
  if(subStates.keepSlipperySpeed){
    xFriction = 0.99;
    slowness = 0.2;
    velocity = velocity*slowness;
  }
  if(controller.shift){
    velocity = 0.7*slowness
  }else if(controller.down){
    velocity = 0.2*slowness
  }
  if(controller.left){
    player.xVelocity -= velocity
  }
  if(controller.right){
    player.xVelocity += velocity
  }
  if(controller.jump && subStates.onGround && subStates.climbing == false && subStates.jumped == false){
    player.yVelocity -= 10;
    subStates.jumped = true;
  }
  if(subStates.onGround == false){
    if(subStates.jumped == false){
      subStates.coyoteGround -= 0.01;
      subStates.coyoteWall -= 0.01;
      if(subStates.coyoteGround <= 0 && subStates.coyoteWall <= 0){
        subStates.jumped = true;
      }
      if(controller.jump && subStates.coyoteGround > 0){
        player.yVelocity -= 10;
        subStates.jumped = true;
      }else if(controller.jump && subStates.coyoteWall > 0){
        player.yVelocity -= 7;
        if(subStates.right){
          player.xVelocity += 15;
        }else if(subStates.left){
          player.xVelocity -= 15;
        }
        subStates.jumped = true;
      }
    }
  }
  subStates.swimDelay = 0.2;
  applyForces(gravity,player.xVelocity,player.yVelocity,xFriction,yFriction);
}
//climb
function performClimb(){
  var xFriction = 0.9;
  var yFriction = 0.9;
  var velocity = 0.2;
  var gravity = 0;

  if(controller.up){
    player.yVelocity -= velocity;
  }
  if(controller.down){
    player.yVelocity += velocity;
  }
  if(controller.jump && subStates.jumped == false){
    player.yVelocity -= 7;
    if(subStates.collisionDirection.right){
      player.xVelocity += 15;
    }
    if(subStates.collisionDirection.left){
      player.xVelocity -= 15;
    }
    subStates.jumped = true;
  }
  if(subStates.collisionDirection.right){
    subStates.right = true;
    subStates.left = false;
  }
  if(subStates.collisionDirection.left){
    subStates.right = false;
    subStates.left = true;
  }
  subStates.coyoteWall = 0.1;
  subStates.coyoteGround = 0;
  subStates.swimDelay = 0.2;
  applyForces(gravity,player.xVelocity,player.yVelocity,xFriction,yFriction);
}
//swim
function performSwim(){
  var xFriction = 0.8;
  var yFriction = 0.8;
  var velocity = 0.4;
  var gravity = 0.2;
  if(controller.shift){
    velocity = 0.6
  }
  if(controller.right){
    player.xVelocity += velocity;
  }
  if(controller.left){
    player.xVelocity -= velocity;
  }
  if(controller.up && subStates.swimDelay <= 0){
    player.yVelocity -= velocity;
    if(subStates.collisionDirection.top && player.yVelocity < 0){
      player.yVelocity = 0
      if(controller.jump && subStates.jumped == false){
        player.yVelocity -= 10;
      }
    }
  }
  if(controller.down){
    player.yVelocity += velocity;
    gravity = -0.2;
  }
  subStates.coyoteGround = 0;
  subStates.coyoteWall = 0;
  subStates.swimDelay -= 0.01;
  applyForces(gravity,player.xVelocity,player.yVelocity,xFriction,yFriction);
}

//applies forces
function applyForces(gravity,xVelocity,yVelocity,xFriction,yFriction){
  //put gravity on player
  player.yVelocity += gravity;

  //put velocity on player
  player.x += xVelocity;
  player.y += yVelocity;

  //put friction friction
  player.xVelocity *= xFriction;
  player.yVelocity *= yFriction;
}

//collisionDetection
function collisionDetection(obj) {
  if (player.x + player.width < obj.x ||
    player.x > obj.x + obj.width ||
    player.y + player.height < obj.y ||
    player.y > obj.y + obj.height) {
        return
  }
  narrowPhase(obj);
  subStates.colliding = true;
  checkColliderType(obj);
}

//check where collided
function narrowPhase(obj) {
  let playerTop_ObjBottom = Math.abs(player.y - (obj.y + obj.height));
  let playerRight_ObjLeft = Math.abs((player.x + player.width) - obj.x);
  let playerLeft_ObjRight = Math.abs(player.x - (obj.x + obj.width));
  let playerBottom_ObjTop = Math.abs((player.y + player.height) - obj.y);
  //bottom
  if ((player.y <= obj.y + obj.height && player.y + player.height > obj.y + obj.height) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
    if(obj.tag.isLiquid == false){  
      player.y = obj.y + obj.height + 0.1;
      player.yVelocity = 0;
      subStates.collisionDirection.bottom = true;
    }
  }
  //top
  if ((player.y + player.height >= obj.y && player.y < obj.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
      if(obj.tag.isLiquid == false){
        player.y = obj.y - player.height;
        player.yVelocity = 0;
        if(obj.tag.isGround){
          subStates.collisionDirection.top = true;
          subStates.onlyLiquid += 1;
        }
      }
  }
  //left
  if ((player.x + player.width >= obj.x && player.x < obj.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
    if(obj.tag.isLiquid == false){
      player.x = obj.x - player.width;
      player.xVelocity = 0; 
      subStates.collisionDirection.left = true;
    }
  }
  //right
  if ((player.x <= obj.x + obj.width && player.x + player.width > obj.x + obj.width) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
    if(obj.tag.isLiquid == false){
      player.x = obj.x + obj.width;
      player.xVelocity = 0; 
      subStates.collisionDirection.right = true;
    }
  }
  if(obj.tag.isLiquid == true){
    if(player.y + (player.height/2) <= obj.y){
      subStates.collisionDirection.top = true;
    }
  }
}

//check the tags on the collider
function checkColliderType(obj){
  if(obj.tag.isGround){
    subStates.isGround = true;
  }
  if(obj.tag.isClimbable){
    subStates.isClimbable = true;
  }
  if(obj.tag.isLiquid){
    subStates.isLiquid = true;
  }
  if(obj.tag.isSlippery){
    subStates.isSlippery = true;
  }
}

//calculates movement type
function checkMovementType(){
  if(subStates.isLiquid && subStates.onlyLiquid == 0){
    subStates.swimming = true;
  }else{
    subStates.swimming = false;
  }
  if(subStates.isClimbable && ((controller.left && subStates.collisionDirection.right) || (controller.right && subStates.collisionDirection.left))){
    subStates.climbing = true;
  }else{
    subStates.climbing = false;
  }
  if(subStates.isGround && subStates.collisionDirection.top){
    subStates.onGround = true;
    subStates.coyoteGround = 0.1;
    subStates.coyoteWall = 0;
  }else{
    subStates.onGround = false;
  }
  if(subStates.colliding == false){
    subStates.swimming = false;
    subStates.climbing = false;
    subStates.onGround = false;
  }
}
