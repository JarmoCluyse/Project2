let editing;
let deleting;
let questionBox;
let subjectBox;
let answer1;
let answer2;
let answer3;
let answer4;
let cb1;
let cb2;
let cb3;
let cb4;

const loggedOut = function(data){
	window.location.href = 'loginpage.html';
};

const sessionPage = function(){
	window.location.href = 'sessiepage.html';
};

// get the questions from the database
const getQuestions = function () {
	// this will send data to the datahandler and the response are the questions
	handleData(`${BASEURI}questions?code=${key}`, showQuestions)
};


// delete the selected question from the database
const deleteQuestion = function() {
	// send data to the database
	sendData(`${BASEURI}question?code=${key}`, questionPosted, "DELETE", deleting);
	return false;
}

// add a new question + answers to the database
const addQuestion = function () {
	// all the variables are put into a json format
	jsontext = `{"questiontext": "${questionBox.value}", "subject": "${subjectBox.value}", "teacheremail": "${token.userEmail}", "answers": [{"answertext": "${answer1.value}", "iscorrect": ${cb1.checked}}, {"answertext": "${answer2.value}", "iscorrect": ${cb2.checked}}, {"answertext": "${answer3.value}", "iscorrect": ${cb3.checked}}, {"answertext": "${answer4.value}", "iscorrect": ${cb4.checked}}]}`;
	json = JSON.parse(jsontext);
	console.log(json);
	// send the jsonfile to the database
	sendData(`${BASEURI}question?code=${key}`, questionPosted, "POST", json);
};


// update a question in the database
const updateQuestion = function () {
	// fill in all variables
	editing.questionText = questionBox.value;
	editing.subject = document.getElementById('dropDownForEditCard').options[document.getElementById('dropDownForEditCard').selectedIndex].value;
	editing.answers[0].answerText = answer1.value;
	editing.answers[1].answerText = answer2.value;
	editing.answers[2].answerText = answer3.value;
	editing.answers[3].answerText = answer4.value;
	editing.answers[0].isCorrect = cb1.checked;
	editing.answers[1].isCorrect = cb2.checked;
	editing.answers[2].isCorrect = cb3.checked;
	editing.answers[3].isCorrect = cb4.checked;
	console.log(editing);
	//json = JSON.parse(editing);
	//console.log(json);
	// send all data to the database
	sendData(`${BASEURI}question?code=${key}`, questionPosted, "PUT", editing);
	return false;
};

// after sending a question to the database reload the page so all new questions are also loaded in
const questionPosted = function () {
	console.log("question posted");
	// this reloads the page completely
	location.reload();
};

var questionsObject;

// get all questions from the database and show them on the adminpage
const showQuestions = function (data) {
	if (data != null){//if data is null the data is we are calling the function to filter the questions so getting them again is not needed
		var questionsTeacher = data.filter(obj => {
			return obj.teacherEmail === token.userEmail;
		  })
		  questionsObject = questionsTeacher;
		  preloadDropDown(questionsTeacher);
		  console.log(questionsTeacher);
	}
	if (mainDropDown.value != 'all'){
		var filteredQuestions = questionsObject.filter(obj => {
			return obj.subject === mainDropDown.value;
		  });
	}
	else{
		filteredQuestions = questionsObject;
	}
	
	let listElement = document.getElementById("questionsList");
	listElement.innerHTML = "";
	let htmlString = "";
	// add the questions to the html
	filteredQuestions.forEach(element => {
		htmlString += `<li class="c-list__item">
		<h3 class="c-list__item-question">${element.questionText}</h3>

		<div class="c-list__logos">
		<svg class="c-edit" id="E${element.questionId}"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22" viewBox="0 0 22 22">
			<image id="_61456" data-name="61456" width="22" height="22" xlink:href="data:image/png;base64,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"/>
			</svg>
		<svg class="c-delete" id="D${element.questionId}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
			<image id="close_cross_delete_exit_remove_icon-1320085939816384527" data-name="close+cross+delete+exit+remove+icon-1320085939816384527" width="24" height="24" xlink:href="data:image/png;base64,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"/>
		</svg>   
		</div>                                      
	</li>
	<div class="c-answerlist">
		<ul class="c-list__question-answers o-list">
			<div class="c-answers">	
				<li class="c-list__answers">${element.answers[0].answerText}</li>
				<li class="c-list__answers">${element.answers[1].answerText}</li>
			</div>

			<div class="c-answers">	
				<li class="c-list__answers">${element.answers[2].answerText}</li>
				<li class="c-list__answers">${element.answers[3].answerText}</li>
			</div>
		</ul>
	</div>`
	});
	listElement.innerHTML = htmlString;


	// add an eventlistener to every edit icon
	filteredQuestions.forEach(element => {
		// add an eventlistener to EACH edit icon, it runs through a list 
		document.getElementById(`E${element.questionId}`).addEventListener('click', function () {
			// this brings you to the editquestion page, we send the question id so we get the correct question
			showEditQuestionPage(element.questionId);
		});
	})

	// add an eventlistener to every delete icon
	filteredQuestions.forEach(element => {
		// add an eventlistener to EACH delete icon, it runs through a list 
		document.getElementById(`D${element.questionId}`).addEventListener('click', function () {
			// this gives you a pop-up to confirm the deletion
			deleteQuestionConfirmation(element.questionId, element.questionText);
		});
	})
};


// load the dropdown with all possible values (get all subjects from the database)
const preloadDropDown = function(data){
	mainDropDown = document.getElementById('select');

	// fill in the default value to 'alle vragen'
	mainDropDown.innerHTML = `<option value="all">(Alle vragen)</option>`;

	// on change show the questions with a certain subject
	mainDropDown.addEventListener('change', function(){
		showQuestions(null);
	});

	foundSubjects = []


	// add all subjects to the dropdown
	data.forEach(element =>{
		if (!foundSubjects.includes(element.subject)){
			foundSubjects.push(element.subject);
			mainDropDown.innerHTML += `<option value="${element.subject}">${element.subject}</option>`;
		}
	});
};

// confirmation popup 'are you sure you want to delete this question?'
const deleteQuestionConfirmation = function (qid, qText) {
	yesButton = document.querySelector('.js-yes');
	noButton = document.querySelector('.js-no');
	questionConfirmationTitle = document.querySelector('.c-deleteQuestion-title');

	questionConfirmationTitle.innerHTML = `Weet je zeker dat je de vraag "${qText}" wilt verwijderen?`

	// make the maincard look more in the background
	mainCard.style.opacity = 0.8;
	mainCard.style.pointerEvents = 'none';
	// show the deletecard
	deleteCard.style.display = 'block';


	// if person chose 'yes' the question will be deleted
	yesButton.addEventListener('click', function () {
		// show the maincard again
		mainCard.style.opacity = 1;
		mainCard.style.pointerEvents = 'auto';
		// hide the deletecard
		deleteCard.style.display = 'none';
		console.log(qid);
		// run through all questions till the question id matches, then delete said question
		for (var q in questionsObject) {
			if (questionsObject[q].questionId == qid) {
				deleting = questionsObject[q];
			}
		}
		console.log(deleting);
		deleteQuestion();
	});

	// if the person chose 'no' the user will be brought back to the mainpage
	noButton.addEventListener('click', function () {
		// show the maincard again
		mainCard.style.opacity = 1;
		mainCard.style.pointerEvents = 'auto';
		// hide the deletecard
		deleteCard.style.display = 'none';
	});
};

const deleteSubjectConfirmation = function(){
	yesButtonSubject = document.querySelector('.js-yesSubject');
	noButtonSubject = document.querySelector('.js-noSubject');
	subjectConfirmationTitle = document.querySelector('.c-deleteSubject-title');


	// make the dropdowncard look more in the background
	dropdownCard.style.opacity = 0.8;
	dropdownCard.pointerEvents = 'none';

	// show the deletecard
	deleteSubjectCard.style.display = 'block';
	subjectConfirmationTitle.innerHTML = `Weet je zeker dat je het onderwerp '${dropDownList.options[dropDownList.selectedIndex].value}' wilt verwijderen?`;

	yesButtonSubject.addEventListener('click', function(){
		// remove subject from dropdown
		str = `{"teacheremail": "${token.userEmail}", "subject": "${dropDownList.value}"}`;
		subjectSelect.remove(dropDownList.selectedIndex);
		sendData(`${BASEURI}question/subject?code=${key}`, deletedSubject, 'DELETE', JSON.parse(str));
		// hide deletecard
		deleteSubjectCard.style.display = 'none';

		// show dropdown card again properly
		dropdownCard.style.opacity = 1;
		dropdownCard.pointerEvents = 'auto';

		// show mainpage again
		showMainPage();
	});

	noButtonSubject.addEventListener('click', function(){
		// hide deletecard
		deleteSubjectCard.style.display = 'none';

		// show dropdown card again properly
		dropdownCard.style.opacity = 1;
		dropdownCard.pointerEvents = 'auto';
	});
}

const deletedSubject = function(data){
	location.reload();
};


// this will show the page with a form to make a complete new question
const showAddQuestionPage = function (selection = null) {
	// fill the dropdowns with all the subjects	
	subjectBox = document.getElementById("dropDownForAddCard");

	if (selection != null){
		subjectBox.innerHTML = `<option value="${selection}">${selection}</option>`;
	}

	else{
		if (mainDropDown.value == 'all'){
			fillDropDowns("dropDownForAddCard");
		}
			
		else{
			subjectBox.innerHTML = `<option value="${mainDropDown.value}">${mainDropDown.value}</option>`
		}
	}


	
	// make the maincard more to the background
	mainCard.style.opacity = 0.8;
	mainCard.style.pointerEvents = 'none';
	// show the addquestion card
	addCard.style.display = 'block';

	questionBox = document.getElementById("newQuestion");
	
	answer1 = document.getElementById('newQuestionAnswer1');
	answer2 = document.getElementById('newQuestionAnswer2');
	answer3 = document.getElementById('newQuestionAnswer3');
	answer4 = document.getElementById('newQuestionAnswer4');
	cb1 = document.getElementById('checkbox1');
	cb2 = document.getElementById('checkbox2');
	cb3 = document.getElementById('checkbox3');
	cb4 = document.getElementById('checkbox4');

	

	// document.getElementById("newSubmit").addEventListener('submit', function () {
	// 	addQuestion();
	// });
};


// this will show the page to edit a question, all data from the selected question is filled in already
const showEditQuestionPage = function (qid) {
	// fill the dropdowns with all the subjects
	fillDropDowns("dropDownForEditCard");
	let counter = 0;
	console.log(qid);
	// run through all the questions till the id matches and display this info
	for (var q in questionsObject) {
		if (questionsObject[q].questionId == qid) {
			editing = questionsObject[q];
		}
	}
	console.log(editing);
	// make the maincard go more to the background
	mainCard.style.opacity = 0.8;
	mainCard.style.pointerEvents = 'none';
	// show the editcard
	editCard.style.display = 'block';
	
	// grab all inputs
	questionBox = document.getElementById("editQuestion");
	dropDown = document.getElementById('dropDownForEditCard');
	answer1 = document.getElementById('editQuestionAnswer1');
	answer2 = document.getElementById('editQuestionAnswer2');
	answer3 = document.getElementById('editQuestionAnswer3');
	answer4 = document.getElementById('editQuestionAnswer4');
	cb1 = document.getElementById('checkbox5');
	cb2 = document.getElementById('checkbox6');
	cb3 = document.getElementById('checkbox7');
	cb4 = document.getElementById('checkbox8');

	// check all the subjects and if you find a match pick that one as selected index
	while (counter < dropDown.options.length){
		if (editing.subject.toLowerCase() == dropDown.options[counter].innerHTML.toLowerCase()){
			dropDown.selectedIndex = counter;
		}
		counter += 1;
		
	}

	// fill in the inputs with the correct data
	questionBox.value = editing.questionText;
	answer1.value = editing.answers[0].answerText;
	answer2.value = editing.answers[1].answerText;
	answer3.value = editing.answers[2].answerText;
	answer4.value = editing.answers[3].answerText;
	cb1.checked = editing.answers[0].isCorrect;
	cb2.checked = editing.answers[1].isCorrect;
	cb3.checked = editing.answers[2].isCorrect;
	cb4.checked = editing.answers[3].isCorrect;
	// document.getElementById("editSubmit").addEventListener('submit', function () {
	// 	updateQuestion();
	// });
};

// show edit dropdown page
const showDropDownEditPage = function(){
	// set display to block for dropdowncard
	dropdownCard.style.display = 'block';

	// make it look like maincard is in background
	mainCard.style.opacity = 0.8;
	mainCard.style.pointerEvents = 'none';

	// fill the dropdownmenus with the correct values by giving the id of the dropdown
	fillDropDowns("deleteSubject");
	
};

// show account page
const showAccountCard = function(){
	// set display to block for dropdowncard
	accountCard.style.display = 'block';

	// make it look like maincard is in background
	mainCard.style.opacity = 0.8;
	mainCard.style.pointerEvents = 'none';

};

// fill the dropdowns 
const fillDropDowns = function(elementId){
	// get the dropdownlist with the given id
	dropDownList = document.getElementById(`${elementId}`);
	
	// empty the dropdownlist
	dropDownList.innerHTML = "";

	let dropDownHtml = "";

	// make an empty list of values
	let dropdownValues = []
	dropdownInt = 1;

	// while loop that adds all values to the empty list
	while (dropdownInt < subjectSelect.options.length){
		// push to the empty list
		dropdownValues.push(subjectSelect.options[dropdownInt].innerHTML)

		// add 1 to dropdownoptions
		dropdownInt += 1;
	};

	// add innerhtml for each dropdown option
	dropdownValues.forEach(element => {
		dropDownHtml += `<option value="${element}">${element}</option>`;
	})

	// give the dropdown list the innerhtml
	dropDownList.innerHTML = dropDownHtml;
}


// add subject to dropdown menu
const addSubjectToDropDown = function(){
	// get the new subject from the input
	newSubject = document.getElementById('newDropDownValue');
	
	// go to add question page
	showAddQuestionPage(newSubject.value);
	dropdownCard.style.display = 'none';

	// set the value back to nothing
	newSubject.value = "";
};

const deleteSubjectFromDropDown = function(){
	dropDownList = document.getElementById('deleteSubject');
	deleteSubjectConfirmation();
};

// this function brings you back to the mainpage
const showMainPage = function () {
	// hide edit and add card
	editCard.style.display = 'none';
	addCard.style.display = 'none';
	dropdownCard.style.display = 'none';

	// show the maincard
	mainCard.style.opacity = 1;
	mainCard.style.pointerEvents = 'auto';
};

// this function checks if you clicked a checkbox
const checkedState = function (checkboxElement) {
	// check if a checkbox is checked
	if (checkboxElement.checked) {
		checkboxElement.checked = true;
	} else {
		checkboxElement.checked = false;
	}
};

const checkCallbackAdmin = function(data){//This function checks if the logintoken stored in the browser is still valid
	if (data.ok){
	}
	else{
		localStorage.removeItem('LoginToken');
		window.location.href = "loginpage.html";
	}
	
};
const init = function () {
	console.log('Script geladen! 👍');
	token = JSON.parse(localStorage.getItem("LoginToken"));
	console.log(token);
	if (token != null){
		sendData(`${BASEURI}login/token?code=${key}`, checkCallbackAdmin, "POST", token);
	}
	else{
		window.location.href = "loginpage.html";
	}
	// grab all the questions as the page is loading
	getQuestions();
	newQuestionButton = document.querySelector('.js-newQuestion');
	mainCard = document.querySelector('.c-main-card');
	addCard = document.querySelector('.c-add-card');
	editCard = document.querySelector('.c-edit-card');
	dropdownCard = document.querySelector('.c-dropdown-card');
	accountCard = document.querySelector('.c-account-card');
	deleteCard = document.querySelector('.c-delete-card');
	deleteSubjectCard = document.querySelector('.c-deleteSubject-card');
	submitQuestion = document.querySelector('.js-addQuestion');
	submitEdit = document.querySelector('.js-editQuestion');
	closeWindowButton = document.querySelectorAll('.c-close__button');
	checkboxInputs = document.querySelectorAll('.js-checkbox');
	dropdownEdit = document.querySelector('.c-custom-select__symbol-edit');
	subjectSelect = document.querySelector('.js-subjectSelect');
	addSubjectButton = document.getElementById('addSubject');
	deleteSubjectButton = document.getElementById('deleteSubjectButton');
	dropDownForCards = document.getElementById('dropDownForCards');
	logoutButton = document.getElementById('logout');
	sessionButton = document.getElementById('sessions');
	startGameButton = document.getElementById('game');
	highScoreButton = document.getElementById('highscores');


	highScoreButton.addEventListener('click', function(){
        window.location.href = 'highscorepage.html';
    })

	logoutButton.addEventListener('click', function(){
		logOut(JSON.parse(localStorage.getItem('LoginToken')), loggedOut);
	})

	sessionButton.addEventListener('click', function(){
		sessionPage();
	})

	// check the checkboxinputs
	checkboxInputs.forEach(element => {
		element.addEventListener('click', function () {
			checkedState(element);
		});
	});

	startGameButton.addEventListener('click', function(){
		window.location.href = 'index.html';
	});

	deleteSubjectButton.addEventListener('click', function(){
		deleteSubjectFromDropDown();
	});


	addSubjectButton.addEventListener('click', function(){
		addSubjectToDropDown();
	});


	dropdownEdit.addEventListener('click', function(){
		showDropDownEditPage();
	});


	// if you click on this button you will be brought to the page to add a new question
	newQuestionButton.addEventListener('click', function () {
		showAddQuestionPage();
	});


	// close the window you are currently looking at
	closeWindowButton.forEach(element => {
		// add an eventlistener to each closewindow element
		element.addEventListener('click', function () {
			showMainPage();
		});
	});
};

document.addEventListener('DOMContentLoaded', function () {
	init();
});