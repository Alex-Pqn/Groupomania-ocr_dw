<template>
  <main>
    <!-- user-trends -->
    <div class="user-trends user-trends--style">
      <!-- icon -->
      <div class="user-trends__icon">
        <img :src="pic_url" alt="" />
      </div>
      <!-- main -->
      <div class="user-trends__main">
        <!-- top -->
        <div class="user-trends__main__top">
          <div class="user-trends__main__top__author">
            <p>
              <strong> {{ firstname }} {{ lastname }} </strong>
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
    }
  }
};
</script>

<style lang="scss">
// user-trends
.user-trends {
  display: flex;
  &--style {
    font-size: 0.95em;
    border-top-left-radius: 0.3em;
  }

  // icon
  &__icon {
    text-align: left;
    width: 10%;
    img {
      width: 33px;
      @include profile-pic;
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    width: 90%;
    padding-left: 15px;
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
    // bottom
    &__bottom {
      text-align: left;
      line-height: 23px;
      margin-bottom: 13px;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .user-trends {
    &--style {
      font-size: 0.9em;
    }
    &__icon {
      img {
        width: 28px;
      }
    }
    &__main {
      &__top {
        margin-bottom: 2px;
        &__date {
          font-size: 0.85em;
        }
      }
      &__bottom {
        line-height: 22px;
        margin-bottom: 10px;
      }
    }
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  .user-trends {
    &--style {
      font-size: 1em;
    }
    &__icon {
      width: 12%;
      img {
        width: 38px;
      }
    }
    &__main {
      width: 88%;
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .user-trends {
    &--style {
      font-size: 1.1em;
    }
  }
}
@media screen and (max-width: 1023px) {
  .user-trends {
    &__main {
      padding-left: 3px;
      &__top {
        margin-bottom: 2px;
        &__date {
          font-size: 0.85em;
        }
      }
      &__bottom {
        line-height: 27px;
        margin-bottom: 10px;
      }
    }
  }
}
@media screen and (max-width: 479px) {
  .user-trends {
    &--style {
      font-size: 1.1em;
    }
    &__icon {
      width: 16%;
    }
    &__main {
      width: 84%;
    }
  }
}
</style>
