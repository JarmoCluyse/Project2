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
        console.log("scene: GamePlay");
        // -------------------------- //
        // Create objects
        // -------------------------- //
        loopHighscores = 1;
        getHighscores();
        // -------------------------- //
        // Show Game
        // -------------------------- //
        jsMainCard.classList.remove("c-start-card");
        jsGameQuestion.classList.add("hide");
        jsGameStart.classList.add('hide');
        jsGamePlay.classList.remove('hide');
        jsSplashTitle.classList.add('hide');
        jsGameEnd.classList.add('hide');
        // -------------------------- //
        // Creates an objects
        // -------------------------- //
        obstacles = this.physics.add.group();
        pickups = this.physics.add.group();
        decorations = this.physics.add.group();
        PowerUpCoins = this.physics.add.group();
        PowerUpMagnets = this.physics.add.group();
        PowerUphearts = this.physics.add.group();
        // -------------------------- //
        // Add sounds
        // -------------------------- //
        coinMusic = this.sound.add('coinMusic');
        PowerUpMusic = this.sound.add('PowerUpMusic');
        HitMusic = this.sound.add('HitMusic');
        // -------------------------- //
        // Set the background + users
        // -------------------------- //
        if(mode == 'SP'){
            this.background1 = this.add.tileSprite(400,400,800,800, 'road')
            car = this.physics.add.sprite(400,730, 'car').setTint(carColor);
        }
        if(mode == 'COOP'){
            this.background1 = this.add.tileSprite(400,400,800,800, 'roadCoop')
            car = this.physics.add.sprite(300,730, 'car').setTint(carColor);
            car2 = this.physics.add.sprite(500,730, 'car').setTint(carColor2);
        }
        // -------------------------- //
        // function to move the car
        // -------------------------- //
        moveCar(startEvent);
        // -------------------------- //
        // set default things
        // -------------------------- //
        // set the powerups inactive
        jsheart.style.opacity = 0.4;
        jschest.style.opacity = 0.4;
        jsmagnet.style.opacity = 0.4;
        // set the speed to the beginspeed
        speed = BeginSpeed;

        // place the powerups for testing
        if(testing){
            PowerUphearts.create(150,-100, 'heart').setScale(.006);
            PowerUpCoins.create(150,-50, 'chest').setScale(.08);
            PowerUpMagnets.create(150,0, 'magnet').setScale(.08);
        }
        // -------------------------- //
        // Collisions
        // -------------------------- //
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
            // if coop colliser with 2nd car
            this.physics.add.collider(car2, obstacles, hitObstacle, null, this);
            this.physics.add.overlap(car2, pickups, hitPickup, null, this);
        }
        // -------------------------- //
        // Callbacks for arrow key presses
        // -------------------------- //
        this.input.keyboard.on('keydown-RIGHT', moveCar);
        this.input.keyboard.on('keydown-UP', moveCar);
        this.input.keyboard.on('keydown-DOWN', moveCar);
        this.input.keyboard.on('keydown-LEFT', moveCar);
        this.input.keyboard.on('keydown-SPACE', moveCar);
    
    },

    update: function() {
        if (!gameOver && gameStarted){ // when game is playing
            // -------------------------- //
            // score update
            // -------------------------- //
            placeScore();
            // -------------------------- //
            // delay for placement car
            // -------------------------- //
            if (counter >= distance){         
                if (!PowerUpCoin){
                    setcars();
                }
                if (PowerUpCoin) {
                    setCoins();
                }
                counter = 0; // counter back to 0
            }
            counter ++;  // each update 60/s add 1 to counter
            // -------------------------- //
            // Place Decorations
            // -------------------------- //
            placeDecorations();
            // -------------------------- //
            // Move down
            // -------------------------- //
            this.background1.tilePositionY -= speed
            for (i = 0; i < obstacles.children.entries.length; i++) { // move each obstacle down
                if (obstacles.children.entries[i].y >= 850){ // if item out of sight => delete
                    obstacles.remove(obstacles.children.entries[i], true);
                    i--;
                }
                else{
                    obstacles.children.entries[i].y += (speed / 2)
                }

            }
            for (i = 0; i < pickups.children.entries.length; i++) { // move each pickup down
                if (pickups.children.entries[i].y >= 850){ // if item out of sight => delete
                    pickups.remove(pickups.children.entries[i], true);
                    i--;
                }
                else {
                    if (!PowerUpMagnet){ // move down
                        pickups.children.entries[i].y += (speed );
                    }
                    if (PowerUpMagnet){ // if magnet is enabled move to player
                        let xdiff // calculate distance to know speed
                        if(mode == 'SP'){
                            xdiff = (car.x -pickups.children.entries[i].x)
                        }
                        if(mode == 'COOP'){ // in coop move to the nearest car
                            if (pickups.children.entries[i].x > 400){
                                xdiff = (car2.x -pickups.children.entries[i].x)
                            }
                            if (pickups.children.entries[i].x < 400){
                                xdiff = (car.x -pickups.children.entries[i].x)
                            }
                        }
                        if ( xdiff > (Math.random() * 5  + 8) ){ // move random to right
                            pickups.children.entries[i].x += (Math.random() * 10  + xdiff/20)
                        } 
                        else if ( xdiff < (Math.random() * 5  -13) ) { // move random to left
                            pickups.children.entries[i].x -= (Math.random() * 10  + -1*xdiff/20)
                        }
                        let ydiff = (car.y -pickups.children.entries[i].y) // also in y direction
                        if ( ydiff > (Math.random() * 5  + 8) ){
                            pickups.children.entries[i].y += (Math.random() * 10  + ydiff/20)
                        } 
                        else if ( ydiff < (Math.random() * 5  -13) ) {
                            pickups.children.entries[i].y -= (Math.random() * 10  + -1*ydiff/20)
                        }
                    }
                }

            }
            for (i = 0; i < decorations.children.entries.length; i++) { // move each decoration down
                if (decorations.children.entries[i].y >= 950){ // if item out of sight => delete
                    decorations.remove(decorations.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    decorations.children.entries[i].y += speed;
                }

            }          
            for (i = 0; i < PowerUpCoins.children.entries.length; i++) { // move each chest down
                if (PowerUpCoins.children.entries[i].y >= 950){ // if item out of sight => delete
                    PowerUpCoins.remove(PowerUpCoins.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    PowerUpCoins.children.entries[i].y += speed;
                }

            }          
            for (i = 0; i < PowerUpMagnets.children.entries.length; i++) { // move each magnet down
                if (PowerUpMagnets.children.entries[i].y >= 950){ // if item out of sight => delete
                    PowerUpMagnets.remove(PowerUpMagnets.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    PowerUpMagnets.children.entries[i].y += speed;
                }

            }          
            for (i = 0; i < PowerUphearts.children.entries.length; i++) { // move each heart down
                if (PowerUphearts.children.entries[i].y >= 950){ // if item out of sight => delete
                    PowerUphearts.remove(PowerUphearts.children.entries[i], true);
                    //console.log(pickups.children.entries.length);
                    i--;
                }
                else {
                    PowerUphearts.children.entries[i].y += speed;
                }

            }          
        }
    }
});
// -------------------------- //
// Add scene to list of scenes
// -------------------------- //
myGame.scenes.push(gamePlayState);
// -------------------------- //
// Move the car
// -------------------------- //
let moveCar = function(e) { // if an arrowkey is pressed
    // -------------------------- //
    // Game Playing
    // -------------------------- //
    if (!gameOver) {
        e.preventDefault(); //prevent scrolling
        // -------------------------- //
        // Debugging
        // -------------------------- //
        // console.log('move');
        // console.log(e);
        // console.log(car);
        // console.log(obstacles);
        // -------------------------- //
        // Move the car
        // -------------------------- //
        if (e.key == "ArrowLeft"){
            if (car.x != 250){
                car.x = 250; // move the car
                noLaneChanges++; // count how many lane changes
                score++; // add movement to score
            }
            
        }
        if (e.key == "ArrowUp"){
            if (car.x != 350){
                car.x = 350; // move the car
                noLaneChanges++; // count how many lane changes
                score++; // add movement to score
            }
        }
        if (e.key == "ArrowDown"){
            if(mode == 'SP'){ // in singleplayer move car1
                if (car.x != 450){
                    car.x = 450; // move the car
                    noLaneChanges++; // count how many lane changes
                    score++; // add movement to score
                }
            }
            if(mode == 'COOP'){ // in coop move car2
                if (car2.x != 450){
                    car2.x = 450; // move the car
                    noLaneChangesP2++; // count how many lane changes
                    score++; // add movement to score
                }
            }
            
        }
        if (e.key == "ArrowRight"){
            if(mode == 'SP'){ // in singleplayer move car1
                if (car.x != 550){
                    car.x = 550; // move the car
                    noLaneChanges++; // count how many lane changes
                    score++; // add movement to score
                }
            }
            if(mode == 'COOP'){
                if (car2.x != 550){ // in coop move car2
                    car2.x = 550; // move the car
                    noLaneChangesP2++; // count how many lane changes
                    score++; // add movement to score
                }
            }
            
        }
        // testing
        if (e.key == " " && testing){ // move out of track
            car.x = 150;
            if(mode == 'COOP'){
                car2.x = 650;
            }
        }
    }
    // -------------------------- //
    // game over => question
    // -------------------------- //
    else if (gameStarted && gameOver && !gameDone && answer) { // if you don't have a haert
        if (e.key == "ArrowLeft"){
          if(CurrentQuestion.answers[ShuffledAnswers[0]].isCorrect){ // answer correct show game => play along
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
            questionsAnswered ++; // Count the correct answered questions
          }
          else{ // stop game go to highscores
            gameDone = true;
            answer = false;
            jsGamePlay.classList.add('hide')
            jsGameQuestion.classList.add('hide');
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
          }     
        }
        if (e.key == "ArrowUp"){
          if(CurrentQuestion.answers[ShuffledAnswers[1]].isCorrect){ // answer correct show game => play along
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
            questionsAnswered ++; // Count the correct answered questions
          }
          else{ // stop game go to highscores
            gameDone = true;
            answer = false;
            jsGamePlay.classList.add('hide')
            jsGameQuestion.classList.add('hide');
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
          } 
        }
        if (e.key == "ArrowDown"){
          if(CurrentQuestion.answers[ShuffledAnswers[2]].isCorrect){ // answer correct show game => play along
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
            questionsAnswered ++; // Count the correct answered questions 
          }
          else{ // stop game go to highscores
            gameDone = true;
            answer = false;
            jsGamePlay.classList.add('hide')
            jsGameQuestion.classList.add('hide');
            game.scene.stop('GamePlay');
            game.scene.start('GameOver');
          } 
        }
        if (e.key == "ArrowRight"){
          if(CurrentQuestion.answers[ShuffledAnswers[3]].isCorrect){ // answer correct show game => play along
            jsGamePlay.classList.remove('hide');
            jsGameQuestion.classList.add('hide');
            gameOver = false;
            answer = false;
            questionsAnswered ++; // Count the correct answered questions
          }
          else{ // stop game go to highscores
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
// -------------------------- //
// Collistions
// -------------------------- //
// user with obstacle
// -------------------------- //
let hitObstacle = function(car, obstacle){
    // sound hit a car
    HitMusic.play();
    for (i = obstacles.children.entries.length; i >= 0; i--) { // remove all obstacles
        obstacles.remove(obstacles.children.entries[i], true);
    }
    for (i = pickups.children.entries.length; i >= 0; i--) { // remove all coins
        pickups.remove(pickups.children.entries[i], true);
    }
    if (!PowerUpheart){ // if you don't have a haert give a question
        getQuestions()
        jsGamePlay.classList.add('hide');
        jsGameQuestion.classList.remove('hide');
        gameOver = true;
        sleep(2000).then(() => {answer = true;});
    }
    else{ // disable yout haert
        PowerUpheart = false;
        jsheart.style.opacity = 0.4;
    }

    
}
// -------------------------- //
// user with pickup
// -------------------------- //
let hitPickup = function(car, pickup){
    coinMusic.play(); // play th pickup sound effect
    pickup.disableBody(true, true);//remove the pickup from the screen
    score += scoreCoin; // update score

}
// -------------------------- //
// user with chest
// -------------------------- //
let hitPowerUpCoin = function(car, powerUp){
    PowerUpMusic.play(); // play power up sound
    powerUp.disableBody(true, true);//remove the powerup
    PowerUpCoin = true; // bool for only placing coins
    jschest.style.opacity = 1; // make chest icon more visable
    let oldDistance = distance; //remember old distance => coins closer
    distance = 10
    for (i = obstacles.children.entries.length; i >= 0; i--) { // remove all cars
        obstacles.remove(obstacles.children.entries[i], true);
    }
    sleep(2000).then(() => {PowerUpCoin = false; distance = oldDistance; jschest.style.opacity = .4;}); // after time revert to normal
}
// -------------------------- //
// user with magnet
// -------------------------- //
let hitPowerUpMagnet = function(car, powerUp){
    PowerUpMusic.play(); // play power up sound
    powerUp.disableBody(true, true);//remove the powerup
    PowerUpMagnet = true; // bool to let coins come to you
    jsmagnet.style.opacity = 1; // visable
    sleep(10000).then(() => {PowerUpMagnet = false; jsmagnet.style.opacity = .4;}); // revert back to normal
}
// -------------------------- //
// user with haert
// -------------------------- //
let hitPowerUpHeart = function(car, powerUp){
    PowerUpMusic.play(); // play power up sound
    powerUp.disableBody(true, true);//remove the powerup
    if (!PowerUpheart){
        PowerUpheart = true; // one extra life
        jsheart.style.opacity = 1;
    }
   
}
// -------------------------- //
// powerup with obstacle
// -------------------------- //
let hitPowerUpObstacle = function (powerup, other) {
    other.disableBody(true, true); //remove obstacle
}
// -------------------------- //
// decorations with eachother
// -------------------------- //
let DecorationHit = function(decoration, dacoration2){
    dacoration2.disableBody(true, true);//remove the last decoration
}

// -------------------------- //
// Place cars and coins
// -------------------------- //
let setcars = function(){
    increasing(); // increase speed if enabled
    score += DriveScore; // add score
    // -------------------------- //
    // calculate obstacles
    // -------------------------- //
    let randomObstacles = getRandomobstakels();
    let randomPickups = getRandomInt(lanes - randomObstacles);
    let randomObstacles2 = getRandomobstakels();
    let randomPickups2 = getRandomInt(2 - randomObstacles2);
    // -------------------------- //
    // place powerups if random correct
    // -------------------------- //
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
    // -------------------------- //
    // shuffle lists
    // -------------------------- //
    if(mode == 'SP'){ // in single player
        arr = [250,350,450, 550];
        arr = shuffle(arr);
    }
    if(mode == 'COOP'){ // in coop
        arr = [250,350];
        arr = shuffle(arr);
        arr2 = [450, 550];
        arr2 = shuffle(arr2);
    }
    // -------------------------- //
    // Place the cars
    // -------------------------- //
    for (i = 0; i < randomObstacles; i++) { // for random number of obstacles
        var ShuffleColorList = shuffle(Colors) // shuffle the colors
        if(mode == 'SP'){ // color != usercolor
            if (ShuffleColorList[0] == carColor){
                randomColor = ShuffleColorList[1]
            }else {
                randomColor = ShuffleColorList[0]
            }
        }
        if(mode == 'COOP'){ // color != usercolors
            let ii = 0;
            while (ShuffleColorList[ii] == carColor || ShuffleColorList[ii] == carColor2) {
                ii ++;
            }
            randomColor = ShuffleColorList[ii]
        }
        // Place the obstacles
        obstacles.create(arr[i],-50, 'car').setScale(1).setTint(randomColor);
    }
    if(mode == 'COOP'){ // place the obstacle coop 
        for (i = 0; i < randomObstacles2; i++) {
            let ShuffleColorList = shuffle(Colors)
            let ii = 0; // color != usercolors
            while (ShuffleColorList[ii] == carColor || ShuffleColorList[ii] == carColor2) {
                ii ++;
            }
            randomColor = ShuffleColorList[ii]
            // place the obstacle
            obstacles.create(arr2[i],-50, 'car').setScale(1).setTint(randomColor);
        }
    }
    // -------------------------- //
    // Place the pickups
    // -------------------------- //
    for (i = 0; i < randomPickups; i++) {
        pickups.create(arr[i+randomObstacles],(Math.random() * 5  -55), 'coin').setScale(.2);

    }
    if(mode == 'COOP'){ // coop second 2 lanes
        for (i = 0; i < randomPickups2; i++) {
            pickups.create(arr2[i+randomObstacles2],(Math.random() * 5  -55), 'coin').setScale(.2);                
        }
    }
    // -------------------------- //
    // Place coins in side for testing
    // -------------------------- //
    if(testing){
        pickups.create(150,-50, 'coin').setScale(.2);
        if(mode == 'COOP'){
            pickups.create(650,-50, 'coin').setScale(.2);
        }
    }
}
// -------------------------- //
// Place only coins
// -------------------------- //
var setCoins = function name(params) { // when chest is activated
    arr = [250,350,450, 550];
    for (i = 0; i < arr.length; i++) {
        pickups.create(arr[i],(Math.random() * 5 -50), 'coin').setScale(.2);
    } 
}
// -------------------------- //
// Random number Of obstacles
// -------------------------- //
let getRandomobstakels = function() {
    let random = Math.floor(Math.random() * Math.floor(100));
    if(mode == 'SP'){ // is SP return number between 0 - 3
        if(random < 20) return 0;
        if(random < 50) return 1;
        if(random < 90) return 2;
        else return 3;
    }
    if(mode == 'COOP'){ // in coop return 0 or 1
        if(random > 35) return 1;
        return 0;
    }

}
// -------------------------- //
// increasing
// -------------------------- //
let increasing = function(){
    if (increase){
        if (waitIncrease >= speedIncrease){ //delay
            speed += increaseValue; // increase speed
            distance -= 0.025; // decrease distance
            
            waitIncrease = 0;
        }
        waitIncrease ++;
    }
}
