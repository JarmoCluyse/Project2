let checkbox = {},
    checkboxEdit = {},
    isChecked = 0,
	isCheckedEdit = 0;

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

const checkCheckboxes = function() {
	if (isChecked == 0) {
		document.querySelector('.c-warning').style.display = 'block';
	} else {
		document.querySelector('.c-warning').style.display = 'none';
		showMainPage();
	}
};

const checkCheckboxesEdit = function() {
	if (isCheckedEdit == 0) {
        document.querySelector('.c-warning-edit').style.display = 'block';
	} else {
		document.querySelector('.c-warning-edit').style.display = 'none';
		showMainPage();
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
		isCheckedEdit = 0;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	getDOM();
	enableInteraction();
});
