//------------------------------- //
// Preloads of the game
//------------------------------- //
var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preload(){
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
    // Preload images
    this.load.image('road', 'assets/road.png');
    this.load.image('car', 'assets/car.png');
    this.load.image('coin', 'assets/coin.png');
    
    },
    create: function() {
        console.log("Preload");
        game.scene.start('MainMenu');
        setInterval(function() {
            if (!gameOver && gameStarted){
                if(!coop){
                    setcars();
                    console.log('ik werk s');                    
                }
                else{
                    setcars2();
                    console.log('ik werk c');
                }                }
            }, distance * 1000);
    },
    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(preloadState);