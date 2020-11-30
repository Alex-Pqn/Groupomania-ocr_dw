<template>
  <main>
      <!-- user-forum -->
      <div class="user-forum user-forum--style">
        <!-- icon -->
        <div class="user-forum__icon">
          <img :src="require(`../../assets/` + pic_url)" alt="">
        </div>
        <!-- main -->
        <div class="user-forum__main">
          <!-- top -->
          <div class="user-forum__main__top">
            <div class="user-forum__main__top__author">
              <p>
                <strong>
                    {{ firstname }} {{ lastname }}
                </strong>
              </p>
            </div>
            <div class="user-forum__main__top__date">
              <p>
                {{ published_date }}
              </p>
            </div>
          </div>
          <!-- middle -->
          <div class="user-forum__main__middle">
            <p>
                {{ text }}
            </p>
          </div>
          <!-- bottom -->
          <div id="user-forum_bottom_image" class="user-forum__main__bottom">
          </div>
        </div>
      </div>
      
      <!-- user-interacts -->
      <div class="user-interacts user-interacts--style">
        <!-- left -->
        <div class="user-interacts__left">
          <button id="user-interact_comment">
              Commenter
          </button>
        </div>
        <!-- right -->
        <div class="user-interacts__right">
          <p>
            {{ total_comments }} commentaires
          </p>
        </div>
      </div>

  </main>
</template>

<script>
  export default {
    name: "displayUserForum",
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
      total_comments: {
        type: Number,
        required: true
      },
      image_url: {
        type: String
      }
    },
  };
</script>

<style lang="scss">
// user-forum
.user-forum {
  display: flex;
  padding: 17px 20px 10px 13px;
  &--style {
    font-size: 1.1em;
    border: 1px solid rgb(189, 189, 189);
    background-color: rgb(245, 245, 245);
    border-top-left-radius: .3em;
  }

  // icon
  &__icon {
    display: flex;
    width: 11%;
    height: 10%;
    img {
      width: 50px;
      border-bottom-left-radius: 9999px;
      border-bottom-right-radius: 9999px;
      border-top-left-radius: 9999px;
      border-top-right-radius: 9999px;
      border: 2px solid black;
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
      & img {
        max-width: 350px;
        border: 1px solid rgba(0, 0, 0, 0.1);
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
    #user-interact_comment {
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
    & p {
      margin-right: 15px;
    }
  }
}
</style>