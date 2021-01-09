<template>
  <!-- profile-popup -->
  <div class="profile-popup profile-popup--style">
    <!-- user infos -->
    <div class="profile-popup__user-infos">
      <img :src="pic_url" alt="" />
      <h4>{{ firstname }} {{ lastname }}</h4>
    </div>
    <!-- nav -->
    <nav class="profile-popup__nav">
      <ul>
        <li>
          <router-link to="/">
            Accueil
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            Voir le profil
          </router-link>
        </li>
        <li>
          <router-link to="/parameters">
            Paramètres
          </router-link>
        </li>
        <li v-on:click="sessionDisconnect">
          <router-link to="/login">
            Se déconnecter
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "profilePopup",
  props: {
    pic_url: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    }
  },
  methods: {
    sessionDisconnect: () => {
      window.location.href = "/login";
      document.cookie = `user_id=;expires=/;path=/`;
      document.cookie = `auth_token=;expires=/;path=/`;
    }
  }
};
</script>

<style lang="scss">
//profile-popup
.profile-popup {
  display: none;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 175px;
  padding: 10px 0;
  z-index: 9999;
  &--style {
    border-radius: 0.5em;
    background: rgb(238, 238, 238);
    border: 1px solid $small_black-border;
  }
  // user infos
  &__user-infos {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0 9px 0;
    font-size: 1.1em;
    img {
      @include profile-pic;
      width: 45px;
      margin-bottom: 11px;
    }
  }
  // nav
  &__nav {
    display: flex;
    border-top: 1px solid black;
    font-size: 1em;
    padding-top: 7px;
    a {
      text-decoration: none;
      color: rgb(43, 13, 211);
      &:hover {
        opacity: 0.8;
      }
    }
    li {
      margin-top: 7px;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .profile-popup {
    bottom: 62px;
    right: 42px;
    &__user-infos {
      font-size: 1.03em;
      img {
        width: 42px;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .profile-popup {
    // user infos
    &__user-infos {
      display: none;
    }
    // nav
    &__nav {
      border-top: none;
      padding-top: 0;
    }
  }
}
</style>
