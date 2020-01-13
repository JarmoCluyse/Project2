//------------------------------- //
// Scene: main menu
//------------------------------- //

var mainMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
  
    preload: function() {
        // in seperate file Preloads
    },

    create: function() {
        // log the current scene
        console.log("MainMenu");
        // to next scene
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