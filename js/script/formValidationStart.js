let namePlayer1 = {}, namePlayer2 = {}, sessieId = {}, gameId = {}, startGameHasError = 1;

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

const getDOMContent = function(){
    console.log('formValidation geladen! 👍')
    namePlayer1.input = document.getElementById('Name1');
    namePlayer2.input = document.getElementById('Name2');
    sessieId.input = document.getElementById('sessieId');
    gameId.input = document.getElementById('gameId');

    
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

}


document.addEventListener('DOMContentLoaded', function() {
	getDOMContent();
	enableValidation();
});
