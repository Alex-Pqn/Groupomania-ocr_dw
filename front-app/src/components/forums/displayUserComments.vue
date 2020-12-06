<template>
  <!-- user-comments -->
  <div class="user-comments user-comments--style">
    <!-- icon -->
    <div class="user-comments__icon">
      <img :src="getImgUrl(pic_url)" alt="">
    </div>
    <!-- main -->
    <div class="user-comments__main">
      <div class="user-comments__main__author">
        <p>
          <strong>
              {{ firstname }} {{ lastname }}
          </strong>
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
import { getImgUrl } from '@/utils/scripts';

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
    },
  },
  methods: {
    getImgUrl
  },
};
</script>

<style lang="scss">
// user-comments
.user-comments {
  display: flex;
  flex-direction: row;
  padding: 20px 20px;
  &--style {
    font-size: .98em;
    background-color: rgb(243, 243, 243);
    border-top: 1px solid rgba(109, 109, 109, 0.2);
    border-bottom-right-radius: .3em;
    border-bottom-left-radius: .3em;
  }

  // icon
  &__icon {
    display: flex;
    width: 8.5%;
    height: 10%;
    img {
      width: 38px;
      @include profile-pic;
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    width: 91%;
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
      font-size: .9em;
      opacity: .92;
    }
  }
}
</style>