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
        // log the current scene
        console.log("scene: GameOver");
        this.background1 = this.add.tileSprite(240,400,480,800, 'white')
        // page
        Text = this.add.text(20, 300, 'score: ', { fontSize: '32px', fill: '#747474' });
        Text2 = this.add.text(20, 400, 'press an arrow ', { fontSize: '32px', fill: '#747474' });
        Text.setText('Score: ' + score);



        // further
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
    // only listen if game is over
    if (gameStarted && gameOver){
        // stop this scene start the begin scene
        game.scene.stop('GameOver');
        game.scene.start('MainMenu');
        // put the gamestarted and gameover on false
        score = 0
        gameStarted = false;
        gameOver = false;
        gameDone = false;
    }
    

}
// Add scene to list of scenes
myGame.scenes.push(mainMenuState);