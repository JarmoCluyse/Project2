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
    // -------------------------- //
    // Preload background
    // -------------------------- //
    this.load.image('road', 'assets/road.png');
    this.load.image('roadCoop', 'assets/roadCoop.png');
    // -------------------------- //
    // Preload track items
    // -------------------------- //
    this.load.image('car', 'assets/car.png');
    this.load.image('coin', 'assets/coin.png');
    // -------------------------- //
    // Preload Decorations
    // -------------------------- //
    this.load.image('tree1', 'assets/tree1.png');
    this.load.image('tree2', 'assets/tree2.png');
    this.load.image('tire', 'assets/tire.png');
    this.load.image('dog', 'assets/dog.png');
    this.load.image('cat', 'assets/cat.png');
    this.load.image('goose', 'assets/goose.png');
    this.load.image('grass1', 'assets/grass1.png');
    this.load.image('bush1', 'assets/bush.png');
    this.load.image('puddle', 'assets/puddle.png');
    // -------------------------- //
    // Preload PowerUps
    // -------------------------- //
    this.load.image('heart', 'assets/heart.png');
    this.load.image('chest', 'assets/chest.png');
    this.load.image('magnet', 'assets/magnet.png');
    // -------------------------- //
    // Preload Sounds
    // -------------------------- //
    this.load.audio('coinMusic', 'assets/coin.wav');
    this.load.audio('PowerUpMusic', 'assets/powerup.wav');
    this.load.audio('PowerOffMusic', 'assets/powerupoff.wav');
    this.load.audio('correctMusic', 'assets/correct.wav');
    this.load.audio('HitMusic', 'assets/crash.wav');
    },
    create: function() {
        game.scene.start('MainMenu');
    },
    update: function() {
        // Update objects & variables
    }
});
// Add scene to list of scenes
myGame.scenes.push(preloadState);