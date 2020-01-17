let gameId = {};
// ------  Multiplayer  -----------
    // radioChecked = 0,
	// radioButtons = {};


// ------  Multiplayer  -----------

// const checkRadioButtons = function() {
// 	if (radioChecked == 0) {
// 		document.querySelector('.c-errormsg-radiobuttons').style.display = 'block';
// 	} else {
//         if (radioNo.checked == true){
//             startGameBool = 1;
//         }
//         document.querySelector('.c-errormsg-radiobuttons').style.display = 'none';
// 	}
// };

// start the game and send all filled in data with it
const startGame = function() {
	// add all variables to the localstorage
    localStorage.setItem("BeginSpeed", document.getElementById('carSlider').value);
	localStorage.setItem("Distance", document.getElementById('obstacleSlider').value);
	localStorage.setItem("Player", document.getElementById('Name1').value);
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
    
    if (startGameBool == 1){
		// redirect to the gamepage
        window.location.href = 'game.html';
    }

};

const getDOMContent = function() {
    console.log('formValidation geladen! 👍');
    // ------  Multiplayer  -----------
	// radioButtons.input = document.getElementsByName('radios');
	// radioNo = document.getElementById('radioNo');
    // radioYes = document.getElementById('radioYes');
    // gameId.input = document.getElementById('gameId');
	startGameButton = document.querySelector('.js-play');
};

const enableValidation = function() {

    // ------  Multiplayer  -----------

    // gameId.input.addEventListener('blur', function(){
    //     if (gameId.input.value != ""){
    //         startGameBool = 1;
    //     }
    // })

	// // add an eventlistener to the 'no' radiobutton
	// radioNo.addEventListener('click', function() {
	// 	// if the radiobutton has been clicked all errormessages go away
	// 	document.querySelector('.c-errormsg-radiobuttons').style.display =
	// 		'none';
	// });

	// // add an eventlistener to the 'yes' radiobutton
	// radioYes.addEventListener('click', function() {
	// 	// if the radiobutton has been clicked all errormessages go away
	// 	document.querySelector('.c-errormsg-radiobuttons').style.display =
	// 		'none';
	// });
	
	// add an eventlistener to the startgame button
	startGameButton.addEventListener('click', function() {
        // ------  Multiplayer  -----------

		// radioButtons.input.forEach(element => {
		// 	if (element.checked) {
		// 		radioChecked += 1;
		// 		checkRadioButtons();
		// 	} else {
		// 		checkRadioButtons();
		// 	}
        // });

		// call the startgame function
        startGame();

		// radioChecked = 0;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	getDOMContent();
	enableValidation();
});
