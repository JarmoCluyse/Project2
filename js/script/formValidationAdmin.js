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
	// check each input for errors
	if (!document.getElementById('editQuestion').checkValidity()){
		return false;
	}
	
	else if (!document.getElementById('editSubject').checkValidity()){
		return false;
	}

	else if (!document.getElementById('editQuestionAnswer1').checkValidity()){
		return false;
	}

	else if (!document.getElementById('editQuestionAnswer2').checkValidity()){
		return false;
	}

	else if (!document.getElementById('editQuestionAnswer3').checkValidity()){
		return false;
	}

	else if (!document.getElementById('editQuestionAnswer4').checkValidity()){
		return false;
	}

	else {
		// if there are no errors we return true
		return true;
	}
};

// check if everything is filled in correctly in the form 'add card'
const checkValidityAdd = function(){
	// check each input for errors
	if (!document.getElementById('newQuestion').checkValidity()){
		return false;
	}
	
	else if (!document.getElementById('newSubject').checkValidity()){
		return false;
	}

	else if (!document.getElementById('newQuestionAnswer1').checkValidity()){
		return false;
	}

	else if (!document.getElementById('newQuestionAnswer2').checkValidity()){
		return false;
	}

	else if (!document.getElementById('newQuestionAnswer3').checkValidity()){
		return false;
	}

	else if (!document.getElementById('newQuestionAnswer4').checkValidity()){
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
