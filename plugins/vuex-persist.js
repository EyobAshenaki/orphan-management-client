import { VuexPersistence } from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'cache-v2',
    storage: window.localStorage,
    modules: ['auth', 'addOrphan']
  }).plugin(store)
}
