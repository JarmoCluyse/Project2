
const showAdminPage = function(){
	window.location.href = 'adminpage.html';
};


const showLoginPage = function(){
	loginCard.style.display = "block";
	makeAccountCard.style.display = "none";
};


const showMakeAccountPage = function(){
	loginCard.style.display = "none";
	makeAccountCard.style.display = "block";
};

const init = function(){
	console.log('Script geladen! 👍')
	loginButton = document.querySelector('.c-button__login');
	makeAccountButton = document.querySelector('.js-makeAccount');
	goBackToLoginButton = document.querySelector('.js-login');
	makeAccountCard = document.querySelector('.c-new-account-card');
	createAccountButton = document.querySelector('.js-createAccount');
	loginCard = document.querySelector('.c-login-card');

	goBackToLoginButton.addEventListener('click', function(){
		showLoginPage();
	});

	createAccountButton.addEventListener('click', function(){
		showAdminPage();
	});

	loginButton.addEventListener('click', function(){
		showAdminPage(); 
	});	

	makeAccountButton.addEventListener('click', function(){
		showMakeAccountPage();
	});

};


document.addEventListener('DOMContentLoaded', function() {
	init();
});