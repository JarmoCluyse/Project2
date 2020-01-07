var mainMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        console.log("MainMenu");
        Text = this.add.text(16, 300, 'press arrow to start', { fontSize: '32px', fill: '#fff' });
        this.input.keyboard.on('keydown-RIGHT', next);
        this.input.keyboard.on('keydown-UP', next);
        this.input.keyboard.on('keydown-DOWN', next);
        this.input.keyboard.on('keydown-LEFT', next);
        
    },

    update: function() {
        // Update objects & variables
    },
});
function next()
{
    gameStarted = true;
    game.scene.stop('MainMenu');
    game.scene.start('GamePlay');

}

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);