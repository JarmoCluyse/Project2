//------------------------------- //
// Scene: main menu
//------------------------------- //

var mainMenuState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function MainMenu() {
		Phaser.Scene.call(this, { key: 'MainMenu' });
	},
	preload: function() {
		// in seperate file Preloads
	},
	create: function() {
		// -------------------------- //
		// make front page
		// -------------------------- //
		localStorage.removeItem('SessionObject');
		handleData(`${BASEURI}session/${session}?code=${key}`, setSession);
		if (mode == 'COOP') {
			// change video if coop
			jsVideo.innerHTML = `<source src="./assets/vidCoop.m4v" type="video/mp4">
			Your browser does not support the video tag.`;
			document.getElementById('jsReviveIcon').classList.remove('hide');
		} else {
			jsVideo.innerHTML = `<source src="./assets/vid.m4v" type="video/mp4">
            Your browser does not support the video tag.`;
		}
		// -------------------------- //
		// Hide things
		// -------------------------- //
		jsMainCard.classList.add('c-start-card');
		jsGameStart.classList.remove('hide');
		jsGamePlay.classList.add('hide');
		jsGameQuestion.classList.add('hide');
		// -------------------------- //
		// listeners for next scene
		// -------------------------- //
		this.input.keyboard.on('keydown-RIGHT', keyListener);
		this.input.keyboard.on('keydown-UP', keyListener);
		this.input.keyboard.on('keydown-DOWN', keyListener);
		this.input.keyboard.on('keydown-LEFT', keyListener);
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
// Listen to session
// -------------------------- //
setSession = function(data) {
	localStorage.setItem('SessionObject', JSON.stringify(data));
};
