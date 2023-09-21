<template>
  <!-- connection header -->
  <div class="connection__header">
    <img src="@/assets/icon-left-font-monochrome-black.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'connection',
};
</script>

<style lang="scss">
//connection styles
.connection {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  * {
    outline: none;
  }

  //connection header styles
  &__header {
    display: flex;
    margin-top: -80px;
    margin-bottom: 30px;
    img {
      width: 500px;
    }
  }
}
@media screen and (max-width: 600px) {
  .connection {
    &__header {
      margin-top: 1px;
      margin-bottom: 25px;
      img {
        width: 280px;
      }
    }
  }
}

//authentication styles
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  padding: 15px 25px 20px 25px;
  &--style {
    border-radius: 1em 0.4em 1.2em 0;
    background-color: rgb(247, 247, 247);
    border: 1px solid rgb(211, 211, 211);
  }

  //authentication header styles
  &__header {
    margin: 10px 0 13px 0;
    h3 {
      font-size: 1.83em;
      margin-bottom: 10px;
      padding-bottom: 11px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.18);
    }
    p {
      opacity: 0.85;
      font-size: 1.08em;
      line-height: 30px;
      text-align: left;
    }
  }

  //authentication form styles
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      font-size: 1em;
      padding: 7px;
    }
    div {
      position: relative;
      input[type='text'],
      input[type='email'],
      input[type='password'] {
        border: 1px solid rgba(143, 143, 143, 0.5);
        background-color: #f3f2f2;
        margin-bottom: 11px;
        &:hover {
          border: 1px solid rgb(131, 131, 131);
        }
        &:focus {
          background-color: #f7f7f7;
          border: none;
        }
      }
      input[name='email'] {
        padding-left: 69px;
        width: 261px;
      }
      input[name='password'] {
        padding-left: 120px;
        width: 210px;
      }
      label[for='password'],
      label[for='email'] {
        position: absolute;
        left: 10px;
        top: 8px;
      }
      p {
        display: none;
        text-align: left;
        margin-top: -6px;
        margin-bottom: 12px;
        font-size: 0.955em;
        color: #b40000;
        padding-left: 2px;
      }
    }
    input[type='submit'] {
      transition-property: all;
      transition-duration: 500ms;
      border: 1px solid rgba(143, 143, 143, 0.75);
      background-color: #ececec;
      padding: 7px;
      font-size: 1em;
      margin-top: 5px;
      width: 50%;
      &:hover {
        border-top-left-radius: 0.6em;
        border-bottom-right-radius: 0.4em;
        background-color: #dfdfdf;
        border: 1px solid rgb(128, 128, 128);
      }
    }
    #submit-info {
      display: none;
      text-align: center;
      margin-top: 12px;
    }
  }
  //authentication no-account styles
  &__no-account {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    hr {
      width: 50%;
      margin-bottom: 15px;
      border-top: 1px solid $medium_black-border;
    }
    p {
      font-size: 1.08em;
      line-height: 27px;
      a {
        text-decoration: none;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .auth {
    width: 250px;
    &__header {
      h3 {
        font-size: 1.6em;
      }
      p {
        font-size: 1em;
        line-height: 28px;
      }
    }
    &__form {
      input {
        font-size: 1em;
      }
      div {
        input[type='text'],
        input[type='email'],
        input[type='password'] {
          margin-bottom: 9px;
        }
        input[name='email'] {
          width: 201px;
        }
        input[name='password'] {
          width: 150px;
        }
      }
    }
  }
}
</style>
