//------------------------------- //
// Scene: main menu
//------------------------------- //

var mainMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
  
    preload: function() {
        // in seperate file Preloads
    },

    create: function() {
        jsMainCard.classList.add("c-start-card");
        handleData(`${BASEURI}session/${session}?code=${key}`, setSession);
        if(mode == 'COOP'){
            jsVideo.innerHTML = `<source src="/assets/vidCoop.m4v" type="video/mp4">
            Your browser does not support the video tag.`;
        }
        else{
            jsVideo.innerHTML = `<source src="/assets/vid.m4v" type="video/mp4">
            Your browser does not support the video tag.`;
        }
        jsGameStart.classList.remove('hide');
        jsSplashTitle.classList.remove('hide');
        jsGamePlay.classList.add('hide');
        jsGameQuestion.classList.remove('hide');
        jsGameEnd.classList.add('hide');
        // log the current scene
        console.log("MainMenu");
        // to next scene
        this.input.keyboard.on('keydown-RIGHT', keyListener);
        this.input.keyboard.on('keydown-UP', keyListener);
        this.input.keyboard.on('keydown-DOWN', keyListener);
        this.input.keyboard.on('keydown-LEFT', keyListener);
        
    },

    update: function() {
        // Update objects & variables
    },
});
// Add scene to list of scenes
myGame.scenes.push(mainMenuState);
setSession = function(data){
    console.log(data);
    localStorage.setItem('SessionObject', JSON.stringify(data));
};