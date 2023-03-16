<template>
<div>
  <my-button class="block left-3/4 relative cursor-pointer" @click="$event=>$router.push(`${userId}/add-event`)">Create Event</my-button>
  <events-view :apiUrl="apiUrl"></events-view>
</div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import EventsView from "@/components/EventsView.vue";


export default {
  name: "UserPage",
  components: {EventsView, MyButton},
  data(){
    return {
      apiUrl:this.$route.path,
    }
  },
  computed:{
    userId(){
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>