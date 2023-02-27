import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            viewPortId: 'shore',
            startState: false,
            subMenu: [],
            // mainMenuIndex: 0,
            subMenuIndex: 0
        }
    },
    getters:{},
    // 定义修改方法，用commit真正调用
    mutations: {
        switchViewPort (state, viewPortId) {
            state.viewPortId = viewPortId
        },
        switchStartState (state, flag) {
            state.startState = flag
        },
        // switchMainState(state, mainMenu) {
        //     state.subMenu = subMenu
        // },
        switchSubMenuState(state, subMenu) {
            state.subMenu = subMenu
        },
        switchSubMenuId() {

        }
    }
})
export default store
