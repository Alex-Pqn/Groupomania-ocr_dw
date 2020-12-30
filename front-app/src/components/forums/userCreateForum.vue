<template>
  <!-- create forum -->
  <article class="create-forum">
    <!-- content -->
    <div class="create-forum__content">
      <textarea
        maxlength="320"
        placeholder="Quoi de neuf aujourd'hui ?"
        id="create-forum_text"
      ></textarea>
      <label for="create-forum_upload-img">
        <img src="@/assets/cloud-upload-alt-solid.svg" alt="" />
      </label>
      <input
        @change="forumCreateImgChange($event)"
        id="create-forum_upload-img"
        type="file"
        accept="image/*"
        name="image"
      />
      <button v-on:click="forumCreateSend">
        <img src="@/assets/paper-plane-solid.svg" alt="" />
      </button>
    </div>
    <!-- img output -->
    <div id="create-forum_img" class="create-forum__img-output">
      <img id="create-forum_img-output" src="" alt="" />
      <div>
        <img
          v-on:click="forumCreateImgClose"
          src="@/assets/times-solid.svg"
          alt=""
        />
      </div>
    </div>
  </article>
</template>

<script>
import { api, apiCallback } from "@/utils/scripts";
const status = require("../../utils/status_config");

export default {
  name: "userCreateForum",
  props: {},
  methods: {
    forumCreateImgChange(event) {
      let reader = new FileReader();
      reader.onload = function() {
        document.getElementById("create-forum_img-output").src = reader.result;
        document.getElementById("create-forum_img").style.display = "flex";
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    forumCreateImgClose() {
      document.getElementById("create-forum_img").style.display = "none";
      document.getElementById("create-forum_upload-img").value = "";
      document.getElementById("create-forum_img-output").src = "";
    },
    forumCreateSend() {
      // create formdata
      let formData = new FormData();
      
      // attach image
      let inputImage = document.querySelector("input[type=file]").files[0];
      if (inputImage) {
        formData.append("image", inputImage, inputImage.name);
      }

      let forumTextOutput = document.getElementById("create-forum_text").value;
      let forum = {
        text: forumTextOutput
      };
      formData.append("forum", JSON.stringify(forum));

      // api request
      api("api/forums/create", "POST", formData);
      
      // callback api request
      setTimeout(() => {
        let response = apiCallback().apiResponse
        let readyState = apiCallback().apiReadyState
        let httpStatus = apiCallback().apiHttpStatus

        // DONE & OK
        if (
          readyState === status.readystate.DONE &&
          httpStatus === status.http.OK
        ) {
          console.log(response);
          // ERRORS HANDLER
        } else if (
          httpStatus === status.http.UNAUTHORIZED ||
          httpStatus === status.http.INTERNAL_SERVER_ERROR ||
          httpStatus === status.http.BAD_REQUEST
        ) {
        // displaySubmitInfoError(response.sub_error)
        if (response.err) {
          console.error(
            `HTTP Status: ${httpStatus} ; ReadyState Status: ${readyState} | Error: ${response
              .err.sqlMessage || response.err.message} ; Code: ${
              response.err.code
            } : ${response.err.errno} ; fatal?${
              response.err.fatal
            } ; SQLState: ${response.err.sqlState}`
          );
        } else {
            console.error(
              `HTTP Status: ${httpStatus} ; ReadyState Status: ${readyState}`
            );
          }
        }
      }, 50);
    }
  }
};
</script>

<style lang="scss">
// createforum
.create-forum {
  width: 100%;
  // content
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
      background-color: rgb(235, 235, 235);
      cursor: pointer;
      img {
        margin-top: 2px;
        width: 27px;
        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
      }
      &:hover {
        background-color: rgb(238, 238, 238);
      }
    }
    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 8%;
      border: 1px solid $default_smooth-border;
      background-color: rgb(231, 231, 231);
      img {
        width: 30px;
        filter: invert(0.3) sepia(5) saturate(10) hue-rotate(175deg);
      }
      &:hover {
        background-color: rgb(224, 224, 224);
      }
    }
    input {
      opacity: 0;
      position: absolute;
    }
  }
  // img output
  &__img-output {
    display: none;
    text-align: left;
    div {
      display: flex;
      align-items: flex-start;
      padding: 1px 1.5px;
      margin-top: 7.5px;
      margin-left: -26px;
      img {
        cursor: pointer;
        width: 10px;
        padding: 2.5px 4px;
        border-radius: 0.2em;
        background-color: rgba(255, 255, 255, 0.8);
        &:hover {
          transform: scale(0.97);
          opacity: 0.8;
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

@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .create-forum {
    &__content {
      textarea {
        font-size: 1.15em;
      }
      button {
        width: 14%;
        img {
          width: 24px;
        }
      }
      label {
        width: 12%;
        img {
          width: 25px;
        }
      }
    }
    &__img-output {
      div {
        margin-top: 9px;
        margin-left: -26px;
      }
    }
  }
}
@media screen and (min-width: 1600px) and (max-width: 1919px) {
  .create-forum {
    &__img-output {
      #create-forum_img-output {
        max-width: 500px;
        max-height: 500px;
      }
    }
  }
}
@media screen and (min-width: 1400px) and (max-width: 1600px) {
  .create-forum {
    &__img-output {
      #create-forum_img-output {
        max-width: 550px;
        max-height: 550px;
      }
    }
  }
}
@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .create-forum {
    &__img-output {
      #create-forum_img-output {
        max-width: 470px;
        max-height: 350px;
      }
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1200px) {
  .create-forum {
    &__content {
      textarea {
        font-size: 1.25em;
      }
    }
    &__img-output {
      #create-forum_img-output {
        max-width: 370px;
        max-height: 370px;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .create-forum {
    &__content {
      textarea {
        font-size: 1.1em;
      }
      button {
        width: 14%;
        img {
          width: 24px;
        }
      }
      label {
        width: 12%;
        img {
          width: 25px;
        }
      }
    }
    &__img-output {
      div {
        margin-top: 9px;
        margin-left: -26px;
      }
      #create-forum_img-output {
        max-width: 381px;
        max-height: 381px;
        margin-top: 4px;
      }
    }
  }
}
@media screen and (max-width: 479px) {
  .create-forum {
    &__content {
      textarea {
        font-size: 1.2em;
      }
      button {
        width: 18%;
        img {
          width: 25px;
        }
      }
      label {
        width: 16%;
        img {
          width: 27px;
        }
      }
    }
    &__img-output {
      div {
        margin-top: 13px;
        margin-left: -27px;
      }
      #create-forum_img-output {
        max-width: 290px;
        max-height: 290px;
        margin-top: 6px;
      }
    }
  }
}
</style>
