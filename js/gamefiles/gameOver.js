var mainMenuState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function GameOver() {
		Phaser.Scene.call(this, { key: 'GameOver' });
	},

	preload: function() {
		// Preload images for this state
	},

	create: function() {
		// log the current scene
		console.log('scene: GameOver');
		this.background1 = this.add.tileSprite(240,400,800,900, 'white')
		// page
		Text = this.add.text(20, 300, 'score: ', {
			fontSize: '32px',
			fill: '#747474'
		});
		Text2 = this.add.text(20, 400, 'press an arrow ', {
			fontSize: '32px',
			fill: '#747474'
		});
		Text.setText('Score: ' + score);

		// further
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
