const firebaseConfig = {
    apiKey: "AIzaSyDHMgU_pwQePAoPRtglxW1oTfq3pXu2pe4",
    authDomain: "mvp-tech-e85d9.firebaseapp.com",
    projectId: "mvp-tech-e85d9",
    storageBucket: "mvp-tech-e85d9.appspot.com",
    messagingSenderId: "92291896767",
    appId: "1:92291896767:web:ab78ed7e276fab81a8bd0a",
    measurementId: "G-FQ0G4P2ZWE"
  };
 firebase.initializeApp(firebaseConfig);

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register(){
    showLoading();
    firebase.auth().createUserWithEmailAndPassword(
        form.email().value,form.password().value
    ).then(() => {
        hideLoading();
        window.location.href = "../select/mvptech-select.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}
function getErrorMessage(error){
    if(error.code == "auth/email-already-in-use"){
        return "Email já está em uso"
    }
    return error.message;
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}