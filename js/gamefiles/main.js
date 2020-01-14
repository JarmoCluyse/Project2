//------------------------------- //
// making the game
//------------------------------- //
var config = {
	type: Phaser.AUTO, 	// Rendering auto
	// Width and height of the game
	width: 800,
	height: 800,
	physics: { 	// Enable physics
		default: 'arcade',
		arcade: {
			// Disable gravity
			// Physics needded for collisions
			gravity: { y: 0 },
			// shows hitboxes
			debug: false
		}
	},
	parent: 'phaser', 	// id for html
	scene: myGame.scenes
};
//Instantiate the game with the config
var game = new Phaser.Game(config);
