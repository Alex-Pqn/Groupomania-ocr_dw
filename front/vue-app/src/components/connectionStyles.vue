<script>
export default {
  name: "connectionStyles",
};
</script>

<style lang="scss">
  .connection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100vh;
    background: rgb(221, 221, 221);

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
      background-color: rgb(212, 212, 212);
      border: 1px solid rgb(185, 185, 185);

      &__header {
        color: black;
        margin: 10px 0 13px 0;
        h3 {
          font-size: 1.9em;
          margin-bottom: 10px;
          padding-bottom: 11px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.18);
        }
        p {
          opacity: .9;
          font-size: 1.1em;
          line-height: 32px;
          text-align: left;
        }
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: center;

        div {
          position: relative;
          input {
            font-size: 1em;
            padding: 7px;
            margin-bottom: 11px;
            border: 1px solid rgb(143, 143, 143);
            background-color: rgb(224, 224, 224);
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
          padding: 7px;
          font-size: 1em;
          margin-top: 5px;
          width: 50%;
        }
      }

      &__no-account {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15px;
        
        hr {
          width: 70%;
          margin-bottom: 15px;
          border-top: 1px solid rgba(0, 0, 0, 0.75);
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