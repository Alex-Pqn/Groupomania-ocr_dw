<template>
  <div>
    <!-- user-forums -->
    <div class="user-forums user-forums--style">
      <!-- icon -->
      <div class="user-forums__icon">
        <img :src="pic_url" alt="" />
      </div>
      <!-- main -->
      <div class="user-forums__main">
        <!-- top -->
        <div class="user-forums__main__top">
          <div class="user-forums__main__top__author">
            <p>
              <strong> {{ firstname }} {{ lastname }} </strong>
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
          <img :src="image_url" alt="" />
        </div>
      </div>
    </div>

    <!-- user-interacts -->
    <div class="user-interacts user-interacts--style">
      <!-- left -->
      <div class="user-interacts__left">
        <button v-on:click="displayCommentContainer(id, user_id)">
          Commenter
        </button>
      </div>
      <!-- right -->
      <div :id="'post=' + id + user_id" class="user-interacts__right">
        <p>
          <a :href="'#post=' + id + user_id"> {{ total_comments }} commentaires </a>
        </p>
      </div>
    </div>
    <!-- create-comment container -->
    <div class="create-comment-display" :id="'create-comment_container-' + id + user_id">
      <!-- create-comment -->
      <div class="create-comment create-comment--style">
        <!-- text -->
        <div class="create-comment__text">
          <textarea
            maxlength="320"
            placeholder="Écrivez votre réponse ici..."
            :id="'create-comment_text-' + id + user_id"
          ></textarea>
        </div>
        <!-- send -->
        <div class="create-comment__send">
          <button v-on:click="createComment(id, user_id)">
            <img src="@/assets/paper-plane-solid.svg" alt="" />
          </button>
        </div>
      </div>
      <div>
      <!-- error-handler -->
      <div class="create-comment__error-handler" :id="'create-comment_error-handler-'+ id + user_id">
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/utils/scripts";

export default {
  name: "displayUserForums",
  props: {
    id: {
      type: Number,
      required: true
    },
    user_id: {
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
    displayCommentContainer(forum_id, user_id) {
      let commentContainer = document.getElementById("create-comment_container-" + forum_id + user_id);

      if (commentContainer.style.display == "initial") {
        commentContainer.style.display = "none";
      } else {
        commentContainer.style.display = "initial";
      }
    },
    createComment (forum_id, user_id) {
      const vm = this
      let commentTextOutput = document.getElementById("create-comment_text-" + forum_id + user_id).value;
      
      // comment validation
      const commentValidation = {
        minLength: 2,
        maxLength: 320
      }
      
      if(commentTextOutput.length >= commentValidation.minLength) {
        if(commentTextOutput.length <= commentValidation.maxLength) {
          // if input valid, call api
          vm.createCommentRequest(forum_id, commentTextOutput, user_id)
        }else{
          vm.errorHandler(`Votre message ne peut contenir qu'au maximum ${commentValidation.maxLength} caractères.`, forum_id, user_id)
        }
      }else{
        vm.errorHandler(`Votre message doit contenir au minimum ${commentValidation.minLength} caractère.`, forum_id, user_id)
      }
    },
    // API REQUEST
    createCommentRequest (forum_id, comment_text, user_id) {
      const vm = this
      
      let comment = [
        {
          forum_id: forum_id,
          text: comment_text
        }
      ]
      
      // XHR ERROR
      function xhrCallbackError (response) {
        vm.errorHandler(response, forum_id, user_id)
        console.error(response)
      }
      
      // API CALLBACK DONE
      function apiCallbackDone () {
        document.location.reload();
      }
      
      // API CALLBACK ERROR
      function apiCallbackError (response, readyState, httpStatus) {
        vm.errorHandler(response.sub_err, forum_id, user_id)
        console.error(response)
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`)
      }
      
      // API CALL
      api("api/comments/create", "POST", comment, apiCallbackDone, apiCallbackError, xhrCallbackError) 
    },
    errorHandler (errValue, forum_id, user_id) {
      const errorContainer = document.getElementById('create-comment_error-handler-' + forum_id + user_id)
      
      errorContainer.style.display = "none"
      setTimeout(() => {
        errorContainer.textContent = errValue
        errorContainer.style.display = "flex"
      }, 150);
    }
  }
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
    border-top-left-radius: 0.3em;
  }
  // icon
  &__icon {
    width: 8.5%;
    text-align: left;
    img {
      margin-left: 3px;
      width: 47px;
      @include profile-pic;
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    width: 91.5%;
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
        font-size: 0.88em;
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
        border: 1px solid $smooth_black-border;
        padding: 1px;
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
      font-size: 0.93em;
      padding: 5px;
      margin-left: 10px;
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
        font-size: 0.93em;
        margin-left: 7px;
      }
    }
    &__right {
      p {
        font-size: 0.93em;
        margin-right: 10px;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .user-interacts {
    &__left {
      button {
        font-size: 0.94em;
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
  // error-handler
  &__error-handler{
    display: none;
    text-align: left;
    color: rgb(204, 0, 0);
    background-color: rgba(255, 118, 118, 0.12);
    margin: 5px 0;
    padding: 3px 5px 3px 6px;
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
        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
      }
      &:hover {
        background-color: rgb(235, 235, 235);
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
