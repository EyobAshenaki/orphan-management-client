export default ({ app, store }, inject) => {
  inject('toaster', {
    showToast({ content = '', state = '' }) {
      store.commit('toast/showToast', { content, state })
    },
  })
}
