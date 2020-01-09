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
var gameDone = false;
// color of the car
var carColor = '0xff77ff';
// speed of the game
var speed = 5;
// distance in seconds between the cars
var distance = 1

// list of colors
var ColorList = ['0x0000ff', '0xff0000', '0x00ff00', '0xffff00', '0xff77ff', '0xff00ff'];


// methodes
var getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var shuffle = function(array) {
  var ctr = array.length, temp, index;

  // While there are elements in the array
      while (ctr > 0) {
  // Pick a random index
          index = Math.floor(Math.random() * ctr);
  // Decrease ctr by 1
          ctr--;
  // And swap the last element with it
          temp = array[ctr];
          array[ctr] = array[index];
          array[index] = temp;
      }
      return array;
}