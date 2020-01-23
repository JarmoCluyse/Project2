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
        loopHighscores = 1;
        getHighscores();
        // show game
        jsMainCard.classList.remove("c-start-card");
        jsGameQuestion.classList.add("hide");
        jsGameStart.classList.add('hide');
        jsGamePlay.classList.remove('hide');
        jsSplashTitle.classList.add('hide');
        jsGameEnd.classList.add('hide');
        
        //creates an objects
        obstacles = this.physics.add.group();
        pickups = this.physics.add.group();
        decorations = this.physics.add.group();
        PowerUpCoins = this.physics.add.group();
        PowerUpMagnets = this.physics.add.group();
        PowerUphearts = this.physics.add.group();
        if(mode == 'SP'){
            // set the background
            this.background1 = this.add.tileSprite(400,400,800,800, 'road')
            car = this.physics.add.sprite(400,730, 'car').setTint(carColor);
        }
        if(mode == 'COOP'){
            // set the background
            this.background1 = this.add.tileSprite(400,400,800,800, 'roadCoop')
            car = this.physics.add.sprite(300,730, 'car').setTint(carColor);
            car2 = this.physics.add.sprite(500,730, 'car').setTint(carColor2);
        }
        moveCar(startEvent);
        speed = BeginSpeed;

        PowerUpCoins.create(150,-50, 'chest').setScale(.08);
        PowerUpMagnets.create(150,0, 'magnet').setScale(.08);
        jsheartcount.innerHTML = PowerUpheart;
        jschest.style.opacity = .6;
        jsmagnet.style.opacity = .6;

        // on collision what happens
        this.physics.add.collider(car, obstacles, hitObstacle, null, this);
        this.physics.add.overlap(car, pickups, hitPickup, null, this);
        this.physics.add.overlap(car, PowerUpCoins, hitPowerUpCoin, null, this);
        this.physics.add.overlap(car, PowerUpMagnets, hitPowerUpMagnet, null, this);
        this.physics.add.overlap(car, PowerUphearts, hitPowerUpHeart, null, this);
        this.physics.add.collider(PowerUpCoins, obstacles, hitPowerUpObstacle, null, this);
        this.physics.add.collider(PowerUpMagnets, obstacles, hitPowerUpObstacle, null, this);
        this.physics.add.collider(PowerUphearts, obstacles, hitPowerUpObstacle, null, this);
        this.physics.add.collider(PowerUpCoins, pickups, hitPowerUpObstacle, null, this);
        this.physics.add.collider(PowerUpMagnets, pickups, hitPowerUpObstacle, null, this);
        this.physics.add.collider(PowerUphearts, pickups, hitPowerUpObstacle, null, this);
        this.physics.add.collider(decorations, decorations, DecorationHit, null, this);
        if(mode == 'COOP'){
            this.physics.add.collider(car2, obstacles, hitObstacle, null, this);
            this.physics.add.overlap(car2, pickups, hitPickup, null, this);
        }
        //add callbacks for arrow key presses
        this.input.keyboard.on('keydown-RIGHT', moveCar);
        this.input.keyboard.on('keydown-UP', moveCar);
        this.input.keyboard.on('keydown-DOWN', moveCar);
        this.input.keyboard.on('keydown-LEFT', moveCar);
        this.input.keyboard.on('keydown-SPACE', moveCar);
    
    },

    update: function() {
        if (!gameOver && gameStarted)
        {
            placeScore();
            if (counter >= distance){         
                if (!PowerUpCoin){
                    setcars();
                    distance -= 0.025;

                }
                if (PowerUpCoin) {
                    setCoins();
                    distance -= 0.025;
                }
                counter = 0;
            }
            counter ++;   
            //move all moving items down by the speed variable
            this.background1.tilePositionY -= speed
            placeDecorations();
            for (i = 0; i < obstacles.children.entries.length; i++) {
                if (obstacles.children.entries[i].y >= 850){
                    obstacles.remove(obstacles.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else{
                    obstacles.children.entries[i].y += (speed / 2)
                }

            }
            for (i = 0; i < pickups.children.entries.length; i++) {
                if (pickups.children.entries[i].y >= 850){
                    pickups.remove(pickups.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    if (!PowerUpMagnet){
                        pickups.children.entries[i].y += (speed );
                    }
                    if (PowerUpMagnet){
                        let xdiff
                        if(mode == 'SP'){
                            xdiff = (car.x -pickups.children.entries[i].x)
                        }
                        if(mode == 'COOP'){
                            if (pickups.children.entries[i].x > 400){
                                xdiff = (car2.x -pickups.children.entries[i].x)
                            }
                            if (pickups.children.entries[i].x < 400){
                                xdiff = (car.x -pickups.children.entries[i].x)
                            }
                        }
                        
                        if ( xdiff > (Math.random() * 5  + 8) ){
                            pickups.children.entries[i].x += (Math.random() * 10  + xdiff/20)
                        } 
                        else if ( xdiff < (Math.random() * 5  -13) ) {
                            pickups.children.entries[i].x -= (Math.random() * 10  + -1*xdiff/20)
                        }
                        let ydiff = (car.y -pickups.children.entries[i].y)
                        if ( ydiff > (Math.random() * 5  + 8) ){
                            pickups.children.entries[i].y += (Math.random() * 10  + ydiff/20)
                        } 
                        else if ( ydiff < (Math.random() * 5  -13) ) {
                            pickups.children.entries[i].y -= (Math.random() * 10  + -1*ydiff/20)
                        }
                    }
                }

            }
            for (i = 0; i < decorations.children.entries.length; i++) {
                if (decorations.children.entries[i].y >= 950){
                    decorations.remove(decorations.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    decorations.children.entries[i].y += speed;
                }

            }          
            for (i = 0; i < PowerUpCoins.children.entries.length; i++) {
                if (PowerUpCoins.children.entries[i].y >= 950){
                    PowerUpCoins.remove(PowerUpCoins.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    PowerUpCoins.children.entries[i].y += speed;
                }

            }          
            for (i = 0; i < PowerUpMagnets.children.entries.length; i++) {
                if (PowerUpMagnets.children.entries[i].y >= 950){
                    PowerUpMagnets.remove(PowerUpMagnets.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    PowerUpMagnets.children.entries[i].y += speed;
                }

            }          
            for (i = 0; i < PowerUphearts.children.entries.length; i++) {
                if (PowerUphearts.children.entries[i].y >= 950){
                    PowerUphearts.remove(PowerUphearts.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    PowerUphearts.children.entries[i].y += speed;
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

let moveCar = function(e)
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
            if (car.x != 250){
                car.x = 250;
                noLaneChanges++;
                score++;
            }
            
        }
        if (e.key == "ArrowUp"){
            if (car.x != 350){
                car.x = 350;
                noLaneChanges++;
                score++;
            }
        }
        if (e.key == "ArrowDown"){
            if(mode == 'SP'){
                car.x = 450;
                if (car.x != 450){
                    car.x = 450;
                    noLaneChanges++;
                    score++;
                }
            }
            if(mode == 'COOP'){
                if (car2.x != 450){
                    car2.x = 450;
                    noLaneChangesP2++;
                    score++;
                }
            }
            
        }
        if (e.key == "ArrowRight"){
            if(mode == 'SP'){
                if (car.x != 550){
                    car.x = 550;
                    noLaneChanges++;
                    score++;
                }
            }
            if(mode == 'COOP'){
                if (car2.x != 550){
                    car2.x = 550;
                    noLaneChangesP2++;
                    score++;
                }
            }
            
        }
        if (e.key == " "){
            car.x = 150;
            if(mode == 'COOP'){
                car2.x = 650;
            }
        }
    }
    else if (gameStarted && gameOver && !gameDone && answer) { // when car is hit
        if (e.key == "ArrowLeft"){
          if(CurrentQuestion.answers[ShuffledAnswers[0]].isCorrect){
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
            questionsAnswered ++;      
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
            questionsAnswered ++;   
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
            questionsAnswered ++;   
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
            questionsAnswered ++;   
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
let hitObstacle = function(car, obstacle){
    for (i = obstacles.children.entries.length; i >= 0; i--) {
        obstacles.remove(obstacles.children.entries[i], true);
    }
    for (i = pickups.children.entries.length; i >= 0; i--) {
        pickups.remove(pickups.children.entries[i], true);
    }
    if (PowerUpheart <= 0){
        getQuestions()
        jsGamePlay.classList.add('hide');
        jsGameQuestion.classList.remove('hide');
        gameOver = true;
        sleep(2000).then(() => {answer = true;});
    }
    else{
        PowerUpheart --
        jsheartcount.innerHTML = PowerUpheart;
    }

    
}

let hitPickup = function(car, pickup){
    // pickup the coin
    // console.log("pickup");
    pickup.disableBody(true, true);//remove the pickup from the screen
    score += scoreCoin;

}

let hitPowerUpCoin = function(car, powerUp){
    powerUp.disableBody(true, true);//remove the pickup from the screen
    PowerUpCoin = true;
    jschest.style.opacity = 1;
    let oldDistance = distance;
    distance = 10
    for (i = obstacles.children.entries.length; i >= 0; i--) {
        obstacles.remove(obstacles.children.entries[i], true);
    }
    sleep(2000).then(() => {PowerUpCoin = false; distance = oldDistance; jschest.style.opacity = .6;});
}
let hitPowerUpMagnet = function(car, powerUp){
    powerUp.disableBody(true, true);//remove the pickup from the screen
    PowerUpMagnet = true;
    jsmagnet.style.opacity = 1;
    sleep(10000).then(() => {PowerUpMagnet = false; jsmagnet.style.opacity = .6;});
}
let hitPowerUpHeart = function(car, powerUp){
    powerUp.disableBody(true, true);//remove the pickup from the screen
    PowerUpheart += 1;
    jsheartcount.innerHTML = PowerUpheart;
    console.log(PowerUpheart);
    
}

let DecorationHit = function(decoration, dacoration2){
    dacoration2.disableBody(true, true);//remove the pickup from the screen
}
let hitPowerUpObstacle = function (powerup, other) {
    other.disableBody(true, true);
}

let setcars = function(){
    increasing();
    score += DriveScore;
    let randomObstacles = getRandomobstakels();
    let randomPickups = getRandomInt(lanes - randomObstacles);
    let randomObstacles2 = getRandomobstakels();
    let randomPickups2 = getRandomInt(2 - randomObstacles);
    let power = getRandomInt(100)
    let powerarr = [250,350,450, 550];
    powerarr = shuffle(powerarr);
    if (power <= 5 && power > 0){
        PowerUpCoins.create(powerarr[0],-50, 'chest').setScale(.08);
        
    }
    if (power <= 10 && power > 5){
        PowerUpMagnets.create(powerarr[0],0, 'magnet').setScale(.08);
    }
    if (power <= 15 && power > 10){
        PowerUphearts.create(powerarr[0],-100, 'heart').setScale(.006);
    }
    if(mode == 'SP'){
        arr = [250,350,450, 550];
        arr = shuffle(arr);
    }
    if(mode == 'COOP'){
        arr = [250,350];
        arr = shuffle(arr);
        arr2 = [450, 550];
        arr2 = shuffle(arr2);
    }
    for (i = 0; i < randomObstacles; i++) {
        var ShuffleColorList = shuffle(Colors)
        if(mode == 'SP'){
            if (ShuffleColorList[0] == carColor){
                randomColor = ShuffleColorList[1]
            }else {
                randomColor = ShuffleColorList[0]
            }
        }
        if(mode == 'COOP'){
            let ii = 0;
            while (ShuffleColorList[ii] == carColor || ShuffleColorList[ii] == carColor2) {
                ii ++;
            }
            randomColor = ShuffleColorList[ii]
        }
        obstacles.create(arr[i],-50, 'car').setScale(1).setTint(randomColor);
    }
    if(mode == 'COOP'){
        for (i = 0; i < randomObstacles2; i++) {
            let ShuffleColorList = shuffle(Colors)
            let ii = 0;
            while (ShuffleColorList[ii] == carColor || ShuffleColorList[ii] == carColor2) {
                ii ++;
            }
            randomColor = ShuffleColorList[ii]
            obstacles.create(arr2[i],-50, 'car').setScale(1).setTint(randomColor);
        }
    }
    for (i = 0; i < randomPickups; i++) {
        pickups.create(arr[i+randomObstacles],(Math.random() * 5  -55), 'coin').setScale(.2);

    }
    if(mode == 'COOP'){
        for (i = 0; i < randomPickups2; i++) {
            pickups.create(arr2[i+randomObstacles2],(Math.random() * 5  -55), 'coin').setScale(.2);                
        }
    }
    //  pickups.create(150,-50, 'coin').setScale(.2);
    //  if(mode == 'COOP'){
    //  pickups.create(650,-50, 'coin').setScale(.2);
    //  }
}
var setCoins = function name(params) {
    arr = [250,350,450, 550];
    for (i = 0; i < arr.length; i++) {
        pickups.create(arr[i],(Math.random() * 5 -50), 'coin').setScale(.2);
    } 
}

let getRandomobstakels = function() {
    let random = Math.floor(Math.random() * Math.floor(100));
    if(mode == 'SP'){
        if(random < 20) return 0;
        if(random < 50) return 1;
        if(random < 90) return 2;
        else return 3;
    }
    if(mode == 'COOP'){
        if(random > 35) return 1;
        return 0;
    }

}

let increasing = function(){
    if (increase){
        if (waitIncrease >= speedIncrease){
            speed += increaseValue;
            
            waitIncrease = 0;
        }
        waitIncrease ++;
    }
}
