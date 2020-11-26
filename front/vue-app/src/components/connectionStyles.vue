<style lang="scss">
  .connection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    * {
      outline: none;
    }

    &__header {
      display: flex;
      margin-top: -80px;
      margin-bottom: 30px;
      img {
        width: 500px;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 330px;
      padding: 15px 25px 20px 25px;
      border-radius: 1em .4em 1.2em 0;
      background-color: rgb(247, 247, 247);
      border: 1px solid rgb(211, 211, 211);

      &__header {
        color: black;
        margin: 10px 0 13px 0;
        h3 {
          font-size: 1.83em;
          margin-bottom: 10px;
          padding-bottom: 11px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.18);
        }
        p {
          opacity: .85;
          font-size: 1.08em;
          line-height: 30px;
          text-align: left;
        }
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        input {
            font-size: 1em;
            padding: 7px;
        }

        div {
          position: relative;
          input[type="text"], input[type="email"], input[type="password"] {
            transition-property: all;
            transition-duration: 500ms;
            border: 1px solid rgba(143, 143, 143, 0.5);
            background-color: rgb(243, 242, 242);
            margin-bottom: 11px;
            &:hover {
              background-color: rgb(248, 248, 248);
              border: 1px solid rgb(131, 131, 131);
            }
            &:focus {
              background-color: rgb(247, 247, 247);
              border: none;
            }
          }
          input[name="email"] {
            padding-left: 69px;
            width: 261px;
          }
          input[name="password"] {
            padding-left: 120px;
            width: 210px;
          }
          label[for="password"], label[for="email"] {
            position: absolute;
            left: 10px;
            top: 8px;
          }
        }
        input[type="submit"]{
          transition-property: all;
          transition-duration: 500ms;
          border: 1px solid rgba(143, 143, 143, 0.75);
          background-color: rgb(236, 236, 236);
          padding: 7px;
          font-size: 1em;
          margin-top: 5px;
          width: 50%;
          &:hover {
            border-top-left-radius: .6em;
            border-bottom-right-radius: .4em;
            background-color: rgb(223, 223, 223);
            border: 1px solid rgb(128, 128, 128);
          }
        }
      }

      &__no-account {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        
        hr {
          width: 50%;
          margin-bottom: 15px;
          border-top: 1px solid rgba(0, 0, 0, 0.5);
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
  }
</style>

<script>
  export default {
    name: "connectionStyles",
  };
</script>