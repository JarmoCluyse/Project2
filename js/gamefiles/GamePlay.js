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
        console.log("scene: GamePlay");
        // set the background
        this.background1 = this.add.tileSprite(240,400,480,800, 'road')
        // set the text
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        //creates an objects
        obstacles = this.physics.add.group();
        pickups = this.physics.add.group();
        car = this.physics.add.sprite(60,730, 'car').setScale(1).setTint(carColor);
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
            //move all moving items down by the speed variable
            this.background1.tilePositionY -= speed
            for (i = 0; i < obstacles.children.entries.length; i++) {
                if (obstacles.children.entries[i].y >= 850){
                    obstacles.remove(obstacles.children.entries[i], false);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else{
                    obstacles.children.entries[i].y += speed
                }

            }
            for (i = 0; i < pickups.children.entries.length; i++) {
                if (pickups.children.entries[i].y >= 850){
                    pickups.remove(pickups.children.entries[i], false);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    pickups.children.entries[i].y += speed;
                }

            }         
        }
        if(gameDone){
            // if gameover stop here to fix crash
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
        }
        if(gameOver){
            this.input.keyboard.on('keydown-RIGHT', continueGame);
            this.input.keyboard.on('keydown-UP', continueGame);
            this.input.keyboard.on('keydown-DOWN', continueGame);
            this.input.keyboard.on('keydown-LEFT', continueGame);
            this.input.keyboard.on('keydown-SPACE', continueGame);

        }
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);

function moveCar(e)
{
    // if an arrowkey is pressed
    if (!gameOver)
    {
        //debugging
        // console.log('move');
        // console.log(e);
        // console.log(car);
        // console.log(obstacles);

        //move the car
        e.preventDefault();
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
        if (e.key == " "){
            car.x = 540;
        }
    }


}
function continueGame(e)
{
    // if an arrowkey is pressed
    if (gameOver)
    {
        if (e.key == "ArrowLeft"){
            gameDone = true;
        }
        if (e.key == "ArrowUp"){
            gameDone = true;
        }
        if (e.key == "ArrowDown"){
            gameDone = true;
        }
        if (e.key == "ArrowRight"){
            gameDone = true;
        }
        if (e.key == " "){
            gameOver = false;
        }
    }


}
// if a collision happens
function hitObstacle(car, obstacles){
    gameOver = true;
    obstacles.disableBody(true, true);
    
}

function hitPickup(car, pickup){
    // pickup the coin
    console.log("pickup");
    pickup.disableBody(true, true);//remove the pickup from the screen
    score += 10;
    scoreText.setText('Score: ' + score);

}
function setcars(){
    let randomObstacles = getRandomobstakels();
    let randomPickups = getRandomInt(4 - randomObstacles);
    arr = [60,180,300,420];
    arr = shuffle(arr);
    
    for (i = 0; i < randomObstacles; i++) {

        var ShuffleColorList = shuffle(ColorList)
        if (ShuffleColorList[0] == carColor){
            randomColor = ShuffleColorList[1]
        }else {
            randomColor = ShuffleColorList[0]
        } 
        obstacles.create(arr[i],-50, 'car').setScale(1).setTint(randomColor);
    }
    for (i = 0; i < randomPickups; i++) {
        
        pickups.create(arr[i+randomObstacles],-50, 'coin').setScale(.2);
    }
    pickups.create(540,-50, 'coin').setScale(.2);
}

function getRandomobstakels() {
    let random = Math.floor(Math.random() * Math.floor(100));
    if(random < 20) return 0;
    if(random < 50) return 1;
    if(random < 90) return 2;
    else return 3;
}