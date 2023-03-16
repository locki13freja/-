<template>
<ul class="inline-block mt-16 mb-16 pl-0 rounded w-full text-center">
  <li v-for="page in pages" :key="page" class="inline bg-gray-100 hover:font-medium" :class="{active:currentPage===page}">
    <router-link :to='{path:url,query:{page:page}}' class="border-2 border-teal-300 mx-px">
  {{page}}
    </router-link>
  </li>
</ul>
</template>

<script>
import {range} from "@/helpers/range";
export default {
  name: "PaginationView",
  props:{
    total:{
      type:Number,
      required:true
    },
    limit:{
      type:Number,
      required: true
    },
    currentPage:{
      type:Number,
      required:true
    },
    url:{
      type:String,
      required:true
    },
  },
  computed:{
    pages(){
      const pagesCount=Math.ceil( this.total/this.limit)
      return range(1,pagesCount)
    }
  }
}
</script>

<style scoped>
.active{
 font-weight: bold;
}
</style>