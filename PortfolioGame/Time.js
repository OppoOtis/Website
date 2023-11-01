var lastFrameTimeStamp = new Date().getTime();
//var timeSinceLastFrame = null;
var deltaTime = null;

function updateDeltaTime(){
    deltaTime = (new Date().getTime() - lastFrameTimeStamp);
    console.log(new Date().getTime())
    lastFrameTimeStamp = new Date().getTime();
}