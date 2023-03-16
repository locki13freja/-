import axios from "@/api/axios";

const getUsers=apiUrl=>{
return axios.get(apiUrl)
}

const addUser=credentials=>{
    return axios.post('/add-user',credentials)
}

export default{
    getUsers,
    addUser
}