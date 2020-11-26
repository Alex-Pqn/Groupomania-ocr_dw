<template>
  <div class="main">
    <div class="forum">
      <div class="forum__user-icon">
        <img :src="require(`../assets/` + user_pic_url)" alt="">
      </div>
      <div class="forum__content">
        <div class="forum__content__infos">
          <div class="forum__content__infos__author">
            <p>
              <strong>
                  {{ firstname }} {{ lastname }}
              </strong>
            </p>
          </div>
          <div class="forum__content__infos__date">
            <p>
              {{ published_date }}
            </p>
          </div>
        </div>
        <div class="forum__content__text">
          <p>
              {{ text }}
          </p>
        </div>
        <div class="forum__content__img">
          <img :src="require(`../assets/` + image_url)" alt="">
        </div>
      </div>
    </div>
    <div class="interactions">
      <class class="interactions__left">
        <button id="forum-comment">
            Commenter
        </button>
      </class>
      <div class="interactions__right">
        <p>
          {{ total_comments }} commentaires
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "displayForum",
    props: {
        user_pic_url: {
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
          type: String,
          required: false
        }
    }
  };
</script>

<style lang="scss">
.forum {
  display: flex;
  flex-direction: row;
  max-height: 1000px;
  font-size: 1.1em;
  padding: 17px 20px 10px;
  border: 1px solid rgb(189, 189, 189);
  background-color: rgb(252, 252, 252);
  border-top-left-radius: .3em;
  &__user-icon {
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
  &__content {
    display: flex;
    flex-direction: column;
    width: 90%;
  &__infos {
    display: flex;
    margin-bottom: 5px;
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
    &__text {
      text-align: left;
      line-height: 27px;
    }
    &__img {
      text-align: left;
      margin-top: 10px;
      & img {
        max-width: 350px;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.interactions {
  display: flex;
  background-color: rgb(235, 235, 235);
  padding: 10px 0;

  &__left {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    & button {
      font-size: .93em;
      padding: 5px;
      margin-left: 15px;
    }
  }
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