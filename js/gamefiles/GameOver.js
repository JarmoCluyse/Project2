var mainMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GameOver(){
        Phaser.Scene.call(this, {key: 'GameOver'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        console.log("GameOver");
        scoreText = this.add.text(16, 200, 'score: 0', { fontSize: '32px', fill: '#fff' });
        scoreText.setText('Score: ' + score);
        Text = this.add.text(16, 300, 'press arrow to continue', { fontSize: '32px', fill: '#fff' });
        this.input.keyboard.on('keydown-RIGHT', next2);
        this.input.keyboard.on('keydown-UP', next2);
        this.input.keyboard.on('keydown-DOWN', next2);
        this.input.keyboard.on('keydown-LEFT', next2);
    },

    update: function() {
        // Update objects & variables
    },
});

function next2()
{
    gameStarted = false;
    gameOver = false;
    game.scene.stop('GameOver');
    game.scene.start('MainMenu');
    score = 0

}

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);