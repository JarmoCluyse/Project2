let gameId = {};
    radioChecked = 0,
	radioButtons = {};

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};


const checkRadioButtons = function() {
	if (radioChecked == 0) {
		document.querySelector('.c-errormsg-radiobuttons').style.display = 'block';
	} else {
        if (radioNo.checked == true){
            startGameBool = 1;
        }
        document.querySelector('.c-errormsg-radiobuttons').style.display = 'none';
	}
};

const startGame = function() {
    localStorage.setItem("BeginSpeed", document.getElementById('carSlider').value);
    localStorage.setItem("Distance", document.getElementById('carSlider').value);
    localStorage.setItem("increase", document.getElementById('carSlider').value);
    localStorage.setItem("color", document.getElementById('carSlider').value);
    if (startGameBool == 1){
        window.location.href = 'game.html';
    }
};

const getDOMContent = function() {
	console.log('formValidation geladen! 👍');
	gameId.input = document.getElementById('gameId');
	radioButtons.input = document.getElementsByName('radios');
	radioNo = document.getElementById('radioNo');
    radioYes = document.getElementById('radioYes');
    gameId.input = document.getElementById('gameId');
	startGameButton = document.querySelector('.js-play');
};

const enableValidation = function() {

    gameId.input.addEventListener('blur', function(){
        if (gameId.input.value != ""){
            startGameBool = 1;
        }

        else {
            startGameBool = 0;
        }
    })

	radioNo.addEventListener('click', function() {
		document.querySelector('.c-errormsg-radiobuttons').style.display =
			'none';
	});

	radioYes.addEventListener('click', function() {
		document.querySelector('.c-errormsg-radiobuttons').style.display =
			'none';
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

        startGame();

		radioChecked = 0;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	getDOMContent();
	enableValidation();
});
