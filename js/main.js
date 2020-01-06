var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    autoResize: true,
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
}

function create ()
{
    this.background1 = this.add.tileSprite(window.innerWidth * window.devicePixelRatio /2,window.innerHeight * window.devicePixelRatio /2,480,700, 'road').setScale(2.5)
}

function update ()
{
    this.background1.tilePositionY -= 0.5
}
