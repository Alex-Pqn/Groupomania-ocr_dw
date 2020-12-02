<template>
<div id="app">
    <!-- connection block -->
  <div class="connection">
    <!-- import styles & header -->
    <connectionStyles />
    <connectionHeader />

    <!-- authentication -->
    <div class="auth">
      <!-- header -->
      <div class="auth__header">
        <h3>
          Connectez-vous
        </h3>
        <p>
          Accédez à votre compte Groupomania en entrant vos identifiants ci-dessous.
        </p>
      </div>
      <!-- form -->
      <form class="auth__form" action="" method="POST">
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
      <!-- no-account -->
      <div class="auth__no-account">
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
      </div>
    </div>
  </div>
</div>
</template>

<script>
import connectionStyles from "@/components/connection/connectionStyles.vue"
import connectionHeader from "@/components/connection/connectionHeader.vue"

export default {
  name: "Login",
  components: {
    connectionStyles,
    connectionHeader
  }
};
</script>