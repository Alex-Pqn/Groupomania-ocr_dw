<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  background-color: $default_background;
  * {
    padding: 0;
    margin: 0;
  }
  textarea,
  button {
    outline: none;
  }
  textarea {
    &:hover {
      border: 1px solid $medium_black-border !important;
    }
    &:focus {
      border: 1px solid $medium_black-border !important;
      border-bottom-left-radius: 0.3em;
    }
  }
  ul {
    list-style-type: none;
  }
}
#app {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// default user icon
#user-icon {
  cursor: pointer;
  width: 50px;
  margin-bottom: 20px;
  @include profile-pic;
}

// mobile-container (displayed beetween 0px > 1023px)
.mobile-container {
  display: flex;
  width: 100%;
}
@media screen and (max-width: 1023px) {
  .mobile-container {
    flex-direction: column;
    align-items: center;
  }
}

// comments list in forum (form Home & Profile pages)
.comments-list {
  overflow-y: auto;
  max-height: 650px;
  border-bottom: 2px solid $small_black-border;
}

// error handler
#error-handler {
  display: none;
  background-color: rgba(226, 0, 0, 0.2);
  padding-bottom: 10px;
  border-top-left-radius: .7em;
  border-top-right-radius: .7em;
  border-bottom: 4px solid rgba(128, 0, 0, 0.7)!important;
  border: 1px solid rgba(128, 0, 0, 0.7);
  h3 {
    margin-bottom: 5px;
  }
}
</style>

<script></script>
