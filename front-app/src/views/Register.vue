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
          Rejoignez dès maintenant les plus de 600 collaborateurs rattachés à
          Groupomania au travers d'un réseau social interne.
        </p>
      </header>
      <!-- form -->
      <form
        class="auth__form auth__form--register"
        name="registerForm"
        v-on:submit="registerSubmit($event)"
      >
        <div>
          <label for="firstname">
            Prénom :
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            minlength="3"
            maxlength="30"
            required
          />
          <p id="firstname-error"></p>
        </div>
        <div>
          <label for="lastname">
            Nom :
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            minlength="3"
            maxlength="30"
            required
          />
          <p id="lastname-error"></p>
        </div>
        <div>
          <label for="email">
            E-mail :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            minlength="5"
            maxlength="55"
            required
          />
          <p id="email-error"></p>
        </div>
        <div>
          <label for="password">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            minlength="8"
            maxlength="50"
            required
          />
        </div>
        <div>
          <label for="repassword">
            Mot de passe :
          </label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            minlength="8"
            maxlength="50"
            required
          />
          <p id="password-error"></p>
        </div>

        <label id="newsletters-checkbox">
          <input
            type="checkbox"
            id="checkbox"
            name="newsletters"
            value="true"
            checked
          />
          <p>
            Je souhaite m'abonner par e-mail aux newsletters relatives à
            Groupomania.
          </p>
        </label>

        <input id="submit" type="submit" value="S'enregistrer" />
        <p id="submit-info"></p>
      </form>
      <!-- no account -->
      <article class="auth__no-account">
        <hr />
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
import connection from "@/components/connection/styles.vue";
import { apiAuth, createUserCookie } from "@/utils/scripts";

export default {
  name: "Register",
  components: {
    connection
  },
  mounted() {
    const newslettersCheckbox = document.getElementById("checkbox");
    newslettersCheckbox.addEventListener("change", function() {
      if (this.checked) {
        newslettersCheckbox.value = true;
      } else {
        newslettersCheckbox.value = false;
      }
    });
  },
  methods: {
    // REGISTER SUBMIT VALIDATION
    registerSubmit: function(event) {
      const vm = this;
      event.preventDefault();

      let firstnameInput = document.registerForm.firstname.value;
      let lastnameInput = document.registerForm.lastname.value;
      let emailInput = document.registerForm.email.value;
      let passwordInput = document.registerForm.password.value;
      let repasswordInput = document.registerForm.repassword.value;
      let newslettersInput = document.registerForm.newsletters.value;

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
          maxLength: 30
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
          maxLength: 30
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
          maxLength: 55
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
          maxLength: 50
        }
      ];

      // inputs validator
      formData.forEach(data => {
        document.getElementById(data.errorIdContainer).style.display = "none";

        // length validation
        if (data.value.length < data.minLength) {
          return vm.displayFormError(
            data.errorIdContainer,
            `Votre ${data.name} doit être composé de ${data.minLength} caractères au minimum.`
          );
        } else if (data.value.length > data.maxLength) {
          return vm.displayFormError(
            data.errorIdContainer,
            `Votre ${data.name} ne peut être composé que de ${data.maxLength} caractères au maximum.`
          );
        }

        // regex validation
        if (data.regex.test(data.value) === false) {
          if (data.id === 1 || data.id === 2) {
            return vm.displayFormError(
              data.errorIdContainer,
              `Votre ${data.name} est composé de caractères spéciaux prohibés.`
            );
          } else if (data.id === 3) {
            return vm.displayFormError(
              data.errorIdContainer,
              "L'e-mail que vous avez entré est invalide."
            );
          } else {
            return vm.displayFormError(
              data.errorIdContainer,
              "Votre mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule et un chiffre."
            );
          }
        }

        // passwords corresponds validation
        if (data.id === 4) {
          if (repasswordInput !== data.value) {
            return vm.displayFormError(
              data.errorIdContainer,
              "Les deux mots de passe entrés doivent correspondre."
            );
          }
        }

        data.stepValidation = true;
        // if all inputs are valids, call api
        if (
          formData[0].stepValidation === true &&
          formData[1].stepValidation === true &&
          formData[2].stepValidation === true &&
          formData[3].stepValidation === true
        ) {
          vm.registerRequest(
            firstnameInput,
            lastnameInput,
            emailInput,
            passwordInput,
            newslettersInput
          );
        }
      });
    },

    // REGISTER API REQUEST
    registerRequest(firstname, lastname, email, password, newsletters) {
      const vm = this;
      const submitButton = document.getElementById("submit");

      // XHR ERROR
      function xhrCallbackError() {
        vm.displaySubmitError(
          "Une erreur est survenue lors de la création de votre compte. Vérifiez l'état de vote connexion internet et réessayez."
        );
        submitButton.disabled = false;
      }

      // API CALLBACK ERROR
      function apiCallbackError(response, readyState, httpStatus) {
        vm.displaySubmitError(response.sub_err);
        console.error(response);
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`);
      }

      // API CALLBACK DONE
      function apiCallbackDone(response) {
        submitButton.disabled = true;
        createUserCookie(response);

        // redirect to home
        let redirectionTime = 6;
        let redirectionInterval = setInterval(() => {
          if (redirectionTime === 0) {
            clearInterval(redirectionInterval);
            window.location.replace("/");
          } else {
            redirectionTime--;
            vm.displaySubmitSuccess(
              `${response.message} Redirection vers l'accueil dans ${redirectionTime} secondes.`
            );
          }
        }, 1000);
      }

      // API CALL
      let userParams = {
        firstname,
        lastname,
        email,
        password,
        newsletters
      };
      apiAuth(
        "api/user/register",
        "POST",
        JSON.stringify(userParams),
        apiCallbackDone,
        apiCallbackError,
        xhrCallbackError
      );
    },

    // Display submit error on error
    displaySubmitError(infoValue) {
      const submitInfo = document.getElementById("submit-info");

      submitInfo.style.display = "none";
      setTimeout(() => {
        submitInfo.style.display = "flex";
        submitInfo.style.color = "rgba(197, 0, 0, 0.85)";
        submitInfo.innerHTML = infoValue;
      }, 150);
    },

    // Display submit info success on success
    displaySubmitSuccess(successValue) {
      const submitInfo = document.getElementById("submit-info");

      submitInfo.style.display = "flex";
      submitInfo.style.color = "green";
      submitInfo.innerHTML = successValue;
    },

    // Display custom form errors
    displayFormError(errorIdContainer, errorValue) {
      document.getElementById(errorIdContainer).innerHTML = errorValue;
      document.getElementById(errorIdContainer).style.display = "flex";
    }
  }
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
        label[for="firstname"],
        label[for="lastname"],
        label[for="repassword"] {
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
