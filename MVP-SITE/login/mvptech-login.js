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
  
   function onChangeEmail(){
      toggleButtonsDisabled();
      toggleEmailErrors();
   }

   function onChangePassword(){
      toggleButtonsDisabled();
      togglePasswordErrors();
   }

   function forSelectWindow() {    
      showLoading();
    firebase.auth().signInWithEmailAndPassword(
      form.email().value,form.password().value
      ).then(response => {
         
         window.location.href = "../select/mvptech-select.html";
     }).catch(error => {
      hideLoading();
      alert(getErrorMessage(error) );
      
     }); 
   }

   function getErrorMessage(error){
      
      if(error.code == "auth/user-not-found"){
         return "Usuário não encontrado"
      }
      return error.message;
   }

   function forCadastrar(){
      showLoading();
      window.location.href = "../cadastrar/mvptech-cadastrar.html";
   }

   function recoverPassword(){
      showLoading();
      firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
         hideLoading();
         alert('Email enviado com sucesso');
      }).catch(error =>{
         hideLoading();
         alert(getErrorMessage(error));
      });
   }

   function isEmailValid(){
      const email = form.email().value;
    if(!email){
      return false;
    }
      return validateEmail(email);
   }
   function isPasswordValid(){
      const password = form.password().value;
      if(!password){
         return false;
       }
      return true;
   }
   function toggleEmailErrors(){
      const email = form.email().value;
      form.emailRequiredError().style.display = email ? "none" : "block";
      form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
   }

   function togglePasswordErrors(){
      const password = form.password().value;
      form.passwordRequiredError().style.display = password ? "none": "block";
   }

   function toggleButtonsDisabled(){
      const emailValid = isEmailValid();
      form.recoverPassword().disabled = !emailValid;
      
      const passwordValid = isPasswordValid();
      form.loginButton().disabled = !emailValid || !passwordValid;

   }


   const form = {
      email: () => document.getElementById('email'),
      emailInvalidError: () => document.getElementById('email-invalid-error'),
      emailRequiredError: () => document.getElementById('email-required-error'),
      loginButton: () => document.getElementById('login'),
      password: () => document.getElementById('password'),
      passwordRequiredError: () => document.getElementById('password-required-error'),
      recoverPassword: () => document.getElementById('esqueceu')
   }

