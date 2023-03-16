<template>

  <validation-errors v-if="validationErrors" :validation-errors="validationErrors"></validation-errors>

  <div class="w-full ml-auto mr-auto text-center mt-7">
    <h1 class="text-red-900 mb-7 font-bold text-2xl uppercase">user creation form</h1>
    <form  class="w-full" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900">FirstName</label>
        <my-input v-model:value="firstName" type="text" id="firstname" class="text-sm " placeholder="enter a firstname"
                  required></my-input>
      </div>

      <div class="mb-4">
        <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900">LastName</label>
        <my-input v-model:value="lastName" type="text" id="lastname" class="text-sm" placeholder="enter a lastname"
                  required></my-input>
      </div>

      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <my-input v-model:value="email" id="email" type="email" class="text-sm" placeholder="enter a email"
                  required></my-input>
      </div>

      <div class="mb-7">
        <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
        <my-input v-model:value="phoneNumber" id="phoneNumber" type="number" class="text-sm" placeholder="enter a phone number"
                  required></my-input>
      </div>

      <div class="mb-4">
        <my-button>Save</my-button>
      </div>

    </form>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import ValidationErrors from "@/components/ValidationErrors.vue";
import {actionTypes} from "@/store/modules/add-user";

export default {

  name: "UserPostForm",
  components: {ValidationErrors, MyButton, MyInput},
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    }
  },
  computed: {
    validationErrors() {
      return this.$store.state.addUser.validationErrors;
    },
  },
  methods: {
    onSubmit(data) {
      console.log(data)
      this.$store.dispatch(actionTypes.addUser, {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            eventsCount:0,
          }
      )
          .then(user=>{
            console.log(user)
            this.$router.push({name: 'home'})
          })
    },
  }
}
</script>

<style>

</style>