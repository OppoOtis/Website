const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

//Input-----------------------------------------------------------------------
var controller = {

    left:false,
    right:false,
    up:false,
    down:false,
    jump:false,
    shift:false,
    keyListener:function(event) {
  
      var keyState = (event.type == "keydown")?true:false;
  
      switch(event.keyCode) {
  
        case 37:// left key
          controller.left = keyState;
        break;
        case 65:// left key
          controller.left = keyState;
        break;

        case 39:// right key
          controller.right = keyState;
        break;
        case 68:// right key
          controller.right = keyState;
        break;

        case 87:// up key
          controller.up = keyState;
        break;
        case 38:// up key
          controller.up = keyState;
        break;

        case 83:// down key
          controller.down = keyState;
        break;
        case 40:// down key
          controller.down = keyState;
        break;

        case 32:// jump key
          controller.jump = keyState;
        break;

        case 16:// shift key
          controller.shift = keyState;
        break;
  
      }
  
    }
  
};
//Player---------------------------------------------------------------------
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
        playerState()
        playerPhysics()
    }
}

const player = new Player(30,30,'red',canvas.width/2-15,0,0,0)

var playerStates = {
  climbing:false,
  onGround:false,
  swimming:false,
  left:false,
  right:false,
  canWallJump:false,
}

function playerState(){
  
}
function playerPhysics(){
  var xFriction = 0.9;
  var yFriction = 0.99;
  var velocity = 0;
  var gravity = 0.3;
  //movement
  //climbing
  if(playerStates.climbing == true){
    gravity = 0;
    velocity = 0.2;
    yFriction = 0.9;
    if(controller.up){
      player.yVelocity -= velocity
    }
    if(controller.down){
      player.yVelocity += velocity
    }
    //walljump
    if(controller.jump && playerStates.canWallJump){
      gravity = 0.3;
      yFriction = 0.99;
      player.yVelocity -= 7
      velocity = 15;
      playerStates.climbing = false;
      playerStates.canWallJump = false;
      if(player.left){
        player.xVelocity += velocity;
        player.left = false;
      }
      if(player.right){
        player.xVelocity -= velocity;
        player.right = false;
      }
    }
  }
  //walking
  if(controller.left && playerStates.climbing == false){
    if(controller.down){
      velocity = 0.2
    }else if(controller.shift){
      velocity = 0.7
    }else{
      velocity = 0.5
    }
    player.xVelocity -= velocity
  }
  if(controller.right  && playerStates.climbing == false){
    if(controller.down){
      velocity = 0.2
    }else if(controller.shift){
      velocity = 0.7
    }else{
      velocity = 0.5
    }
    player.xVelocity += velocity
  }

  //jumping
  if(controller.jump && playerStates.onGround == true){
    player.yVelocity -= 10
    playerStates.onGround = false;
    playerStates.canWallJump = false;
  }

  //Forces
  //gravity
  player.yVelocity += gravity;

  //put velocity on player
  player.x += player.xVelocity;
  player.y += player.yVelocity;

  //friction
  player.xVelocity *= xFriction;
  player.yVelocity *= yFriction;

  //Collisions
  if(player.x <= 0){
    player.x = 0;
    player.xVelocity = 0;
    if(controller.left == true){
      playerStates.climbing = true;
      playerStates.onGround = false;
      player.left = true;
      player.right = false;
      if(controller.jump == false){
        playerStates.canWallJump = true;
      }
    }
    if(controller.left == false){
      playerStates.climbing = false;
      player.left = false;
    }
  }else if(player.x >= canvas.width-player.width){
    player.x = canvas.width-player.width;
    player.xVelocity = 0;
    if(controller.right == true){
      playerStates.climbing = true;
      playerStates.onGround = false;
      player.right = true;
      player.left = false;
      if(controller.jump == false){
        playerStates.canWallJump = true;
      }
    }
    if(controller.right == false){
      playerStates.climbing = false;
      player.right = false;
    }
  }
  if(player.y > canvas.height - player.height){
    player.y = canvas.height - player.height;
    player.yVelocity = 0;
    if(controller.jump == false && playerStates.climbing == false){
      playerStates.onGround = true;
    }
  }
  console.log(playerStates.climbing);
}

function update(){
    player.update()
    c.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    requestAnimationFrame(update)
}

function draw(){

}


addEventListener("keydown", controller.keyListener)
addEventListener("keyup", controller.keyListener);
update()



/*
class Player{
    constructor(x,y,radius,color){
        this.x = x
        this.y = y

        this.radius = radius
        this.color = color
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0, Math.PI *2,false)
        c.fillStyle = this.color
        c.fill()
    }
}


class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0, Math.PI *2,false)
        c.fillStyle = this.color
        c.fill()
    }

    update(){
        this.draw()
        this.x = this.x+this.velocity.x
        this.y = this.y+this.velocity.y
        
    }
}

class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0, Math.PI *2,false)
        c.fillStyle = this.color
        c.fill()
    }

    update(){
        this.draw()
        this.x = this.x+this.velocity.x
        this.y = this.y+this.velocity.y
        
    }
}

const x = canvas.width/2
const y = canvas.height/2


const player = new Player(x, y, 30, 'blue')


const projectiles = []
const enemies = []


function spawnEnemies(){
    setInterval(() => {
        const x = 100
        const y = 100
        const radius = 30
        const color = 'green'
        const velocity = {
            x:1,
            y:1
        }
        enemies.push(new Enemy(x, y, radius,color,velocity))
    },1000)
}

function animate(){
    
    c.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    projectiles.forEach((projectile) => {
        projectile.update()
    })

    enemies.forEach(enemy =>{
        enemy.update()
    });
    requestAnimationFrame(animate)
}

addEventListener('click',(event) => {
    const angle = Math.atan2(
        event.clientY-canvas.height/2,
        event.clientX-canvas.width/2
    )

    const velocity ={
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(canvas.width/2,canvas.height/2,5,'red',velocity))
})

animate()
spawnEnemies()
*/