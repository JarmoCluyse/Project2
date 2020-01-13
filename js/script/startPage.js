let newCodeBool, inputBoxBool, player2Bool, doYouHaveCodeBool;

const showPlayer2 = function() {
	player2.style.display = 'block';
	carList.style.display = 'block';

	player2Bool = 1;
};

const removePlayer2 = function() {
	player2.style.display = 'none';
	carList.style.display = 'none';

	player2Bool = 0;
};

const showDoYouHaveCode = function() {
	gameIdAvailable.style.display = 'flex';

	doYouHaveCodeBool = 1;
};

const removeDoYouHaveCode = function() {
	gameIdAvailable.style.display = 'none';

	doYouHaveCodeBool = 0;
};

const showCodeInputBox = function() {
	codeInputBox.style.display = 'block';

	inputBoxBool = 1;
};

const showNewCode = function() {
	newCode.style.display = 'block';

	newCodeBool = 1;
};

const removeShowInputBox = function() {
	codeInputBox.style.display = 'none';

	inputBoxBool = 0;
};

const removeNewcode = function() {
	newCode.style.display = 'none';

	newCodeBool = 0;
};


const dropdownFunction = function() {
	dropdownSelectValue =
		dropdownSelect.options[dropdownSelect.selectedIndex].value;

	dropdownSelect.onchange = function() {
		dropdownSelectValue =
			dropdownSelect.options[dropdownSelect.selectedIndex].value;

		if (dropdownSelectValue == 'single-player') {
            startGameHasError = 2;
			if (newCodeBool == 1) {
				removeNewcode();
			}

			if (inputBoxBool == 1) {
				removeShowInputBox();
			}

			if (player2Bool == 1) {
				removePlayer2();
			}

			if (doYouHaveCodeBool == 1) {
				removeDoYouHaveCode();
			}
		}

		if (dropdownSelectValue == 'co-op') {
            startGameHasError = 4;
			if (newCodeBool == 1) {
				removeNewcode();
			}

			if (inputBoxBool == 1) {
				removeShowInputBox();
			}

			if (doYouHaveCodeBool == 1) {
				removeDoYouHaveCode();
			}
			showPlayer2();
		}

		if (dropdownSelectValue == 'multiplayer') {
			if (player2Bool == 1) {
				removePlayer2();
			}

			showDoYouHaveCode();
		}
	};
};

const sliderFunction = function() {
	sliderCarspeed.oninput = function() {
        outputCar.innerHTML = this.value;
	};

	sliderObstacle.oninput = function() {
		outputObstacle.innerHTML = this.value;
	};
};

const radioButtonFunction = function() {
	radioButtonYes.addEventListener('click', function() {
		if (newCodeBool == 1) {
			removeNewcode();
		}
		showCodeInputBox();
	});

	radioButtonNo.addEventListener('click', function() {
		if (inputBoxBool == 1) {
			removeShowInputBox();
		}
		showNewCode();
	});
};

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
	radioButtonFunction();
};

document.addEventListener('DOMContentLoaded', function() {
	init();
});
