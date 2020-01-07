var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
};
// declaring Game state
var GameState = {
    preload: function () {
        this.load.image('background', './assets/road.png')
    },
    create: function () {
        this.background = this.game.add.sprite(0, 0, 'background')
    },
    update: function () {
        
    },
};
// making new game
var game = new Phaser.Game(config);

game.add('GameState', GameState);
game.start('GameState');