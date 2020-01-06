var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('road', 'assets/road.png');
    this.load.image('car', 'assets/car.png');
}
var cars;

function create ()
{
    this.background1 = this.add.tileSprite(window.innerWidth * window.devicePixelRatio /2,window.innerHeight * window.devicePixelRatio /2,480,700, 'road').setScale(2.5);
    cars = this.physics.add.staticGroup();
    cars.create(400, 568, 'car').setScale(0.2).refreshBody();
}

function update ()
{
    this.background1.tilePositionY -= 0.5
}
