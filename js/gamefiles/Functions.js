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
  jsScore.innerHTML = `Score: ${score}`;
  jsCoins.innerHTML = `Muntjes: ${coinsCollected}`;
  if (score > oneBeforYou && !firstPlace){
    if(!askForUpdate){
      handleData(`${BASEURI}highscores/score/10?code=${key}`, showHighscores, "GET",null)
      askForUpdate = true
    }
  }
  if (inTopTen && !scoreupdating){
    document.querySelector('.c-leaderboard-currentplayer').innerHTML = `${player}:&nbsp;${score}`;
  }
}
//------------------------------- //
// go to next scene
//------------------------------- //
function keyListener(e){ // listen to keypress
  e.preventDefault(); // prevent the arrows from scrolling
  if(!gameStarted && !gameDone && !gameOver){ // when game hasn't started
    gameStarted = true; // start the game
    startEvent = e;
    game.scene.stop('MainMenu'); // stop this screen
    game.scene.start('GamePlay'); // start the game
  }

}
//------------------------------- //
// place decorations
//------------------------------- //
var placeDecorations = function () {
  let placeDeco = getRandomInt(100)
  if (placeDeco > 85){
      let wichDeco = getRandomInt(1000);
      // wichDeco = 726;
      if (wichDeco <= 30) {
          decorations.create(DecorationX(),-250, 'tree1').setScale(Math.random() * 0.01 + .08);
      }
      if (wichDeco <= 60 && wichDeco > 30) {
          decorations.create(DecorationX(),-250, 'tree2').setScale(Math.random() * 0.01 + .06);
      }
      if (wichDeco <= 90 && wichDeco > 60) {
          decorations.create(DecorationX(),-250, 'tire').setScale( Math.random() * 0.01 + 0.03);
      }
      if (wichDeco <= 200 && wichDeco > 90) {
        decorations.create(DecorationX(),-250, 'bush1').setScale((Math.random() * 0.1 + 0.1));    
      }
      if (wichDeco <= 250 && wichDeco > 200) {
        decorations.create(DecorationX(),-250, 'puddle').setScale((Math.random() * 0.05 + .08));    
      }
      if (wichDeco <= 990 && wichDeco > 998) {
        decorations.create(DecorationX(),-250, 'goose').setScale((Math.random() * 0.05 + .08));    
      }
      if (wichDeco <= 995 && wichDeco > 990) {
        decorations.create(DecorationX(),-250, 'cat').setScale((Math.random() * 0.03 + .03));    
      }
      if (wichDeco <= 1000 && wichDeco > 995) {
        decorations.create(DecorationX(),-250, 'dog').setScale((Math.random() * 0.03 + .03));    
      }
      else {
        decorations.create(DecorationX(),-250, 'grass1').setScale((Math.random() * 0.05 + 0.03));    
      }
  }
}
//------------------------------- //
// place the item random left or right
//------------------------------- //
var DecorationX = function () {
  let LeftOrRight = getRandomInt(2)
  if (LeftOrRight == 0) {
    return getRandomInt(150)
  }
  if (LeftOrRight == 1) {
    return getRandomInt(150) + 650
  }
}
//------------------------------- //
// get the questions of the database
//------------------------------- //
var getQuestions = function () {
	handleData(`${BASEURI}questions?code=${key}`, showQuestion)
};
//------------------------------- //
// make question visable
//------------------------------- //
const showQuestion = function (data) {
  s = JSON.parse(localStorage.getItem('SessionObject'));
  var questionsFiltered = data;
  if(s != null){
    if (s.teacherQuestionsOnly){
      questionsFiltered = questionsFiltered.filter(obj => {
        return obj.teacherEmail === s.teacherEmail;
        });
    }
    if (s.forcedSubject != "all"){
      questionsFiltered = questionsFiltered.filter(obj => {
        return obj.subject === s.forcedSubject;
        });
    }
  }
  let ans = [0,1,2, 3];
  ShuffledAnswers = ans;
  ans = shuffle(ans);
  let question = questionsFiltered[getRandomInt(questionsFiltered.length)];
  CurrentQuestion = question;
  questionTimer = waitquestion;
  jsGameQuestion.innerHTML = `
  <h1 class="c-timer">${questionTimer}</h1>
  <h1>Beantwoord deze vraag om verder te spelen:</h1>
  <br>
  <br>
  <h1>${question.questionText}</h1>
  <ul class="o-list">
    <li id='${question.answers[ans[0]].answerId}'>${question.answers[ans[0]].answerText}</li>
    <li id='${question.answers[ans[1]].answerId}'>${question.answers[ans[1]].answerText}</li>
    <li id='${question.answers[ans[2]].answerId}'>${question.answers[ans[2]].answerText}</li>
    <li id='${question.answers[ans[3]].answerId}'>${question.answers[ans[3]].answerText}</li>
  </ul>
  `;
  answerIds = [];
  answerIds.push(question.answers[ans[0]].answerId);
  answerIds.push(question.answers[ans[1]].answerId);
  answerIds.push(question.answers[ans[2]].answerId);
  answerIds.push(question.answers[ans[3]].answerId);
  timeQuestion();
}
//------------------------------- //
// make timer visable
//------------------------------- //
const timeQuestion = function(){
  if (!answer){
      document.querySelector('.c-timer').innerHTML = questionTimer;
      if (questionTimer == 0){
          answer = true;
      }
      else{
          setTimeout(timeQuestion, 1000);
          questionTimer--;
      }
     
  }
  
}
//------------------------------- //
// function to have a delay
//------------------------------- //
var sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
//------------------------------- //
// get the highscores out of the database
//------------------------------- //
const getHighscores = function(){
  handleData(`${BASEURI}highscores/score/10?code=${key}`, showHighscores, "GET",null)
  if (loopHighscores){
    setTimeout(getHighscores, 20000);
  }
}
const gamePosted = function(data){
  localStorage.setItem("Position", JSON.stringify(data));
	loopHighscores = 0;
  getHighscores();
  localStorage.setItem('CameFromGame', 'true');
  window.location.href = "highscorepage.html";
}
// -------------------------- //
// show highscores
// -------------------------- //
const showHighscores = function(data){
  scoreupdating = true
	let scoreList = document.getElementById("highscoreList");
	let str = "";
	let inserted = false;
	let count = 0;
	data.forEach(element => {
		if(score > element.score && !inserted){
      str += `<li class="c-leaderboard-currentplayer">${player}:&nbsp;${score}</li>`;
      if(count < 9){
        str += `<li>${element.player}:&nbsp;${element.score}</li>`;
      }
      inTopTen = true;
      inserted = true;
      if(count == 0){
        firstPlace = true;
      }
			count += 2;
		}
		else if (count < 10){
      str+= `<li>${element.player}:&nbsp;${element.score}</li>`;
      if(!inserted){
        oneBeforYou = element.score;        
      }
			count++;
    }		
  });
  scoreList.innerHTML = str;
  scoreupdating = false;
  askForUpdate = false;
}