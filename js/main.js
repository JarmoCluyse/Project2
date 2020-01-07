var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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
var car;
var obstacles;
var pickups;
var score = 0;
var gameOver = false;
var scoreText;


function create ()
{
    this.background1 = this.add.tileSprite(240,300,480,600, 'road')
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    obstacles = this.physics.add.group();
    obstacles.create(60,100, 'car').setScale(1).setTint(0xff0000);;
    pickups = this.physics.add.group();
    pickups.create(180,100, 'car').setScale(1);
    car = this.physics.add.sprite(60,550, 'car').setScale(1);
    this.physics.add.collider(car, obstacles, hitObstacle, null, this);
    this.physics.add.overlap(car, pickups, hitPickup, null, this);
    this.input.keyboard.on('keydown-RIGHT', moveCar);
    this.input.keyboard.on('keydown-UP', moveCar);
    this.input.keyboard.on('keydown-DOWN', moveCar);
    this.input.keyboard.on('keydown-LEFT', moveCar);
    
}

function update ()
{
    if (gameOver)
    {
        return;
    }
    this.background1.tilePositionY -= 0.5
    obstacles.children.entries[0].y +=0.5
    pickups.children.entries[0].y +=0.5
}
function moveCar(e)
{
    console.log('move');
    console.log(e);
    console.log(car);
    console.log(obstacles);
    if (e.key == "ArrowLeft"){
        car.x = 60;
    }
    if (e.key == "ArrowUp"){
        car.x = 180;
    }
    if (e.key == "ArrowDown"){
        car.x = 300;
    }
    if (e.key == "ArrowRight"){
        car.x = 420;
    }

}
function hitObstacle(car, obstacles){
    car.setTint(0xff0000);
    gameOver = true;

}
function hitPickup(car, pickup){
    console.log("pickup");
    pickup.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

}


