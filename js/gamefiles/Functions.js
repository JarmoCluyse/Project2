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
  else if (gameStarted && gameOver && gameDone && e.key != "f") { // when game is done
        game.scene.stop('GameOver');
        game.scene.start('MainMenu');
        score = 0; // put score back to 0
        questionsAnswered = 0
        distance = 3000;
        placeScore(); // update the score
        // variables back to false
        gameStarted = false;
        gameOver = false;
        gameDone = false;
  }

}
var TreeLocation = function () {
  let LeftOrRight = getRandomInt(2)
  if (LeftOrRight == 0) {
    return getRandomInt(180)
  }
  if (LeftOrRight == 1) {
    return getRandomInt(180) + 620
  }
}
var getQuestions = function () {
	handleData(`${BASEURI}questions?code=${key}`, showQuestion)
};
const showQuestion = function (data) {
  let ans = [0,1,2, 3];
  ShuffledAnswers = ans;
  ans = shuffle(ans);
  let question = data[getRandomInt(data.length)];
  CurrentQuestion = question;
  console.log(question);
  jsGameQuestion.innerHTML = `
  <h1>Beantwoord deze vraag om verder te spelen:</h1>
  <br>
  <br>
  <h1>${question.questionText}</h1>
  <ul class="o-list">
    <li>${question.answers[ans[0]].answerText}</li>
    <li>${question.answers[ans[1]].answerText}</li>
    <li>${question.answers[ans[2]].answerText}</li>
    <li>${question.answers[ans[3]].answerText}</li>
  </ul>
  `;
  
}

var sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}