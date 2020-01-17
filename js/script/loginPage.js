
// redirect to the adminpage
const showAdminPage = function(){
	window.location.href = 'adminpage.html';
};

// show the login screen
const showLoginPage = function(){
	// unhide the logincard
	loginCard.style.display = "block";

	// hide the make account card
	makeAccountCard.style.display = "none";
};

// show the make account screen
const showMakeAccountPage = function(){
	loginCard.style.display = "none";
	makeAccountCard.style.display = "block";
};

// checking if everything is filled in for login
const checkValidityLogin = function(){
	email = document.getElementById('email');
	password = document.getElementById('password');

	// if there is input we clear the errormessage
	password.oninput = function(){
		password.setCustomValidity('');
	}


	// check the validity of each inputfield in the form
	if (!email.checkValidity()){
		return false;
	}
	else if (!password.checkValidity()){
		// custom validity message
		password.setCustomValidity("Gelieve je wachtwoord in te geven.")
		return false;
	}
	else {
		// return true if there are no errors so you can continue
		return true;
	}
};

// checking if everything is filled in for create an account
const checkValidityCreateAccount = function(){
	newAccountFirstName = document.getElementById('newAccountFirstName');
	newAccountName = document.getElementById('newAccountName');
	newEmail = document.getElementById('newEmail');
	newPassword = document.getElementById('newPassword');
	repeatNewPassword = document.getElementById('repeatNewPassword');

	// if there is input we clear the errormessage
	newAccountFirstName.oninput = function(){
		newAccountFirstName.setCustomValidity('');
	}

	// if there is input we clear the errormessage
	newAccountName.oninput = function(){
		newAccountName.setCustomValidity('');
	}

	// if there is input we clear the errormessage
	newPassword.oninput = function(){
		newPassword.setCustomValidity('');
	}

	// if there is input we clear the errormessage
	repeatNewPassword.oninput = function(){
		repeatNewPassword.setCustomValidity('');
	}

	// check the validity of each inputfield in the form
	if (!newAccountFirstName.checkValidity()){
		// custom validity message
		newAccountFirstName.setCustomValidity("Gelieve je voornaam in te vullen.")
		return false;
	}
	else if (!newAccountName.checkValidity()){
		// custom validity message
		newAccountName.setCustomValidity("Gelieve je naam in te vullen.")
		return false;
	}

	else if (!newEmail.checkValidity()){
		// no custom validity message because the default also checks for "@" and '.' 
		return false;
	}
	else if (!newPassword.checkValidity()){
		// custom validity message
		newPassword.setCustomValidity("Gelieve een wachtwoord in te vullen.")
		return false;
	}
	else if (!repeatNewPassword.checkValidity()){
		// custom validity message
		repeatNewPassword.setCustomValidity("Gelieve je wachtwoord te herhalen.")
		return false;
	}

	else if (newPassword.value != repeatNewPassword.value){
		// if the passwords don't match show an errormessage
		passError.style.display = 'block';
		return false;
	}

	else {
		// remove the errormessage if there are no errors left
		passError.style.display = 'none';

		// return true if there are no errors
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

	// go back to the loginscreen if you are on the createaccount screen
	goBackToLoginButton.addEventListener('click', function(){
		showLoginPage();
	});

	// create an account
	createAccountButton.addEventListener('click', function(){
		// check if everything is filled in correctly
		if(checkValidityCreateAccount() == true){
			// show the adminpage
			showAdminPage();
		}

	});

	// login
	loginButton.addEventListener('click', function(){
		// check if everything is filled in correctly
		if(checkValidityLogin() == true){
			// show the adminpage
			showAdminPage();
		}
	});	

	// go to the create an account screen
	makeAccountButton.addEventListener('click', function(){
		// show the create an account card
		showMakeAccountPage();
	});

};


document.addEventListener('DOMContentLoaded', function() {
	init();
});