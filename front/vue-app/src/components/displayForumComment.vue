<template>
    <div class="comment">
      <div class="comment__user-icon">
        <img :src="require(`../assets/` + user_pic_url)" alt="">
      </div>
      <div class="comment__content">
        <div class="comment__content__author">
          <p>
            <strong>
                {{ firstname }} {{ lastname }}
            </strong>
          </p>
        </div>
        <div class="comment__content__text">
          <p>
            {{ text }}
          </p>
        </div>
        <div class="comment__content__date">
          <p>
            {{ published_date }}
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "displayCommentForum",
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
    }
  };
</script>

<style lang="scss">
.comment {
  display: flex;
  flex-direction: row;
  font-size: .98em;
  padding: 20px 20px;
  background-color: rgb(243, 243, 243);
  border-top: 1px solid rgba(109, 109, 109, 0.2);
  border-bottom-right-radius: .3em;
  border-bottom-left-radius: .3em;

  &__user-icon {
    display: flex;
    width: 8.5%;
    height: 10%;
    img {
      width: 38px;
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
      color: black;
      margin-top: 7px;
      text-align: left;
      font-size: .9em;
      opacity: .92;
    }
  }
}
</style>