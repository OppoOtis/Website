var lastFrameTimeStamp = new Date().getTime();
//var timeSinceLastFrame = null;
var deltaTime = null;

function updateDeltaTime(){
    deltaTime = (new Date().getTime() - lastFrameTimeStamp)/1000;
    lastFrameTimeStamp = new Date().getTime();
}