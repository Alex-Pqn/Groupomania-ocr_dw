<template>
<main>
  <!-- home -->
  <div class="home">
     <!-- trends -->
    <trends />
    <!-- forums -->
    <section id="top" class="forums">
      <!-- header -->
      <header class="forums__header forums__header--style">
        <a href="#top">
          <img src="../assets/icon-left-font-monochrome-black.svg" alt="">
        </a>
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
          <!-- comments in forum -->
          <div class="comments-list">
            <div v-for="comment in item.comments" :key="comment.id">
              <displayUserComments :published_date="comment.published_date" :pic_url="comment.pic_url" :firstname="comment.firstname" :lastname="comment.lastname" :text="comment.text" />
            </div>
          </div>
        </article>
      </div>
    </section>
    <!-- main-nav -->
    <mainNav />
  </div>
</main>
</template>

<script>
import displayUserForums from "@/components/forums/displayUserForums.vue"
import displayUserComments from "@/components/forums/displayUserComments.vue"
import userCreateForum from "@/components/forums/userCreateForum.vue"
import trends from "@/components/trends/trends.vue"
import mainNav from "@/components/nav/mainNav.vue"

export default {
  name: "Home",
  data () {
    return {
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
  components: {
    displayUserForums,
    displayUserComments,
    userCreateForum,
    trends,
    mainNav
  },
}
</script>

<style lang="scss">

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
    &--style {
      border-bottom: 1px solid $default_smooth-border;
      background-color: $default_background;
    }
    & img {
      width: 255px;
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    width: 45%;
    & h3 {
      margin: 15px 0 20px;
    }
    & article {
      display: flex;
      flex-direction: column;
      border-radius: .3em;
      margin-bottom: 35px;
    }
  }
}
</style>