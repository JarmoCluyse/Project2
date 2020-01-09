// Declare myGame, the object that contains our game's states
var myGame = {
    //Define our game states
    scenes: [],
  
    // Define common framerate to be referenced in animations
    frameRate: 10
  };

// The player - car
var car;
//contains the obstacles
var obstacles;
//contains the pickups
var pickups;
// rest
var score = 0;
var gameStarted = false;
var gameOver = false;
// color of the car
var carColor = '0xff77ff';
// speed of the game
var speed = 5;
// distance in seconds between the cars
var distance = 1;

// list of colors
var ColorList = ['0x0000ff', '0xff0000', '0x00ff00', '0xffff00', '0xff77ff', '0xff00ff'];