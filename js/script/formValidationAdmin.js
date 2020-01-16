let checkbox = {},
    checkboxEdit = {},
    isChecked = 0,
	isCheckedEdit = 0,
	canReload = 0;

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

const checkCheckboxes = function() {
	if (isChecked == 0) {
		document.querySelector('.c-warning').style.display = 'block';
	} else {
		document.querySelector('.c-warning').style.display = 'none';
		canReload = 1;
	}
};

const checkCheckboxesEdit = function() {
	if (isCheckedEdit == 0) {
		document.querySelector('.c-warning-edit').style.display = 'block';
	} else {
		document.querySelector('.c-warning-edit').style.display = 'none';
		canReload = 1;
	}
};

const checkValidityEdit = function(){
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
		return true;
	}
};

const checkValidityAdd = function(){
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

	submitQuestion.addEventListener('click', function() {
		checkbox.input.forEach(element => {
			if (element.checked) {
				isChecked += 1;
				checkCheckboxes();
			} else {
				checkCheckboxes();
			}
		});

		if(checkValidityAdd() == true){
			console.log(canReload);
			if (canReload == 1){
				addQuestion();
				canReload = 0;
			}
		}
		isChecked = 0;
    });
    
    submitEdit.addEventListener('click', function() {
		checkboxEdit.input.forEach(element => {
			if (element.checked) {
				isCheckedEdit += 1;
				checkCheckboxesEdit();
			} else {
				checkCheckboxesEdit();
			}
		});

		if(checkValidityEdit() == true){
			console.log(canReload);
			if (canReload == 1){
				updateQuestion();
				canReload = 0;
			}
		}
		isCheckedEdit = 0;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	getDOM();
	enableInteraction();
});
