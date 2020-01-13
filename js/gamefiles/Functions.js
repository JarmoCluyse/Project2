//------------------------------- //
// Methods used in game
//------------------------------- //

// get a random integer
var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  // shuffle a list
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
  
  // set score in html
  var jsScore = document.querySelector(".js-score")
  // console.log(jsScore.innerHTML);
  var placeScore = function () {
    jsScore.innerHTML = `score: ${score}`
  }
  
  // listen to keypress
  function keyListener(e)
  {
    e.preventDefault();
    // console.log(e);
    if(!gameStarted && !gameDone && !gameOver && e.key != "f"){
      // start the game
      gameStarted = true;
      speed = BeginSpeed;
      game.scene.stop('MainMenu');
      game.scene.start('GamePlay');
    }
    else if (gameStarted && gameOver && !gameDone) {
      if (e.key == "f"){
        gameDone = true;
        game.scene.stop('GamePlay');
        game.scene.start('GameOver');
      }
      if (e.key == " "){
        gameOver = false;
      }
    }
    else if (gameStarted && gameOver && gameDone && e.key != "f") {
          // stop this scene start the begin scene
          game.scene.stop('GameOver');
          game.scene.start('MainMenu');
          // put the gamestarted and gameover on false
          score = 0;
          placeScore();
          gameStarted = false;
          gameOver = false;
          gameDone = false;
    }
  
  }