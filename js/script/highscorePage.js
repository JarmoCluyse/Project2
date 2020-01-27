const loggedOut = function(data){
	window.location.href = 'loginpage.html';
};
// -------------------------- //
// getting the highscore
// -------------------------- //
const getHighscores = function(){
    handleData(`${BASEURI}games?code=${key}`, ShowHighScores, "GET",null)
  }
// -------------------------- //
// show the highscores
// -------------------------- //
const ShowHighScores = function (data) {
    console.log(data);
    // sort the list
 	data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    // make the leaderbord 
    var leaders = data.slice(0, 3);
    var leaderboard = data.slice(3, 10);
    console.log(leaders);
    console.log(leaderboard);
    let scoreList = document.querySelector(".js-list");
    scoreListtext = "";
    for (let i = 0; i < leaders.length; i++) {
        document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player;
        document.querySelector(`.js-score-${i+1}`).innerHTML = leaders[i].score;
        
    }
    for (let i = 0; i < leaderboard.length; i++) {
        scoreListtext += `<li>${leaderboard[i].player}: ${leaderboard[i].score}</li>`
    }
    scoreList.innerHTML = scoreListtext;
    scoreListtext = ""
}


const init = function(){
    console.log('Script geladen! 👍')
    sessionButton = document.getElementById('sessions');
    settingsButton = document.getElementById('settings');
    logoutButton = document.getElementById('logout');
    gameButton = document.getElementById('game');

    sessionButton.addEventListener('click', function(){
        window.location.href = 'sessiepage.html';
    });

    settingsButton.addEventListener('click', function(){
        window.location.href = 'adminpage.html';
    });

	logoutButton.addEventListener('click', function(){
		logOut(JSON.parse(localStorage.getItem('LoginToken')), loggedOut);
    });
    
    gameButton.addEventListener('click', function(){
        window.location.href = 'index.html';
    });
    getHighscores();
};


document.addEventListener('DOMContentLoaded', function() {
	init();
});