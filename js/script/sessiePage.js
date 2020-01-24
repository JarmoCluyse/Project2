let id;
const showSessionResults = function(data){
    currentId = sessionDropdown.options[sessionDropdown.selectedIndex].value;
    var filteredGames = data.filter(obj => {
        return obj.session === currentId;
      });
      console.log(filteredGames);  
    sessionTable = document.querySelector('.c-table');
    sessionTable.innerHTML =    `<tr class="c-table-row">
                                    <th>Naam</th>
                                    <th>Score</th> 
                                    <th>Aantal bewegingen</th>
                                    <th>Juiste vragen</th>
                                </tr>`;
                       
    filteredGames.forEach(element =>{
        sessionTable.innerHTML +=   `<tr class="c-table-row">
        <td>${element.player}</td>
        <td>${element.score}</td>
        <td>${element.numberOfLaneChanges}</td>
        <td>${element.questionsAnswered}</td>
    </tr>`
    });
     

};


const showNewSessionpage = function(){
    handleData(`${BASEURI}questions?code=${key}`, fillSubjects)
    newSessionPage.style.display = 'block';

    hideMainPage();
};
const fillSubjects = function(data){
    console.log(data);
    sessionSelectSubjectDropdown.innerHTML = `<option value="all">(Alle onderwerpen)</option>`;
    var subjects = data.filter(obj => {
        return obj.teacherEmail === token.userEmail;
      });
    foundSubjects = []
    subjects.forEach(element =>{
	if (!foundSubjects.includes(element.subject)){
		foundSubjects.push(element.subject);
		sessionSelectSubjectDropdown.innerHTML += `<option value="${element.subject}">${element.subject}</option>`;
	}
	});
};

const showSessionMainPage = function(){
    newSessionPage.style.display = 'none';
    deleteSesssionConfirmation.style.display = 'none';
    newSessionIdCard.style.display = 'none';
    sessionMainPage.pointerEvents = 'auto';
    sessionMainPage.style.opacity = '1';
    accountButton.style.display = "block";
    accountButton.pointerEvents = "auto";

};

const fillSessionDropdown = function(data){
    console.log(data);
    sessionDropdown.innerHTML = "";

    data.forEach(element=>{
        sessionDropdown.innerHTML += `<option value="${element.sessionId}">${element.sessionId} - ${element.beschrijving}</option>`;    
    });
    handleData(`${BASEURI}games?code=${key}`, showSessionResults, "GET",null);
};


const hideMainPage = function(){
    console.log("yep")
    accountButton.style.display = "none";
    accountButton.pointerEvents = "none";
    sessionMainPage.pointerEvents = 'none';
    sessionMainPage.style.opacity = '0.8';
};

const showDeleteSessionPage = function(){
    deleteSessionPage.style.display = 'block';
    // sessionSelectDeleteDropdown.innerHTML = "";
    // sessionSelectDeleteDropdown.innerHTML += `<option value="${sessieIdHier}">${sessieNaamHier}</option>`
    hideMainPage();
};

const showDeleteSessionConfirmation = function(){
    hideMainPage();
    deleteSesssionConfirmation.style.display = 'block';
    deleteTitle.innerHTML = `Weet je zeker dat je de sessie ${sessionDropdown.options[sessionDropdown.selectedIndex].innerHTML} wilt verwijderen?`;
}

const deleteSession = function(){
    // verwijder hier je de session
    delTxt = `{"sessionid": "${sessionDropdown.value}", "teacheremail": "${token.userEmail}"}`;
    del = JSON.parse(delTxt);
    sendData(`${BASEURI}session?code=${key}`, deletedSession, 'DELETE', del);
    showSessionMainPage();
};

const deletedSession = function(data){
    console.log("deleted");
    location.reload();
};

const showSessionIdPage = function(){
    newSessionPage.style.display = 'none';
    newSessionIdCard.style.display = 'flex';

};

const loggedOut = function(data){
	window.location.href = 'loginpage.html';
};

const settingsPage = function(){
    window.location.href = 'adminpage.html';
}

const init = function(){
    console.log('Script geladen! 👍')
    deleteTitle = document.getElementById("js-deleteTitle");
    newSessionName = document.getElementById("newSessionName");
    checkboxSession = document.getElementById("checkboxSession");
    sessionDropdown = document.querySelector('.js-sessionSelection');
    resultsTitle = document.querySelector('.c-session-card-results-title');
    newSessionButton = document.querySelector('.js-newSession');
    createNewSessionButton = document.querySelector('.js-addNewSession');
    closeButton = document.querySelectorAll('.c-close__button');
    newSessionPage = document.querySelector('.c-newSession-card');
    sessionMainPage = document.querySelector('.c-main-card');
    deleteSessionPage = document.querySelector('.c-deleteSession-card');
    deleteSesssionConfirmation = document.querySelector('.c-delete__session');
    deleteASessionButton = document.querySelector('.js-deleteASession');
    deleteSessionButton = document.querySelector('.js-deleteSessionButton');
    yesButton = document.querySelector('.js-yesSession');
    noButton = document.querySelector('.js-noSession');
    newSessionIdCard = document.querySelector('.c-sessionId-card');
    sessionSelectSubjectDropdown = document.getElementById('selectSessionSubject');
    sessionSelectDeleteDropdown = document.getElementById('deleteSessionSelect');
    logoutButton = document.getElementById('logout');
    settingsButton = document.getElementById('settings');
    accountButton = document.querySelector('.c-session-account');
    newSessionClose = document.getElementById('newSessionClose');
    handleData(`${BASEURI}sessions/${token.userEmail}?code=${key}`, fillSessionDropdown);

    //fillSessionDropdown();

    dropdownId = sessionDropdown.options[sessionDropdown.selectedIndex].value
    
    deleteASessionButton.addEventListener('click', function(){
        showDeleteSessionConfirmation();
    });

    settingsButton.addEventListener('click', function(){
        settingsPage();
    });
    
	logoutButton.addEventListener('click', function(){
		logOut(JSON.parse(localStorage.getItem('LoginToken')), loggedOut);
	});

    closeButton.forEach(element => {
        element.addEventListener('click', function(){
            showSessionMainPage();
        });    
    });

    newSessionClose.addEventListener('click', function(){
        location.reload();
    });



    createNewSessionButton.addEventListener('click', function(){
        selectedSessionSubject = sessionSelectSubjectDropdown.options[sessionSelectSubjectDropdown.selectedIndex].value;

        console.log(selectedSessionSubject);
        id = idGenerator();
        postTxt = `{"teacheremail": "${token.userEmail}", "forcedsubject": "${selectedSessionSubject}", "beschrijving": "${newSessionName.value}", "teacherquestionsonly": ${!checkboxSession.checked}, "sessionid": "${id}" }`;
        postjson = JSON.parse(postTxt);
        console.log(postjson);
        sendData(`${BASEURI}session?code=${key}`, showSessionIdPage,'POST', postjson);

    });

    newSessionButton.addEventListener('click', function(){
        showNewSessionpage();
    });

    noButton.addEventListener('click', function(){
        showSessionMainPage();
    });

    yesButton.addEventListener('click', function(){
        deleteSession();
    });

    sessionDropdown.addEventListener('change', function(){
        handleData(`${BASEURI}games?code=${key}`, showSessionResults, "GET",null);
        console.log(sessionDropdown.options[sessionDropdown.selectedIndex].value); 

    });
}


document.addEventListener('DOMContentLoaded', function() {
	init();
});