<template>
<div>
  <div class="text-center w-full text-xl text-green-700" v-if="isLoading">
    Loading...
  </div>

  <div class="text-center w-full text-xl text-red-700" v-if="error">Something was happened</div>

  <div v-if="users" class="w-full mt-5  overflow-x-auto">
      <table class="w-1/2 text-sm ml-auto mr-auto text-center text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>

          <th scope="col" class="px-3 py-1.5">
          FirstName
          </th>

          <th scope="col" class="px-3 py-1.5">
           Email
          </th>

          <th scope="col" class="px-3 py-1.5">
            Phone Number
          </th>

          <th scope="col" class="px-3 py-1.5">
            Events Count
          </th>

          <th scope="col" class="px-3 py-1.5">
            Next Event Date
          </th>

        </tr>
        </thead>

        <tbody>
        <tr class="bg-white border-b" v-for="(user) in users.result">
          <td v-if="user._id">
            <router-link class="hover:font-medium" :to="{name:'editUser',params:{id:user._id}}">
            {{user.firstName}}
            </router-link>

          </td>
          <td>{{user.email}}</td>
          <td>{{user.phoneNumber}}</td>
          <td>{{user.eventsCount}}</td>
          <td v-if="user.eventsCount>0">{{user.events[0].startDate.slice(0,10) }}</td>
          <td v-if="user.eventsCount==0"></td>
        </tr>
        </tbody>

      </table>
    <div>
  <pagination-view :currentPage="currentpage" class="break-normal" :total="Number(users.count)" :limit="limit" :url="baseUrl"></pagination-view>
    </div>
  </div>

</div>
</template>

<script>
import {actionTypes} from "@/store/modules/users";
import {mapState} from "vuex";
 import PaginationView from "@/components/PaginationView.vue";
import {data} from "autoprefixer";
import queryString from 'query-string'
import {limit} from "@/helpers/consts";

export default {
  name: "UserView",
  data(){
    return{
      limit,
    }
  },
   components: {PaginationView},
  props:{
    apiUrl:{
    type:String,
    required:true
    }
  },
  computed:{
    data() {
      return data
    },
...mapState({
  isLoading:state =>state.users.isLoading,
  users:state => state.users.data,
  error:state => state.users.error
}),
    currentpage(){
    return Number(this.$route.query.page || '1')
    },
    baseUrl(){
      return this.$route.path
    },
  },
  watch:{
    currentpage(){
     this.fetchUsers()
    }
  },
   mounted(){
    this.fetchUsers()
  },
  methods:{
    fetchUsers(){
      const parsedUrl=queryString.parseUrl(this.apiUrl)
      const stringifiedParams=queryString.stringify({
        limit,
        page:this.currentpage,
        ...parsedUrl.query
      })
      const apiUrlWithParams=`${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getUsers,{apiUrl: apiUrlWithParams})
    }
  }
}
</script>

<style scoped>

</style>