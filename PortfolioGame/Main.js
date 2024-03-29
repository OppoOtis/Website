const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const player = new Player(30,30,'red',canvas.width/2-15,0,0,0)
generateObjects()

function update(){
    c.clearRect(0,0,canvas.width,canvas.height)

    player.update()
    updateDeltaTime()
    draw()
    requestAnimationFrame(update);
}

function draw(){
    player.draw()
    for (let i = 0; i < walkableCollidersArray.length; i++) {
        walkableCollidersArray[i].draw();
    }
}

addEventListener("keydown", controller.keyListener)
addEventListener("keyup", controller.keyListener);
update()