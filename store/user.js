import axiosService from '~/services/axios.service'

export const state = () => ({
  users: [],
  userInput: {},
})

export const mutations = {
  SET_USERS(state, payload) {
    if (typeof payload !== 'object' && !Array.isArray(payload))
      throw new TypeError('Payload must be an an array')
    state.users = payload
  },
  SET_USER_INPUT(state, payload) {
    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an an object')
    state.userInput = payload
  },
}

export const actions = {
  setUsers({ commit }, payload) {
    commit('SET_USERS', payload)
  },
  async fetchUsers({ commit }) {
    try {
      const users = await axiosService.fetchUsers()
      commit('SET_USERS', users)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error })
    }
  },
  async createUser({ commit, state }) {
    try {
      const user = await axiosService.createUser(state.userInput)
      commit('SET_USERS', [...state.users, user])
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error })
    }
  },
}
