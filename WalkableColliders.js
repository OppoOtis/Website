const walkableCollidersArray = [];

class WalkableCollider{
    constructor(x,y,width, height,color,tag){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.tag = tag
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y,this.width,this.height)
    }
}

//obstacles
function generateObjects(){
    walkableCollidersArray.push(new WalkableCollider(0,canvas.height-400,80,400,'gray',{
        isGround:true,
        isClimbable:true,
        isLiquid:false,
        isSlippery:false
    }))
    walkableCollidersArray.push(new WalkableCollider(80+300+200,canvas.height-190,canvas.width-80-300-200,190,"rgba(0,5,255,0.5)",{
        isGround:false,
        isClimbable:false,
        isLiquid:true,
        isSlippery:false
    }))
    walkableCollidersArray.push(new WalkableCollider(80+300+200,canvas.height-10,canvas.width-80-300-200,10,'blue',{
        isGround:false,
        isClimbable:false,
        isLiquid:false,
        isSlippery:false
    }))
    walkableCollidersArray.push(new WalkableCollider(80+300+200+100,canvas.height-200,canvas.width-80-300-200,20,'blue',{
        isGround:true,
        isClimbable:false,
        isLiquid:false,
        isSlippery:true
    }))
    walkableCollidersArray.push(new WalkableCollider(80+300,canvas.height-190,200,190,'black',{
        isGround:true,
        isClimbable:false,
        isLiquid:false,
        isSlippery:false
    }))
    walkableCollidersArray.push(new WalkableCollider(80,canvas.height-50,canvas.width-80-(canvas.width-380),50,'black',{
        isGround:true,
        isClimbable:false,
        isLiquid:false,
        isSlippery:false,
    }))
    /*
    walkableCollidersArray.push(new WalkableCollider(0,canvas.height/2,canvas.width+10000,10,'black',{
        isGround:true,
        isClimbable:false,
        isLiquid:false,
        isSlippery:false,
    }))
    */
}