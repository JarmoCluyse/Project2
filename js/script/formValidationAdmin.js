let subject = {},
	newQuestion = {},
	newQuestionAnswer1 = {},
	newQuestionAnswer2 = {},
	newQuestionAnswer3 = {},
    newQuestionAnswer4 = {},

    editQuestion = {},
    editQuestionAnswer1 = {},
	editQuestionAnswer2 = {},
	editQuestionAnswer3 = {},
	editQuestionAnswer4 = {},
    checkbox = {},
    checkboxEdit = {},
    isChecked = 0,
    isCheckedEdit = 0,
    addQuestionHasError = 1,
    editQuestionHasError = 1;

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

const showSubjectErrorMsg = function() {
    document.querySelector('.c-subject-errormsg').style.display = 'block';
    addQuestionHasError = 1;
};

const removeSubjectErrorMsg = function() {
    document.querySelector('.c-subject-errormsg').style.display = 'none';
    addQuestionHasError = 0;
};

const showNewQuestionErrorMsg = function() {
    document.querySelector('.c-newQuestion-errormsg').style.display = 'block';
    addQuestionHasError = 1;
};

const removeNewQuestionErrorMsg = function() {
    document.querySelector('.c-newQuestion-errormsg').style.display = 'none';
    addQuestionHasError = 0;
};

const showNewAnswerErrorMsg1 = function() {
	document.querySelector('.c-newQuestion__answer-errormsg1').style.display = 'block';
    addQuestionHasError = 1;
};

const removeNewAnswerErrorMsg1 = function() {
    document.querySelector('.c-newQuestion__answer-errormsg1').style.display = 'none';
    addQuestionHasError = 0;
};

const showNewAnswerErrorMsg2 = function() {
    document.querySelector('.c-newQuestion__answer-errormsg2').style.display = 'block';
    addQuestionHasError = 1;
};

const removeNewAnswerErrorMsg2 = function() {
    document.querySelector('.c-newQuestion__answer-errormsg2').style.display = 'none';
    addQuestionHasError = 0;
};

const showNewAnswerErrorMsg3 = function() {
    document.querySelector('.c-newQuestion__answer-errormsg3').style.display = 'block';
    addQuestionHasError = 1;
};

const removeNewAnswerErrorMsg3 = function() {
    document.querySelector('.c-newQuestion__answer-errormsg3').style.display = 'none';
    addQuestionHasError = 0;
};

const showNewAnswerErrorMsg4 = function() {
    document.querySelector('.c-newQuestion__answer-errormsg4').style.display = 'block';
    addQuestionHasError = 1;
};

const removeNewAnswerErrorMsg4 = function() {
    document.querySelector('.c-newQuestion__answer-errormsg4').style.display = 'none';
    addQuestionHasError = 0;
};





const showEditQuestionErrorMsg = function() {
    document.querySelector('.c-editQuestion-errormsg').style.display = 'block';
    editQuestionHasError = 1;
};

const removeEditQuestionErrorMsg = function() {
    document.querySelector('.c-editQuestion-errormsg').style.display = 'none';
    editQuestionHasError = 0;
};

const showEditAnswerErrorMsg1 = function() {
	document.querySelector('.c-editQuestion__answer-errormsg1').style.display = 'block';
    editQuestionHasError = 1;
};

const removeEditAnswerErrorMsg1 = function() {
    document.querySelector('.c-editQuestion__answer-errormsg1').style.display = 'none';
    editQuestionHasError = 0;
};

const showEditAnswerErrorMsg2 = function() {
    document.querySelector('.c-editQuestion__answer-errormsg2').style.display = 'block';
    editQuestionHasError = 1;
};

const removeEditAnswerErrorMsg2 = function() {
    document.querySelector('.c-editQuestion__answer-errormsg2').style.display = 'none';
    editQuestionHasError = 0;
};

const showEditAnswerErrorMsg3 = function() {
    document.querySelector('.c-editQuestion__answer-errormsg3').style.display = 'block';
    editQuestionHasError = 1;
};

const removeEditAnswerErrorMsg3 = function() {
    document.querySelector('.c-editQuestion__answer-errormsg3').style.display = 'none';
    editQuestionHasError = 0;
};

const showEditAnswerErrorMsg4 = function() {
    document.querySelector('.c-editQuestion__answer-errormsg4').style.display = 'block';
    editQuestionHasError = 1;
};

const removeEditAnswerErrorMsg4 = function() {
    document.querySelector('.c-editQuestion__answer-errormsg4').style.display = 'none';
    editQuestionHasError = 0;
};

const checkCheckboxes = function() {
	if (isChecked == 0) {
		document.querySelector('.c-warning').style.display = 'block';
	} else {
        document.querySelector('.c-warning').style.display = 'none';
        if (addQuestionHasError == 0){
            showMainPage();
            let newQuestionValue = newQuestion.input.value;
            let newQuestionAnswer1Value = newQuestionAnswer1.input.value;
            let newQuestionAnswer2Value = newQuestionAnswer2.input.value;
            let newQuestionAnswer3Value = newQuestionAnswer3.input.value;
            let newQuestionAnswer4Value = newQuestionAnswer4.input.value;
            
        }
	}
};

const checkCheckboxesEdit = function() {
	if (isCheckedEdit == 0) {
        document.querySelector('.c-warning-edit').style.display = 'block';
	} else {
        document.querySelector('.c-warning-edit').style.display = 'none';
        if (editQuestionHasError == 0){
            showMainPage();
        }
	}
};

const getDOM = function() {
	console.log('formValidation geladen! 👍');
	subject.input = document.getElementById('Subject');
	newQuestion.input = document.getElementById('newQuestion');
	newQuestionAnswer1.input = document.getElementById('newQuestionAnswer1');
	newQuestionAnswer2.input = document.getElementById('newQuestionAnswer2');
	newQuestionAnswer3.input = document.getElementById('newQuestionAnswer3');
    newQuestionAnswer4.input = document.getElementById('newQuestionAnswer4');

    editQuestion.input = document.getElementById('editQuestion');
    editQuestionAnswer1.input = document.getElementById('editQuestionAnswer1');
	editQuestionAnswer2.input = document.getElementById('editQuestionAnswer2');
	editQuestionAnswer3.input = document.getElementById('editQuestionAnswer3');
	editQuestionAnswer4.input = document.getElementById('editQuestionAnswer4');
    checkbox.input = document.querySelectorAll('.js-checkbox');
    checkboxEdit.input = document.querySelectorAll('.js-checkboxEdit');
    submitQuestion = document.querySelector('.js-addQuestion');
    submitEdit = document.querySelector('.js-editQuestion');
};

const enableInteraction = function() {
	subject.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showSubjectErrorMsg();
		} else {
			removeSubjectErrorMsg();
		}
    });
    
    editQuestion.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
            showEditQuestionErrorMsg();
		} else {
            removeEditQuestionErrorMsg();
		}
	})

	newQuestion.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showNewQuestionErrorMsg();
		} else {
			removeNewQuestionErrorMsg();
		}
    });
    
    editQuestionAnswer1.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showEditAnswerErrorMsg1();
		} else {
			removeEditAnswerErrorMsg1();
		}
    });
    
    editQuestionAnswer2.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showEditAnswerErrorMsg2();
		} else {
			removeEditAnswerErrorMsg2();
		}
    });
    
    editQuestionAnswer3.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showEditAnswerErrorMsg3();
		} else {
			removeEditAnswerErrorMsg3();
		}
    });
    
    editQuestionAnswer4.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showEditAnswerErrorMsg4();
		} else {
			removeEditAnswerErrorMsg4();
		}
	});

	newQuestionAnswer1.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showNewAnswerErrorMsg1();
		} else {
			removeNewAnswerErrorMsg1();
		}
	});

	newQuestionAnswer2.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showNewAnswerErrorMsg2();
		} else {
			removeNewAnswerErrorMsg2();
		}
	});

	newQuestionAnswer3.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showNewAnswerErrorMsg3();
		} else {
			removeNewAnswerErrorMsg3();
		}
	});

	newQuestionAnswer4.input.addEventListener('blur', function(event) {
		const typedInput = event.target.value;

		if (isEmpty(typedInput)) {
			showNewAnswerErrorMsg4();
		} else {
			removeNewAnswerErrorMsg4();
		}
	});

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
