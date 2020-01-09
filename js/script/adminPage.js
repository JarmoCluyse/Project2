const getQuestions = function (lang) {
    handleData(`${BASEURI}questions?code=${key}`, showQuestions)
};
const showQuestions = function (data) {
    console.log(data);
};

const showAddQuestionPage = function() {
	mainCard.style.opacity = 0.2;
	mainCard.style.pointerEvents = 'none';
	addCard.style.display = 'block';
};

const showEditQuestionPage = function() {
	mainCard.style.opacity = 0.2;
	mainCard.style.pointerEvents = 'none';
	editCard.style.display = 'block';
};

const showMainPage = function() {
	mainCard.style.opacity = 1;
	mainCard.style.pointerEvents = 'auto';
	addCard.style.display = 'none';
	editCard.style.display = 'none';
};

const init = function() {
	console.log('Script geladen! 👍');
	getQuestions();
	newQuestionButton = document.querySelector('.js-newQuestion');
	editButton = document.querySelectorAll('.c-edit');
	mainCard = document.querySelector('.c-main-card');
	addCard = document.querySelector('.c-add-card');
	editCard = document.querySelector('.c-edit-card');
	submitQuestion = document.querySelector('.js-addQuestion');
	submitEdit = document.querySelector('.js-editQuestion');
	closeWindowButton = document.querySelectorAll('.c-close__button');

	newQuestionButton.addEventListener('click', function() {
		showAddQuestionPage();
	});

	editButton.forEach(element => {
		element.addEventListener('click', function() {
			showEditQuestionPage();
		});
	});

	submitQuestion.addEventListener('click', function() {
		showMainPage();
	});

	submitEdit.addEventListener('click', function() {
		showMainPage();
	});

	closeWindowButton.forEach(element => {
		element.addEventListener('click', function() {
			showMainPage();
		});
	});
};

document.addEventListener('DOMContentLoaded', function() {
	init();
});
