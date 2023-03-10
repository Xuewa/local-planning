import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            viewPortId: 'shore',
            startState: false,
            subMenu: [],
            subMenuIndex: 0,
            geoId: '',
            geoColor: '#f0f0f0',
            geoType: 'polygon',
            currentOperation: false,
            symbolItem: null,
            galleryShow: false,
            showScreenShot: false,
            beforeScreenShot: undefined,
            afterScreenShot: undefined
        }
    },
    getters:{
    },
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
            // console.log(subMenu)
        },
        switchGeoId(state, geoId) {
            state.geoId = geoId
        },
        switchGeoColor(state, geoColor) {
            state.geoColor = geoColor
        },
        switchGeoType(state, geoType) {
            state.geoType = geoType
        },
        switchCurrentOperation(state, currentOperation) {
            state.currentOperation = currentOperation
        },
        switchSymbolItem(state, symbolItem) {
            state.symbolItem = symbolItem
        },
        switchGalleryShow(state, galleryShow){
            state.galleryShow = galleryShow
        },
        switchShowScreenShot(state, screenShot) {
            state.showScreenShot = screenShot
        },
        switchBeforeScreenShot(state, screenShot){
            state.beforeScreenShot = screenShot
            console.log(screenShot)
        },
        switchAfterScreenShot(state, screenShot){
            state.afterScreenShot = screenShot
        }

    }
})
export default store
