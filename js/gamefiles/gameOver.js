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
        Text = this.add.text(20, 300, 'score: ', { fontSize: '32px', fill: '#fff' });
        Text2 = this.add.text(20, 400, 'press an arrow ', { fontSize: '32px', fill: '#fff' });
        Text.setText('Score: ' + score);
        this.input.keyboard.on('keydown-RIGHT', listener2);
        this.input.keyboard.on('keydown-UP', listener2);
        this.input.keyboard.on('keydown-DOWN', listener2);
        this.input.keyboard.on('keydown-LEFT', listener2);

    },

    update: function() {
        // Update objects & variables
    },
});

function listener2 () {
    if (gameStarted && gameOver){
        game.scene.stop('GameOver');
        game.scene.start('MainMenu');
        gameStarted = false;
        gameOver = false;
    }
    

}
// Add scene to list of scenes
myGame.scenes.push(mainMenuState);