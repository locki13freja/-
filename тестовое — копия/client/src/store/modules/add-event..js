import events from "@/api/events";

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    addEventStart: '[add-event] addEventStart',
    addEventSucess: '[add-event] addEventSucess',
    addEventFailure: '[add-event] addEventFailure'
}

export const actionTypes = {
    addEvent: '[add-event] addEvent'
}

const mutations = {
    [mutationTypes.addEventStart](state) {
        state.isLoading = true
    },
    [mutationTypes.addEventSucess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.addEventFailure](state, payload) {
        state.isLoading = false
        state.error = payload
    }
}

const actions = {
    [actionTypes.addEvent](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.addEventStart);
            events
                .addEvent(payload.id, payload.credentials)
                .then((response) => {
                    context.commit(mutationTypes.addEventSucess, response.data.event);
                    resolve(response.data.event);
                })
                .catch((err) => {
                    console.log(err)
                    context.commit(mutationTypes.addEventFailure, err.response.data.errorMessage
                    );
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};