var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    this.background1 = this.add.tileSprite(400,300,960,600, 'road').setScale(1.6)
}

function update ()
{
    this.background1.tilePositionY -= 0.5
}
