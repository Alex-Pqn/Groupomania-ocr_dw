<template>
  <div class="connection">
    <div class="connection__header">
      <img src="../assets/icon-left-font-monochrome-black.svg" alt="">

    </div>
    <div class="connection__form">
      <div class="connection__form__header">
        <h3>
          Connectez-vous
        </h3>
        <p>
          Accédez à votre compte Groupomania en entrant vos identifiants ci-dessous.
        </p>
      </div>

      <form action="" method="POST">
        <div>
          <label for="email">
            E-mail :
          </label>
          <input type="email" name="email" id="email-input" maxlength="55" required>
        </div>

        <div>
          <label for="password">
            Mot de passe :
          </label>
          <input type="password" name="password" id="password-input" maxlength="100" required>
        </div>

        <input type="submit" value="Se connecter">
      </form>

      <div class="connection__form__no-account">
        <hr>
        <p>
          Vous ne possédez pas de compte ?
        </p>
        <p>
          <router-link to="/register">
            Créer un compte
          </router-link>
        </p>
      </div>
    </div>
    <connectionStyles />
  </div>
</template>

<script>
import connectionStyles from "@/components/connectionStyles.vue"

export default {
  name: "Login",
  components: {
    connectionStyles
  }
};
</script>