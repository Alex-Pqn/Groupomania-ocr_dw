<template>
  <!-- connection -->
  <div class="connection">
    <!-- import styles & header -->
    <connection />

    <!-- authentication -->
    <section class="auth auth--style">
      <!-- header -->
      <header class="auth__header">
        <h3>
          Enregistrez-vous
        </h3>
        <p>
          Rejoignez dès maintenant les plus de 600 collaborateurs rattachés à Groupomania au travers d'un réseau social interne.
        </p>
      </header>
      <!-- form -->
      <form class="auth__form auth__form--register" name="registerForm" v-on:submit='registerSubmit($event)'>
        <div>
          <label for="firstname">
            Prénom :
          </label>
          <input type="text" id="firstname" name="firstname" minlength="3" maxlength="30" required value="test">
          <p id="firstname-error"></p>
        </div>
        <div>
          <label for="lastname">
            Nom :
          </label>
          <input type="text" id="lastname" name="lastname" minlength="3" maxlength="30" required value="test">
          <p id="lastname-error"></p>
        </div>
        <div>
          <label for="email">
            E-mail :
          </label>
          <input type="email" id="email" name="email" minlength="5" maxlength="55" required value="test@gmail.com">
          <p id="email-error"></p>
        </div>
        <div>
          <label for="password">
            Mot de passe :
          </label>
          <input type="password" id="password" name="password" minlength="8" maxlength="50" required value="testtest1Aa">
        </div>
        <div>
          <label for="repassword">
            Mot de passe :
          </label>
          <input type="password" id="repassword" name="repassword" minlength="8" maxlength="50" required value="testtest1Aa">
          <p id="password-error"></p>
        </div>

        <label id="newsletters-checkbox">
          <input type="checkbox" id="checkbox" name="newsletters" value="true" checked>
          <p>
            Je souhaite m'abonner par e-mail aux newsletters relatives à Groupomania.
          </p>
        </label>

        <input id="submit" type="submit" value="S'enregistrer">
        <p id="submit-info"></p>
      </form>
      <!-- no account -->
      <article class="auth__no-account">
        <hr>
        <p>
          Vous possédez déjà un compte ?
        </p>
        <p>
          <!-- redirection -->
          <router-link to="/login">
            Se connecter
          </router-link>
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import connection from "@/components/connection/connection.vue"

export default {
  name: "Register",
  components: {
    connection,
  },
  mounted() {
    const newslettersCheckbox = document.getElementById('checkbox')
    newslettersCheckbox.addEventListener('change', function() {
      if (this.checked) {
        newslettersCheckbox.value = true
      }else{
        newslettersCheckbox.value = false
      }
    })
  },
  methods: {
    registerSubmit: function (event) {
      event.preventDefault();
      
      let firstnameInput = document.registerForm.firstname.value;
      let lastnameInput = document.registerForm.lastname.value;
      let emailInput = document.registerForm.email.value;
      let passwordInput = document.registerForm.password.value;
      let repasswordInput = document.registerForm.repassword.value;
      let newslettersInput = document.registerForm.newsletters.value;
      const submitButton = document.getElementById('submit');
      const submitInfo = document.getElementById('submit-info')
      
      const formData = [
        {
          id: 1,
          name: "prénom",
          value: firstnameInput,
          stepValidation: false,
          errorIdContainer: "firstname-error",
          //eslint-disable-next-line
          regex: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
          minLength: 3,
          maxLength: 30,
        },
        {
          id: 2,
          name: "nom",
          value: lastnameInput,
          stepValidation: false,
          errorIdContainer: "lastname-error",
          //eslint-disable-next-line
          regex: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
          minLength: 3,
          maxLength: 30,
        },
        {
          id: 3,
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
          id: 4,
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
          if(data.id === 1 || data.id === 2) {
            return displayFormError(data.errorIdContainer, `Votre ${data.name} est composé de caractères spéciaux prohibés.`)
          }else if(data.id === 3) {
            return displayFormError(data.errorIdContainer, "L'e-mail que vous avez entré est invalide.")
          }else {
            return displayFormError(data.errorIdContainer, "Votre mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule et un chiffre.")
          }
        }
        // passwords corresponds validation
        if(data.id === 4) {
          if(repasswordInput !== data.value) {
          return displayFormError(data.errorIdContainer, "Les deux mots de passe entrés doivent correspondre.")
          }
        }
        // if all inputs are valids, call api with inputs
        data.stepValidation = true
        if (formData[0].stepValidation === true && 
            formData[1].stepValidation === true && 
            formData[2].stepValidation === true && 
            formData[3].stepValidation === true) {
              sendRegisterRequest()
            }
      })
      
      // send register request to api
      function sendRegisterRequest () {
        let xhr = new XMLHttpRequest();
        let userParams = {
          firstname:firstnameInput,
          lastname:lastnameInput,
          email:emailInput,
          password:passwordInput,
          newsletters:newslettersInput
        }
        xhr.open('POST', 'http://localhost:3000/api/user/register', true) ;
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(userParams));
        // request error
        xhr.onerror = () => {
          displaySubmitInfoError("Une erreur est survenue lors de la création de votre compte. Vérifiez l'état de vote connexion internet et réessayez.")
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
            let redirectionTime = 6
            let redirectionInterval = setInterval(() => {
              if(redirectionTime === 0) {
                clearInterval(redirectionInterval)
                window.location.replace('/')
              }else{
                redirectionTime--
                displaySubmitInfoSuccess(`${response.message} Redirection vers l'accueil dans ${redirectionTime} secondes...`) 
              }
            }, 1000);
            
          // error handler
          } else if (this.status === 401 || this.status === 500) {
            displaySubmitInfoError(response.sub_error)
            console.error(`Return /register API | Error: ${response.sub_error}, HTTP Status: ${this.status}, ReadyState Status: ${this.readyState}`)
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

<style lang="scss" scoped>
// authentication
.auth {
  // form
  &__form {
    // register page
    &--register {
      div {
        label[for="firstname"], label[for="lastname"], label[for="repassword"] {
          position: absolute;
          left: 10px;
          top: 8px;
        }
        input[name="firstname"] {
          padding-left: 80px;
          width: 250px;
        }
        input[name="lastname"] {
          padding-left: 58px;
          width: 272px;
        }
        input[name="repassword"] {
          padding-left: 120px;
          width: 210px;
        }
      }
      #newsletters-checkbox {
        display: flex;
        text-align: left;
        margin-top: 5px;
        margin-bottom: 10px;
        p {
          padding-left: 10px;
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .auth {
    &__form {
      &--register {
        div {
          input[name="firstname"] {
            width: 190px;
          }
          input[name="lastname"] {
            width: 212px;
          }
          input[name="repassword"] {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>