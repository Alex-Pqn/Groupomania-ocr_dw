<template>
  <!-- trends container -->
  <section class="trends-container">
    <!-- trends -->
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
            <displayUserTrends
              :published_date="item.published_date"
              :pic_url="item.pic_url"
              :image_url="item.image_url"
              :firstname="item.firstname"
              :lastname="item.lastname"
              :text="item.text"
            />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import displayUserTrends from "@/components/trends/displayUserTrends.vue";

export default {
  name: "trends",
  data() {
    return {
      recentsTrends: [
        {
          id: 8531265,
          published_date: "23/11/2020",
          pic_url: "user-icon.png",
          firstname: "Alexandre",
          lastname: "Pqn",
          text:
            "tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
          image_url: "icon-left-font.png"
        },
        {
          id: 8456531265,
          published_date: "23/11/2020",
          pic_url: "user-icon.png",
          firstname: "Alexandre",
          lastname: "Pqn",
          text:
            "tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v"
        },
        {
          id: 85341265,
          published_date: "23/11/2020",
          pic_url: "user-icon.png",
          firstname: "Alexandre",
          lastname: "Pqn",
          text:
            "tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v",
          image_url: "icon-left-font.png"
        }
      ]
    };
  },
  components: {
    displayUserTrends
  }
};
</script>

<style lang="scss">
// trends-container
.trends-container {
  min-width: 370px !important;
}
// trends
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
    border-top-left-radius: 0.7em;
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
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .trends-container {
    min-width: 305px !important;
  }
  .trends {
    width: 290px;
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  .trends {
    width: 60%;
    &--style {
      border-radius: 0;
      background-color: rgb(245, 245, 245);
    }
    &__header {
      h1 {
        font-size: 1.6em;
      }
    }
    &__main {
      &__recents {
        h4 {
          font-size: 1.2em;
        }
      }
    }
  }
}
@media screen and (max-width: 479px) {
  .trends {
    &__header {
      h1 {
        font-size: 1.7em;
      }
    }
    &__main {
      &__recents {
        h4 {
          font-size: 1.4em;
        }
      }
    }
  }
}
@media screen and (max-width: 740px) {
  .trends {
    width: 92%;
  }
}
@media screen and (max-width: 1023px) {
  .trends-container {
    min-width: 100% !important;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .trends {
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    &--style {
      border-radius: 0;
      background-color: rgb(245, 245, 245);
    }
    &__main {
      &__recents {
        article {
          margin-bottom: 10px;
          padding-top: 23px;
        }
        h4 {
          margin: 15px 0 15px 0;
        }
      }
    }
  }
}
</style>
