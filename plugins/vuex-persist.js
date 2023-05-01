import { VuexPersistence } from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'cache',
    storage: window.localStorage,
  }).plugin(store)
}
