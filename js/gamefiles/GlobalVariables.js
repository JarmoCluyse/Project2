//------------------------------- //
// Declare Game
//------------------------------- //

const BASEURI = 'https://project2driveacar.azurewebsites.net/api/';
// Declare myGame, the object that contains our game's states
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
var waitIncrease = 0;
// game states
var gameStarted = false;
var gameOver = false;
var gameDone = false;
// color of the car
var carColor = '0xff77ff';
// speed of the game
var speed = 5;
// distance in seconds between the cars
var distance = 1
var scoreDificulty = 5;
var scoreCoint = 10;
// list of colors
var ColorList = ['0x0000ff', '0xff0000', '0x00ff00', '0xffff00', '0xff77ff', '0xff00ff'];

//------------------------------- //
// things we can edit 
//------------------------------- //

var speed = 5;  // speed of cars
var distance = 1; // distance between cars
var increase = true; // if you can increase the speed while playing the game
var speedIncrease = 3; // the rate of increasing
var increaseValue = 0.5; // value that we increase with
var DriveScore = 5; // score for driving
var scoreCoin = 10; // score when you pickup something
// list of possible colors
var ColorList = ['0x0000ff', '0xff0000', '0x00ff00', '0xffff00', '0xff77ff', '0xff00ff','0xffffff','0x101010' ];
var carColor = ColorList[7]; // color of the car