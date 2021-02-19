var Balloon, Position, database,bgImg;
var balloonImg;

function preload(){

  bgImg=loadImage("Images/Hot Air Ballon-01.png");
  balloonImg=loadAnimation("Images/Hot Air Ballon-02.png","Images/Hot Air Ballon-03.png","Images/Hot Air Ballon-04.png")

}
function setup() {
database = firebase.database();
  createCanvas(1000,800);
  Balloon=createSprite(200, 525, 50, 50);
  Balloon.addAnimation("Moving",balloonImg);

  var balloonPosition=database.ref('Balloon/Position');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {

  background(bgImg); 
  
  textSize(18);
  text("##Use Arrow Keys To Move The Hot Air Balloon!",50,50);

  if (Position!==undefined){
    if(keyDown(LEFT_ARROW)){
            writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        Balloon.scale=Balloon.scale-0.01;
        writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
      Balloon.scale=Balloon.scale+0.01;
        writePosition(0,+3);
    }
  }

  drawSprites();
}

function readPosition(data){
  Position=data.val();
  Balloon.x=Position.X;
  Balloon.y=Position.Y;
}

function writePosition(X,Y){
  database.ref('Balloon/Position').set({
      'X': Position.X+X,
      'Y': Position.Y+Y
  })

}

function showError(){
  console.log("Error in writing to the database");
}