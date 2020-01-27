const loggedOut = function(data){
	window.location.href = 'loginpage.html';
};


const init = function(){
    console.log('Script geladen! 👍')
    sessionButton = document.getElementById('sessions');
    settingsButton = document.getElementById('settings');
    logoutButton = document.getElementById('logout');
    gameButton = document.getElementById('game');

    sessionButton.addEventListener('click', function(){
        window.location.href = 'sessiepage.html';
    });

    settingsButton.addEventListener('click', function(){
        window.location.href = 'adminpage.html';
    });

	logoutButton.addEventListener('click', function(){
		logOut(JSON.parse(localStorage.getItem('LoginToken')), loggedOut);
    });
    
    gameButton.addEventListener('click', function(){
        window.location.href = 'index.html';
    });
}; 


document.addEventListener('DOMContentLoaded', function() {
	init();
});