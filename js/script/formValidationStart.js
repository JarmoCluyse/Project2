
// start the game and send all filled in data with it
const startGame = function() {
	// add all variables to the localstorage
    localStorage.setItem("BeginSpeed", document.getElementById('carSlider').value);
	// localStorage.setItem("Distance", document.getElementById('obstacleSlider').value);
	localStorage.setItem("Player", document.getElementById('Name1').value);
	localStorage.setItem("Player2", document.getElementById('Name2').value);
	console.log(document.getElementById('Name1').value);
	
	// check if the checkbox to increase speed over time is checked
	if (document.getElementById("checkbox1").checked){
		localStorage.setItem("Increase", true);
	} 
	else {
		localStorage.setItem("Increase", false);
	}
	// read the carcolors selected and add to localstorage
    localStorage.setItem("Color", document.getElementById('selectCarColorPlayer1').value);
	localStorage.setItem("Color2", document.getElementById('selectCarColorPlayer2').value);
	localStorage.removeItem('Session');
	localStorage.setItem('Session', document.getElementById('sessieId').value);
    
    if (startGameBool == 1){
		// redirect to the gamepage
        window.location.href = 'game.html';
    }

};

const getDOMContent = function() {
    console.log('formValidation geladen! 👍');
	startGameButton = document.querySelector('.js-play');
	dropdownSelect = document.querySelector('.js-selectGameMode');
};

const enableValidation = function() {
	
	// add an eventlistener to the startgame button
	startGameButton.addEventListener('click', function() {

		// call the startgame function
		localStorage.setItem("Mode", dropdownSelect.options[dropdownSelect.selectedIndex].value);
        startGame();

		// radioChecked = 0;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	getDOMContent();
	enableValidation();
});
