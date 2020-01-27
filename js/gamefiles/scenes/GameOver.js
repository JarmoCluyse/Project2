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
		// log the current scene
		console.log('scene: GameOver');
		// -------------------------- //
		// Send to database
		// -------------------------- //
		postGame(player, noLaneChanges);
		if (mode == 'COOP') {
			postGame(player2, noLaneChangesP2);
		}
	},
	update: function() {
		// Update objects & variables
	}
});
// -------------------------- //
// Add scene to list of scenes
// -------------------------- //
myGame.scenes.push(mainMenuState);

// -------------------------- //
// send to database
// -------------------------- //
const postGame = function(played, langechanges){
	jsontext = `{"player": "${played}", "subject": "${questionsSubject}", "mode": "${mode}", "score": "${score}", "coinscollected": "${coinsCollected}", "questionsanswered": "${questionsAnswered}", "numberoflanechanges": "${langechanges}", "session": "${session}"}`;
	json = JSON.parse(jsontext);
	// console.log(json);
	// console.log(jsontext);
	sendData(`${BASEURI}game?code=${key}`, gamePosted, "POST",json);
	window.location.href = "highscorepage.html";
}
