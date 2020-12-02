<template>
<div id="app">
    <!-- home -->
  <div class="home">
    <!-- trends -->
    <section class="home__trends-container">
      <div class="trends trends--style">
        <!-- header -->
        <div class="trends__header">
          <h1>
            Tendances
          </h1>
        </div>
      </div>
    </section>
    <!-- forums -->
    <section class="forums forums--style">
      <!-- header -->
      <div class="forums__header forums__header--style">
        <img src="../assets/icon-left-font-monochrome-black.svg" alt="">
      </div>
      <!-- list -->
      <div class="forums__list">
        <createForum />
        <h3>
          Fil de discussion
        </h3>
        <div>
          <!-- forum -->
          <article v-for="item in forums" :key="item.id">
            <displayUserForum :id="item.id" :published_date="item.published_date" :pic_url="item.pic_url" :image_url="item.image_url" :firstname="item.firstname" :lastname="item.lastname" :text="item.text" :total_comments="item.total_comments" />

            <!-- comments in forum -->
            <div class="comments-list">
              <div v-for="comment in item.comments" :key="comment.id">
                <displayUserComment :published_date="comment.published_date" :pic_url="comment.pic_url" :firstname="comment.firstname" :lastname="comment.lastname" :text="comment.text" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    <!-- nav -->
    <section class="home__nav-container">
      <div class="nav">
          <img src="../assets/icon.svg" alt="">
      </div>
    </section>
  </div>
</div>
</template>

<script>
import displayUserForum from "@/components/forums/displayUserForum.vue"
import displayUserComment from "@/components/forums/displayUserComment.vue"
import createForum from "@/components/forums/createForum.vue"

export default {
  name: "Home",
  data () {
    return {
      forums: [
        {
          id:9676554123,
          published_date:"23/11/2020",
          pic_url:"user-icon.png",
          firstname:"Alexandre",
          lastname:"Pqn",
          text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
          image_url:"icon-left-font.png",
          total_comments:13,
          comments: [
            {
              id:9265456423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:95455624123,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:962565412,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:9645554223,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:925456123,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:96452412,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:96255423,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:95416243,
              published_date:"23/11/2020",
              pic_url:"user-icon.png",
              firstname:"Alexandre",
              lastname:"Pqn",
              text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            },
            {
              id:96745412,
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
    displayUserForum,
    displayUserComment,
    createForum
  },
  computed: {
  }
}
</script>

<style lang="scss">
// home
.home {
  display: flex;
  p {
    overflow-wrap: break-word;
  }
  &__trends-container {
    width: 320px;
  }
  &__nav-container {
    width: 130px;
    margin-right: 23px;
  }
}
// trends
.trends {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 320px;
  height: 100vh;
  &--style {
    background-color: rgb(243, 243, 243);
  }

  // header
  &__header {

  }
}

// forums
.forums {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &--style {
    background-color: rgb(248, 248, 248);
  }

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
    
    &--style {
      border-bottom: 1px solid rgb(189, 189, 189);
      background-color:rgb(248, 248, 248);
    }
    & img {
      width: 255px;
    }
  }
  // list
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    width: 45%;
    & h3 {
      margin: 35px 0 20px;
    }
    & .comments-list {
      overflow-y: auto;
      max-height: 650px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    }
    & article {
      display: flex;
      flex-direction: column;
      border-radius: .3em;
      margin-bottom: 35px;
    }
  }
}

// nav
.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 130px;
  height: 100vh;
  margin-right: 23px;
  & img {
    width: 120px;
  }
}
</style>