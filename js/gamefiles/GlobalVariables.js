//------------------------------- //
// Things to Edit
//------------------------------- //
var BeginSpeed = localStorage.getItem("BeginSpeed");
// var BeginSpeed = 10;  // speed of cars
var mode = localStorage.getItem("mode");
var distance = localStorage.getItem("Distance"); // distance between cars
var increase =  localStorage.getItem("increase"); // if you can increase the speed while playing the game
var speedIncrease = 4; // the rate of increasing
var increaseValue = 0.5; // value that we increase with
var DriveScore = 5; // score for driving
var scoreCoin = 10; // score when you pickup something
var ColorList = {'blue':'0x0000ff','red': '0xff0000','green': '0x00ff00','yellow': '0xffff00','pink': '0xff77ff','purple': '0xff00ff','white':'0xffffff','black':'0x101010' }
var carColor = ColorList[localStorage.getItem("Color")]; // current color of the car
var carColor2 = ColorList[localStorage.getItem("Color2")]; // current color of the car
//------------------------------- //
// DB
//------------------------------- //
const BASEURI = 'https://project2driveacar.azurewebsites.net/api/v2/';
var player = localStorage.getItem("Player");
var player2 = localStorage.getItem("Player2");
var questionsSubject;
var coinsCollected = 0;
var questionsAnswered = 0;
var noLaneChanges = 0;
var session;
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
var jsGamePlay = document.querySelector(".js-gamePlay") // game html
var jsGameStart = document.querySelector(".js-gameStart") // gamestart html
var jsGameEnd = document.querySelector(".js-gameEnd") // gamestart html
var jsGameQuestion = document.querySelector(".js-gameQuestion") // gamestart html
var coop
var CurrentQuestion;
var ShuffledAnswers;
var car; // users
var car2; // users
var obstacles; // obstacles
var pickups; // pickups
var score = 0; // score of the game
var waitIncrease = 0; // variable to count the waiting
var speed = 5; // current speed of the game
var Colors = [];
for (var keys in ColorList) {
  Colors.push(ColorList[keys])
}

//-------------//
// default values 
//-------------//
if (typeof BeginSpeed === 'undefined' || !BeginSpeed) {
  BeginSpeed = 5;
} else {
  BeginSpeed = parseInt(BeginSpeed);
}
  if (typeof distance === 'undefined' || !distance) {
  distance = 1;
} else {
  distance = parseInt(distance);
}
if (typeof increase === 'undefined' || !increase) {
  increase = true;
}
if (typeof player === 'undefined' || !player) {
  player = "anoniem"; //default value
}
if (typeof player2 === 'undefined' || !player2) {
  player2 = "anoniem"; //default value
}
if (typeof mode === 'undefined' || !mode) {
  mode = "SP"; //default value
}



//-------------//
// game states
//-------------//
var gameStarted = false;
var gameOver = false;
var answer = false
var gameDone = false;
if(mode == 'SP'){
  coop = false;
}
else if(mode == 'COOP'){
  coop = true;
}
else{
  coop = false;
}

