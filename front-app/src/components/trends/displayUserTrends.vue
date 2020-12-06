<template>
<main>
  <!-- user-trends -->
  <div class="user-trends user-trends--style">
    <!-- icon -->
    <div class="user-trends__icon">
      <img :src="getImgUrl(pic_url)" alt="">
    </div>
    <!-- main -->
    <div class="user-trends__main">
      <!-- top -->
      <div class="user-trends__main__top">
        <div class="user-trends__main__top__author">
          <p>
            <strong>
                {{ firstname }} {{ lastname }}
            </strong>
          </p>
        </div>
        <div class="user-trends__main__top__date">
          <p>
            {{ published_date }}
          </p>
        </div>
      </div>
      <!-- bottom -->
      <div class="user-trends__main__bottom">
        <p>
            {{ text }}
        </p>
      </div>

    </div>
  </div>
</main>
</template>

<script>
import { getImgUrl } from '@/utils/scripts';

export default {
  name: "displayUserTrends",
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
    image_url: {
      type: String
    }
  },
  methods: {
    getImgUrl
  },
};
</script>

<style lang="scss">
// user-trends
.user-trends {
  display: flex;
  &--style {
    font-size: .9em;
    border-top-left-radius: .3em;
  }

  // icon
  &__icon {
    display: flex;
    width: 15%;
    height: 10%;
    img {
      width: 30px;
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
    // bottom
    &__bottom {
      text-align: left;
      line-height: 23px;
      margin-bottom: 13px;
    }
  }
}
</style>