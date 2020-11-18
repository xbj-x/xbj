import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import actions from "./actions"
import {state,mutations,getters} from "./mutations"
import order from "./modules/order"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        order
    }
})