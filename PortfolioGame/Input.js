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