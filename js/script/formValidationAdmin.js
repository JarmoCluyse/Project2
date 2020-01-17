let checkbox = {},
    checkboxEdit = {},
    isChecked = 0,
	isCheckedEdit = 0,
	canReload = 0;


// check the state of the checkboxes for the add card
const checkCheckboxes = function() {
	// if no checkboxes are checked isChecked = 0
	if (isChecked == 0) {
		// show an errormessage you need to check at least 1 checkbox
		document.querySelector('.c-warning').style.display = 'block';
	} else {
		// remove the errormessage
		document.querySelector('.c-warning').style.display = 'none';

		// set canReload to 1 so the page is allowed to reload
		canReload = 1;
	}
};

// check the state of the checkboxes for the edit card
const checkCheckboxesEdit = function() {
	// if no checkboxes are checked isCheckedEdit = 0
	if (isCheckedEdit == 0) {
		// show an errormessage you need to check at least 1 checkbox
		document.querySelector('.c-warning-edit').style.display = 'block';
	} else {
		// remove the errormessage
		document.querySelector('.c-warning-edit').style.display = 'none';

		// set canReload to 1 so the page is allowed to reload
		canReload = 1;
	}
};

// check if everything is filled in correctly in the form 'edit card'
const checkValidityEdit = function(){
	editQuestion = document.getElementById('editQuestion');
	editSubject = document.getElementById('editSubject');
	editQuestionAnswer1 = document.getElementById('editQuestionAnswer1');
	editQuestionAnswer2 = document.getElementById('editQuestionAnswer2');
	editQuestionAnswer3 = document.getElementById('editQuestionAnswer3');
	editQuestionAnswer4 = document.getElementById('editQuestionAnswer4');

	// if there is input we clear the errormessage
	editQuestion.oninput = function(){
		editQuestion.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	editSubject.oninput = function(){
		editSubject.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	editQuestionAnswer1.oninput = function(){
		editQuestionAnswer1.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	editQuestionAnswer2.oninput = function(){
		editQuestionAnswer2.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	editQuestionAnswer3.oninput = function(){
		editQuestionAnswer3.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	editQuestionAnswer4.oninput = function(){
		editQuestionAnswer4.setCustomValidity('');
	};

	// check each input for errors
	if (!editQuestion.checkValidity()){
		// custom validity message
		editQuestion.setCustomValidity("Gelieve een vraag in te geven.")
		return false;
	}
	
	else if (!editSubject.checkValidity()){
		// custom validity message
		editSubject.setCustomValidity("Gelieve een onderwerp in te geven.")
		return false;
	}

	else if (!editQuestionAnswer1.checkValidity()){
		// custom validity message
		editQuestionAnswer1.setCustomValidity("Gelieve een eerste mogelijk antwoord in te geven.")
		return false;
	}

	else if (!editQuestionAnswer2.checkValidity()){
		// custom validity message
		editQuestionAnswer2.setCustomValidity("Gelieve een tweede mogelijk antwoord in te geven.")
		return false;
	}

	else if (!editQuestionAnswer3.checkValidity()){
		// custom validity message
		editQuestionAnswer3.setCustomValidity("Gelieve een derde mogelijk antwoord in te geven.")
		return false;
	}

	else if (!editQuestionAnswer4.checkValidity()){
		// custom validity message
		editQuestionAnswer4.setCustomValidity("Gelieve een vierde mogelijk antwoord in te geven.")
		return false;
	}

	else {
		// if there are no errors we return true
		return true;
	}
};

// check if everything is filled in correctly in the form 'add card'
const checkValidityAdd = function(){
	newQuestion = document.getElementById('newQuestion');
	newSubject = document.getElementById('newSubject');
	newQuestionAnswer1 = document.getElementById('newQuestionAnswer1');
	newQuestionAnswer2 = document.getElementById('newQuestionAnswer2');
	newQuestionAnswer3 = document.getElementById('newQuestionAnswer3');
	newQuestionAnswer4 = document.getElementById('newQuestionAnswer4');

	// if there is input we clear the errormessage
	newQuestion.oninput = function(){
		newQuestion.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	newSubject.oninput = function(){
		newSubject.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	newQuestionAnswer1.oninput = function(){
		newQuestionAnswer1.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	newQuestionAnswer2.oninput = function(){
		newQuestionAnswer2.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	newQuestionAnswer3.oninput = function(){
		newQuestionAnswer3.setCustomValidity('');
	};

	// if there is input we clear the errormessage
	newQuestionAnswer4.oninput = function(){
		newQuestionAnswer4.setCustomValidity('');
	};

	// check each input for errors
	if (!newQuestion.checkValidity()){
		// custom validity message
		newQuestion.setCustomValidity("Gelieve een vraag in te geven.")
		return false;
	}
	
	else if (!newSubject.checkValidity()){
		// custom validity message
		newSubject.setCustomValidity("Gelieve een onderwerp in te geven.")
		return false;
	}

	else if (!newQuestionAnswer1.checkValidity()){
		// custom validity message
		newQuestionAnswer1.setCustomValidity("Gelieve een eerste mogelijk antwoord in te geven.")
		return false;
	}

	else if (!newQuestionAnswer2.checkValidity()){
		// custom validity message
		newQuestionAnswer2.setCustomValidity("Gelieve een tweede mogelijk antwoord in te geven.")
		return false;
	}

	else if (!newQuestionAnswer3.checkValidity()){
		// custom validity message
		newQuestionAnswer3.setCustomValidity("Gelieve een derde mogelijk antwoord in te geven.")
		return false;
	}

	else if (!newQuestionAnswer4.checkValidity()){
		// custom validity message
		newQuestionAnswer4.setCustomValidity("Gelieve een vierde mogelijk antwoord in te geven.")
		return false;
	}

	else {
		// if there are no errors return true
		return true;
	}
};



const getDOM = function() {
	console.log('formValidation geladen! 👍');
    checkbox.input = document.querySelectorAll('.js-checkbox');
	checkboxEdit.input = document.querySelectorAll('.js-checkboxEdit');
    submitQuestion = document.querySelector('.js-addQuestion');
    submitEdit = document.querySelector('.js-editQuestion');
};

const enableInteraction = function() {  

	// add an eventlistener to the submitquestion button
	submitQuestion.addEventListener('click', function() {
		// check if at least 1 checkbox is checked
		checkbox.input.forEach(element => {
			if (element.checked) {
				// for each checked checkbox isChecked goes up by 1
				isChecked += 1;
				checkCheckboxes();
			} else {
				checkCheckboxes();
			}
		});

		// check if all inputs are filled in correctly
		if(checkValidityAdd() == true){
			// check if canReload = 1
			if (canReload == 1){
				// add the question to the database and reload the page
				addQuestion();

				// set canReload back to 0
				canReload = 0;
			}
		}
		// set isChecked back to 0
		isChecked = 0;
    });
	
	// add an eventlistener to the submitedit button
    submitEdit.addEventListener('click', function() {
		// check if at least 1 checkbox is checked
		checkboxEdit.input.forEach(element => {
			if (element.checked) {
				// for each checked checkbox isCheckedEdit goes up by 1
				isCheckedEdit += 1;
				checkCheckboxesEdit();
			} else {
				checkCheckboxesEdit();
			}
		});

		// check if all inputs are filled in correctly
		if(checkValidityEdit() == true){
			// check if canReload = 1
			if (canReload == 1){
				// add the question to the database and reload the page
				updateQuestion();

				// set canReload back to 0
				canReload = 0;
			}
		}

		// set isCheckedEdit back to 0
		isCheckedEdit = 0;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	getDOM();
	enableInteraction();
});
