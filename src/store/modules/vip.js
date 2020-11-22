import { reqvipList } from '../../utils/http'

const state = {
    list: []
}
const mutations = {
    changeList(state, list) {
        state.list = list
    }
}
const actions = {
    reqList(context) {
        reqvipList().then(res => {
            context.commit("changeList", res.data.list)
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
    actions,
    getters,
    namespaced: true
}