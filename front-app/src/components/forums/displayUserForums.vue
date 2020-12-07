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
  <!-- create-comment container -->
  <div class="create-comment-display" :id="id">
     <!-- create-comment -->
    <div class="create-comment create-comment--style">
      <!-- text -->
      <div class="create-comment__text">
        <textarea maxlength="255" placeholder="Écrivez votre réponse ici..." id="create-comment_text"></textarea>
      </div>
      <!-- send -->
      <div class="create-comment__send">
        <button>
          <img src="@/assets/paper-plane-solid.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import { getImgUrl } from '@/utils/scripts';

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
    getImgUrl,
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
    width: 10%;
    text-align: left;
    img {
      width: 47px;
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
      img {
        display: table-row;
        max-width: 350px;
        max-height: 350px;
        border: 1px solid $small_black-border;
      }
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .user-forums {
    &__icon {
      width: 12%;
      img {
        width: 75%;
        min-width: 40px;
      }
    }
    &__main {
      width: 88%;
    }
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  .user-forums {
    &__icon {
      width: 10%;
      text-align: center;
      img {
        width: 75%;
        min-width: 45px;
      }
    }
    &__main {
      padding-left: 12px;
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .user-forums {
    &__icon {
      width: 12%;
      text-align: center;
      img {
        width: 75%;
        min-width: 45px;
      }
    }
    &__main {
      width: 88%;
      padding-left: 12px;
      font-size: 1.1em;
      &__bottom {
        img {
          max-width: 340px;
          max-height: 340px;
        }
      }
    }
  }
}
@media screen and (max-width: 479px) {
  .user-forums {
    &__icon {
      width: 13%;
      text-align: center;
      img {
        width: 75%;
        min-width: 35px;
      }
    }
    &__main {
      width: 87%;
      padding-left: 12px;
      font-size: 1.1em;
      &__bottom {
        img {
          max-width: 220px;
          max-height: 220px;
        }
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
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .user-interacts {
    padding: 9px;
    &__left {
      button {
        font-size: .93em;
        margin-left: 7px;
      }
    }
    &__right {
      p {
        font-size: .93em;
        margin-right: 10px;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .user-interacts {
    &__left {
      button {
        font-size: .94em;
        margin-left: 3px;
      }
    }
    &__right {
      p {
        font-size: 1em;
        margin-right: 5px;
      }
    }
  }
}
@media screen and (max-width: 479px) {
  .user-interacts {
    &__left {
      button {
        font-size: 1.05em;
        margin-left: 0px;
      }
    }
    &__right {
      p {
        font-size: 1.05em;
        margin-right: 0px;
      }
    }
  }
}

// create-comment container
.create-comment-display {
  display: none;
}
// create-comment
.create-comment {
  padding: 15px;
  display: flex;
  &--style {
    border-bottom: 1px solid rgba(109, 109, 109, 0.2);
  }
  // text
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
  // send
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
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .create-comment {
    padding: 13px;
    &__text {
      textarea {
        padding: 6px;
        height: 60px;
        font-size: 1.1em;
      }
    }
    &__send {
      width: 13%;
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .create-comment {
    padding: 10px 0;
    &__text {
      textarea {
        height: 55px;
      }
    }
    &__send {
      width: 13%;
    }
  }
}
@media screen and (max-width: 479px) {
  .create-comment {
    padding: 10px 0;
    &__text {
      textarea {
        height: 70px;
        font-size: 1.1em;
      }
    }
    &__send {
      width: 17%;
    }
  }
}
</style>