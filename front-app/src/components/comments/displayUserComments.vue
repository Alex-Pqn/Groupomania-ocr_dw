<template>
  <!-- user-comments -->
  <div class="user-comments user-comments--style">
    <!-- icon -->
    <div class="user-comments__icon">
      <img :src="pic_url" alt="" />
    </div>
    <!-- main -->
    <div class="user-comments__main">
      <div class="user-comments__main__author">
        <p>
          <strong> {{ firstname }} {{ lastname }} </strong>
        </p>
      </div>
      <div class="user-comments__main__text">
        <p>
          {{ text }}
        </p>
      </div>
      <div class="user-comments__main__date">
        <p>
          {{ published_date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "displayUserComments",
  props: {
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
    }
  }
};
</script>

<style lang="scss">
// user-comments
.user-comments {
  display: flex;
  flex-direction: row;
  padding: 20px 20px;
  &--style {
    font-size: 0.98em;
    background-color: rgb(243, 243, 243);
    border-top: 1px solid rgba(109, 109, 109, 0.2);
    border-bottom-right-radius: 0.3em;
    border-bottom-left-radius: 0.3em;
  }
  // icon
  &__icon {
    width: 7.8%;
    text-align: left;
    img {
      width: 67%;
      @include profile-pic;
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    width: 93.2%;
    &__author {
      display: flex;
      margin-bottom: 3px;
    }
    &__text {
      text-align: left;
      line-height: 27px;
    }
    &__date {
      margin-top: 7px;
      text-align: left;
      font-size: 0.9em;
      opacity: 0.92;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .user-comments {
    &__icon {
      width: 10%;
      img {
        width: 75%;
        min-width: 30px;
      }
    }
    &__main {
      width: 90%;
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .user-comments {
    &--style {
      font-size: 1.05em;
    }
    &__icon {
      width: 11.5%;
      img {
        width: 75%;
      }
    }
    &__main {
      width: 87.5%;
    }
  }
}
@media screen and (max-width: 479px) {
  .user-comments {
    &__icon {
      width: 15%;
      img {
        width: 75%;
        min-width: 25px;
      }
    }
    &__main {
      width: 85%;
      font-size: 1.1em;
    }
  }
}
</style>
