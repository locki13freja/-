import user from "@/api/page"

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationsTypes = {
    getPagesStart: '[pagination] getPagesStart',
    getPagesSucess: '[pagination] getPagesSucess',
    getPagesFailure: '[pagination] getPagesFailure'
}

const actionTypes = {
    getPages: '[pagination] getPages'
}

const mutations = {
    [mutationsTypes.getPagesStart](state) {
        state.isLoading = true,
            state.data = null
    },
    [mutationsTypes.getPagesSucess](state, payload) {
        state.isLoading = false,
            state.data = payload
    },
    [mutationsTypes.getPagesFailure](state, payload) {
        state.isLoading = false,
            state.data = payload
    }
}

const actions = {
    [actionTypes.getPages](context, commit) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.getPagesStart)
            user.getUsers(apiUrl).then(response => {
                context.commit(mutationsTypes.getPagesStart, response.data)
                resolve(response.data)
            }).catch(err=>{
                console.log(err)
                context.commit(mutationsTypes.getPagesFailure)
            })
        })
    }
}

export default {
    state,
    actions,
    mutations
}