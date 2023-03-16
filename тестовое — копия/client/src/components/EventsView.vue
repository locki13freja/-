<template>
<div>
  <div class="text-center w-full text-xl text-green-700" v-if="isLoading">
    Loading...
  </div>
  <div class="text-center w-full text-xl text-red-700" v-if="error">Something was happened</div>

  <div v-if="eventsUser" class="w-full mt-5  overflow-x-auto">
    <div class="w-1/2 text-medium ml-auto mr-auto text-center text-red-700">
      User with Name:
      {{eventsUser.firstName}}
    </div>

    <table class="w-1/2 mt-9 text-sm ml-auto mr-auto text-center text-gray-500">

      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>

        <th scope="col" class="px-3 py-1.5">
         Title
        </th>

        <th scope="col" class="px-3 py-1.5">
        Description
        </th>

        <th scope="col" class="px-3 py-1.5">
          Start Date
        </th>

        <th scope="col" class="px-3 py-1.5">
         End Date
        </th>
      </tr>
      </thead>

      <tbody>
      <tr class="bg-white border-b" v-if="eventsUser.eventsCount>0" v-for="(events) in eventsUser.events" :key="events">
      <td>{{events.title}}</td>
        <td>{{events.description}}</td>
        <td>{{events.startDate.slice(0,10)}}</td>
        <td>{{events.endDate.slice(0,10)}}</td>
      </tr>
      </tbody>
    </table>

    <div v-if="eventsUser.eventsCount>0">
      <pagination-view :url="baseUrl" :current-page="currentPage" :limit="limit" :total="Number(eventsUser.eventsCount)"></pagination-view>
    </div>
  </div>
</div>
</template>

<script>
import {actionTypes} from "@/store/modules/events";
import {mapState} from "vuex";
import PaginationView from "@/components/PaginationView.vue";
import {limit} from "@/helpers/consts";
import {data} from "autoprefixer";
import queryString from "query-string";

export default {
  name: "EventsView",
  data(){
    return {
      limit
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
    data(){
      return data
    },
    ...mapState({
      isLoading:state => state.events.isLoading,
      eventsUser:state=>state.events.data,
      error:state=>state.events.error
    }),
    currentPage(){
      return Number(this.$route.query.page || '1')
    },
    baseUrl(){
      return this.$route.path
    },
  },
  watch:{
    currentPage(){
      this.fetchEvents()
    }
  },
  methods:{
    fetchEvents(){
      const parsedUrl=queryString.parseUrl(this.apiUrl)
      const stringifyParams=queryString.stringify({
        limit,
        page:this.currentPage,
            ...parsedUrl.query
      })
      const apiUrlWithParams=`${parsedUrl.url}?${stringifyParams}`
    this.$store.dispatch(actionTypes.getEvents,{apiUrl: apiUrlWithParams})
    }
  },
  mounted() {
    this.fetchEvents()
  }
}
</script>

<style scoped>

</style>