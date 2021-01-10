<template>
  <main>
    <!-- moderation panel -->
    <moderationPanel v-if="user.modPanelAccess === true" />
    
    <!-- profile -->
    <div class="profile">
      <!-- displayed beetween 0px > 1023px -->
      <div class="mobile-container">
        <!-- trends -->
        <trends />

        <!-- profile -->
        <div class="user-profile" id="top">
          <!-- header -->
          <profileAndParametersHeader class="user-profile__header" />
          <section class="user-profile__forums">
            <userCreateForum />
            <h3>
              Mon fil de discussion
            </h3>
            <!-- error handler -->
            <div id="error-handler_profile" class="error-handler">
              <h3>
                Erreur
              </h3>
              <p></p>
            </div>
            <!-- forums list -->
            <article v-for="item in forums" :key="item.id">
              <displayUserForums
                :id="item.id"
                :user_id="item.user_id"
                :published_date="item.published_date"
                :pic_url="item.pic_url"
                :image_url="item.image_url"
                :firstname="item.firstname"
                :lastname="item.lastname"
                :text="item.text"
                :total_comments="item.total_comments"
                :mod_panel="false"
              />
              <!-- comments in forum -->
              <div class="comments-list">
                <div v-for="comment in item.comments" :key="comment.id">
                  <displayUserComments
                    :published_date="comment.published_date"
                    :pic_url="comment.pic_url"
                    :firstname="comment.firstname"
                    :lastname="comment.lastname"
                    :text="comment.text"
                    :mod_panel="false"
                  />
                </div>
              </div>
            </article>
          </section>
        </div>

        <!-- main-nav -->
        <mainNav />
      </div>
    </div>
  </main>
</template>

<script>
import displayUserForums from "@/components/forums/displayUserForums.vue";
import displayUserComments from "@/components/comments/displayUserComments.vue";
import userCreateForum from "@/components/forums/userCreateForum.vue";
import trends from "@/components/trends/trends.vue";
import mainNav from "@/components/nav/mainNav.vue";
import profileAndParametersHeader from "@/components/profileAndParameters/header.vue";
import moderationPanel from "@/components/moderation/panel.vue";
import { api, dateFormatting } from "@/utils/scripts";

export default {
  name: "Profile",
  data() {
    return {
      user: {
        modPanelAccess: false
      },
      forums: []
    };
  },
  components: {
    displayUserForums,
    displayUserComments,
    userCreateForum,
    trends,
    mainNav,
    profileAndParametersHeader,
    moderationPanel
  },
  beforeMount: async function() {
    this.getForums();
    this.modPanelAccess();
  },
  methods: {
    // GET FORUMS
    getForums() {
      const vm = this;
      let result;

      // XHR ERROR
      function xhrCallbackError(response) {
        vm.errorHandler(response);
        console.error(response);
      }

      // API CALLBACK ERROR
      function apiCallbackError(response, readyState, httpStatus) {
        vm.errorHandler(response.sub_err);
        console.error(response);
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`);
      }

      // API CALLBACK DONE
      function apiCallbackDone(response) {
        result = response.result;
        let forums_list = [];

        result.forEach(forum => {
          // data formatting
          function formatedDate(date) {
            forum.created_at = date;
          }
          dateFormatting(forum, formatedDate);

          let userForum = {
            id: forum.id,
            user_id: forum.user_id,
            published_date: forum.created_at,
            pic_url: forum.pic_url,
            firstname: forum.firstname,
            lastname: forum.lastname,
            text: forum.text,
            total_comments: 0,
            image_url: forum.image_url,
            comments: []
          };

          // add the forum in forums_list to get comments below
          forums_list.push(forum.id);
          // push the forum in data
          vm.forums.push(userForum);
        });

        // call getComments method with forums list
        if (forums_list.length >= 1) {
          vm.getComments(forums_list);
        }
      }

      // API CALL
      api(
        "api/profile/get",
        "GET",
        undefined,
        apiCallbackDone,
        apiCallbackError,
        xhrCallbackError
      );
    },

    // GET COMMENTS
    getComments(forums_list) {
      const vm = this;

      // XHR ERROR
      function xhrCallbackError(response) {
        console.error(response);
      }

      // API CALLBACK ERROR
      function apiCallbackError(response, readyState, httpStatus) {
        console.error(response);
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`);
      }

      // API CALLBACK DONE
      function apiCallbackDone(response) {
        let comments = response.result;
        let forums = vm.forums;
        let userComment;

        comments.forEach(comment => {
          // data formatting
          function formatedDate(date) {
            comment.created_at = date;
          }
          dateFormatting(comment, formatedDate);

          userComment = {
            pic_url: comment.pic_url,
            firstname: comment.firstname,
            lastname: comment.lastname,
            published_date: comment.created_at,
            text: comment.text
          };

          forums.forEach(forum => {
            if (comment.forum_id == forum.id) {
              // push comment in data
              forum.comments.push(userComment);
            }

            // total comments
            forum.total_comments = forum.comments.length;
          });
        });
      }

      // API CALL
      let data = [forums_list];
      api(
        "api/comments/get",
        "POST",
        data,
        apiCallbackDone,
        apiCallbackError,
        xhrCallbackError
      );
    },
    
    // ERROR HANDLER
    errorHandler(err) {
      const errorContainer = document.getElementById("error-handler_profile");
      document.querySelector("#error-handler_profile p").innerHTML = err;
      errorContainer.style.display = "block";
    },
    
    // Generate local FileReader base64 for imported image
    forumCreateImgChange(event) {
      let reader = new FileReader();
      reader.onload = function() {
        document.getElementById("create-forum_img-output").src = reader.result;
        document.getElementById("create-forum_img").style.display = "flex";
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    
    // Close image in FileReader
    forumCreateImgClose() {
      document.getElementById("create-forum_img").style.display = "none";
      document.getElementById("create-forum_upload-img").value = "";
      document.getElementById("create-forum_img-output").src = "";
    },
    
    modPanelAccess() {
      const vm = this

      // XHR ERROR
      function xhrCallbackError(response) {
        console.error(response);
      }

      // API CALLBACK ERROR
      function apiCallbackError(response, readyState, httpStatus) {
        console.error(response);
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`);
      }

      // API CALLBACK DONE
      function apiCallbackDone(response) {
        let user = response.result[0];
        if (user.is_admin === 1 || user.is_mod === 1) {
          vm.user.modPanelAccess = true
        }
      }

      // API CALL
      api(
        "api/user/account/primaryInfos",
        "GET",
        undefined,
        apiCallbackDone,
        apiCallbackError,
        xhrCallbackError
      );
    }
  }
};
</script>

<style lang="scss">
// profile
.profile {
  display: flex;
}
// user-profile
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__header {
    margin-left: 185px;
  }
  &__forums {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    margin-left: 185px;
    width: 45%;
    article {
      margin-bottom: 35px;
      overflow-wrap: break-word;
      width: 100%;
    }
    h3 {
      margin-top: 15px;
      margin-bottom: 25px;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  // user-profile
  .user-profile {
    &__header {
      width: 52%;
    }
    &__forums {
      width: 43%;
      article {
        margin-bottom: 25px;
      }
      h3 {
        margin-bottom: 15px;
      }
    }
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  // user-profile
  .user-profile {
    &__header {
      width: 87%;
    }
    &__forums {
      width: 75%;
      article {
        margin-bottom: 20px;
      }
      h3 {
        margin-top: 25px;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  // user-profile
  .user-profile {
    &__forums {
      width: 90%;
      article {
        margin-bottom: 20px;
      }
      h3 {
        margin-top: 25px;
      }
    }
  }
}
@media screen and (max-width: 479px) {
  // user-profile
  .user-profile {
    &__forums {
      width: 95%;
      article {
        margin-bottom: 20px;
      }
      h3 {
        font-size: 1.25em;
        margin-top: 30px;
        margin-bottom: 20px;
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  // user-profile
  .user-profile {
    &__header {
      margin-left: 0;
    }
    &__forums {
      margin-left: 0;
    }
  }
}
</style>
