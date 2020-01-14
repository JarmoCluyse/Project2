//------------------------------- //
// Things to Edit
//------------------------------- //
var BeginSpeed = localStorage.getItem("BeginSpeed");
// var BeginSpeed = 10;  // speed of cars
var distance = localStorage.getItem("Distance"); // distance between cars
var increase =  localStorage.getItem("increase"); // if you can increase the speed while playing the game
var speedIncrease = 4; // the rate of increasing
var increaseValue = 0.5; // value that we increase with
var DriveScore = 5; // score for driving
var scoreCoin = 10; // score when you pickup something
var ColorList = ['0x0000ff', '0xff0000', '0x00ff00', '0xffff00', '0xff77ff', '0xff00ff','0xffffff','0x101010' ]; // list of possible colors
var carColor = ColorList[7]; // current color of the car
//------------------------------- //
// DB
//------------------------------- //
const BASEURI = 'https://project2driveacar.azurewebsites.net/api/';
var player = localStorage.getItem("Name");
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
var jsGamePlay = document.querySelector(".js-gamePlay") // score html
console.log(jsGamePlay);

var car; // users
var obstacles; // obstacles
var pickups; // pickups
var score = 0; // score of the game
var waitIncrease = 0; // variable to count the waiting
var speed = 5; // current speed of the game

//-------------//
// default values 
//-------------//
if (typeof BeginSpeed === 'undefined' || !BeginSpeed) {
  BeginSpeed = 3;
} else {
  BeginSpeed = parseInt(BeginSpeed);
}
  if (typeof distance === 'undefined' || !distance) {
  distance = 3;
} else {
  distance = parseInt(distance);
}
if (typeof increase === 'undefined' || !increase) {
  increase = true;
}
if (typeof player === 'undefined' || !player) {
  player = "anoniem"; //default value
}



//-------------//
// game states
//-------------//
var gameStarted = false;
var gameOver = false;
var gameDone = false;

