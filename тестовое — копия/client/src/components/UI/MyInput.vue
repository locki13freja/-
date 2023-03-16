<template>
<input :value="value" @input="updateInput" class="shadow appearance-none border rounded w-50  py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
</template>

<script>
export default {
  name: "MyInput",
  props:{
    value:[String,Number]
  },
  methods:{
    updateInput(event){
      this.$emit('update:value',event.target.value)
    }
  }
}
</script>

<style scoped>

</style>