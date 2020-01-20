var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlayCoop'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        // Create objects
        console.log("scene: GamePlay");
        // show game
        jsGameStart.classList.add('hide');
        jsGamePlay.classList.remove('hide');
        jsGameEnd.classList.add('hide');
        // set the background
        this.background1 = this.add.tileSprite(400,400,800,800, 'road')
        //creates an objects
        obstacles = this.physics.add.group();
        pickups = this.physics.add.group();
        car = this.physics.add.sprite(400,630, 'car').setTint(carColor);

        console.log(BeginSpeed);
        speed = BeginSpeed;

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
                    obstacles.remove(obstacles.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else{
                    obstacles.children.entries[i].y += speed
                }

            }
            for (i = 0; i < pickups.children.entries.length; i++) {
                if (pickups.children.entries[i].y >= 850){
                    pickups.remove(pickups.children.entries[i], true);
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

        }
        if(gameOver){
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
        e.preventDefault();
        //debugging
        // console.log('move');
        // console.log(e);
        // console.log(car);
        // console.log(obstacles);

        //move the car
        if (e.key == "ArrowLeft"){
            car.x = 250;
        }
        if (e.key == "ArrowUp"){
            car.x = 350;
        }
        if (e.key == "ArrowDown"){
            car.x = 450;
        }
        if (e.key == "ArrowRight"){
            car.x = 550;
        }
        if (e.key == " "){
            car.x = 650;
        }
    }
    else if (gameStarted && gameOver && !gameDone && answer) { // when car is hit
        if (e.key == "ArrowLeft"){
          if(CurrentQuestion.answers[ShuffledAnswers[0]].isCorrect){
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
          }
          else{
            gameDone = true;
            answer = false;
            jsGamePlay.classList.add('hide')
            jsGameQuestion.classList.add('hide');
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
          }     
        }
        if (e.key == "ArrowUp"){
          if(CurrentQuestion.answers[ShuffledAnswers[1]].isCorrect){
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
          }
          else{
            gameDone = true;
            answer = false;
            jsGamePlay.classList.add('hide')
            jsGameQuestion.classList.add('hide');
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
          } 
        }
        if (e.key == "ArrowDown"){
          if(CurrentQuestion.answers[ShuffledAnswers[2]].isCorrect){
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
          }
          else{
            gameDone = true;
            answer = false;
            jsGamePlay.classList.add('hide')
            jsGameQuestion.classList.add('hide');
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
          } 
        }
        if (e.key == "ArrowRight"){
          if(CurrentQuestion.answers[ShuffledAnswers[3]].isCorrect){
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
          }
          else{
            gameDone = true;
            answer = false;
            jsGamePlay.classList.add('hide')
            jsGameQuestion.classList.add('hide');
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
          } 
        }
        jsGameQuestion.innerHTML = ``;
      }
}
// if a collision happens
function hitObstacle(car, obstacle){
    getQuestions()
    jsGamePlay.classList.add('hide');
    jsGameQuestion.classList.remove('hide');
    for (i = obstacles.children.entries.length; i >= 0; i--) {
        obstacles.remove(obstacles.children.entries[i], true);
    }
    for (i = pickups.children.entries.length; i >= 0; i--) {
        pickups.remove(pickups.children.entries[i], true);
    }
    gameOver = true;
    sleep(2000).then(() => {answer = true;});

    
}

function hitPickup(car, pickup){
    // pickup the coin
    // console.log("pickup");
    pickup.disableBody(true, true);//remove the pickup from the screen
    score += scoreCoin;
    placeScore();

}

function setcars(){
    increasing();
    score += DriveScore;
    placeScore();
    let randomObstacles = getRandomobstakels();
    let randomPickups = getRandomInt(4 - randomObstacles);
    arr = [250,350,450, 550];
    arr = shuffle(arr);
    for (i = 0; i < randomObstacles; i++) {

        var ShuffleColorList = shuffle(Colors)
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
    // pickups.create(650,-50, 'coin').setScale(.2);
}

function getRandomobstakels() {
    let random = Math.floor(Math.random() * Math.floor(100));
    if(random < 20) return 0;
    if(random < 50) return 1;
    if(random < 90) return 2;
    else return 3;
}

function increasing(){
    if (increase){
        if (waitIncrease >= speedIncrease){
            speed += increaseValue;
            console.log(speed);
            console.log(waitIncrease);
            
            // console.log(speed);
            
            waitIncrease = 0;
        }
        waitIncrease ++;
    }
}