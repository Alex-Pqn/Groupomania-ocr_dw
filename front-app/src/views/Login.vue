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
          Accédez à votre compte Groupomania en entrant vos identifiants
          ci-dessous.
        </p>
      </header>
      <!-- form -->
      <form
        class="auth__form"
        name="loginForm"
        v-on:submit="loginSubmit($event)"
      >
        <div>
          <label for="email">
            E-mail :
          </label>
          <input
            type="email"
            name="email"
            id="email"
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
            name="password"
            id="password"
            minlength="8"
            maxlength="50"
            required
          />
          <p id="password-error"></p>
        </div>

        <input type="submit" id="submit" value="Se connecter" />
        <p id="submit-info"></p>
      </form>
      <!-- no-account -->
      <article class="auth__no-account">
        <hr />
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
import connection from "@/components/connection/styles.vue";
import { apiAuth, createUserCookie } from "@/utils/scripts";

export default {
  name: "Login",
  components: {
    connection
  },
  methods: {
    // LOGIN SUBMIT
    loginSubmit: function(event) {
      event.preventDefault();
      const vm = this;

      let emailInput = document.loginForm.email.value;
      let passwordInput = document.loginForm.password.value;

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
          maxLength: 55
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
          maxLength: 50
        }
      ];

      // personnalized input form error
      function displayFormInputError(errorIdContainer, errorValue) {
        document.getElementById(errorIdContainer).innerHTML = errorValue;
        document.getElementById(errorIdContainer).style.display = "flex";
      }

      // inputs validator
      formData.forEach(data => {
        document.getElementById(data.errorIdContainer).style.display = "none";

        // length validation
        if (data.value.length < data.minLength) {
          return displayFormInputError(
            data.errorIdContainer,
            `Votre ${data.name} doit être composé de ${data.minLength} caractères au minimum.`
          );
        } else if (data.value.length > data.maxLength) {
          return displayFormInputError(
            data.errorIdContainer,
            `Votre ${data.name} ne peut être composé que de ${data.maxLength} caractères au maximum.`
          );
        }

        // regex validation
        if (data.regex.test(data.value) === false) {
          if (data.id === 1) {
            return displayFormInputError(
              data.errorIdContainer,
              "L'e-mail que vous avez entré est invalide."
            );
          } else {
            return displayFormInputError(
              data.errorIdContainer,
              "Votre mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule et un chiffre."
            );
          }
        }

        data.stepValidation = true;
        // if all inputs are valids, call api
        if (
          formData[0].stepValidation === true &&
          formData[1].stepValidation === true
        ) {
          vm.loginRequest(emailInput, passwordInput);
        }
      });
    },

    // LOGIN API REQUEST
    loginRequest(email, password) {
      const vm = this;
      const submitButton = document.getElementById("submit");

      // XHR ERROR
      function xhrCallbackError() {
        vm.displaySubmitError(
          "Une erreur est survenue lors de la connexion à votre compte. Vérifiez l'état de vote connexion internet et réessayez."
        );
        submitButton.disabled = false;
      }

      // API CALLBACK DONE
      function apiCallbackDone(response) {
        submitButton.disabled = true;
        createUserCookie(response);
        vm.displaySubmitSuccess(`${response.message}`);

        setInterval(() => {
          window.location.replace("/");
        }, 1900);
      }

      // API CALLBACK ERROR
      function apiCallbackError(response, readyState, httpStatus) {
        vm.displaySubmitError(response.sub_err);
        console.error(response);
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`);
      }

      // API CALL
      let userParams = {
        email,
        password
      };
      apiAuth(
        "api/user/login",
        "POST",
        JSON.stringify(userParams),
        apiCallbackDone,
        apiCallbackError,
        xhrCallbackError
      );
    },

    // Display submit error on error
    displaySubmitError(errorValue) {
      const submitInfo = document.getElementById("submit-info");

      submitInfo.style.display = "none";
      setTimeout(() => {
        submitInfo.style.display = "flex";
        submitInfo.style.color = "rgba(197, 0, 0, 0.85)";
        submitInfo.innerHTML = errorValue;
      }, 150);
    },

    // Display submit info success on success
    displaySubmitSuccess(successValue) {
      const submitInfo = document.getElementById("submit-info");

      submitInfo.style.display = "flex";
      submitInfo.style.color = "green";
      submitInfo.innerHTML = successValue;
    }
  }
};
</script>
