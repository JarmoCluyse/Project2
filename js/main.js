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
    width: 480,
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
    this.load.image('car', 'assets/car.png');
}
var cars;


function create ()
{
    this.background1 = this.add.tileSprite(240,300,480,600, 'road')
    cars = this.physics.add.staticGroup();
    cars.create(60,550, 'car').setScale(1).refreshBody();
    this.input.keyboard.on('keydown-RIGHT', moveCar);
    this.input.keyboard.on('keydown-UP', moveCar);
    this.input.keyboard.on('keydown-DOWN', moveCar);
    this.input.keyboard.on('keydown-LEFT', moveCar);
}

function update ()
{
    this.background1.tilePositionY -= 0.5
}
function moveCar(e)
{
    console.log('move');
    console.log(e);
    console.log(cars);
    if (e.key == "ArrowLeft"){
        cars.children.entries[0].x = 60;
    }
    if (e.key == "ArrowUp"){
        cars.children.entries[0].x = 180;
    }
    if (e.key == "ArrowDown"){
        cars.children.entries[0].x = 300;
    }
    if (e.key == "ArrowRight"){
        cars.children.entries[0].x = 420;
    }

    
}

