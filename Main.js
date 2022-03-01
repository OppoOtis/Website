const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

var lastFrameTimeStamp = new Date().getTime();
//var timeSinceLastFrame = null;
var deltaTime = null;
    

const player = new Player(30,30,'red',canvas.width/2-15,0,0,0)
generateObjects()

function update(){
    deltaTime = (new Date().getTime() - lastFrameTimeStamp)/1000;
    console.log (deltaTime);
    player.update()
    c.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    for (let i = 0; i < walkableCollidersArray.length; i++) {
        walkableCollidersArray[i].draw();
    }
    requestAnimationFrame(update);
    lastFrameTimeStamp = new Date().getTime();
}

function draw(){

}

addEventListener("keydown", controller.keyListener)
addEventListener("keyup", controller.keyListener);
update()
draw()