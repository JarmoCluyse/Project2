const getSessionResults = function(){
    sessionTable = document.querySelector('.c-table');
    sessionTable.innerHTML =    `<tr class="c-table-row">
                                    <th>Naam</th>
                                    <th>Score</th> 
                                    <th>Aantal bewegingen</th>
                                    <th>Juiste vragen</th>
                                </tr>`;
    
    Naamhier = "bob";
    Scorehier = "69";
    aantalBewegingenHier = "69420";
    juisteVragenHier = "98";
                                
    // gelieve hier nog de results in te vullen @thomas
    sessionTable.innerHTML +=   `<tr class="c-table-row">
                                    <td>${Naamhier}</td>
                                    <td>${Scorehier}</td>
                                    <td>${aantalBewegingenHier}</td>
                                    <td>${juisteVragenHier}</td>
                                </tr>` 

};


const showNewSessionpage = function(){
    newSessionPage.style.display = 'block';
    sessionSelectSubjectDropdown.innerHTML = "";
    sessionSelectSubjectDropdown.innerHTML += `<option value="${subjectIdHier}">${subjectNaamHier}</option>`

    hideMainPage();

};

const showSessionMainPage = function(){
    newSessionPage.style.display = 'none';
    deleteSessionPage.style.display = 'none';
    deleteSesssionConfirmation.style.display = 'none';
    newSessionIdCard.style.display = 'none';
    sessionMainPage.pointerEvents = 'auto';
    sessionMainPage.style.opacity = '1';

};

const fillSessionDropdown = function(){
    sessionDropdown.innerHTML = "";

    sessieIdHier = "S-69420"
    sessieNaamHier = "hihi"

    sessionDropdown.innerHTML += `<option value="${sessieIdHier}">${sessieNaamHier}</option>`;
    sessionDropdown.innerHTML += `<option value="${sessieIdHier}">${sessieNaamHier}</option>`;
};


const hideMainPage = function(){
    sessionMainPage.pointerEvents = 'none';
    sessionMainPage.style.opacity = '0.8';
};

const showDeleteSessionPage = function(){
    deleteSessionPage.style.display = 'block';
    sessionSelectDeleteDropdown.innerHTML = "";
    sessionSelectDeleteDropdown.innerHTML += `<option value="${sessieIdHier}">${sessieNaamHier}</option>`
    hideMainPage();
};

const showDeleteSessionConfirmation = function(){
    deleteSesssionConfirmation.style.display = 'block';
    deleteSessionPage.style.display = 'none';
}

const deleteSession = function(){
    // verwijder hier je de session

    showSessionMainPage();
};

const showSessionIdPage = function(){
    newSessionPage.style.display = 'none';
    newSessionIdCard.style.display = 'flex';
    

};

const init = function(){
    console.log('Script geladen! 👍')
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

    fillSessionDropdown();

    resultsTitle.innerHTML = `Dit zijn de resultaten voor ${sessionDropdown.options[sessionDropdown.selectedIndex].innerHTML}:`
    dropdownId = sessionDropdown.options[sessionDropdown.selectedIndex].value

    deleteASessionButton.addEventListener('click', function(){
        showDeleteSessionPage();
    });


    closeButton.forEach(element => {
        element.addEventListener('click', function(){
            showSessionMainPage();
        });    
    });

    deleteSessionButton.addEventListener('click', function(){
        selectedSessionToDelete = sessionSelectDeleteDropdown.options[sessionSelectDeleteDropdown.selectedIndex].value;
        showDeleteSessionConfirmation();
    });

    createNewSessionButton.addEventListener('click', function(){
        selectedSessionSubject = sessionSelectSubjectDropdown.options[sessionSelectSubjectDropdown.selectedIndex].value;
        showSessionIdPage();
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
        console.log(sessionDropdown.options[sessionDropdown.selectedIndex].value)  

        resultsTitle.innerHTML = `Dit zijn de resultaten voor ${sessionDropdown.options[sessionDropdown.selectedIndex].innerHTML}:`

        getSessionResults();
    });
}


document.addEventListener('DOMContentLoaded', function() {
	init();
});