import { reqseckList } from "../../utils/http"

const state = {
    list: []
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}

const actions = {
    reqList(context) {
        reqseckList().then(res => {
            context.commit('changeList', res.data.list)
        })
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}