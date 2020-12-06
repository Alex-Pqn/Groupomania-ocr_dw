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
  }
};
</script>