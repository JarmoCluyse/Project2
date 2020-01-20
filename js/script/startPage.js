let newCodeBool, inputBoxBool, player2Bool, doYouHaveCodeBool, startGameBool = 1;


// show the settings for player 2
const showPlayer2 = function() {
	// check the window width
	width = window.matchMedia("(min-width: 768px)")
	// unhide the player 2 name inputbox

	// when width changes recheck
	width.onchange = function(){
		//if min width: 768px == true set display to flex, else to block
		if (width.matches){
			player2.style.display = 'flex';
		}
		else {
			player2.style.display = 'block';
		}
	}

	//if min width: 768px == true set display to flex, else to block
	if (width.matches){
		player2.style.display = 'flex';
	}
	else {
		player2.style.display = 'block';
	}

	// unhide the player 2 car color selection
	carList.style.display = 'block';

	// set the bool to 1 so we know there is a player 2
	player2Bool = 1;
};


// remove the settings for player 2
const removePlayer2 = function() {
	// hide the player 2 name inputbox
	player2.style.display = 'none';

	// hide the player 2 car color selection
	carList.style.display = 'none';

	// set the bool to 0 so we know there is no player 2
	player2Bool = 0;
};



// ----------- multiplayer --------------
// const showDoYouHaveCode = function() {
// 	gameIdAvailable.style.display = 'flex';

// 	doYouHaveCodeBool = 1;
// };

// const removeDoYouHaveCode = function() {
// 	gameIdAvailable.style.display = 'none';

// 	doYouHaveCodeBool = 0;
// };

// const showCodeInputBox = function() {
// 	codeInputBox.style.display = 'block';

// 	inputBoxBool = 1;
// };

// const showNewCode = function() {
// 	newCode.style.display = 'block';

// 	newCodeBool = 1;
// };

// const removeShowInputBox = function() {
// 	codeInputBox.style.display = 'none';

// 	inputBoxBool = 0;
// };

// const removeNewcode = function() {
// 	newCode.style.display = 'none';

// 	newCodeBool = 0;
// };


// dropdown for the selected gamemode
const dropdownFunction = function() {
	// check the dropdown value a first time
	dropdownSelectValue = dropdownSelect.options[dropdownSelect.selectedIndex].value;

	// check the dropdown value if theres a change
	dropdownSelect.onchange = function() {
		dropdownSelectValue = dropdownSelect.options[dropdownSelect.selectedIndex].value;

		// if the selected dropdown value is 'single player'
		if (dropdownSelectValue == 'SP') {
			// ----- multiplayer ------
			// if (newCodeBool == 1) {
			// 	removeNewcode();
			// }

			// if (inputBoxBool == 1) {
			// 	removeShowInputBox();
			// }
			
			// if there are settings for player 2
			if (player2Bool == 1) {
				// remove them
				removePlayer2();
			}

			// if (doYouHaveCodeBool == 1) {
			// 	removeDoYouHaveCode();
			// }
		}

		// if the selected dropdown value is 'co-op'
		if (dropdownSelectValue == 'COOP') {
			// ----- multiplayer -----
			// if (newCodeBool == 1) {
			// 	removeNewcode();
			// }

			// if (inputBoxBool == 1) {
			// 	removeShowInputBox();
			// }

			// if (doYouHaveCodeBool == 1) {
			// 	removeDoYouHaveCode();
			// }

			// show settings for player 2
			showPlayer2();
		}

		// ------  Multiplayer  -----------
		
		// if (dropdownSelectValue == 'multiplayer') {
		// 	startGameBool = 0;
		// 	if (player2Bool == 1) {
		// 		removePlayer2();
		// 	}

		// 	showDoYouHaveCode();
		// }
	};
};

// watch if the sliders change values
const sliderFunction = function() {
	// slider for the carspeed
	sliderCarspeed.oninput = function() {
		// change the value shown to the value the user selected
        outputCar.innerHTML = this.value;
	};

	// slider for the distance between obstacles
	sliderObstacle.oninput = function() {
		// change the value shown to the value the user selected
		outputObstacle.innerHTML = this.value;
	};
};


// ---------- multiplayer ---------
// const radioButtonFunction = function() {
// 	radioButtonYes.addEventListener('click', function() {
// 		if (newCodeBool == 1) {
// 			removeNewcode();
// 		}
// 		showCodeInputBox();
// 	});

// 	radioButtonNo.addEventListener('click', function() {
// 		if (inputBoxBool == 1) {
// 			removeShowInputBox();
// 		}
// 		showNewCode();
// 	});
// };


const init = function() {
	console.log('Script geladen! 👍');
	player2 = document.querySelector('.c-player2');
	gameIdAvailable = document.querySelector('.c-gameIdAvailable');
	codeInputBox = document.querySelector('.c-hasGameId');
	newCode = document.querySelector('.c-hasNoGameId');
	dropdownSelect = document.querySelector('.js-selectGameMode');
	radioButtonYes = document.querySelector('.js-codeYes');
	radioButtonNo = document.querySelector('.js-codeNo');
	carList = document.querySelector('.c-carColors2');
	sliderCarspeed = document.querySelector('.js-sliderCar');
	sliderObstacle = document.querySelector('.js-sliderObstacle');
	outputCar = document.querySelector('.js-outputCar');
	outputObstacle = document.querySelector('.js-outputObstacle');

	sliderFunction();
	dropdownFunction();
	//radioButtonFunction();
};

document.addEventListener('DOMContentLoaded', function() {
	init();
});
