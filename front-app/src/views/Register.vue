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
          <input type="text" name="firstname" minlength="3" maxlength="30" required value="test">
          <p id="register_firstname-error"></p>
        </div>
        <div>
          <label for="lastname">
            Nom :
          </label>
          <input type="text" name="lastname" minlength="3" maxlength="30" required value="test">
          <p id="register_lastname-error"></p>
        </div>
        <div>
          <label for="email">
            E-mail :
          </label>
          <input type="email" name="email" minlength="5" maxlength="55" required value="test@gmail.com">
          <p id="register_email-error"></p>
        </div>
        <div>
          <label for="password">
            Mot de passe :
          </label>
          <input type="password" name="password" minlength="8" maxlength="50" required value="testtest1Aa">
        </div>
        <div>
          <label for="repassword">
            Mot de passe :
          </label>
          <input type="password" name="repassword" minlength="8" maxlength="50" required value="testtest1Aa">
          <p id="register_password-error"></p>
        </div>

        <label id="newsletters-checkbox">
          <input type="checkbox" id="newsletters-input" checked>
          <p>
            Je souhaite m'abonner par e-mail aux newsletters relatives à Groupomania.
          </p>
        </label>

        <input type="submit" value="S'enregistrer">
        <p id="register_submit-info"></p>
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
  methods: {
    registerSubmit: function (event) {
      event.preventDefault();
      
      let firstnameInput = document.registerForm.firstname.value;
      let lastnameInput = document.registerForm.lastname.value;
      let emailInput = document.registerForm.email.value;
      let passwordInput = document.registerForm.password.value;
      let repasswordInput = document.registerForm.repassword.value;
      
      const formData = [
        {
          id: 1,
          name: "prénom",
          value: firstnameInput,
          stepValidation: false,
          errorIdContainer: "register_firstname-error",
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
          errorIdContainer: "register_lastname-error",
          //eslint-disable-next-line
          regex: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
          minLength: 3,
          maxLength: 30,
        },
        {
          id: 3,
          value: emailInput,
          stepValidation: false,
          errorIdContainer: "register_email-error",
          //eslint-disable-next-line
          regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
          minLength: 5,
          maxLength: 55,
        },
        {
          id: 4,
          value: passwordInput,
          stepValidation: false,
          errorIdContainer: "register_password-error",
          //eslint-disable-next-line
          regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
          minLength: 8,
          maxLength: 50,
        },
      ]
      
      function displayFormError (errorIdContainer, errorValue) {
        document.getElementById(errorIdContainer).innerHTML = errorValue
        document.getElementById(errorIdContainer).style.display = "flex"
      }
      function displaySubmitInfo (infoValue, infoColor) {
        const registerSubmitInfo = document.getElementById('register_submit-info')
        registerSubmitInfo.style.display = "flex"
        registerSubmitInfo.style.color = infoColor
        registerSubmitInfo.innerHTML = infoValue
      }
      
      formData.forEach(data => {
        document.getElementById(data.errorIdContainer).style.display = "none"
        
        // regex validation
        if(data.regex.test(data.value) === false) {
          if(data.id === 1 || data.id === 2) {
            displayFormError(data.errorIdContainer, `Le ${data.name} contient des caractères spéciaux interdits.`)
            return;
          }else if(data.id === 3) {
            displayFormError(data.errorIdContainer, "L'e-mail entré est invalide.")
            return;
          }else {
            displayFormError(data.errorIdContainer, "Le mot de passe entré doit contenir au minimum une lettre majuscule, une lettre minuscule et un nombre.")
            return;
          }
        }
        
        // length validation
        if(data.value.length < data.minLength) {
          displayFormError(data.errorIdContainer, `Cette case doit contenir au minimum ${data.minLength} caractères.`)
          return;
        }else if(data.value.length > data.maxLength) {
          displayFormError(data.errorIdContainer, `Cette case ne peut contenir qu'au maximum ${data.maxLength} caractères.`)
          return;
        }
      
        // passwords corresponds validation
        if(data.id === 4) {
          if(repasswordInput !== data.value) {
            displayFormError(data.errorIdContainer, "Les deux mots de passe entrés doivent correspondre.")
            return;
          }
        }
        
        data.stepValidation = true
        if (formData[0].stepValidation === true && 
            formData[1].stepValidation === true && 
            formData[2].stepValidation === true && 
            formData[3].stepValidation === true) {
              registerRequest()
            }
      })
      
      function registerRequest () {
        let xhr = new XMLHttpRequest();
        let params = {
          test:'test'
        }
        xhr.open('POST', 'http://localhost:3000/api/user/register', true) ;
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(params));
        xhr.onerror = () => {
          displaySubmitInfo("Une erreur est survenue lors de la création de votre compte. Vérifiez l'état de vote connexion internet et réessayez.", "rgba(197, 0, 0, 0.85)")
          console.error(`Error on register submit. HTML Status: ${this.status}, ReadyState Status: ${this.readyState}`)
        }
        xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            let redirectionTime = 6
            let redirectionInterval = setInterval(() => {
              if(redirectionTime === 0) {
                clearInterval(redirectionInterval)
                window.location.replace('/login')
              }else{
                redirectionTime--
                displaySubmitInfo(`Compte créé avec succès ! Redirection vers la page de connexion dans ${redirectionTime} secondes...`, "green") 
              }
            }, 1000);
          };
        }
      }
    }
  },
};
</script>

<style lang="scss">
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
      #register_submit-info {
        display: flex;
        text-align: left;
        margin-top: 12px;
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