<template>
<main>
  <!-- home -->
  <div class="home">
    <!-- displayed beetween 0px > 1023px -->
    <div class="mobile-container">

      <!-- trends -->
      <trends />

      <!-- forums -->
      <section id="top" class="forums">
        <!-- header -->
        <header class="forums__header forums__header--style">
          <div class="forums__header__left">
            <a href="#top">
              <img src="@/assets/icon-left-font-monochrome-black.svg" alt="">
            </a>
          </div>
          <div class="forums__header__right">
            <img v-on:click="displayProfilePopup(`profile-popup_mobile-home`)" id="user-icon" :src="getImgUrl(user.pic_url)" alt="">
            <profilePopup id="profile-popup_mobile-home" :pic_url="user.pic_url" :firstname="user.firstname" :lastname="user.lastname" />
          </div>
        </header>
        <!-- main -->
        <div class="forums__main">
          <userCreateForum />
          <h3>
            Fil de discussion
          </h3>
          <!-- forums list -->
          <article v-for="item in forums" :key="item.id">
            <displayUserForums :id="item.id" :published_date="item.published_date" :pic_url="item.pic_url" :image_url="item.image_url" :firstname="item.firstname" :lastname="item.lastname" :text="item.text" :total_comments="item.total_comments" />
            <!-- comments list in forum -->
            <div class="comments-list">
              <div v-for="comment in item.comments" :key="comment.id">
                <displayUserComments :published_date="comment.published_date" :pic_url="comment.pic_url" :firstname="comment.firstname" :lastname="comment.lastname" :text="comment.text" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- main nav -->
      <mainNav :pic_url="user.pic_url" :firstname="user.firstname" :lastname="user.lastname" />
    </div>
  </div>
</main>
</template>

<script>
import displayUserForums from "@/components/forums/displayUserForums.vue"
import displayUserComments from "@/components/forums/displayUserComments.vue"
import userCreateForum from "@/components/forums/userCreateForum.vue"
import trends from "@/components/trends/trends.vue"
import mainNav from "@/components/nav/mainNav.vue"
import profilePopup from '@/components/nav/profilePopup.vue'
import { getImgUrl, displayProfilePopup } from '@/utils/scripts';

export default {
  name: "Home",
  data () {
    return {
      user: {
        pic_url: "user-icon.png",
        firstname: "Alexandre",
        lastname: "Pqn" 
      },
      forums: [
        {
          id:96764556126554123,
          published_date:"23/11/2020",
          pic_url:"user-icon.png",
          firstname:"Alexandre",
          lastname:"Pqn",
          text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
          image_url:"icon-left-font.png",
          total_comments:13,
          comments: [
            {
              id:9265456456423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:9265456464556423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            }
          ]
        }, 
        {
          id:9676456578654123,
          published_date:"23/11/2020",
          pic_url:"user-icon.png",
          firstname:"Alexandre",
          lastname:"Pqn",
          text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
          image_url:"icon-left-font.png",
          total_comments:13,
          comments: [
            {
              id:9265464565456423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            }
          ]
        }, 
      ],
    }
  },
  methods: {
    getImgUrl,
    displayProfilePopup
  },
  components: {
    displayUserForums,
    displayUserComments,
    userCreateForum,
    trends,
    mainNav,
    profilePopup
  },
}
</script>

<style lang="scss">
// profile-popup mobile home
#profile-popup_mobile-home {
  right: 53px;
  top: 73px;
  border-top-right-radius: 0;
}
@media screen and (max-width: 479px) {
  #profile-popup_mobile {
    font-size: 1.2em;
    img {
      width: 60px;
    }
  }
}

// home
.home {
  display: flex;
  p {
    overflow-wrap: break-word;
  }
}

// forums
.forums {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  // header
  &__header {
    display: flex;
    align-items: flex-end;
    position: sticky;
    top: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 15px;
    width: 50%;
    height: 7%;
    z-index: 999;
    &--style {
      border-bottom: 1px solid $default_smooth-border;
      background-color: $default_background;
    }
    &__left {
      display: flex;
      width: 75%;
      & img {
        width: 255px;
      }
    }
    &__right {
      display: none;
      width: 25%;
      justify-content: flex-end;
      #user-icon {
        margin-bottom: 3px;
      }
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    width: 45%;
    h3 {
      margin: 15px 0 20px;
    }
    article {
      display: flex;
      flex-direction: column;
      border-radius: .3em;
      margin-bottom: 35px;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .forums {
    &__header {
      margin-top: 5px;
      padding-top: 15px;
      width: 75%;
      &__left {
        img {
          width: 230px;
        }
      }
    }
    &__main {
      width: 60%;
      h3 {
        margin: 10px 0 20px;
      }
      article {
        margin-bottom: 30px;
      }
    }
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  .forums {
    &__header {
      margin-top: 20px;
      padding-top: 18px;
      width: 87%;
      &__left {
        img {
          width: 250px;
        }
      }
    }
    &__main {
      width: 75%;
      h3 {
        margin: 5px 0 20px;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .forums {
    &__header {
      &__left {
        margin-left: 15px;
        img {
          width: 220px;
        }
      }
      &__right {
        margin-right : 15px;
      }
    }
    &__main {
      width: 90%;
    }
  }
}
@media screen and (max-width: 479px) {
  .forums {
    &__header {
      margin-top: 25px;
      &__left {
        margin-left: 10px;
        img {
          width: 250px;
        }
      }
      &__right {
        margin-right : 10px;
        #user-icon {
          width: 55px;
        }
      }
    }
    &__main {
      width: 95%;
    }
  }
}
@media screen and (max-width: 1023px) {
  .forums {
    &__header {
      &__left {
        img {
          width: 220px;
        }
      }
      &__right {
        display: flex;
        #user-icon {
          width: 42px;
        }
      }
    }
  }
}
@media screen and (max-width: 739px) {
  .forums {
    &__header {
      width: 100%;
    }
  }
}
</style>