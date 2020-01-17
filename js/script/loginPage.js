
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
	// check the validity of each inputfield in the form
	if (!document.getElementById('email').checkValidity()){
		return false;
	}
	else if (!document.getElementById('password').checkValidity()){
		return false;
	}
	else {
		// return true if there are no errors so you can continue
		return true;
	}
};

// checking if everything is filled in for create an account
const checkValidityCreateAccount = function(){
	// check the validity of reach inputfield in the form
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

const loggedIn = function(data){
	console.log(data);
	localStorage.setItem("LoginToken", JSON.stringify(data));
	showAdminPage();
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
			// log in
			logIn(document.getElementById('email').value, document.getElementById('password').value, loggedIn);
			//showAdminPage();
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