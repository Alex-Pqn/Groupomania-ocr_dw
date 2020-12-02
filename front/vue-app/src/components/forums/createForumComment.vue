<template>
  <div id="app">
    <!-- create-comment -->
    <div class="create-comment_display" :id="id">
      <div class="create-comment create-comment--style">
        <div class="create-comment__text">
          <textarea maxlength="255" placeholder="Écrivez votre réponse ici..." id="create-comment_text"></textarea>
        </div>
        <div class="create-comment__send">
          <button>
            <img src="../../assets/paper-plane-solid.svg" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "createForumComment",
    props: {
      id: {
        type: Number, 
        required: true
      }
    }
}
</script>

<style lang="scss">
.create-comment_display {
  display: none;
}
.create-comment {
  padding: 15px;
  display: flex;
  &--style {
    border-bottom: 1px solid rgba(109, 109, 109, 0.2);
    background-color:rgb(248, 248, 248);
  }

  &__text {
    display: flex;
    width: 90%;
    textarea {
      resize: none;
      width: 100%;
      padding: 7px;
      height: 70px;
      font-size: 1.1em;
    }
  }
  &__send {
    display: flex;
    width: 10%;
    button {
      width: 100%;
      img {
        width: 30px;
        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)
      }
    }
  }
}
</style>