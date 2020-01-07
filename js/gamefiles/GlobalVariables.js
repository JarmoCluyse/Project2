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
var gameStarted = false;
var speed = 5;