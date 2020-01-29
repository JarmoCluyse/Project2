const loggedOut = function(data){
	window.location.href = 'loginpage.html';
};
// -------------------------- //
// getting the highscore
// -------------------------- //
const getHighscores = function(){
    handleData(`${BASEURI}highscores/score/500?code=${key}`, ShowHighScores, "GET",null)
};

// -------------------------- //
// show the highscores
// -------------------------- //
const ShowHighScores = function (data) {
    console.log(data);
    // sort the list
 	data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    // make the leaderbord 
    var leaders = data.slice(0, 3);
    if (cameFromGame == 'true'){
        var leaderboard = data.slice(3, 10);
    }
    else{
        var leaderboard = data.slice(3, data.length);
        
    }
    console.log(leaders);
    console.log(leaderboard);
    let scoreList = document.querySelectorAll(".js-list");
    position = localStorage.getItem('Position');
    playerName = localStorage.getItem('Player');
    player2Name = localStorage.getItem('Player2');
    playerScore = localStorage.getItem('Score');
    scoreListPlayer = "";
    scoreListScore = "";

    for (let i = 0; i < leaders.length; i++) {
        if (parseInt(position) <= 3){
            if (i == parseInt(position)-1){
                if (/\s/.test(leaders[i].player)) {
                    document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player.replace(/ /g, "&nbsp;");
                }
                else {
                    document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player;
                }

                document.querySelector(`.js-person-${i+1}`).classList.add("c-your-scoreColor");
                document.querySelector(`.js-score-${i+1}`).innerHTML = leaders[i].score;
            }
            else{
                if (/\s/.test(leaders[i].player)) {
                    document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player.replace(/ /g, "&nbsp;");
                }
                else {
                    document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player;
                }
                document.querySelector(`.js-score-${i+1}`).innerHTML = leaders[i].score;
            }
        }

        else {
            if (/\s/.test(leaders[i].player)){
                document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player.replace(/ /g, "&nbsp;");
            }
            else {
                document.querySelector(`.js-person-${i+1}`).innerHTML = leaders[i].player;
            }
            
            document.querySelector(`.js-score-${i+1}`).innerHTML = leaders[i].score;
        }
    }

    for (let i = 0; i < leaderboard.length; i++) {
        if (parseInt(position) > 3 && parseInt(position) < 10){
            if (i == parseInt(position)-4){
                scoreListPlayer += `<li class="c-your-scoreColor">${leaderboard[i].player}</li>`
                scoreListScore += `<li class="c-your-scoreColor">${leaderboard[i].score}</li>`
            }
            else {
                scoreListPlayer += `<li>${leaderboard[i].player}</li>`
                scoreListScore += `<li>${leaderboard[i].score}</li>`
            }
        }
        else {
            scoreListPlayer += `<li>${leaderboard[i].player}</li>`
            scoreListScore += `<li>${leaderboard[i].score}</li>`
        }
    }

    if (cameFromGame == "true"){
        if (parseInt(position) > 10){
            if (mode == "SP"){
                scoreListPlayer += `<li value="${position}" class="c-your-score c-your-scoreColor">${playerName}</li>`
                scoreListScore += `<li class="c-your-score c-your-scoreColor">${playerScore}</li>`
            }
            else{
                scoreListPlayer += `<li value="${position}" class="c-your-score c-your-scoreColor">${playerName}</li>`
                scoreListScore += `<li class="c-your-score c-your-scoreColor">${playerScore}</li>`
                scoreListPlayer += `<li class="c-your-scoreColor" value="${parseInt(position) + 1}">${player2Name}</li>`
                scoreListScore += `<li class="c-your-scoreColor">${playerScore}</li>`
            }
        }
    }

    scoreList[0].innerHTML = scoreListPlayer;
    scoreList[1].innerHTML = scoreListScore;
    scoreListPlayer = ""
    scoreListScore = ""
    localStorage.removeItem('Position');
}


const init = function(){
    console.log('Script geladen! 👍')
    cameFromGame = localStorage.getItem('CameFromGame');
    localStorage.setItem('CameFromGame', 'false');
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
    if (cameFromGame == 'true'){
        document.querySelector('.c-dropbtn').classList.add('hide');
    }
    getHighscores();
};


document.addEventListener('DOMContentLoaded', function() {
	init();
});