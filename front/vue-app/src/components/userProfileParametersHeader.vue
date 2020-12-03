<template>
<header class="user-header user-header--style">
  <a href="#top">
    <img :src="getImgUrl(pic_url)" alt="">
  </a>
  <h3>
    {{ firstname }} {{ lastname }}
  </h3>
</header>
</template>

<script>
export default {
  name: "userProfileParametersHeader",
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
  },
  methods: {
    getImgUrl(img) {
      if (img !== "") {
        return require(`../assets/`+img)
      }
    },
  }
}
</script>

<style lang="scss">
// header
.user-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding-bottom: 15px;
  padding-top: 15px;
  margin-bottom: 15px;
  width: 50%;
  &--style {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: $default_background;
  }
  img {
    width: 60px;
    @include profile-pic;
  }
  h3 {
    margin-top: 9px;
    font-size: 1.4em;
  }
}
</style>