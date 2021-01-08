<template>
  <div class="profile">
    <!-- displayed beetween 0px > 1023px -->
    <div class="mobile-container">
      <!-- trends -->
      <trends />

      <!-- profile -->
      <div class="user-profile" id="top">
        <!-- header -->
        <userHeader class="user-profile__header"/>
        <section class="user-profile__forums">
          <userCreateForum />
          <h3>
            Mon fil de discussion
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
            <!-- comments in forum -->
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
        </section>
      </div>

      <!-- main-nav -->
      <mainNav/>
    </div>
  </div>
</template>

<script>
import displayUserForums from "@/components/forums/displayUserForums.vue";
import displayUserComments from "@/components/forums/displayUserComments.vue";
import userCreateForum from "@/components/forums/userCreateForum.vue";
import trends from "@/components/trends/trends.vue";
import mainNav from "@/components/nav/mainNav.vue";
import userHeader from "@/components/userHeader.vue";
import { api } from "@/utils/scripts";

export default {
  name: "Profile",
  data() {
    return {
      forums: [
      ]
    };
  },
  components: {
    displayUserForums,
    displayUserComments,
    userCreateForum,
    trends,
    mainNav,
    userHeader
  },
  beforeMount: async function () {
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
      
      const monthNames = ["janv", "févr", "mars", "avr", "mai", "juin",
        "juill", "août", "sept", "oct", "nov", "déc"
      ];
      
      result.forEach(forum => {
        let date = new Date(forum.created_at)
                
        let date_currentYear = new Date().getFullYear()
        let date_currentMonth = new Date().getMonth()
        let date_currentDay = new Date().getDate()
        
        let created_at_date = forum.created_at.split("T")[0].split("-").reverse()
        let created_at_date_day = created_at_date[0]
        let created_at_date_month = monthNames[date.getMonth()]
        let created_at_date_year = created_at_date[2]
        
        let created_at_time = forum.created_at.split("T")[1].split(".")[0].split(":")
        let created_at_time_hour = created_at_time[0]
        let created_at_time_minute = created_at_time[1]
        
        if(date_currentDay == created_at_date_day && date_currentMonth == date.getMonth() && date_currentYear == created_at_date_year) {
          forum.created_at = `${created_at_time_hour}h${created_at_time_minute}`
        }else if(created_at_date_year == date_currentYear) {
          forum.created_at = `${created_at_date_day} ${created_at_date_month}.`
        }else{
          forum.created_at = `${created_at_date_day} ${created_at_date_month}. ${created_at_date_year}`
        }
        
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
    let data = []
    api("api/forums/user/get", "POST", data, apiCallbackDone, apiCallbackError, xhrCallbackError)
  },
  methods: {
     getComments (forums_list) {
      const vm = this
      let data = [
        forums_list
      ]
      
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
          comment.created_at = comment.created_at.split("T").join(" à ").split(".000Z").join("")
          
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
      
      api("api/comments/get", "POST", data, apiCallbackDone, apiCallbackError, xhrCallbackError)
    },
    errorHandler (err) {
      const errorContainer = document.getElementById('error-handler')
      document.querySelector('#error-handler p').innerHTML = err
      errorContainer.style.display = "block"
    },
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
      width: 58%;
    }
    &__forums {
      width: 50%;
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
