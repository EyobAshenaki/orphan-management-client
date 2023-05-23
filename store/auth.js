export const state = () => ({
  user: null,
})

export const getters = {
  userRole: (state) => {
    const { user } = state
    if (user !== null || user !== undefined) {
      const role = String(user?.role ?? '').toLowerCase()
      return role.length > 0 ? role : undefined
    }
    return null
  },
}

export const mutations = {
  SET_USER(state, payload) {
    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an object')
    state.user = payload
  },
  UNSET_USER(state) {
    state.user = null
  },
}

export const actions = {
  setUser({ commit }, payload) {
    commit('SET_USER', payload)
  },
  unsetUser({ commit }) {
    commit('UNSET_USER')
  },
}
