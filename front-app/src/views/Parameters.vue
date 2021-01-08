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
        <userHeader/>
        <!-- main -->
        <div class="user-parameters__main">
          <h3>
            Mes paramètres
          </h3>
          <!-- form -->
          <form v-on:submit="userParametersFormSend" name="parametersForm">
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
                  name="firstname"
                  :value="user.firstname"
                  type="text"
                  minlength="3"
                  maxlength="30"
                  placeholder="Entrez votre prénom"
                  required
                />
                <input
                  id="lastname"
                  name="lastname"
                  :value="user.lastname"
                  type="text"
                  minlength="3"
                  maxlength="30"
                  placeholder="Entrez votre nom"
                  required
                />
                <input
                  id="email"
                  name="email"
                  :value="user.email"
                  type="email"
                  minlength="5"
                  maxlength="55"
                  placeholder="Entrez votre e-mail"
                  required
                />
                <input
                  id="description"
                  name="description"
                  :value="user.description"
                  type="text"
                  maxlength="255"
                  placeholder="Entrez une description"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  minlength="8"
                  maxlength="50"
                  placeholder="Nouveau mot de passe"
                />
                <input
                  type="password"
                  name="repassword"
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
              <input id="newsletters" name="newsletters" type="checkbox" value="false"/>
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
                  :src="user.pic_url"
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
            <p id="user-parameters_error-handler"></p>
          </form>
          <button id="delete-account_button" v-on:click="deleteAccountModal">
            Supprimer mon compte
          </button>
          <div class="delete-account-modal">
            <div class="delete-account-modal__content">
              <h4>
                Suppression de votre compte
              </h4>
              <p>
                En supprimant votre compte Groupomania, les données suivantes seront supprimées de nos services de façon définitive :
              </p>
              <ul>
                <li>
                  - Les discussions postées
                </li>
                <li>
                  - Les commentaires postées
                </li>
                <li>
                  - L'ensemble des données ratachées à votre compte, comprenant notamment votre e-mail et votre mot de passe.
                </li>
              </ul>
              <p>
                Après avoir cliqué sur <strong>supprimer mon compte</strong>, l'ensemble de ces données seront supprimées et votre compte sera rendu innacessible de façon permanente.
              </p>
              <button id="delete-account" v-on:click="deleteAccount">
                Supprimer mon compte
              </button>
              <button v-on:click="quitDeleteAccountModal">
                Retour
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- main-nav -->
      <mainNav/>
    </div>
  </div>
</template>

<script>
import { api } from "@/utils/scripts";
import trends from "@/components/trends/trends.vue";
import mainNav from "@/components/nav/mainNav.vue";
import userHeader from "@/components/userHeader.vue";

export default {
  name: "Parameters",
  data() {
    return {
      user: {
        pic_url: "",
        firstname: "",
        lastname: "",
        email: "",
        description: "",
        newsletters: ""
      }
    };
  },
  beforeMount: async function () {
    const vm = this
    
    // XHR ERROR
    function xhrCallbackError (response) {
      console.error(response)
    }
    
    // API CALLBACK ERROR
    function apiCallbackError (response, readyState, httpStatus) {
      console.error(response)
      console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`)
    }
    
    // API CALLBACK DONE
    function apiCallbackDone (response) {
      let user = response.result[0]
      
      vm.user.pic_url = user.pic_url
      vm.user.firstname = user.firstname
      vm.user.lastname = user.lastname
      vm.user.email = user.email
      vm.user.description = user.description
      vm.user.newsletters = user.newsletters
      
      if(user.newsletters === 1) {
        document.getElementById('newsletters').checked = true
        document.getElementById('newsletters').value = true
      }
    }
    
    // API CALL
    let data = []
    api("api/user/parameters/get", "POST", data, apiCallbackDone, apiCallbackError, xhrCallbackError)
  },
  mounted() {
    const newslettersCheckbox = document.getElementById("newsletters");
    newslettersCheckbox.addEventListener("change", function() {
      if (this.checked) {
        newslettersCheckbox.value = true;
      } else {
        newslettersCheckbox.value = false;
      }
    });
  },
  methods: {
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
    userParametersFormSend() {
      event.preventDefault();
      const vm = this
      let formData
      let passwordValidation
      
      document.getElementById('user-parameters_error-handler').innerHTML = ""
      
      let userFirstname = document.parametersForm.firstname.value
      let userLastname = document.parametersForm.lastname.value
      let userDescription = document.parametersForm.description.value
      let userEmail = document.parametersForm.email.value
      let userPassword = document.parametersForm.password.value
      let userRePassword = document.parametersForm.repassword.value
      let userNewsletters = document.parametersForm.newsletters.value
      
      formData = [
        {
          id: 1,
          name: "prénom",
          value: userFirstname,
          stepValidation: false,
          //eslint-disable-next-line
          regex: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
          minLength: 3,
          maxLength: 30
        },
        {
          id: 2,
          name: "nom",
          value: userLastname,
          stepValidation: false,
          //eslint-disable-next-line
          regex: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
          minLength: 3,
          maxLength: 30
        },
        {
          id: 3,
          name: "description",
          value: userDescription,
          stepValidation: false,
          minLength: 0,
          maxLength: 255
        },
        {
          id: 4,
          name: "e-mail",
          value: userEmail,
          stepValidation: false,
          //eslint-disable-next-line
          regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
          minLength: 5,
          maxLength: 55
        },
      ];
      
      if(userPassword.length >= 1 || userRePassword.length >= 1) {
        passwordValidation = {
          id: 5,
          name: "mot de passe",
          value: userPassword,
          stepValidation: false,
          //eslint-disable-next-line
          regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
          minLength: 8,
          maxLength: 50
        }
        formData.push(passwordValidation)
      }

      // inputs validator
      formData.forEach(data => {
        // length validation
        if (data.value.length < data.minLength) {
          return vm.displayFormInfo(
            `Votre ${data.name} doit être composé de ${data.minLength} caractères au minimum.`, "red"
          );
        } else if (data.value.length > data.maxLength) {
          return vm.displayFormInfo(
            `Votre ${data.name} ne peut être composé que de ${data.maxLength} caractères au maximum.`, "red"
          );
        }
        // regex validation
        if (data.regex && data.regex.test(data.value) === false) {
          if (data.id === 1 || data.id === 2) {
            return vm.displayFormInfo(
              `Votre ${data.name} est composé de caractères spéciaux prohibés.`, "red"
            );
          } else if(data.id === 3) {
            return vm.displayFormInfo(
              `La description est composée de caractères spéciaux prohibés.`, "red"
            );
          } else if (data.id === 4) {
            return vm.displayFormInfo(
              "L'e-mail que vous avez entré est invalide.", "red"
            );
          } else {
            return vm.displayFormInfo(
              "Votre mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule et un chiffre.", "red"
            );
          }
        }
        // passwords corresponds validation
        if (data.id === 5) {
          if (userRePassword !== data.value) {
            return vm.displayFormInfo(
              "Les deux mots de passe entrés doivent correspondre.", "red"
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
          if(formData[4]) {
            if(formData[4].stepValidation === true) {
              vm.userParametersRequest(userFirstname, userLastname, userDescription, userEmail, userNewsletters, userPassword)
            }
          }else{
            vm.userParametersRequest(userFirstname, userLastname, userDescription, userEmail, userNewsletters)
          }
        }
      });
    },
    userParametersRequest(firstname, lastname, description, email, newsletters, password) {
      const vm = this
      let formData = new FormData();
      
      // formdata attach image
      let userImage = document.querySelector("input[type=file]").files[0];
      if (userImage) {
        formData.append("image", userImage, userImage.name);
      }
      
      // formdata attach user parameters
      let userParameters = {
        pic_url: vm.user.pic_url,
        firstname: firstname,
        lastname: lastname,
        description: description,
        email: email,
        password: password,
        newsletters: newsletters
      }
      formData.append("userParameters", JSON.stringify(userParameters));
      
      // XHR ERROR
      function xhrCallbackError (response) {
        vm.displayFormError(response, "red")
        console.error(response)
      }
      
      // API CALLBACK DONE
      function apiCallbackDone (response) {
        vm.displayFormError(response.message, "green")
      }
      
      // API CALLBACK ERROR
      function apiCallbackError (response, readyState, httpStatus) {
        vm.displayFormError(response.sub_err, "red")
        console.error(response)
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`)
      }
      
      // API CALL
      api("api/user/parameters/update", "POST", formData, apiCallbackDone, apiCallbackError, xhrCallbackError);
    },
    displayFormInfo(errorValue, color) {
      setTimeout(() => {
        const errorContainer = document.getElementById('user-parameters_error-handler')
        errorContainer.innerHTML = errorValue;
        errorContainer.style.color = color
      }, 150);
    },
    deleteAccountModal () {
      
    },
    deleteAccount () {
      
    },
    quitDeleteAccountModal () {
      
    },
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

// delete account
#delete-account_button {
  margin-top: 15px;
  padding: 5px;
  font-size: .9em;
  border-radius: .1em;
  background-color: rgba(255, 52, 52, 0.459);
  border: 1px solid rgb(156, 1, 1);
}

.delete-account-modal {
  justify-content: center;
  align-items: center;
  display: none;
  position: fixed;
  z-index: 30;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  &__content {
    background-color: white;
    width: 18%;
    padding: 17px 20px;
    border-radius: .5em;
    h4 {
      font-size: 1.15em;
    }
    p {
      font-size: 1.05em;
    }
    ul {
      margin: 15px;
      li {
        margin-top: 9px;
      }
    }
    #delete-account {
      color: rgb(156, 1, 1);
      background-color: rgba(255, 52, 52, 0.459);
      border: 1px solid rgb(156, 1, 1);
    }
    button {
      padding: 7px 10px;
      border-radius: .1em;
      border: 1px solid black;
      margin: 10px 3px 0;
    }
  }
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
