<template>
<!--<ul class="text-red-700 font-bold">-->
<!--  <li v-for="errorMessage in validationErrors" :key="errorMessage">-->
<!--  {{errorMessage}}-->
<!--  </li>-->
<!--</ul>-->

  <p class="text-red-700 font-bold text-center">
    {{validationErrors}}
  </p>
</template>

<script>
export default {
  name: "ValidationErrors",
  props:{
    validationErrors: {
      type: String,
      required: true,
    }
  },
}
</script>

<style scoped>

</style>