//------------------------------- //
// Declare Game
//------------------------------- //

var myGame = {
    //Define our game states
    scenes: [],
    // Define common framerate to be referenced in animations
    frameRate: 60
  };

//------------------------------- //
// variables of the game
//------------------------------- //

var car;
var obstacles;
var pickups;
// score of the game
var score = 0;
// game states
var gameStarted = false;
var gameOver = false;
var gameDone = false;

//------------------------------- //
// things we can edit 
//------------------------------- //

var speed = 5;  // speed of cars
var distance = 1 // distance between cars
var DriveScore = 5; // score for driving
var scoreCoin = 10; // score when you pickup something
var carColor = '0xff77ff'; // color of the car
// list of possible colors
var ColorList = ['0x0000ff', '0xff0000', '0x00ff00', '0xffff00', '0xff77ff', '0xff00ff'];