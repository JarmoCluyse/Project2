var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        // Create objects
        console.log("GamePlay");
        this.background1 = this.add.tileSprite(240,300,480,600, 'road')
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        //creates an obstacle
        obstacles = this.physics.add.group();
        //creates a pickup
        pickups = this.physics.add.group();
        // create car
        car = this.physics.add.sprite(60,550, 'car').setScale(1).setTint(0x00ff00);
        // on collision what happens
        this.physics.add.collider(car, obstacles, hitObstacle, null, this);
        this.physics.add.overlap(car, pickups, hitPickup, null, this);
        obstacles.create(60,100, 'car').setScale(1).setTint(0xff0000);
        pickups.create(180,100, 'car').setScale(1);
        pickups.create(300,100, 'car').setScale(1);
        //add callbacks for arrow key presses
        this.input.keyboard.on('keydown-RIGHT', moveCar);
        this.input.keyboard.on('keydown-UP', moveCar);
        this.input.keyboard.on('keydown-DOWN', moveCar);
        this.input.keyboard.on('keydown-LEFT', moveCar);
    
    },

    update: function() {
        if (!gameOver)
        {
            //move all moving items down by 0.5 px (game can be sped up or slowed down by changing this value)
            this.background1.tilePositionY -= speed
            for (i = 0; i < obstacles.children.entries.length; i++) {
                obstacles.children.entries[i].y += speed
            }
            for (i = 0; i < pickups.children.entries.length; i++) {
                pickups.children.entries[i].y += speed
            }
            
            
        }
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);

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
    game.scene.start('GameOver');
    game.scene.stop('GamePlay');

}
function hitPickup(car, pickup){
    console.log("pickup");
    pickup.disableBody(true, true);//remove the pickup from the screen
    score += 10;
    scoreText.setText('Score: ' + score);

}