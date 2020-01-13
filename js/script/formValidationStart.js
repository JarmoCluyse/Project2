let namePlayer1 = {}, namePlayer2 = {}, sessieId = {}, gameId = {}, startGameHasError = 1, radioChecked = 0, radioButtons = {};

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

const showName1ErrorMsg = function() {
    document.querySelector('.c-errormsg-name1').style.display = 'block';
    startGameHasError = 1;
};

const removeName1ErrorMsg = function() {
    document.querySelector('.c-errormsg-name1').style.display = 'none';
    startGameHasError = 0;
};

const showName2ErrorMsg = function() {
    document.querySelector('.c-errormsg-name2').style.display = 'block';
    startGameHasError = 1;
};

const removeName2ErrorMsg = function() {
    document.querySelector('.c-errormsg-name2').style.display = 'none';
    startGameHasError = 0;
};

const showSessieIdErrorMsg = function() {
    document.querySelector('.c-errormsg-sessieId').style.display = 'flex';
    startGameHasError = 1;
};

const removeSessieIdErrorMsg = function() {
    document.querySelector('.c-errormsg-sessieId').style.display = 'none';
    startGameHasError = 0;
};

const showGameIdErrorMsg = function() {
    document.querySelector('.c-errormsg-gameId').style.display = 'flex';
    startGameHasError = 1;
};

const removeGameIdErrorMsg = function() {
    document.querySelector('.c-errormsg-gameId').style.display = 'none';
    startGameHasError = 0;
};


const checkRadioButtons = function() {
	if (radioChecked == 0) {
        document.querySelector('.c-errormsg-radiobuttons').style.display = 'block';
	} else {
        document.querySelector('.c-errormsg-radiobuttons').style.display = 'none';
        document.querySelector('.c-errormsg-button').style.display = 'block';
        if (startGameHasError == 0){
            document.querySelector('.c-errormsg-button').style.display = 'none';
            startGame();
        }
	}
};


const startGame = function() {
	window.location.href = 'game.html';
};

const getDOMContent = function(){
    console.log('formValidation geladen! 👍')
    namePlayer1.input = document.getElementById('Name1');
    namePlayer2.input = document.getElementById('Name2');
    sessieId.input = document.getElementById('sessieId');
    gameId.input = document.getElementById('gameId');
    radioButtons.input = document.getElementsByName('radios');
    radioNo = document.getElementById('radioNo');
    radioYes = document.getElementById('radioYes');
    startGameButton = document.querySelector('.js-play');

};


const enableValidation = function(){
    namePlayer1.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showName1ErrorMsg();
		} else {
			removeName1ErrorMsg();
		}
    });

    namePlayer2.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showName2ErrorMsg();
		} else {
			removeName2ErrorMsg();
		}
    });

    sessieId.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showSessieIdErrorMsg();
		} else {
			removeSessieIdErrorMsg();
		}
    });

    
    gameId.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showGameIdErrorMsg();
		} else {
			removeGameIdErrorMsg();
		}
    });

    radioNo.addEventListener('click', function(){
        document.querySelector('.c-errormsg-radiobuttons').style.display = 'none';
    });

    radioYes.addEventListener('click', function(){
        document.querySelector('.c-errormsg-radiobuttons').style.display = 'none';
    });

    startGameButton.addEventListener('click', function() {
		radioButtons.input.forEach(element => {
			if (element.checked) {
				radioChecked += 1;
				checkRadioButtons();
			} else {
				checkRadioButtons();
			}
        });
        

		radioChecked = 0;
    });

}


document.addEventListener('DOMContentLoaded', function() {
	getDOMContent();
	enableValidation();
});
