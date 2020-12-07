<template>
<div class="profile">
  <!-- displayed beetween 0px > 1023px -->
  <div class="mobile-container">
    <!-- trends -->
    <trends />

    <!-- profile -->
    <div class="user-profile" id="top">
      <!-- header -->
      <userHeader :description="user.description" :pic_url="user.pic_url" :firstname="user.firstname" :lastname="user.lastname" />
      <section class="user-profile__forums">
        <userCreateForum />
        <h3>
          Mon fil de discussion
        </h3>
        <!-- forums list -->
        <article v-for="item in forums" :key="item.id">
          <displayUserForums :id="item.id" :published_date="item.published_date" :pic_url="item.pic_url" :image_url="item.image_url" :firstname="item.firstname" :lastname="item.lastname" :text="item.text" :total_comments="item.total_comments" />
          <!-- comments in forum -->
          <div class="comments-list">
            <div v-for="comment in item.comments" :key="comment.id">
              <displayUserComments :published_date="comment.published_date" :pic_url="comment.pic_url" :firstname="comment.firstname" :lastname="comment.lastname" :text="comment.text" />
            </div>
          </div>
        </article>
      </section>
    </div>

    <!-- main-nav -->
    <mainNav :pic_url="user.pic_url" :firstname="user.firstname" :lastname="user.lastname" />
  </div>
</div>
</template>

<script>
import displayUserForums from "@/components/forums/displayUserForums.vue"
import displayUserComments from "@/components/forums/displayUserComments.vue"
import userCreateForum from "@/components/forums/userCreateForum.vue"
import trends from "@/components/trends/trends.vue"
import mainNav from "@/components/nav/mainNav.vue"
import userHeader from "@/components/userHeader.vue"

export default {
  name: "Profile",
  data () {
    return {
      user: {
        pic_url: "user-icon.png",
        firstname: "Alexandre",
        lastname: "Pqn",
        description: "sfdfwcsdfsd"
      },
      forums: [
        {
          id:96765454123,
          published_date:"23/11/2020",
          pic_url:"user-icon.png",
          firstname:"Alexandre",
          lastname:"Pqn",
          text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
          image_url:"icon-left-font.png",
          total_comments:13,
          comments: [
            {
              id:92655456423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:926546756423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
          ]
        }, 
        {
          id:96769554123,
          published_date:"23/11/2020",
          pic_url:"user-icon.png",
          firstname:"Alexandre",
          lastname:"Pqn",
          text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
          image_url:"icon-left-font.png",
          total_comments:13,
          comments: [
            {
              id:926547856423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:9265631456423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
          ]
        }, 
      ],
    }
  },
  components: {
    displayUserForums,
    displayUserComments,
    userCreateForum,
    trends,
    mainNav,
    userHeader
  },
  methods: {
    forumCreateImgChange (event) {
      let reader = new FileReader()
      reader.onload = function () {
        document.getElementById('create-forum_img-output').src = reader.result
        document.getElementById('create-forum_img').style.display = "flex"
      }
      reader.readAsDataURL(event.target.files[0])
    },
    forumCreateImgClose () {
      document.getElementById('create-forum_img').style.display = "none"
      document.getElementById('create-forum_upload-img').value = ""
      document.getElementById('create-forum_img-output').src = ""
    },
    forumCreateSend () {

    }
  },
}
</script>

<style lang="scss">
// profile
.profile {
  display: flex;
}
// user-profile
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &__forums {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    width: 45%;
    article {
      margin-bottom: 35px;
    }
    h3 {
      margin-top: 15px;
      margin-bottom: 25px;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  // user-profile
  .user-profile {
    &__forums {
      width: 60%;
      article {
        margin-bottom: 25px;
      }
      h3 {
        margin-bottom: 15px;
      }
    }
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  // user-profile
  .user-profile {
    &__forums {
      width: 75%;
      article {
        margin-bottom: 20px;
      }
      h3 {
        margin-top: 25px;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  // user-profile
  .user-profile {
    &__forums {
      width: 90%;
      article {
        margin-bottom: 20px;
      }
      h3 {
        margin-top: 25px;
      }
    }
  }
}
@media screen and (max-width: 479px) {
  // user-profile
  .user-profile {
    &__forums {
      width: 95%;
      article {
        margin-bottom: 20px;
      }
      h3 {
        font-size: 1.25em;
        margin-top: 30px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>