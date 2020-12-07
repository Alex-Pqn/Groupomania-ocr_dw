<template>
<!-- user-header -->
<header class="user-header user-header--style">
  <!-- icon -->
  <a class="user-header__user-icon" href="#top">
    <img :src="getImgUrl(pic_url)" alt="">
  </a>
  <!-- mobile display -->
  <div class="user-header__mobile-display">
    <img v-on:click="displayProfilePopup(`profile-popup_mobile-user`)" src="@/assets/bars-solid.svg" alt="">
    <profilePopup id="profile-popup_mobile-user" :pic_url="pic_url" :firstname="firstname" :lastname="lastname" />
  </div>
  <!-- infos -->
  <h3>
    {{ firstname }} {{ lastname }}
  </h3>
  <p>
    {{ description }}
  </p>
</header>
</template>

<script>
import { getImgUrl, displayProfilePopup } from '@/utils/scripts'
import profilePopup from '@/components/nav/profilePopup.vue'

export default {
  name: "userHeader",
  props: {
    pic_url: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  methods: {
    getImgUrl,
    displayProfilePopup
  },
  components: {
    profilePopup
  }
}
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
  z-index: 999;
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
    img {
      width: 24px;
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