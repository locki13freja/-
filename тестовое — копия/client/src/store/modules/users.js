import users from "@/api/users";

const state={
    data:null,
    isLoading:false,
    error:null
}

export const mutationTypes={
    getUsersStart:'[users] GetUsersStart',
    getUsersSucess:'[users] GetUsersSucess',
    getUsersFailure:'[users] GetUsersFailure'
}

export const actionTypes={
    getUsers:'[users] GetUsers'
}

const mutations={
    [mutationTypes.getUsersStart](state){
        state.isLoading=true,
        state.data=null
    },
    [mutationTypes.getUsersSucess](state,payload){
        state.isLoading=false,
        state.data=payload
    },
    [mutationTypes.getUsersFailure](state,payload){
        state.error=true
    state.isLoading=false,
    state.data=payload
    }
}

const actions={
    [actionTypes.getUsers](context,{apiUrl}){
    return new Promise(resolve =>{
        context.commit(mutationTypes.getUsersStart),
        users.getUsers(apiUrl)
            .then(response=>{
            context.commit(mutationTypes.getUsersSucess,response.data)
            resolve(response.data)
            })
            .catch(error=>{
            context.commit(mutationTypes.getUsersFailure)
                console.log(error)
            })
    })
    }
}

export default {
    state,
    mutations,
    actions
}