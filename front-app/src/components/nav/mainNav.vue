<template>
  <!-- main-nav -->
  <section class="main-nav">
    <!-- content -->
    <div class="main-nav__content main-nav__content--style">
      <!-- top -->
      <article class="main-nav__content__top">
        <router-link to="/">
          <img src="@/assets/icon.png" alt="" />
        </router-link>
      </article>
      <!-- bottom -->
      <article class="main-nav__content__bottom">
        <img
          v-on:click="displayProfilePopup(`profile-popup_nav`)"
          id="user-icon"
          :src="user.pic_url"
          alt=""
        />
        <profilePopup
          id="profile-popup_nav"
          :pic_url="user.pic_url"
          :firstname="user.firstname"
          :lastname="user.lastname"
        />
      </article>
    </div>
  </section>
</template>

<script>
import { displayProfilePopup, api } from "@/utils/scripts";
import profilePopup from "@/components/nav/profilePopup.vue";
export default {
  name: "mainNav",
  data () {
    return {
      user: {
        pic_url: "",
        firstname: "",
        lastname: ""
      }
    }
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
      }
      
      // API CALL
      api("api/user/primaryInfos", "GET", undefined, apiCallbackDone, apiCallbackError, xhrCallbackError)
  },
  components: {
    profilePopup
  },
  methods: {
    displayProfilePopup
  }
};
</script>

<style lang="scss">
// profile-popup mobile nav
#profile-popup_nav {
  bottom: 70px;
  right: 50px;
  border-bottom-right-radius: 0;
}

// main-nav
.main-nav {
  display: flex;
  position: fixed;
  right: 0;
  width: 100px;

  // content
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 100px;
    height: 100vh;
    &--style {
      background: linear-gradient(
        rgba(238, 238, 238, 0.7),
        $default_background,
        white
      );
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      border-right: 1px solid rgba(0, 0, 0, 0.15);
    }
    // top
    &__top {
      height: 50%;
      img {
        margin-top: 5px;
        width: 90px;
      }
    }
    // bottom
    &__bottom {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      height: 50%;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .main-nav {
    width: 90px;
    &__content {
      width: 90px;
      &__top {
        img {
          margin-top: 2px;
          width: 80px;
        }
      }
      &__bottom {
        #user-icon {
          width: 42px;
          margin-bottom: 17px;
        }
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .main-nav {
    display: none;
  }
}
</style>
