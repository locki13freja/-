import userApi from "@/api/users"

const state={
    isSubmitting:false,
    validationErrors:null,
    addingUser:null,
}

export const mutationsTypes={
    addStart:'[add-user] addStart',
    addSucess:'[add-user] addSucess',
    addFailure:'[add-user] addFailure'
}

export const actionTypes={
    addUser:'[add-user] addUser'
}

const mutations={
    [mutationsTypes.addStart](state){
    state.isSubmitting=true,
    state.validationErrors=null
    },
    [mutationsTypes.addSucess](state,payload){
    state.isSubmitting=false,
    state.addingUser=payload
    },
    [mutationsTypes.addFailure](state,payload){
     state.isSubmitting=false,
     state.validationErrors=payload
    }
}

const actions={
    [actionTypes.addUser](context,credentials){
        return new Promise(resolve => {
        context.commit(mutationsTypes.addStart)
        userApi
            .addUser(credentials)
            .then(response=>{
            context.commit(mutationsTypes.addSucess,response.data.user)
                resolve(response.data.user)
            })
            .catch(err=>{
                context.commit(mutationsTypes.addFailure,err.response.data.errors)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
