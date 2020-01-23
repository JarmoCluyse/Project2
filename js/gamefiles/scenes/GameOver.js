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
		postGame(player, noLaneChanges);
		if (mode == 'COOP') {
			postGame(player2, noLaneChangesP2);
		}

		// to next scene
		this.input.keyboard.on('keydown-SPACE', keyListener);
	},

	update: function() {
		// Update objects & variables
	}
});
// Add scene to list of scenes
myGame.scenes.push(mainMenuState);


const postGame = function(played, langechanges){
	
	jsontext = `{"player": "${played}", "subject": "${questionsSubject}", "mode": "${mode}", "score": "${score}", "coinscollected": "${coinsCollected}", "questionsanswered": "${questionsAnswered}", "numberoflanechanges": "${langechanges}", "session": "${session}"}`;
	json = JSON.parse(jsontext);
	console.log(json);
	console.log(jsontext);
	sendData(`${BASEURI}game?code=${key}`, gamePosted, "POST",json);
}
const gamePosted = function(){
	console.log("Game saved to db");
	loopHighscores = 0;
	getHighscores();
}


const showHighscores = function(data){
	console.log(data);
	data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
	let scoreList = document.getElementById("highscoreList");
	let scoreList2 = document.getElementById("highscoreList2");
	let str = "";
	let str2 = "";
	var leaderboard = data.slice(0, 10);
	let inserted = false;
	let count = 0;
	leaderboard.forEach(element => {
		if(score > element.score && !inserted){
			str2+= `<li class="c-leaderboard-currentplayer">${score}		${player}</li>`;
			str2+= `<li>${element.score}		${element.player}</li>`;
			inserted = true;
			count += 2;
		}
		else if (count < 10){
			str2+= `<li>${element.score}		${element.player}</li>`; 
			count++;
		}
		str+= `<li>${element.score}		${element.player}</li>`;
		
	});
	scoreList.innerHTML = str;
	scoreList2.innerHTML = str2;

}
