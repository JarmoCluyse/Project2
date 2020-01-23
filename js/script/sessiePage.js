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


const fillSessionDropdown = function(){
    sessionDropdown.innerHTML = "";

    sessieIdHier = "S-69420"
    sessieNaamHier = "hihi"

    sessionDropdown.innerHTML += `<option value="${sessieIdHier}">${sessieNaamHier}</option>`;
};


const init = function(){
    console.log('Script geladen! 👍')
    sessionDropdown = document.querySelector('.js-sessionSelection');
    resultsTitle = document.querySelector('.c-session-card-results-title');

    fillSessionDropdown();

    resultsTitle.innerHTML = `Dit zijn de resultaten voor ${sessionDropdown.options[sessionDropdown.selectedIndex].innerHTML}:`
    dropdownId = sessionDropdown.options[sessionDropdown.selectedIndex].value


    sessionDropdown.addEventListener('change', function(){
        console.log(sessionDropdown.options[sessionDropdown.selectedIndex].value)  

        resultsTitle.innerHTML = `Dit zijn de resultaten voor ${sessionDropdown.options[sessionDropdown.selectedIndex].innerHTML}:`

        getSessionResults();
    })
}


document.addEventListener('DOMContentLoaded', function() {
	init();
});