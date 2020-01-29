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
	localStorage.setItem('Score', score)
	jsontext = `{"player": "${played}", "subject": "${questionsSubject}", "mode": "${mode}", "score": "${score}", "coinscollected": "${coinsCollected}", "questionsanswered": "${questionsAnswered}", "numberoflanechanges": "${langechanges}", "session": "${session}"}`;
	json = JSON.parse(jsontext);
	handleData(`${BASEURI}game?code=${key}`, gamePosted, "POST", JSON.stringify(json));
}
