<template>
<!-- create forum -->
<article class="create-forum">
    <div class="create-forum__content">
      <textarea maxlength="320" placeholder="Quoi de neuf aujourd'hui ?" id="create-forum_text"></textarea>
      <label for="create-forum_upload-img">
        <img src="@/assets/cloud-upload-alt-solid.svg" alt="">
      </label>
      <input @change="forumCreateImgChange($event)" id="create-forum_upload-img" type="file" accept="image/*">
      <button v-on:click="forumCreateSend">
        <img src="@/assets/paper-plane-solid.svg" alt="">
      </button>
    </div>
    <div id="create-forum_img" class="create-forum__img-output">
      <img id="create-forum_img-output" src="" alt="">
      <div>
        <img v-on:click="forumCreateImgClose" src="@/assets/times-solid.svg" alt="">
      </div>
    </div>
</article>
</template>

<script>
export default {
  name: "userCreateForum",
  props: {

  },
  methods: {
    forumCreateImgChange (event) {
      let reader = new FileReader()
      reader.onload = function () {
        document.getElementById('create-forum_img-output').src = reader.result
        document.getElementById('create-forum_img').style.display = "flex"
      }
      reader.readAsDataURL(event.target.files[0])
    },
    forumCreateImgClose () {
      document.getElementById('create-forum_img').style.display = "none"
      document.getElementById('create-forum_upload-img').value = ""
      document.getElementById('create-forum_img-output').src = ""
    },
    forumCreateSend () {

    }
  }
};
</script>

<style lang="scss">
.create-forum {
  width: 100%;
  &__content {
    display: flex;
    textarea {
      resize: none;
      padding: 7px;
      height: 70px;
      font-size: 1.25em;
      width: 100%;
      border: 1px solid $smooth_black-border;
    }
    button {
      width: 10%;
      border: 1px solid $default_smooth-border;
      background-color:rgb(235, 235, 235);
      cursor: pointer;
      img {
        margin-top: 2px;
        width: 27px;
        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)
      }
      &:hover {
        background-color:rgb(238, 238, 238);
      }
    }
    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 8%;
      border: 1px solid $default_smooth-border;
      background-color:rgb(231, 231, 231);
      img {
        width: 30px;
        filter: invert(0.3) sepia(5) saturate(10) hue-rotate(175deg)
      }
      &:hover {
        background-color:rgb(224, 224, 224);
      }
    }
    input {
      opacity: 0;
      position: absolute;
    }
  }
  &__img-output {
    display: none;
    text-align: left;
    div {
      display: flex;
      align-items: flex-start;
      padding: 1px 1.5px;
      margin-top: 7px;
      margin-left: -24px;
      img {
        cursor: pointer;
        width: 10px;
        padding: 2.5px 4px;
        border-radius: .2em;
        background-color: rgba(255, 255, 255, 0.8);
        &:hover {
          transform: scale(.97);
          opacity: .8;
        }
      }
    }
    #create-forum_img-output {
      max-width: 520px;
      max-height: 300px;
      margin-top: 3px;
      padding: 1px;
      border: 1px solid $default_smooth-border;
    }
  }
}
</style>