<template>
  <!-- main-nav -->
  <section class="main-nav">
    <div class="main-nav__content main-nav__content--style">
      <article class="main-nav__content__top">
        <router-link to="/">
          <img src="@/assets/icon.png" alt="">
        </router-link>
      </article>
      <article class="main-nav__content__bottom">
        <img v-on:click="popupProfilePic" id="user-icon" :src="getImgUrl(user.pic_url)" alt="">
        <div id="profile-popup" class="profile-popup profile-popup--style">
          <div class="profile-popup__user-infos">
            <img :src="getImgUrl(user.pic_url)" alt="">
            <h4>
              {{ user.firstname }} {{ user.lastname }}
            </h4>
          </div>
          <nav class="profile-popup__nav">
            <ul>
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
            </ul>
          </nav>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { getImgUrl } from '@/utils/scripts';
export default {
    name: "mainNav",
    data() {
      return {
        user: {
          pic_url: "user-icon.png",
          firstname: "Alexandre",
          lastname: "Pqn" 
        }
      }
    },
    methods: {
      getImgUrl,
      popupProfilePic() {
        const profilePopupContainer = document.getElementById('profile-popup')
        if(profilePopupContainer.style.display == "flex") {
          profilePopupContainer.style.display = "none"
        }else{
          profilePopupContainer.style.display = "flex"
        }
      }
    } 
}
</script>

<style lang="scss">
// main-nav
.main-nav {
  width: 100px;
  margin-right: 20px;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 100px;
    height: 100vh;
    &--style {
      background: linear-gradient(rgba(238, 238, 238, 0.7), $default_background, white);
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      border-right: 1px solid rgba(0, 0, 0, 0.15);
    }
    &__top {
      height: 50%;
      img {
        margin-top: 5px;
        width: 90px;
      }
    }
    &__bottom {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      height: 50%;
      #user-icon {
        cursor: pointer;
        width: 50px;
        margin-bottom: 20px;
        @include profile-pic;
      }
    }
  }
}

//profile-popup
.profile-popup {
  display: none;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 175px;
  padding: 10px 0;
  bottom: 72px;
  right: 52px;
  &--style {
    border-radius: .5em;
    border-bottom-right-radius: .2em;
    background: rgb(238, 238, 238);
    border: 1px solid $small_black-border;
  }
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
  &__nav {
    display: flex;
    border-top: 1px solid black;
    font-size: 1em;
    padding-top: 7px;
    a {
      text-decoration: none;
      color: rgb(43, 13, 211);
      &:hover {
        opacity: .8;
      }
    }
    li {
      margin-top: 7px;
    }
  }
}
</style>