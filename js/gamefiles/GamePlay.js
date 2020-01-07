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
        //add callbacks for arrow key presses
        this.input.keyboard.on('keydown-RIGHT', moveCar);
        this.input.keyboard.on('keydown-UP', moveCar);
        this.input.keyboard.on('keydown-DOWN', moveCar);
        this.input.keyboard.on('keydown-LEFT', moveCar);
        this.input.keyboard.on('keydown-SPACE', moveCar);
    
    },

    update: function() {
        if (!gameOver)
        {
            //move all moving items down by 0.5 px (game can be sped up or slowed down by changing this value)
            this.background1.tilePositionY -= 0.5
            obstacles.children.entries[0].y +=0.5
            pickups.children.entries[0].y +=0.5
        }
        if(gameOver){
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
        }
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);

function moveCar(e)
{
    if (!gameOver)
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
    gameOver = true;

function hitPickup(car, pickup){
    console.log("pickup");
    pickup.disableBody(true, true);//remove the pickup from the screen
    score += 10;
    scoreText.setText('Score: ' + score);

}
function setcars(){
    let randomObstacles = getRandomobstakels();
    console.log(randomObstacles);
    let randomPickups = getRandomInt(4 - randomObstacles);
    console.log(randomPickups);
    arr = [60,180,300,420];
    arr = shuffle(arr);
    
    for (i = 0; i < randomObstacles; i++) {
        
        obstacles.create(arr[i],100, 'car').setScale(1).setTint(0xff0000);
    }
    for (i = 0; i < randomPickups; i++) {
        console.log(arr[i+randomObstacles]);
        
        pickups.create(arr[i+randomObstacles],100, 'car').setScale(1).setTint(0x0000ff);
    }
}

function getRandomobstakels() {
    let random = Math.floor(Math.random() * Math.floor(100));
    if(random < 20) return 0;
    if(random < 50) return 1;
    if(random < 90) return 2;
    else return 3;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(array) {
    var ctr = array.length, temp, index;

    // While there are elements in the array
        while (ctr > 0) {
    // Pick a random index
            index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
            ctr--;
    // And swap the last element with it
            temp = array[ctr];
            array[ctr] = array[index];
            array[index] = temp;
        }
        return array;
}