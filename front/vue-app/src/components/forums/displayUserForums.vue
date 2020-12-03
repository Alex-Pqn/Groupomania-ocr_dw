<template>
<main>
  <!-- user-forums -->
  <div class="user-forums user-forums--style">
    <!-- icon -->
    <div class="user-forums__icon">
      <img :src="getImgUrl(pic_url)" alt="">
    </div>
    <!-- main -->
    <div class="user-forums__main">
      <!-- top -->
      <div class="user-forums__main__top">
        <div class="user-forums__main__top__author">
          <p>
            <strong>
                {{ firstname }} {{ lastname }}
            </strong>
          </p>
        </div>
        <div class="user-forums__main__top__date">
          <p>
            {{ published_date }}
          </p>
        </div>
      </div>
      <!-- middle -->
      <div class="user-forums__main__middle">
        <p>
            {{ text }}
        </p>
      </div>
      <!-- bottom -->
      <div class="user-forums__main__bottom">
        <img :src="getImgUrl(image_url)" alt="">
      </div>
    </div>
  </div>
    
  <!-- user-interacts -->
  <div class="user-interacts user-interacts--style">
    <!-- left -->
    <div class="user-interacts__left">
      <button v-on:click="createForumComment(id)">
          Commenter
      </button>
    </div>
    <!-- right -->
    <div :id="'post=' + id" class="user-interacts__right">
      <p>
        <a :href="'#post=' + id">
          {{ total_comments }} commentaires
        </a>
      </p>
    </div>
  </div>
  <!-- create-comment -->
  <div class="create-comment-display" :id="id">
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
</main>
</template>

<script>
export default {
  name: "displayUserForums",
  props: {
    id: {
      type: Number, 
      required: true
    },
    pic_url: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    published_date: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    total_comments: {
      type: Number,
      required: true
    },
    image_url: {
      type: String
    }
  },
  methods: {
    getImgUrl(img) {
      if (img !== "") {
        return require(`../../assets/`+img)
      }
    },
    createForumComment(id) {
      let displayCommentContainer = document.getElementById(id)

      if (displayCommentContainer.style.display == "initial") {
        displayCommentContainer.style.display = "none"
      } else {
        displayCommentContainer.style.display = "initial"
      }
    }
  },
};
</script>

<style lang="scss">
// user-forums
.user-forums {
  display: flex;
  padding: 17px 20px 10px 13px;
  &--style {
    font-size: 1.1em;
    border: 1px solid $default_smooth-border;
    background-color: rgb(250, 250, 250);
    border-top-left-radius: .3em;
  }

  // icon
  &__icon {
    display: flex;
    width: 11%;
    height: 10%;
    img {
      width: 50px;
      @include profile-pic;
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    width: 90%;
    // top
    &__top {
      display: flex;
      margin-bottom: 3px;
      &__author {
        width: 50%;
        text-align: left;
      }
      &__date {
        width: 50%;
        text-align: right;
        font-size: .88em;
      }
    }
    // middle
    &__middle {
      text-align: left;
      line-height: 27px;
      margin-bottom: 13px;
    }
    // bottom
    &__bottom {
      text-align: left;
      display: table;
      & img {
        display: table-row;
        max-width: 350px;
        max-height: 350px;
        border: 1px solid $small_black-border;
      }
    }
  }
}

// user-interacts
.user-interacts {
  display: flex;
  padding: 11px;
  &--style {
    background-color: rgb(235, 235, 235);
  }
  // left
  &__left {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    button {
      font-size: .93em;
      padding: 5px;
      margin-left: 15px;
    }
  }
  // right
  &__right {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 100px;
    margin-top: -100px;
    p {
      margin-right: 15px;
      a {
        text-decoration: none;
      }
    }
  }
}

// create-comment
.create-comment-display {
  display: none;
}
.create-comment {
  padding: 15px;
  display: flex;
  &--style {
    border-bottom: 1px solid rgba(109, 109, 109, 0.2);
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
      border: 1px solid $smooth_black-border;
    }
  }
  &__send {
    display: flex;
    width: 10%;
    button {
      cursor: pointer;
      width: 100%;
      border: 1px solid $smooth_black-border;
      img {
        width: 30px;
        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)
      }
      &:hover {
        background-color:rgb(235, 235, 235);
      }
    }
  }
}
</style>