let id;
let filteredGames;
const showSessionResults = function(data){
    console.log(data);
    // currentId = sessionDropdown.options[sessionDropdown.selectedIndex].value;
    // filteredGames = data.filter(obj => {
    //     return obj.session === currentId;
    //   });
    //   console.log(filteredGames);  
    sessionTable = document.querySelector('.c-table');
    sessionTable.innerHTML =    `<tr class="c-table-row">
                                    <th>Naam</th>
                                    <th>Score</th> 
                                    <th>Aantal bewegingen</th>
                                    <th>Juiste vragen</th>
                                </tr>`;
                       
    data.forEach(element =>{
        sessionTable.innerHTML +=   `<tr class="c-table-row">
        <td>${element.player}</td>
        <td>${element.score}</td>
        <td>${element.numberOfLaneChanges}</td>
        <td>${element.questionsAnswered}</td>
    </tr>`
    });
     

};

const sortGames = function(by){
    if (by == "player"){
        filteredGames = filteredGames.sort((a, b) => (a.player > b.player) ? 1 : -1);
    }
    else if (by == "score"){
        filteredGames = filteredGames.sort((a, b) => (a.score < b.score) ? 1 : -1);
    }
    else if (by == "laneChanges"){
        filteredGames = filteredGames.sort((a, b) => (a.numberOfLaneChanges < b.numberOfLaneChanges) ? 1 : -1);
    }
    else if (by == "questionsAnswered"){
        filteredGames = filteredGames.sort((a, b) => (a.questionsAnswered < b.questionsAnswered) ? 1 : -1);
    }
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
    handleData(`${BASEURI}games/${data[0].sessionId}?code=${key}`, showSessionResults, "GET",null);
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
const checkCallbackSessie = function(data){//This function checks if the logintoken stored in the browser is still valid
	if (data.ok){
	}
	else{
		localStorage.removeItem('LoginToken');
		window.location.href = "loginpage.html";
	}
	
};
const init = function(){
    console.log('Script geladen! 👍')
    token = JSON.parse(localStorage.getItem("LoginToken"));
	console.log(token);
	if (token != null){
		sendData(`${BASEURI}login/token?code=${key}`, checkCallbackSessie, "POST", token);
	}
	else{
		window.location.href = "loginpage.html";
	}
    sortSelect = document.getElementById("sortSelect");
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
    startGameButton = document.getElementById('game');
    highScoreButton = document.getElementById('highscores');
    handleData(`${BASEURI}sessions/${token.userEmail}?code=${key}`, fillSessionDropdown);

    //fillSessionDropdown();

    dropdownId = sessionDropdown.options[sessionDropdown.selectedIndex].value
    
    highScoreButton.addEventListener('click', function(){
        window.location.href = 'highscorepage.html';
    })

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

    
	startGameButton.addEventListener('click', function(){
		window.location.href = 'index.html';
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
        handleData(`${BASEURI}games/${sessionDropdown.value}?code=${key}`, showSessionResults, "GET",null);
        console.log(sessionDropdown.options[sessionDropdown.selectedIndex].value); 

    });
    sortSelect.addEventListener('change', function(){
        sortGames(sortSelect.value);

    });
}


document.addEventListener('DOMContentLoaded', function() {
	init();
});