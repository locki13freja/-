import events from "@/api/events";

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getEventsStart: '[events] getEventsStart',
    getEventsSucess: '[events] getEventsSucess',
    getEventsFailure: '[events] getEventsFailure'
}

export const actionTypes = {
    getEvents: '[events] getEvents'
}

const mutations = {
    [mutationTypes.getEventsStart](state) {
        state.isLoading = true,
            state.data = null
    },
    [mutationTypes.getEventsSucess](state, payload) {
        state.isLoading = false,
            state.data = payload
    },
    [mutationTypes.getEventsFailure](state, payload) {
        state.isLoading = false,
            state.error = payload
    }
}

const actions = {
    [actionTypes.getEvents](context, {apiUrl}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getEventsStart),
                events.getEvents(apiUrl)
                    .then(response => {
                        context.commit(mutationTypes.getEventsSucess, response.data)
                        resolve(response.data)
                    })
                    .catch(error=>{
                        context.commit(mutationTypes.getEventsFailure)
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