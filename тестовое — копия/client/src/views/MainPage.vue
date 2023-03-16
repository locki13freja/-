<template>
  <div>
  <my-button class="block left-3/4 relative cursor-pointer" @click="$event=>$router.push('/user-post-form')">Create user</my-button>
  <UserView :api-url="apiUrl"></UserView>
  </div>
</template>

<script>

import MyButton from "@/components/UI/MyButton.vue";
import UserView from "@/components/UserView.vue";

export default {
  name: "MainPage",
  components: {UserView, MyButton},
  data(){
    return {
      apiUrl:'/api'
    }
  }
}
</script>

<style>

</style>