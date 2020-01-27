
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

	// if there is input we clear the errormessage
	email.oninput = function(){
		email.setCustomValidity('');
	}


	// check the validity of each inputfield in the form
	if (!email.checkValidity()){
		// custom validity message
		// check if email isn't empty
		if (email.value == ""){
			email.setCustomValidity("Gelieve je e-mailadres in te geven.")	
			return false;
		}

		// check if email includes '@'
		else if (!email.value.includes('@')){
			email.setCustomValidity("Je e-mailadres moet een '@' bevatten!")
			return false;
		}

		else {
			email.setCustomValidity("Controleer of je e-mailadres wel volledig is!")
			return false
		}
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
	newEmail.oninput = function(){
		newEmail.setCustomValidity('');
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
		newAccountFirstName.setCustomValidity("Gelieve je voornaam in te geven.")
		return false;
	}
	else if (!newAccountName.checkValidity()){
		// custom validity message
		newAccountName.setCustomValidity("Gelieve je naam in te geven.")
		return false;
	}

	else if (!newEmail.checkValidity()){
		// custom validity message
		// check if email isn't empty
		if (newEmail.value == ""){
			newEmail.setCustomValidity("Gelieve je e-mailadres in te geven.")	
			return false;
		}

		// if newEmail isn't empty check if it contains '@'
		else if (!newEmail.value.includes('@')){
			newEmail.setCustomValidity("Je e-mailadres moet een '@' bevatten!")
			return false;
		}

		else {
			newEmail.setCustomValidity("Controleer of je e-mailadres wel volledig is!")
			return false
		}
	}
	else if (!newPassword.checkValidity()){
		// custom validity message
		newPassword.setCustomValidity("Gelieve een wachtwoord in te geven.")
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

const register = function(){
	let jsontext = `{"emailaddress": "${newEmail.value}",
	"lastname": "${newAccountName.value}",
	"firstname": "${newAccountFirstName.value}",
	"password": "${newPassword.value}"}`
	let json = JSON.parse(jsontext);
	sendData(`${BASEURI}register?code=${key}`, registerCallback, 'POST', json);


};
const registerCallback = function(data){
	if (data.ok){
		logIn(newEmail.value, newPassword.value, loggedIn);

		// hide registration error
		createAccountError.style.display = "none";

	}
	else{
		// display registration error
		createAccountError.style.display = "block";
	}

};

const loggedIn = function(data){//This function is run when a result is returned from the server while logging in
	console.log(data);
	if(data.userEmail != "undefined"){
		localStorage.setItem("LoginToken", JSON.stringify(data));

		// hide login error
		passwordError.style.display = "none";
		passwordInput.style.borderColor = "var(--global-color-neutral-xxx-light)";
		passwordTitle.style.color = "var(--global-color-alpha-light)";

		showAdminPage();
	}
	else{
		// display login error
		passwordError.style.display = "block";
		passwordInput.style.borderColor = "red";
		passwordTitle.style.color = "red";
	}	
};

const checkCallback = function(data){//This function checks if the logintoken stored in the browser is still valid
	if (data.ok){
		showAdminPage();
	}
	else{
		localStorage.removeItem('LoginToken');
	}
	
};


const init = function(){
	console.log('Script geladen! 👍')
	token = JSON.parse(localStorage.getItem("LoginToken"));
	console.log(token);
	if (token != null){
		sendData(`${BASEURI}login/token?code=${key}`, checkCallback, "POST", token);
	}
	loginButton = document.querySelector('.c-button__login');
	passwordError = document.querySelector('.c-password-error');
	passwordInput = document.querySelector('.c-input-password');
	passwordTitle = document.querySelector('.c-login__input-password');
	createAccountError = document.querySelector('.c-registration-error');
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
			//showAdminPage();
			register();
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
		passwordError = document.querySelector('.c-password-error');
		passwordInput = document.querySelector('.c-input-password');
		passwordTitle = document.querySelector('.c-login__input-password');
		showMakeAccountPage();
	});

};


document.addEventListener('DOMContentLoaded', function() {
	init();
});