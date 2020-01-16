//------------------------------- //
// Methods used in game
//------------------------------- //
var getRandomInt = function(max) { // get a random integer
    return Math.floor(Math.random() * Math.floor(max));
  } 
var shuffle = function(array) { // shuffle a list
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
var placeScore = function () { // update the score
  jsScore.innerHTML = `score: ${score}`
}
function keyListener(e){ // listen to keypress
  e.preventDefault(); // prevent the arrows from scrolling
  if(!gameStarted && !gameDone && !gameOver && e.key != "f"){ // when game hasn't started
    gameStarted = true; // start the game
    game.scene.stop('MainMenu'); // stop this screen
    game.scene.start('GamePlay'); // start the game
  }
  else if (gameStarted && gameOver && !gameDone) { // when car is hit
    if (e.key == "f"){ // if F is pressed stop the game
      gameDone = true;
      jsGamePlay.classList.add('hide')
      game.scene.stop('GamePlay');
      game.scene.start('GameOver');
    }
    if (e.key == " "){ // continue
      gameOver = false;
    }
  }
  else if (gameStarted && gameOver && gameDone && e.key != "f") { // when game is done
        game.scene.stop('GameOver');
        game.scene.start('MainMenu');
        score = 0; // put score back to 0
        placeScore(); // update the score
        // variables back to false
        gameStarted = false;
        gameOver = false;
        gameDone = false;
  }

}