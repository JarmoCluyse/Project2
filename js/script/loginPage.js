

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

const checkValidityLogin = function(){
	if (!document.getElementById('email').checkValidity()){
		return false;
	}
	else if (!document.getElementById('password').checkValidity()){
		return false;
	}
	else {
		return true;
	}
};

const checkValidityCreateAccount = function(){
	if (!document.getElementById('newAccountName').checkValidity()){
		return false;
	}
	else if (!document.getElementById('newAccountFirstName').checkValidity()){
		return false;
	}

	else if (!document.getElementById('newEmail').checkValidity()){
		return false;
	}
	else if (!document.getElementById('newPassword').checkValidity()){
		return false;
	}
	else if (!document.getElementById('repeatNewPassword').checkValidity()){
		return false;
	}

	else if (document.getElementById('newPassword').value != document.getElementById('repeatNewPassword').value){
		passError.style.display = 'block';
		return false;
	}

	else {
		passError.style.display = 'none';
		return true;
	}
};


const init = function(){
	console.log('Script geladen! 👍')
	loginButton = document.querySelector('.c-button__login');
	makeAccountButton = document.querySelector('.js-makeAccount');
	goBackToLoginButton = document.querySelector('.js-login');
	makeAccountCard = document.querySelector('.c-new-account-card');
	createAccountButton = document.querySelector('.js-createAccount');
	loginCard = document.querySelector('.c-login-card');
	passError = document.querySelector('.c-passDontMatch');

	goBackToLoginButton.addEventListener('click', function(){
		showLoginPage();
	});

	createAccountButton.addEventListener('click', function(){
		if(checkValidityCreateAccount() == true){
			showAdminPage();
		}

	});

	loginButton.addEventListener('click', function(){
		if(checkValidityLogin() == true){
			showAdminPage();
		}
	});	

	makeAccountButton.addEventListener('click', function(){
		showMakeAccountPage();
	});

};


document.addEventListener('DOMContentLoaded', function() {
	init();
});