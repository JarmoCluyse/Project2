let gameId = {};
// ------  Multiplayer  -----------
    // radioChecked = 0,
	// radioButtons = {};

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

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


const startGame = function() {
    localStorage.setItem("BeginSpeed", document.getElementById('carSlider').value);
	localStorage.setItem("Distance", document.getElementById('obstacleSlider').value);
	localStorage.setItem("Player", document.getElementById('Name1').value);
	console.log(document.getElementById('Name1').value);
	
	if (document.getElementById("checkbox1").checked){
		localStorage.setItem("Increase", true);
	} 
	else {
		localStorage.setItem("Increase", false);
	}
    localStorage.setItem("Color", document.getElementById('selectCarColorPlayer1').value);
    localStorage.setItem("Color2", document.getElementById('selectCarColorPlayer2').value);
    
    if (startGameBool == 1){
        //window.location.href = 'game.html';
        console.log("ik doe dit")
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

	radioNo.addEventListener('click', function() {
		document.querySelector('.c-errormsg-radiobuttons').style.display =
			'none';
	});

	radioYes.addEventListener('click', function() {
		document.querySelector('.c-errormsg-radiobuttons').style.display =
			'none';
	});

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

        startGame();

		// radioChecked = 0;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	getDOMContent();
	enableValidation();
});
