import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            viewPortId: 'shore'
        }
    },
    getters:{},
    // 定义修改方法，用commit真正调用
    mutations: {
        switchViewPort (state, viewPortId) {
            state.viewPortId = viewPortId
        }
    }
})
export default store
