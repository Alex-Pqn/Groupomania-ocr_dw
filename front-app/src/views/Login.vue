<template>
  <!-- connection block -->
  <div class="connection">
    <!-- import styles & header -->
    <connection />

    <!-- authentication -->
    <section class="auth auth--style">
      <!-- header -->
      <header class="auth__header">
        <h3>
          Connectez-vous
        </h3>
        <p>
          Accédez à votre compte Groupomania en entrant vos identifiants ci-dessous.
        </p>
      </header>
      <!-- form -->
      <form class="auth__form" name="loginForm" v-on:submit='loginSubmit($event)'>
        <div>
          <label for="email">
            E-mail :
          </label>
          <input type="email" name="email" id="email" minlength="5" maxlength="55" required value="test@gmail.com">
          <p id="email-error"></p>
        </div>

        <div>
          <label for="password">
            Mot de passe :
          </label>
          <input type="password" name="password" id="password" minlength="8" maxlength="50" required value="testtest1Aa">
          <p id="password-error"></p>
        </div>

        <input type="submit" id="submit" value="Se connecter">
        <p id="submit-info"></p>
      </form>
      <!-- no-account -->
      <article class="auth__no-account">
        <hr>
        <p>
          Vous ne possédez pas de compte ?
        </p>
        <p>
          <!-- redirection -->
          <router-link to="/register">
            Créer un compte
          </router-link>
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import connection from "@/components/connection/connection.vue"

export default {
  name: "Login",
  components: {
    connection
  },
  methods: {
    loginSubmit: function (event) {
      event.preventDefault();
      
      let emailInput = document.loginForm.email.value;
      let passwordInput = document.loginForm.password.value;
      
      const submitButton = document.getElementById('submit');
      const submitInfo = document.getElementById('submit-info')
      
      const formData = [
        {
          id: 1,
          name: "e-mail",
          value: emailInput,
          stepValidation: false,
          errorIdContainer: "email-error",
          //eslint-disable-next-line
          regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
          minLength: 5,
          maxLength: 55,
        },
        {
          id: 2,
          name: "mot de passe",
          value: passwordInput,
          stepValidation: false,
          errorIdContainer: "password-error",
          //eslint-disable-next-line
          regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
          minLength: 8,
          maxLength: 50,
        },
      ]
      
      // personnalized input form error
      function displayFormInputError (errorIdContainer, errorValue) {
        document.getElementById(errorIdContainer).innerHTML = errorValue
        document.getElementById(errorIdContainer).style.display = "flex"
      }
      
      // inputs validator
      formData.forEach(data => {
        document.getElementById(data.errorIdContainer).style.display = "none"
        // length validation
        if(data.value.length < data.minLength) {
          return displayFormInputError(data.errorIdContainer, `Votre ${data.name} doit être composé de ${data.minLength} caractères au minimum.`)
        }else if(data.value.length > data.maxLength) {
          return displayFormInputError(data.errorIdContainer, `Votre ${data.name} ne peut être composé que de ${data.maxLength} caractères au maximum.`)
        }
        // regex validation
        if(data.regex.test(data.value) === false) {
          if(data.id === 1) {
            return displayFormInputError(data.errorIdContainer, "L'e-mail que vous avez entré est invalide.")
          }else {
            return displayFormInputError(data.errorIdContainer, "Votre mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule et un chiffre.")
          }
        }
        // if all inputs are valids, call api
        data.stepValidation = true
        if (formData[0].stepValidation === true && 
            formData[1].stepValidation === true) {
              sendLoginRequest()
            }
      })
      
      // API REQUEST
      function sendLoginRequest () {
        const status = require('../components/status_config')
        
        let userParams = {
          email:emailInput,
          password:passwordInput
        }
        
        // error's & info's handler
        function displaySubmitInfoError (errorValue) {
          submitInfo.style.display = "none"
          setTimeout(() => {
            submitInfo.style.display = "flex"
            submitInfo.style.color = "rgba(197, 0, 0, 0.85)"
            submitInfo.innerHTML = errorValue
          }, 150);
        }
        function displaySubmitInfoSuccess (infoValue) {
          submitInfo.style.display = "flex"
          submitInfo.style.color = "green"
          submitInfo.innerHTML = infoValue
        }
        
        // xhr request
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/user/login', true) ;
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(userParams));
        
        xhr.onerror = () => {
          displaySubmitInfoError("Une erreur est survenue lors de la connexion à votre compte. Vérifiez l'état de vote connexion internet et réessayez.")
          submitButton.disabled = false
        }
        
        xhr.onreadystatechange = function() {
          let response = JSON.parse(this.response)
          
          // DONE & OK
          if (this.readyState === status.readystate.DONE && this.status === status.http.OK) {
            submitButton.disabled = true
            
            // set http cookie with userId & auth token
            let actualDate = new Date();
            const dateMultiplicator = actualDate.setMonth(actualDate.getMonth() + 1)
            let cookieExpireDate = new Date(dateMultiplicator).toUTCString()
            
            document.cookie = `user_id=${response.userId};expires=${cookieExpireDate};path=/`
            document.cookie = `auth_token=${response.token};expires=${cookieExpireDate};path=/`
            
            // redirect to home
            displaySubmitInfoSuccess(`${response.message}`)
            setInterval(() => {
              window.location.replace('/')
            }, 1900);

          // ERRORS HANDLER
          }else if (this.status === status.http.UNAUTHORIZED || this.status === status.http.INTERNAL_SERVER_ERROR || this.status === status.http.BAD_REQUEST) {
            displaySubmitInfoError(response.sub_error)
            if(response.err) {
              console.error(`HTTP Status: ${this.status} ; ReadyState Status: ${this.readyState} | Error: ${response.err.sqlMessage || response.err.message} ; Code: ${response.err.code} : ${response.err.errno} ; fatal?${response.err.fatal} ; SQLState: ${response.err.sqlState}`)
            }else{
              console.error(`HTTP Status: ${this.status} ; ReadyState Status: ${this.readyState}`)
            }
          }
        }
      }
    }
  },
};
</script>