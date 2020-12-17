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
          <input type="email" name="email" id="email" minlength="5" maxlength="55" required value="test3@gmail.com">
          <p id="email-error"></p>
        </div>

        <div>
          <label for="password">
            Mot de passe :
          </label>
          <input type="password" name="password" id="password" minlength="8" maxlength="50" required value="abcdefgH1">
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
    connection,
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
      
      // error's & info's handler
      function displayFormError (errorIdContainer, errorValue) {
        document.getElementById(errorIdContainer).innerHTML = errorValue
        document.getElementById(errorIdContainer).style.display = "flex"
      }
      function displaySubmitInfoError (infoValue) {
        submitInfo.style.display = "none"
        setTimeout(() => {
          submitInfo.style.display = "flex"
          submitInfo.style.color = "rgba(197, 0, 0, 0.85)"
          submitInfo.innerHTML = infoValue
        }, 150);
      }
      function displaySubmitInfoSuccess (infoValue) {
        submitInfo.style.display = "flex"
        submitInfo.style.color = "green"
        submitInfo.innerHTML = infoValue
      }
      
      // inputs validator
      formData.forEach(data => {
        document.getElementById(data.errorIdContainer).style.display = "none"
        // length validation
        if(data.value.length < data.minLength) {
          return displayFormError(data.errorIdContainer, `Votre ${data.name} doit être composé de ${data.minLength} caractères au minimum.`)
        }else if(data.value.length > data.maxLength) {
          return displayFormError(data.errorIdContainer, `Votre ${data.name} ne peut être composé que de ${data.maxLength} caractères au maximum.`)
        }
        // regex validation
        if(data.regex.test(data.value) === false) {
          if(data.id === 1) {
            return displayFormError(data.errorIdContainer, "L'e-mail que vous avez entré est invalide.")
          }else {
            return displayFormError(data.errorIdContainer, "Votre mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule et un chiffre.")
          }
        }
        // if all inputs are valids, call api with inputs
        data.stepValidation = true
        if (formData[0].stepValidation === true && 
            formData[1].stepValidation === true) {
              sendLoginRequest()
            }
      })
      
      // send login request to api
      function sendLoginRequest () {
        let xhr = new XMLHttpRequest();
        let userParams = {
          email:emailInput,
          password:passwordInput
        }
        xhr.open('POST', 'http://localhost:3000/api/user/login', true) ;
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(userParams));
        xhr.onerror = () => {
          displaySubmitInfoError("Une erreur est survenue lors de la connexion à votre compte. Vérifiez l'état de vote connexion internet et réessayez.")
          submitButton.disabled = false
        }
        xhr.onreadystatechange = function() {
          let response = JSON.parse(this.response)
          
          // success
          if (this.readyState === 4 && this.status === 200) {
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

          // error handler
          } else if (this.status === 401 || this.status === 500) {
            displaySubmitInfoError(response.sub_error)
            console.error(`Return /login API | Error: ${response.sub_error}, HTTP Status: ${this.status}, ReadyState Status: ${this.readyState}`)
            if(response.err) {
              console.error(`Error: ${response.err.sqlMessage}, Code: ${response.err.code} fatal?${response.err.fatal}, SQLState: ${response.err.sqlState}`)
            }
          }
        }
      }
    }
  },
};
</script>