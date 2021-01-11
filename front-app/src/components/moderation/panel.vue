<template>
  <!-- mod panel -->
  <div class="mod-panel">
    <!-- icon -->
    <img
      class="mod-panel__icon"
      v-on:click="modPanelModal"
      src="@/assets/moderator-panel-icon.png"
      alt=""
    />
    
    <!-- mod panel modal -->
    <div id="modPanelModal" class="mod-panel-modal">
      
      <!-- header -->
      <div class="mod-panel-modal__header">
        <p>
          Panel de modération
        </p>
      </div>
      
      <!-- content -->
      <div class="mod-panel-modal__content">
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
            :mod_panel="true"
          />
          <!-- comments list in forum -->
          <div class="comments-list">
            <div v-for="comment in item.comments" :key="comment.id">
              <displayUserComments
                :id="comment.id"
                :published_date="comment.published_date"
                :pic_url="comment.pic_url"
                :firstname="comment.firstname"
                :lastname="comment.lastname"
                :text="comment.text"
                :mod_panel="true"
              />
            </div>
          </div>
        </article>
      </div>
      
      <!-- footer -->
      <div v-on:click="modPanelModal" class="mod-panel-modal__footer">
        <button>
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import displayUserForums from "@/components/forums/displayUserForums.vue";
import displayUserComments from "@/components/comments/displayUserComments.vue";
import { api, dateFormatting } from "@/utils/scripts";

export default {
  name: "moderationPanel",
  data() {
    return {
      forums: []
    };
  },
  beforeMount: async function() {
    this.getForums();
  },
  methods: {
    // GET FORUMS
    getForums() {
      const vm = this;
      let result;

      // XHR ERROR
      function xhrCallbackError(response) {
        // vm.errorHandler(response)
        console.error(response);
      }

      // API CALLBACK ERROR
      function apiCallbackError(response, readyState, httpStatus) {
        // vm.errorHandler(response.sub_err)
        console.error(response);
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`);
      }

      // API CALLBACK DONE
      function apiCallbackDone(response) {
        result = response.result;
        let forums_list = [];
        let userForum;

        result.forEach(forum => {
          // data formatting
          function formatedDate(date) {
            forum.created_at = date;
          }
          dateFormatting(forum, formatedDate);

          userForum = {
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
        "api/home/get",
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
            id: comment.id,
            pic_url: comment.pic_url,
            firstname: comment.firstname,
            lastname: comment.lastname,
            published_date: comment.created_at,
            text: comment.text
          };

          forums.forEach(forum => {
            if (comment.forum_id == forum.id) {
              forum.comments.push(userComment);
            }

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

    // MOD PANEL MODAL
    modPanelModal() {
      const modPanelMod = document.getElementById("modPanelModal");
      if (modPanelMod.style.display == "flex") {
        modPanelMod.style.display = "none";
      } else {
        modPanelMod.style.display = "flex";
      }
    }
  },
  components: {
    displayUserForums,
    displayUserComments
  }
};
</script>

<style lang="scss">
// mod panel
.mod-panel {
  position: fixed;
  z-index: 28;
  &__icon {
    width: 45px;
    cursor: pointer;
  }
}

// mod panel modal
.mod-panel-modal {
  display: none;
  flex-direction: column;
  position: absolute;

  // header
  &__header {
    border-top-left-radius: 0.5em;
    padding: 7px;
    background-color: rgb(167, 167, 167);
    display: flex;
    ul {
      display: flex;
      li {
        margin: 0 5px;
      }
    }
  }
  
  // content
  &__content {
    padding: 10px;
    word-break: break-all;
    background-color: rgb(207, 207, 207);
    overflow-y: auto;
  }
  
  // footer
  &__footer {
    border-bottom-left-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    padding: 5px;
    background-color: rgb(185, 185, 185);
    button {
      padding: 2px 5px;
    }
  }
  
  // forums
  .user-forums {
    margin-top: 15px;
    &__icon {
      width: 16%;
    }
    &__main {
      width: 84%;
    }
  }
}
@media screen and (max-width: 599px) {
  // mod panel
  .mod-panel {
    top: 0;
    right: 0;
    margin-right: 20px;
    margin-top: 15px;
  }
  // mod panel modal
  .mod-panel-modal {
    right: 0;
    width: 280px;
    height: 750px;
    margin-top: 10px;
    &__header {
      border-top-right-radius: 0.5em;
    }
  }
}
@media screen and (min-width: 600px) and (max-width: 1023px) {
  // mod panel
  .mod-panel {
    top: 0;
    right: 0;
    margin-right: 20px;
    margin-top: 15px;
  }
  // mod panel modal
  .mod-panel-modal {
    right: 0;
    margin-right: 40px;
    width: 500px;
    height: 750px;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  // mod panel
  .mod-panel {
    bottom: 0;
    right: 0;
    margin-right: 170px;
    margin-bottom: 7px;
  }
  // mod panel modal
  .mod-panel-modal {
    bottom: 0;
    right: 0;
    width: 500px;
    height: 750px !important;
    margin-bottom: 50px;
    margin-right: 45px;
    // header
    &__header {
      border-top-right-radius: 0.5em;
    }
    // footer
    &__footer {
      border-bottom-right-radius: 0;
    }
  }
}
@media screen and (min-width: 1601px) {
  // mod panel
  .mod-panel {
    top: 0;
    right: 0;
    margin-right: 220px;
    margin-top: 15px;
  }
  // mod panel modal
  .mod-panel-modal {
    right: 0;
    margin-right: 40px;
    width: 500px;
    height: 750px;
  }
}
</style>
