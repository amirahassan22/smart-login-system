var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var registerState = document.querySelector(".registerState");

var completeData;

if (localStorage.getItem("myDatabase") != null) {
    completeData = JSON.parse(localStorage.getItem("myDatabase"));
} else {
    completeData = [];
}

function checkEmptySignup() {
    if (
        signUpName.value == "" ||
        signUpEmail.value == "" ||
        signUpPassword.value == ""
    ) {
        return true;
    } else {
        return false;
    }
}
function showErrorMsg(msg) {
    registerState.innerHTML = msg;
    registerState.style.color = "#dc3545";
}
function hideErrorMsg() {
    registerState.innerHTML = "";
}
function showSuccess() {
    registerState.innerHTML = "Success";
    registerState.style.color = "#28a745";
}
function showIncorrectMsg(){
    registerState.innerHTML = "incorrect email or password";
    registerState.style.color = "#dc3545";
}
//sign up

function checkSignUpEmail() {
    for (var i = 0; i < completeData.length; i++) {
        if (completeData[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
            return true;
        }
    }
}


function signUp() {
    if (checkEmptySignup()) {
        showErrorMsg("All inputs is required");
    } else if (checkSignUpEmail()) {
        showErrorMsg("email already exists");
    }
    else if (!checkEmptySignup() && !checkSignUpEmail()) {
        hideErrorMsg();
        var signUpData = {
            userName: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value,
        };
        completeData.push(signUpData);
        localStorage.setItem("myDatabase", JSON.stringify(completeData));
        clearSignupForm();
        showSuccess();
        console.log(completeData);
    }
}


// log in

function checkEmptyLogin() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        return true;
    }
    else {
        return false;
    }
}


function logIn() {
    if (checkEmptyLogin()) {
        showErrorMsg("All inputs is required");
    }
    else {
        hideErrorMsg();
        var logEmail = loginEmail.value;
        var logPass = loginPassword.value;
        for (var i = 0; i < completeData.length; i++) {
            if (
                completeData[i].email.toLowerCase() === logEmail.toLowerCase() &&
                completeData[i].password.toLowerCase() === logPass.toLowerCase()
            ) {
                localStorage.setItem("username", completeData[i].userName);
                clearLoginForm();
                showSuccess();
                location.href = "home.html";
            } else {
                showIncorrectMsg();
            }
        }
    }

}

//home page
var userNameInput = localStorage.getItem("username");
if(userNameInput){
    document.getElementById("welcomeNewUser").innerHTML = "Welcome " + userNameInput;
}

//clear forms

function clearSignupForm() {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
}

function clearLoginForm() {
    loginEmail.value = "";
    loginPassword.value = "";
}



//logout

function logout(){
    localStorage.removeItem("username");
}
