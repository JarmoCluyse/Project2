//------------------------------- //
// Scene: Game Over
//------------------------------- //

var mainMenuState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function GameOver() {
		Phaser.Scene.call(this, { key: 'GameOver' });
	},
	preload: function() {
		// in seperate file Preloads
	},

	create: function() {
		jsGameStart.classList.add('hide');
        jsGamePlay.classList.add('hide');
        jsGameEnd.classList.remove('hide');
		// log the current scene
		console.log('scene: GameOver');
		// send to database
		postGame();

		// to next scene
		this.input.keyboard.on('keydown-RIGHT', keyListener);
		this.input.keyboard.on('keydown-UP', keyListener);
		this.input.keyboard.on('keydown-DOWN', keyListener);
		this.input.keyboard.on('keydown-LEFT', keyListener);
	},

	update: function() {
		// Update objects & variables
	}
});
// Add scene to list of scenes
myGame.scenes.push(mainMenuState);


const postGame = function(){
	
	jsontext = `{"player": "${player}", "subject": "${questionsSubject}", "mode": "${mode}", "score": "${score}", "coinscollected": "${coinsCollected}", "questionsanswered": "${questionsAnswered}", "numberoflanechanges": "${noLaneChanges}", "session": "${session}"}`;
	json = JSON.parse(jsontext);
	console.log(json);
	console.log(jsontext);
	sendData(`${BASEURI}game?code=${key}`, gamePosted, "POST",json);
}
const gamePosted = function(){
	console.log("Game saved to db");
	getHighscores();
}

const getHighscores = function(){
	handleData(`${BASEURI}games?code=${key}`, showHighscores, "GET",null)
}
const showHighscores = function(data){
	console.log(data);
	data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
	let scoreList = document.getElementById("highscoreList");
	let str = "";
	data.forEach(element => {
		str+= `<li>${element.score}		${element.player}</li>`;
	});
	scoreList.innerHTML = str;

}