import axiosService from '~/services/axios.service'

export const state = () => ({
  user: null,
  email: null,
  password: null,
})

export const getters = {
  userRole: (state) => {
    if (state.user) {
      return String(state.user.role).toLowerCase()
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
  SET_EMAIL(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    state.email = payload
  },
  SET_PASSWORD(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    state.password = payload
  },
}

export const actions = {
  setUser({ commit }, payload) {
    commit('SET_USER', payload)
  },
  setEmail({ commit }, payload) {
    commit('SET_EMAIL', payload)
  },
  setPassword({ commit }, payload) {
    commit('SET_PASSWORD', payload)
  },
  async login({ commit, state }) {
    try {
      const user = await axiosService.login(state.email, state.password)
      commit('SET_USER', user)
      return user
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error })
    }
  },
}
