import { createStore } from 'vuex'
import users from "@/store/modules/users";
import addUser from "@/store/modules/add-user";
import pagination from "@/store/modules/pagination";
import events from "@/store/modules/events";
import addEvent from "@/store/modules/add-event."

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
   addUser,
    pagination,
      events,
      addEvent
  }
})
