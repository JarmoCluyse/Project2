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
        this.background1 = this.add.tileSprite(400,400,900,900, 'white')
        Text = this.add.text(16, 300, 'press arrow to start', { fontSize: '32px', fill: '#747474' });
        // look for key presses
        this.input.keyboard.on('keydown-RIGHT', keyListener);
        this.input.keyboard.on('keydown-UP', keyListener);
        this.input.keyboard.on('keydown-DOWN', keyListener);
        this.input.keyboard.on('keydown-LEFT', keyListener);
        
    },

    update: function() {
        // Update objects & variables
    },
});
// Add scene to list of scenes
myGame.scenes.push(mainMenuState);