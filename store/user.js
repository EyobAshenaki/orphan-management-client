import { GraphQLError } from 'graphql'
import { fetchUsers, createUser } from '~/services/user.service'

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
      const users = await fetchUsers()
      commit('SET_USERS', users)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error })
    }
  },
  async createUser({ commit, state }) {
    try {
      const user = await createUser(state.userInput)
      commit('SET_USERS', [...state.users, user])
    } catch (error) {
      if (Array.from(error)[0] instanceof GraphQLError) {
        error.forEach((e) => {
          this.$toaster.showToast({
            content: e.message,
            state: 'error',
          })
        })
        // eslint-disable-next-line no-console
      } else console.error(error)
      throw error
    }
  },
}
