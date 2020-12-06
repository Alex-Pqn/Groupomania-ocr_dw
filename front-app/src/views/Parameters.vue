<template>
<main>
  <!-- home -->
  <div class="parameters">
     <!-- trends -->
    <trends />
    <!-- parameters -->
    <section id="top" class="user-parameters">
      <!-- header -->
      <userProfileParametersHeader :pic_url="user.pic_url" :firstname="user.firstname" :lastname="user.lastname" />
      <!-- main -->
      <div class="user-parameters__main">
        <h3>
            Mes paramètres
        </h3>

        <!-- form -->
        <form v-on:submit="userParametersFormSend">
          <h4>
              Global
          </h4>
          <article class="user-parameters-form">
            <div class="user-parameters-form__labels">
              <label for="firstname">
                Prénom :
              </label>
              <label for="lastname">
                Nom :
              </label>
              <label for="email">
                E-mail :
              </label>
              <label for="description">
                Description :
              </label>
              <label for="password">
                Nouveau mot de passe :
              </label>
              <label for="re-password">
                Nouveau mot de passe :
              </label>
            </div>
            <div class="user-parameters-form__inputs">
              <input id="firstname" :value="user.firstname" type="text" maxlength="30" placeholder="Entrez votre prénom" required>
              <input id="lastname" :value="user.lastname" type="text" maxlength="30" placeholder="Entrez votre nom" required>
              <input id="email" :value="user.email" type="email" maxlength="55" placeholder="Entrez votre e-mail" required>
              <input id="description" :value="user.description" type="text" maxlength="255" placeholder="Entrez une description">
              <input type="password" id="password" maxlength="100" placeholder="Nouveau mot de passe">
              <input type="password" id="re-password" maxlength="100" placeholder="Confirmation mot de passe">
            </div>
          </article>

          <!-- newsletters -->
          <article class="user-parameters-newsletters">
            <h4>
                Notifications
            </h4>
            <label for="newsletters">
                Newsletters :
            </label>
            <input id="newsletters" type="checkbox">
          </article>

          <!-- pic -->
          <article class="user-parameters-pic">
            <h4>
                Photo de profil
            </h4>
            <div class="user-parameters-pic__content">
              <label for="user-parameters-pic_upload-img">
                  <img src="@/assets/cloud-upload-alt-solid.svg" alt="">
              </label>
              <input @change="userParamatersImgChange($event)" id="user-parameters-pic_upload-img" type="file" accept="image/*">
            </div>
            <div id="user-parameters-pic_img" class="user-parameters-pic__img-output">
              <img id="user-parameters-pic_img-output" src="" alt="">
              <div>
                  <img v-on:click="userParamatersImgClose" src="@/assets/times-solid.svg" alt="">
              </div>
            </div>
          </article>
          <input type="submit" value="Sauvegarder">
        </form>
      </div>
    </section>
    <!-- main-nav -->
    <mainNav />
  </div>
</main>
</template>

<script>
import trends from "@/components/trends/trends.vue"
import mainNav from "@/components/nav/mainNav.vue"
import userProfileParametersHeader from "@/components/userProfileParametersHeader.vue"

export default {
  name: "Parameters",
  data () {
    return {
      user: {
        pic_url: "user-icon.png",
        firstname: "Alexandre",
        lastname: "Pqn",
        email: "alex@gmail.com",
        description: "sfdfwcsdfsd",
        newsletters: false,
      },
    }
  },
  mounted() {
    if(this.user.newsletters === true) {
      document.getElementById('newsletters').checked = true
    }
  },
  methods: {
    userParamatersImgChange (event) {
      let reader = new FileReader()
      reader.onload = function () {
        document.getElementById('user-parameters-pic_img-output').src = reader.result
        document.getElementById('user-parameters-pic_img').style.display = "flex"
      }
      reader.readAsDataURL(event.target.files[0])
    },
    userParamatersImgClose () {
      document.getElementById('user-parameters-pic_img').style.display = "none"
      document.getElementById('user-parameters-pic_upload-img').value = ""
      document.getElementById('user-parameters-pic_img-output').src = ""
    },
    userParametersFormSend() {
    }
    
  },
  components: {
      trends,
      mainNav,
      userProfileParametersHeader
  },
}
</script>

<style lang="scss">
.parameters {
  display: flex;
}

.user-parameters {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &__main {
    h3 {
      margin: 15px 0 20px;
    }
    h4 {
      margin-bottom: 8px;
    }
  }
  article {
    margin-bottom: 20px;
  }
}

// form
.user-parameters-form {
  display: flex;
  align-items: center;
  &__labels {
    display: flex;
    flex-direction: column;
    text-align: right;
    label {
      padding: 7px;
      font-size: 1em;
      margin-top: 7px;
    }
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    input{
      outline: none;
      transition-property: all;
      transition-duration: 500ms;
      border: 1px solid rgba(143, 143, 143, 0.75);
      background-color: rgb(236, 236, 236);
      padding: 7px;
      font-size: 1em;
      margin-top: 5px;
      &:hover {
        background-color: rgb(223, 223, 223);
        border: 1px solid rgb(128, 128, 128);
      }
    }
  }
}

// newsletters
.user-parameters-newsletters {

}

// pic
.user-parameters-pic {
  &__content {
    display: flex;
    button {
      width: 10%;
      border: 1px solid $default_smooth-border;
      background-color:rgb(235, 235, 235);
      cursor: pointer;
      img {
        margin-top: 2px;
        width: 27px;
        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)
      }
      &:hover {
        background-color:rgb(238, 238, 238);
      }
    }
    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 8%;
      border: 1px solid $default_smooth-border;
      background-color:rgb(231, 231, 231);
      img {
        width: 30px;
        filter: invert(0.3) sepia(5) saturate(10) hue-rotate(175deg)
      }
      &:hover {
        background-color:rgb(224, 224, 224);
      }
    }
    input {
      opacity: 0;
      position: absolute;
    }
  }
  &__img-output {
    display: none;
    text-align: left;
    div {
      display: flex;
      align-items: flex-start;
      padding: 1px 1.5px;
      margin-top: 7px;
      margin-left: -24px;
      img {
        cursor: pointer;
        width: 10px;
        padding: 2.5px 4px;
        border-radius: .2em;
        background-color: rgba(255, 255, 255, 0.8);
        &:hover {
          transform: scale(.97);
          opacity: .8;
        }
      }
    }
    #user-parameters-pic_img-output {
      max-width: 520px;
      max-height: 300px;
      margin-top: 3px;
      padding: 1px;
      border: 1px solid $default_smooth-border;
    }
  }
}
</style>