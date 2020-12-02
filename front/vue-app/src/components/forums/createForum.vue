<template>
  <div id="app">
    <!-- create-forum -->
    <div class="create-forum create-forum--style">
        <div class="create-forum__content">
            <div class="create-forum__content__text">
                <textarea maxlength="320" placeholder="Quoi de neuf aujourd'hui ?" id="create-forum_text"></textarea>
            </div>
            <div class="create-forum__content__send">
                <button>
                <img src="../../assets/paper-plane-solid.svg" alt="">
                </button>
            </div>
        </div>
        <div class="create-forum__img">
            <input type="file" accept="image/*">
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: "createForum",
}
</script>

<style lang="scss">

.create-forum {
  &--style {
    background-color:rgb(248, 248, 248);
  }

    &__content {
        display: flex;
        &__text {
            display: flex;
            width: 585px;
            textarea {
                width: 100%;
                resize: none;
                padding: 7px;
                height: 70px;
                font-size: 1.25em;
            }
        }
        &__send {
            display: flex;
            width: 65px;
            button {
            width: 100%;
            img {
                width: 30px;
                filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)
            }
            }
        }
    }
    &__img {

    }
}
</style>