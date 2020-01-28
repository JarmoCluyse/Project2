const loggedOut = function(data){
	window.location.href = 'loginpage.html';
};
// -------------------------- //
// getting the highscore
// -------------------------- //
const getHighscores = function(){
    handleData(`${BASEURI}highscores/score/10?code=${key}`, ShowHighScores, "GET",null)
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
    let scoreList = document.querySelectorAll(".js-list");
    scoreListPlayer = "";
    scoreListScore = "";
    for (let i = 0; i < leaders.length; i++) {
        document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player;
        document.querySelector(`.js-score-${i+1}`).innerHTML = leaders[i].score;
        
    }
    for (let i = 0; i < leaderboard.length; i++) {
        scoreListPlayer += `<li>${leaderboard[i].player}</li>`
        scoreListScore += `<li>${leaderboard[i].score}</li>`
    }
    position = localStorage.getItem('Position');
    playerName = localStorage.getItem('Player');
    player2Name = localStorage.getItem('Player2');
    playerScore = localStorage.getItem('Score');

    if (parseInt(position) > 10){
        if (player2Name == ""){
            scoreListPlayer += `<li value="${position}" class="c-your-score">${playerName}</li>`
            scoreListScore += `<li class="c-your-score">${playerScore}</li>`
        }
        else{
            scoreListPlayer += `<li value="${position}" class="c-your-score">${playerName}</li>`
            scoreListScore += `<li class="c-your-score">${playerScore}</li>`
            scoreListPlayer += `<li value="${parseInt(position) + 1}">${player2Name}</li>`
            scoreListScore += `<li>${playerScore}</li>`
        }
    }

    scoreList[0].innerHTML = scoreListPlayer;
    scoreList[1].innerHTML = scoreListScore;
    scoreListPlayer = ""
    scoreListScore = ""
}


const init = function(){
    console.log('Script geladen! 👍')
    sessionButton = document.getElementById('sessions');
    settingsButton = document.getElementById('settings');
    logoutButton = document.getElementById('logout');
    gameButton = document.getElementById('game');
    startNewGameButton = document.getElementById('newgame');

    startNewGameButton.addEventListener('click', function(){
        window.location.href = 'index.html';
    });

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