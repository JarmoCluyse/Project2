let namePlayer1 = {}, namePlayer2 = {}, sessieId = {}, gameId = {}, startGameHasError = 2, radioChecked = 0, radioButtons = {};

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

const showName1ErrorMsg = function() {
    document.querySelector('.c-errormsg-name1').style.display = 'block';
    console.log(startGameHasError)
};

const removeName1ErrorMsg = function() {
    document.querySelector('.c-errormsg-name1').style.display = 'none';
    startGameHasError -= 2;
    console.log(startGameHasError)
};

const showName2ErrorMsg = function() {
    document.querySelector('.c-errormsg-name2').style.display = 'block';
    console.log(startGameHasError)
};

const removeName2ErrorMsg = function() {
    document.querySelector('.c-errormsg-name2').style.display = 'none';
    console.log(startGameHasError)
    startGameHasError -= 2;
};


const showGameIdErrorMsg = function() {
    document.querySelector('.c-errormsg-gameId').style.display = 'flex';
    console.log(startGameHasError)
};

const removeGameIdErrorMsg = function() {
    document.querySelector('.c-errormsg-gameId').style.display = 'none';
    console.log(startGameHasError)
    startGameHasError -= 2;
};


const checkRadioButtons = function() {
	if (radioChecked == 0) {
        document.querySelector('.c-errormsg-radiobuttons').style.display = 'block';
	} else {
        document.querySelector('.c-errormsg-radiobuttons').style.display = 'none';
	}
    if (startGameHasError <= 0){
        document.querySelector('.c-errormsg-button').style.display = 'none';
        document.getElementById('Name1').value = '';
        document.getElementById('Name2').value = '';
        document.getElementById('gameId').value = '';
        document.getElementById('sessieId').value = '';
        document.getElementById('carSlider').value = '';
        document.getElementById('obstacleSlider').value = '';
        document.getElementById('selectCar1').value = '';
        document.getElementById('selectCar2').value = '';
        radioNo.checked = false;
        radioYes.checked = false;
        startGame();
    }
    else {
        document.querySelector('.c-errormsg-button').style.display = 'block';
        console.log(startGameHasError)
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
        namePlayer1 = typedInput;
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
        startGameHasError = 2;
    });

}


document.addEventListener('DOMContentLoaded', function() {
	getDOMContent();
	enableValidation();
});
