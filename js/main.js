// Config of the game
var config = {
    // Rendering auto
    type: Phaser.AUTO,
    // Width and height of the game
    width: 480,
    height: 600,
    autoResize: true,
    // Enable physics
    physics: {
        default: 'arcade',
        arcade: {
            // Disable gravity
            // Physics needded for collisions
            gravity: { y: 0 },
            // shows hitboxes
            debug: true
        }
    },
    // scenes
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// Variables
var game = new Phaser.Game(config);
// The player - car
var car;
//contains the obstacles
var obstacles;
//contains the pickups
var pickups;
// rest
var score = 0;
var gameOver = false;
var scoreText;

// Game has 3 gunctions
// preload: load the images
function preload ()
{
    this.load.image('road', 'assets/road.png');
    this.load.image('car', 'assets/car.png');
}
// creats: puts items in game
function create ()
{
    this.background1 = this.add.tileSprite(240,300,480,600, 'road')
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    // make the obstacles and powerups
    //creates an obstacle
    obstacles = this.physics.add.group();
    //creates a pickup
    pickups = this.physics.add.group();
    // create car
    car = this.physics.add.sprite(60,550, 'car').setScale(1).setTint(0x00ff00);//creates the car
    // on collision what happens
    this.physics.add.collider(car, obstacles, hitObstacle, null, this);
    this.physics.add.overlap(car, pickups, hitPickup, null, this);
    obstacles.create(60,100, 'car').setScale(1).setTint(0xff0000);
    pickups.create(180,100, 'car').setScale(1);
    //add callbacks for arrow key presses
    this.input.keyboard.on('keydown-RIGHT', moveCar);
    this.input.keyboard.on('keydown-UP', moveCar);
    this.input.keyboard.on('keydown-DOWN', moveCar);
    this.input.keyboard.on('keydown-LEFT', moveCar);
    
}

function update ()
{
    if (!gameOver)
    {
        //move all moving items down by 0.5 px (game can be sped up or slowed down by changing this value)
        this.background1.tilePositionY -= 0.5
        obstacles.children.entries[0].y +=0.5
        pickups.children.entries[0].y +=0.5
    }

}




function moveCar(e)
{
    //debugging
    console.log('move');
    console.log(e);
    console.log(car);
    console.log(obstacles);

    //move to right lane
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
    pickup.disableBody(true, true);//remove the pickup from the screen
    score += 10;
    scoreText.setText('Score: ' + score);

}