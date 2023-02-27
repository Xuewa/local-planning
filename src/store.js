import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            viewPortId: 'shore',
            startState: false,
            subMenu: [],
            // mainMenuIndex: 0,
            subMenuIndex: 0,
            geoId: '',
            geoColor: '#f0f0f0',
            geoType: 'polygon'
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
        switchSubMenuState(state, subMenu) {
            state.subMenu = subMenu
        },
        switchGeoId(state, geoId) {
            state.geoId = geoId
        },
        switchGeoColor(state, geoColor) {
            state.geoColor = geoColor
        },
        switchGeoType(state, geoType) {
            state.geoType = geoType
        }
    }
})
export default store
