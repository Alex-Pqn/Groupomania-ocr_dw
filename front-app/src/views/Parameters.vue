<template>
  <!-- container page -->
  <div class="parameters">
    <!-- displayed beetween 0px > 1023px -->
    <div class="mobile-container">
      <!-- trends -->
      <trends />

      <!-- parameters -->
      <section id="top" class="user-parameters">
        <!-- header -->
        <userHeader
          :pic_url="user.pic_url"
          :firstname="user.firstname"
          :lastname="user.lastname"
        />
        <!-- main -->
        <div class="user-parameters__main">
          <h3>
            Mes paramètres
          </h3>
          <!-- form -->
          <form v-on:submit="userParametersFormSend">
            <!-- global -->
            <h4>
              Global
            </h4>
            <article class="user-parameters-global">
              <div class="user-parameters-global__labels">
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
              <div class="user-parameters-global__inputs">
                <input
                  id="firstname"
                  :value="user.firstname"
                  type="text"
                  minlength="3"
                  maxlength="30"
                  placeholder="Entrez votre prénom"
                  required
                />
                <input
                  id="lastname"
                  :value="user.lastname"
                  type="text"
                  minlength="3"
                  maxlength="30"
                  placeholder="Entrez votre nom"
                  required
                />
                <input
                  id="email"
                  :value="user.email"
                  type="email"
                  minlength="5"
                  maxlength="55"
                  placeholder="Entrez votre e-mail"
                  required
                />
                <input
                  id="description"
                  :value="user.description"
                  type="text"
                  maxlength="255"
                  placeholder="Entrez une description"
                />
                <input
                  type="password"
                  id="password"
                  minlength="8"
                  maxlength="50"
                  placeholder="Nouveau mot de passe"
                />
                <input
                  type="password"
                  id="re-password"
                  minlength="8"
                  maxlength="50"
                  placeholder="Confirmez le mot de passe"
                />
              </div>
            </article>
            <!-- notifications -->
            <h4>
              Notifications
            </h4>
            <article class="user-parameters-notifications">
              <label for="newsletters">
                Newsletters relatives à Groupomania par e-mail :
              </label>
              <input id="newsletters" type="checkbox" />
            </article>
            <!-- pic -->
            <h4>
              Photo de profil
            </h4>
            <article class="user-parameters-pic">
              <div class="user-parameters-pic__img-input">
                <label for="user-parameters-pic_upload-img">
                  <img src="@/assets/cloud-upload-alt-solid.svg" alt="" />
                  <p>
                    Envoyer
                  </p>
                </label>
                <input
                  @change="userParamatersImgChange($event)"
                  id="user-parameters-pic_upload-img"
                  type="file"
                  accept="image/*"
                />
              </div>
              <div
                id="user-parameters-pic_img-container"
                class="user-parameters-pic__img-output"
              >
                <img
                  id="user-parameters-pic_img-output"
                  :src="getImgUrl(user.pic_url)"
                  alt=""
                />
                <div>
                  <img
                    v-on:click="userParamatersImgClose"
                    src="@/assets/times-solid.svg"
                    alt=""
                  />
                </div>
              </div>
            </article>
            <!-- send -->
            <div class="user-parameters-send">
              <input type="submit" value="Sauvegarder" />
            </div>
          </form>
        </div>
      </section>

      <!-- main-nav -->
      <mainNav
        :pic_url="user.pic_url"
        :firstname="user.firstname"
        :lastname="user.lastname"
      />
    </div>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils/scripts";
import trends from "@/components/trends/trends.vue";
import mainNav from "@/components/nav/mainNav.vue";
import userHeader from "@/components/userHeader.vue";

export default {
  name: "Parameters",
  data() {
    return {
      user: {
        pic_url: "user-icon.png",
        firstname: "Alexandre",
        lastname: "Pqn",
        email: "alex@gmail.com",
        description: "sfdfwcsdfsd",
        newsletters: false
      }
    };
  },
  mounted() {
    if (this.user.newsletters === true) {
      document.getElementById("newsletters").checked = true;
    }
  },
  methods: {
    getImgUrl,
    userParamatersImgChange(event) {
      let reader = new FileReader();
      reader.onload = function() {
        document.getElementById("user-parameters-pic_img-output").src =
          reader.result;
        document.getElementById(
          "user-parameters-pic_img-container"
        ).style.display = "flex";
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    userParamatersImgClose() {
      document.getElementById(
        "user-parameters-pic_img-container"
      ).style.display = "none";
      document.getElementById("user-parameters-pic_upload-img").style.display =
        "none";
      document.getElementById("user-parameters-pic_upload-img").value = "";
      document.getElementById("user-parameters-pic_img-output").src = "";
    },
    userParametersFormSend() {}
  },
  components: {
    trends,
    mainNav,
    userHeader
  }
};
</script>

<style lang="scss">
// container page
.parameters {
  display: flex;
}

// parameters
.user-parameters {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  // main
  &__main {
    h3 {
      margin: 10px 0 20px;
    }
    h4 {
      margin-bottom: 8px;
    }
  }
  article {
    margin-bottom: 20px;
    padding-top: 2px;
  }
}
@media screen and (max-width: 479px) {
  .user-parameters {
    &__main {
      font-size: 0.8em;
      h3 {
        font-size: 1.25em;
      }
      h4 {
        font-size: 1.15em;
      }
      input {
        width: 85%;
      }
    }
    article {
      margin-bottom: 25px;
    }
  }
}

// parameters global
.user-parameters-global {
  display: flex;
  align-items: center;
  justify-content: center;
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
    input {
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

// parameters notifications
.user-parameters-notifications {
  align-items: center;
  justify-content: center;
}

// parameters pic
.user-parameters-pic {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  &__img-input {
    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $default_smooth-border;
      background-color: rgb(231, 231, 231);
      padding: 5px 7px;
      img {
        width: 30px;
        margin-right: 10px;
        filter: invert(0.3) sepia(5) saturate(10) hue-rotate(175deg);
      }
      p {
        font-size: 0.96em;
      }
      &:hover {
        background-color: rgb(224, 224, 224);
      }
    }
    input {
      opacity: 0;
      position: absolute;
    }
  }
  &__img-output {
    display: flex;
    text-align: left;
    margin-left: 10px;
    div {
      display: flex;
      align-items: flex-start;
      padding: 1px 1.5px;
      margin-top: 7px;
      margin-left: -26.5px;
      img {
        cursor: pointer;
        width: 10px;
        padding: 2.5px 4px;
        border-radius: 0.2em;
        background-color: rgba(255, 255, 255, 0.8);
        &:hover {
          transform: scale(0.97);
          opacity: 0.8;
        }
      }
    }
    #user-parameters-pic_img-output {
      max-width: 260px;
      max-height: 260px;
      padding: 1px;
      border: 1px solid $default_smooth-border;
    }
  }
}
@media screen and (max-width: 479px) {
  .user-parameters-pic {
    &__img-output {
      #user-parameters-pic_img-output {
        max-width: 170px;
        max-height: 170px;
      }
    }
  }
}

// parameters send form
.user-parameters-send {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 25px;
  margin-bottom: 15px;
  padding-top: 17px;
  input {
    font-size: 0.97em;
    padding: 5px 8px;
  }
}
</style>
