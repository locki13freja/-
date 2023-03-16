import axios from "@/api/axios";

const getEvents=apiUrl=>{
    return axios.get(apiUrl)
}
const addEvent=(id,credentials)=>{
    return axios.post(`/user/${id}`, credentials)
}
export default {
    getEvents,
    addEvent
}