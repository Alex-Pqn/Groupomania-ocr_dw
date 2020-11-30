<template>
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
        <h3>
          Fil de discussion
        </h3>
        <article>
          <displayUserForum published_date="20/11/2020" total_comments=45 pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae velut tessera data castrensi iuxta vehiculi frontem omne textrinum incedit: huic atratum coquinae iungitur ministerium, dein totum promiscue servitium cum otiosis plebe" />
          <div id="comments-list">
            <displayUserComment published_date="23/11/2020" pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayUserComment published_date="23/11/2020" pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayUserComment published_date="23/11/2020" pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayUserComment published_date="23/11/2020" pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayUserComment published_date="23/11/2020" pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayUserComment published_date="23/11/2020" pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
          </div>
        </article>
        <article>
          <displayUserForum published_date="20/11/2020" total_comments=45 pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae velut tessera data castrensi iuxta vehiculi frontem omne textrinum incedit: huic atratum coquinae iungitur ministerium, dein totum promiscue servitium cum otiosis plebe" />
        </article>
      </div>
    </section>
    <!-- nav -->
    <section class="home__nav-container">
      <div class="nav">
          <img src="../assets/icon.svg" alt="">
      </div>
    </section>
  </div>
</template>

<script>
import displayUserForum from "@/components/forums/displayUserForum.vue"
import displayUserComment from "@/components/forums/displayUserComment.vue"

export default {
  name: "Home",
  components: {
    displayUserForum,
    displayUserComment
  },
  mounted: function () {
    let image_url = "icon-left-font.png"

    if (image_url != undefined) {
      let imageUserForumContainer = document.getElementById('user-forum_bottom_image')
      let imageElement = document.createElement('img')
      imageElement.src = require(`../assets/` + image_url)
      imageUserForumContainer.appendChild(imageElement)
    }
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
    position: fixed;
    padding-bottom: 10px;
    width: 50%;
    height: 7%;
    &--style {
      border-bottom: 1px solid rgb(189, 189, 189);
      background-color: rgb(248, 248, 248);
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
    margin-top: 125px;
    width: 45%;
    & h3 {
      margin-bottom: 20px;
    }
    & #comments-list {
      overflow-y: auto;
      max-height: 500px;
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