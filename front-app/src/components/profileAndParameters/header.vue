<template>
  <!-- user-header -->
  <header class="user-header user-header--style">
    <!-- icon -->
    <a class="user-header__user-icon" href="#top">
      <img :src="user.pic_url" alt="" />
    </a>
    <!-- mobile display -->
    <div class="user-header__mobile-display">
      <img
        id="mobile_nav-icon"
        v-on:click="displayProfilePopup(`profile-popup_mobile-user`)"
        src="@/assets/bars-solid.svg"
        alt=""
      />
      <profilePopup
        id="profile-popup_mobile-user"
        :pic_url="user.pic_url"
        :firstname="user.firstname"
        :lastname="user.lastname"
      />
    </div>
    <!-- infos -->
    <h3>{{ user.firstname }} {{ user.lastname }}</h3>
    <p>
      {{ user.description }}
    </p>
  </header>
</template>

<script>
import { displayProfilePopup, api } from "@/utils/scripts";
import profilePopup from "@/components/nav/profilePopup.vue";

export default {
  name: "userHeader",
  data () {
    return {
      user: {
        pic_url: "",
        firstname: "",
        lastname: "",
        description: ""
      }
    }
  },
  beforeMount: async function () {
      const vm = this
      vm.getPrimaryInfos()
  },
  methods: {
    // GET PRIMARY INFOS
    getPrimaryInfos () {
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
        vm.user.description = user.description
      }
      
      // API CALL
      api("api/user/primaryInfos", "GET", undefined, apiCallbackDone, apiCallbackError, xhrCallbackError)
    },
    displayProfilePopup
  },
  components: {
    profilePopup
  }
};
</script>

<style lang="scss">
// profile-popup mobile user
#profile-popup_mobile-user {
  right: 30px;
  top: 30px;
  border-top-right-radius: 0;
}

// user-header
.user-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding-bottom: 15px;
  padding-top: 15px;
  margin-bottom: 15px;
  z-index: 10;
  width: 50%;
  &--style {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: $default_background;
  }
  // icon
  &__user-icon {
    img {
      width: 50px;
      @include profile-pic;
    }
  }
  // mobile display
  &__mobile-display {
    display: none;
    position: absolute;
    right: 15px;
    #mobile_nav-icon {
      width: 26px;
    }
    @media screen and (max-width: 1023px) {
      display: flex;
    }
  }
  // infos
  h3 {
    margin-top: 9px;
    font-size: 1.22em;
  }
  p {
    margin-top: 7px;
    font-size: 1em;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .user-header {
    width: 75%;
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  .user-header {
    margin-top: 30px;
    width: 87%;
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .user-header {
    margin-top: 20px;
    width: 97%;
  }
}
@media screen and (max-width: 479px) {
  .user-header {
    margin-top: 15px;
    width: 100%;
    h3 {
      margin-top: 9px;
      font-size: 1.2em;
    }
  }
}
</style>
