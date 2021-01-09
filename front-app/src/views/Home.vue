<template>
  <main>
    <!-- home -->
    <div class="home">
      <!-- displayed beetween 0px > 1023px -->
      <div class="mobile-container">
        <!-- trends -->
        <trends />

        <!-- forums -->
        <section id="top" class="forums">
          <!-- header -->
          <header class="forums__header forums__header--style">
            <div class="forums__header__left">
              <a href="#top">
                <img
                  src="@/assets/icon-left-font-monochrome-black.svg"
                  alt=""
                />
              </a>
            </div>
            <div class="forums__header__right">
              <img
                v-on:click="displayProfilePopup(`profile-popup_mobile-home`)"
                id="user-icon"
                src="@/assets/ellipsis-v-solid.svg"
                alt=""
              />
              <profilePopup id="profile-popup_mobile-home"/>
            </div>
          </header>
          <!-- main -->
          <div class="forums__main">
            <userCreateForum />
            <h3>
              Fil de discussion
            </h3>
            <div id="error-handler">
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
              />
              <!-- comments list in forum -->
              <div class="comments-list">
                <div v-for="comment in item.comments" :key="comment.id">
                  <displayUserComments
                    :published_date="comment.published_date"
                    :pic_url="comment.pic_url"
                    :firstname="comment.firstname"
                    :lastname="comment.lastname"
                    :text="comment.text"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- main nav -->
        <mainNav/>
      </div>
    </div>
  </main>
</template>

<script>
import displayUserForums from "@/components/forums/displayUserForums.vue";
import displayUserComments from "@/components/forums/displayUserComments.vue";
import userCreateForum from "@/components/forums/userCreateForum.vue";
import trends from "@/components/trends/trends.vue";
import mainNav from "@/components/nav/mainNav.vue";
import profilePopup from "@/components/nav/profilePopup.vue";
import { api, displayProfilePopup, dateFormatting } from "@/utils/scripts";

export default {
  name: "Home",
  data() {
    return {
      forums: [
      ]
    };
  },
  beforeMount: async function () {
    const vm = this
    vm.getForums()
  },
  methods: {
    // GET FORUMS
    getForums () {
      const vm = this
      let result
      
      // XHR ERROR
      function xhrCallbackError (response) {
        vm.errorHandler(response)
        console.error(response)
      }
      
      // API CALLBACK ERROR
      function apiCallbackError (response, readyState, httpStatus) {
        vm.errorHandler(response.sub_err)
        console.error(response)
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`)
      }
      
      // API CALLBACK DONE
      function apiCallbackDone (response) {
        result = response.result
        let forums_list = []
        
        result.forEach(forum => {
          // data formatting
          function formatedDate (date) {
            forum.created_at = date
          }
          dateFormatting(forum, formatedDate)
          
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
          }

          // add the forum in forums_list to get comments below
          forums_list.push(forum.id)
          // push the forum in data
          vm.forums.push(userForum)
        });
        
        // call getComments method with forums list
        if(forums_list.length >= 1) {
          vm.getComments(forums_list)
        }
      }

      // API CALL
      api("api/forums/global/get", "GET", undefined, apiCallbackDone, apiCallbackError, xhrCallbackError)
    },
    // GET COMMENTS
    getComments (forums_list) {
      const vm = this
      
      // XHR ERROR
      function xhrCallbackError (response) {
        console.error(response)
      }
      
      // API CALLBACK ERROR
      function apiCallbackError (response, readyState, httpStatus) {
        console.error(response)
        console.error(`ReadyState: ${readyState}, HttpStatus: ${httpStatus}`)
      }
      
      // API CALLBACK DONE
      function apiCallbackDone (response) {
        let comments = response.result
        let forums = vm.forums
        let userComment
        
        comments.forEach(comment => {
          // data formatting
          function formatedDate (date) {
            comment.created_at = date
          }
          dateFormatting(comment, formatedDate)
          
          userComment = {
            pic_url: comment.pic_url,
            firstname: comment.firstname,
            lastname: comment.lastname,
            published_date: comment.created_at,
            text: comment.text
          }
          
          forums.forEach(forum => {
            if(comment.forum_id == forum.id) {
              forum.comments.push(userComment)
            }
            
            forum.total_comments = forum.comments.length
          })
        });
      }
      
      // API CALL
      let data = [
        forums_list
      ]
      api("api/comments/get", "POST", data, apiCallbackDone, apiCallbackError, xhrCallbackError)
    },
    errorHandler (err) {
      const errorContainer = document.getElementById('error-handler')
      document.querySelector('#error-handler p').innerHTML = err
      errorContainer.style.display = "block"
    },
    displayProfilePopup
  },
  components: {
    displayUserForums,
    displayUserComments,
    userCreateForum,
    trends,
    mainNav,
    profilePopup
  }
};
</script>

<style lang="scss">
// profile-popup mobile home
#profile-popup_mobile-home {
  right: 27px;
  top: 50px;
  border-top-right-radius: 0;
}
@media screen and (max-width: 479px) {
  #profile-popup_mobile {
    font-size: 1.2em;
    img {
      width: 60px;
    }
  }
}

// home
.home {
  display: flex;
  p {
    overflow-wrap: break-word;
  }
}

// forums
.forums {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  // header
  &__header {
    display: flex;
    align-items: flex-end;
    position: sticky;
    top: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 5px;
    margin-left: 185px;
    width: 50%;
    height: 7%;
    z-index: 999;
    &--style {
      border-bottom: 1px solid $default_smooth-border;
      background-color: $default_background;
    }
    &__left {
      display: flex;
      width: 75%;
      & img {
        width: 255px;
      }
    }
    &__right {
      display: none;
      width: 25%;
      justify-content: flex-end;
      #user-icon {
        margin-bottom: 3px;
      }
    }
  }
  // main
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    margin-left: 185px;
    width: 45%;
    h3 {
      margin: 15px 0 20px;
    }
    article {
      display: flex;
      flex-direction: column;
      border-radius: 0.3em;
      margin-bottom: 35px;
      width: 100%;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .forums {
    &__header {
      margin-top: 5px;
      padding-top: 15px;
      width: 58%;
      &__left {
        img {
          width: 230px;
        }
      }
    }
    &__main {
      width: 50%;
      h3 {
        margin: 10px 0 20px;
      }
      article {
        margin-bottom: 30px;
      }
    }
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  .forums {
    &__header {
      margin-top: 20px;
      padding-top: 18px;
      width: 87%;
      &__left {
        img {
          width: 250px;
        }
      }
    }
    &__main {
      width: 75%;
      h3 {
        margin: 5px 0 20px;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 739px) {
  .forums {
    &__header {
      &__left {
        margin-left: 15px;
        img {
          width: 220px;
        }
      }
      &__right {
        margin-right: 15px;
      }
    }
    &__main {
      width: 90%;
    }
  }
}
@media screen and (max-width: 479px) {
  .forums {
    &__header {
      margin-top: 25px;
      &__left {
        margin-left: 10px;
        img {
          width: 250px;
        }
      }
      &__right {
        margin-right: 10px;
        #user-icon {
          width: 55px;
        }
      }
    }
    &__main {
      width: 95%;
    }
  }
}
@media screen and (max-width: 1023px) {
  .forums {
    &__header {
      margin-left: 0;
      &__left {
        img {
          width: 220px;
        }
      }
      &__right {
        display: flex;
        #user-icon {
          width: 13.5px;
          border: none;
        }
      }
    }
    &__main {
      margin-left: 0;
    }
  }
}
@media screen and (max-width: 739px) {
  .forums {
    &__header {
      width: 100%;
    }
  }
}
</style>
