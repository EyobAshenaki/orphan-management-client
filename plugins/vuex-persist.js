import { VuexPersistence } from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'vuex-cache',
    storage: window.localStorage,
    modules: ['auth', 'addOrphan']
  }).plugin(store)
}
