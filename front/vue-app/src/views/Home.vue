<template>
  <div class="home">
    <div class="home__trends-container">
      <div class="trends">
        <div class="trends__header">
          <h1>
            Tendances
          </h1>
        </div>
      </div>
    </div>
    <div class="home__forums">
      <div class="home__forums__header">
        <img src="../assets/icon-left-font-monochrome-black.svg" alt="">
      </div>
      <div class="home__forums__list">
        <h3>
          Fil de discussion
        </h3>
        <article>
          <displayForum published_date="20/11/2020" total_comments=45 image_url="icon-left-font.svg" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae velut tessera data castrensi iuxta vehiculi frontem omne textrinum incedit: huic atratum coquinae iungitur ministerium, dein totum promiscue servitium cum otiosis plebe" />
          <div id="comments-list">
            <displayForumComment published_date="23/11/2020" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayForumComment published_date="23/11/2020" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayForumComment published_date="23/11/2020" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayForumComment published_date="23/11/2020" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayForumComment published_date="23/11/2020" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
            <displayForumComment published_date="23/11/2020" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae v" />
          </div>
        </article>
        
        <article>
          <displayForum published_date="20/11/2020" user_pic_url="user-icon.png" firstname="Alexandre" lastname="Pqn" text="tUtque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus sollicite, quos insignes faciunt virgae dexteris aptatae velut tessera data castrensi iuxta vehiculi frontem omne textrinum incedit: huic atratum coquinae iungitur ministerium, dein totum promiscue servitium cum otiosis plebe" />
        </article>
      </div>
    </div>
    <div class="home__nav-container">
      <div class="nav">
          <img src="../assets/icon.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import displayForum from "@/components/displayForum.vue"
import displayForumComment from "@/components/displayForumComment.vue"

  export default {
    name: "Home",

    components: {
      displayForum,
      displayForumComment
    }
  }
</script>

<style lang="scss">
  .home {
    display: flex;

    p {
      overflow-wrap: break-word;
    }

    &__trends-container {
      width: 320px;
    }
    .trends {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 320px;
      height: 100vh;
      background-color: rgb(243, 243, 243);
    }

    &__forums {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgb(248, 248, 248);
      width: 100%;

      &__header {
        display: flex;
        align-items: flex-end;
        position: fixed;
        background-color: rgb(248, 248, 248);
        width: 50%;
        height: 7%;
        border-bottom: 1px solid rgb(189, 189, 189);
        padding-bottom: 10px;

        & img {
          width: 255px;
        }
      }

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

    &__nav-container {
      width: 130px;
      margin-right: 23px;
    }
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
  }
</style>