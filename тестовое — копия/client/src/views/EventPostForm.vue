<template>
  <div>


    <div class="w-full ml-auto mr-auto text-center mt-7">
      <h1 class="text-red-900 mb-7 font-bold text-2xl uppercase">event Creation Form</h1>
    <validation-errors v-if="validationErrors" :validation-errors="validationErrors"></validation-errors>
      <form enctype="application/x-www-form-urlencoded" class="w-full" @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <my-input v-model:value="title" type="text" id="title" class="text-sm" placeholer="enter a title"
                    required></my-input>
        </div>

        <div class="m-4">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <my-input v-model:value="description" id="description" placeholder="enter a description" class="text-sm"
                    type="text" required>
          </my-input>
        </div>


        <div class="m-4">
          <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
          <my-input v-model:value="startDate" id="startDate" placeholder="enter a startDate" class="text-sm" type="date"
                    required>
          </my-input>
        </div>

        <div class="m-4">
          <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900">End Date</label>
          <my-input v-model:value="endDate" id="endDate" placeholder="enter a endDate" class="text-sm" type="date"
                    required>
          </my-input>
        </div>

        <div class="mb-4">
          <my-button type="submit">Save</my-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {actionTypes} from "@/store/modules/add-event.";
import ValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: "EventPostForm",
  components: {ValidationErrors, MyButton, MyInput},
  data() {
    return {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
    }
  },
  computed:{
    validationErrors() {
      return this.$store.state.addEvent.error;
    },
  },
  methods: {
    onSubmit() {
      const credentials={
        title: this.title,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate
      }
      this.$store
          .dispatch(actionTypes.addEvent, { id: this.$route.params.id, credentials: credentials })
          .then(() => {
            this.$router.push({name:'editUser'});
          })}
  }
}
</script>

<style scoped>

</style>