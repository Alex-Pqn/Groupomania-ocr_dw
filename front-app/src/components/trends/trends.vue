<template>
  <!-- trends -->
  <div class="trends trends--style">
    <!-- header -->
    <header class="trends__header">
      <h2>
        Tendances
      </h2>
    </header>
    <!-- main -->
    <div class="trends__main">
      <div class="trends__main__recents trends__main__recents--style">
        <h4>
          Discussion récentes
        </h4>
        <!-- error handler -->
        <div id="error-handler_trends" class="error-handler">
          <h3>
            Erreur
          </h3>
          <p></p>
        </div>
        <!-- forums -->
        <article v-for="item in recentsTrends" :key="item.id">
          <displayUserTrends
            :published_date="item.published_date"
            :pic_url="item.pic_url"
            :firstname="item.firstname"
            :lastname="item.lastname"
            :text="item.text"
          />
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import displayUserTrends from "@/components/trends/displayUserTrends.vue";
import { api, dateFormatting } from "@/utils/scripts";

export default {
  name: "trends",
  data() {
    return {
      recentsTrends: [
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
        
        result.forEach(forum => {
          // data formatting
          function formatedDate (date) {
            forum.created_at = date
          }
          dateFormatting(forum, formatedDate)
          
          let userForum = {
            published_date: forum.created_at,
            pic_url: forum.pic_url,
            firstname: forum.firstname,
            lastname: forum.lastname,
            text: forum.text
          }

          // push the forum in data
          vm.recentsTrends.push(userForum)
        });
      }

      // API CALL
      api("api/trends/get", "GET", undefined, apiCallbackDone, apiCallbackError, xhrCallbackError)
    },
    errorHandler (err) {
      const errorContainer = document.getElementById('error-handler_trends')
      document.querySelector('#error-handler_trends p').innerHTML = err
      errorContainer.style.display = "block"
    },
  },
  components: {
    displayUserTrends
  }
};
</script>

<style lang="scss">
// trends
.trends {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 350px;
  height: 97vh;
  top: 1.5vh;
  left: 1.5vh;
  z-index: 20;
  &--style {
    background-color: rgb(241, 241, 241);
    border: 1px solid $small_black-border;
    border-top-left-radius: 0.7em;
    border-bottom-right-radius: 1em;
  }
  // header
  &__header {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  // main
  &__main {
    display: flex;
    justify-content: center;
    &__recents {
      width: 90%;
      padding: 5px 8px;
      &--style {
        border-radius: 1em;
      }
      h4 {
        margin: 10px 0;
      }
      article {
        padding-top: 15px;
        border-top: 1px solid $small_black-border;
      }
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1600px) {
  .trends {
    width: 290px;
  }
}
@media screen and (min-width: 740px) and (max-width: 1023px) {
  .trends {
    width: 60%;
    top: 25px;
    &--style {
      border-radius: 0;
      background-color: rgb(245, 245, 245);
    }
    &__header {
      h1 {
        font-size: 1.6em;
      }
    }
    &__main {
      &__recents {
        h4 {
          font-size: 1.2em;
        }
      }
    }
  }
}
@media screen and (max-width: 479px) {
  .trends {
    &__header {
      h1 {
        font-size: 1.7em;
      }
    }
    &__main {
      &__recents {
        h4 {
          font-size: 1.4em;
        }
      }
    }
  }
}
@media screen and (max-width: 740px) {
  .trends {
    top: 15px;
    width: 90%;
    left: 0;
    margin-bottom: 15px;
  }
}
@media screen and (max-width: 1023px) {
  .trends {
    height: 100%;
    position: relative;
    
    &--style {
      border-radius: 0;
      background-color: rgb(245, 245, 245);
    }
    &__main {
      &__recents {
        article {
          margin-bottom: 10px;
          padding-top: 23px;
        }
        h4 {
          margin: 15px 0 15px 0;
        }
      }
    }
  }
}
</style>
