<template>
  <!-- trends -->
  <section class="trends-container">
    <div class="trends trends--style">
      <!-- header -->
      <header class="trends__header">
        <h1>
          Tendances
        </h1>
      </header>
      <!-- main -->
      <div class="trends__main">
        <div class="trends__main__recents trends__main__recents--style">
          <h4>
            Discussion récentes
          </h4>
          <article v-for="item in recentsTrends" :key="item.id">
            <displayUserTrends :published_date="item.published_date" :pic_url="item.pic_url" :image_url="item.image_url" :firstname="item.firstname" :lastname="item.lastname" :text="item.text" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import displayUserTrends from "@/components/trends/displayUserTrends.vue"

export default {
    name: "trends",
    data() {
      return {
        recentsTrends: [
          {
            id:8531265,
            published_date:"23/11/2020",
            pic_url:"user-icon.png",
            firstname:"Alexandre",
            lastname:"Pqn",
            text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            image_url:"icon-left-font.png"
          },
          {
            id:8456531265,
            published_date:"23/11/2020",
            pic_url:"user-icon.png",
            firstname:"Alexandre",
            lastname:"Pqn",
            text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v"
          },
          {
            id:85341265,
            published_date:"23/11/2020",
            pic_url:"user-icon.png",
            firstname:"Alexandre",
            lastname:"Pqn",
            text:"tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
            image_url:"icon-left-font.png"
          }
        ]
      }
    },
    components: {
      displayUserTrends
    }
}
</script>

<style lang="scss">
// trends
.trends-container {
  width: 350px;
}
.trends {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 350px;
  height: 97vh;
  top: 1.5vh;
  left: 1.5vh;
  &--style {
    background-color: rgb(241, 241, 241);
    border: 1px solid $small_black-border;
    border-top-left-radius: .7em;
    border-bottom-right-radius: 1em;
  }
  // header
  &__header {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  // main
  &__main {
    display: flex;
    justify-content: center;
    &__recents {
      width: 90%;
      padding: 5px 8px;
      &--style {
        border-radius: 1em;
      }
      h4 {
        margin: 10px 0;
      }
      article {
        padding-top: 15px;
        border-top: 1px solid $small_black-border;
      }
    }
  }
}
</style>