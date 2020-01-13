//------------------------------- //
// Things to Edit
//------------------------------- //
var BeginSpeed = 5;  // speed of cars
var distance = 1; // distance between cars
var increase = true; // if you can increase the speed while playing the game
var speedIncrease = 3; // the rate of increasing
var increaseValue = 0.5; // value that we increase with
var DriveScore = 5; // score for driving
var scoreCoin = 10; // score when you pickup something
var ColorList = ['0x0000ff', '0xff0000', '0x00ff00', '0xffff00', '0xff77ff', '0xff00ff','0xffffff','0x101010' ]; // list of possible colors
var carColor = ColorList[7]; // current color of the car

//------------------------------- //
// DB
//------------------------------- //
const BASEURI = 'https://project2driveacar.azurewebsites.net/api/';
var player = "anoniem"; //default value
var subjectdink;
var difficulty = "makkelijk";
var shortgameid;
var mode = "SP";
//------------------------------- //
// Declare Game
//------------------------------- //
var myGame = {// Declare myGame
  scenes: [],
  frameRate: 60
};
//------------------------------- //
// variables of the game
//------------------------------- //
var jsScore = document.querySelector(".js-score") // score html
var jsGame = document.querySelector("#phaser") // score html
console.log(jsGame);

var car; // users
var obstacles; // obstacles
var pickups; // pickups
var score = 0; // score of the game
var waitIncrease = 0; // variable to count the waiting
var speed = 5; // current speed of the game
//-------------//
// game states
//-------------//
var gameStarted = false;
var gameOver = false;
var gameDone = false;

