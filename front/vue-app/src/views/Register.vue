<template>
  <div class="connection">
    <connectionStyles />
    <connectionHeader />
    <div class="connection__form">
      <div class="connection__form__header">
        <h3>
          Enregistrez-vous
        </h3>
        <p>
          Rejoignez dès maintenant les plus de 600 collaborateurs rattachés à Groupomania au travers d'un réseau social interne.
        </p>
      </div>

      <form action="" method="POST">
        <div>
          <label for="firstname">
            Prénom :
          </label>
          <input type="text" name="firstname" id="firstname-input" maxlength="30" required>
        </div>
        <div>
          <label for="lastname">
            Nom :
          </label>
          <input type="text" name="lastname" id="lastname-input" maxlength="30" required>
        </div>
        <div>
          <label for="email">
            E-mail :
          </label>
          <input type="email" name="email" maxlength="55" required>
        </div>
        <div>
          <label for="password">
            Mot de passe :
          </label>
          <input type="password" name="password" id="password-input" maxlength="100" required>
        </div>
        <div>
          <label for="re-password">
            Mot de passe :
          </label>
          <input type="password" name="re-password" maxlength="100" required>
        </div>

        <label id="newsletters-checkbox">
          <input type="checkbox" id="newsletters-input" checked>
          <p>
            Je souhaite m'abonner par e-mail aux newsletters relatives à Groupomania.
          </p>
        </label>

        <input type="submit" value="S'enregistrer">
      </form>

      <div class="connection__form__no-account">
        <hr>
        <p>
          Vous possédez déjà un compte ?
        </p>
        <p>
          <router-link to="/login">
            Se connecter
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import connectionStyles from "@/components/connectionStyles.vue"
import connectionHeader from "@/components/connectionHeader.vue"

export default {
  name: "Register",
  components: {
    connectionStyles,
    connectionHeader
  }
};
</script>

<style lang="scss">
  .connection {
    &__form {
      form {
        div {
          input[name="firstname"] {
            padding-left: 80px;
            width: 250px;
          }
          input[name="lastname"] {
            padding-left: 58px;
            width: 272px;
          }
          input[name="re-password"] {
            padding-left: 120px;
            width: 210px;
          }
          label[for="firstname"], label[for="lastname"], label[for="re-password"] {
            position: absolute;
            left: 10px;
            top: 8px;
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
</style>