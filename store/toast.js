export const state = () => ({
  content: '',
  state: '',
})

export const mutations = {
  showToast(state, payload) {
    state.content = payload.content
    state.state = payload.state
  },
}
