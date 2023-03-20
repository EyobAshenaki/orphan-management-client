import { GraphQLError } from 'graphql'
import { login } from '~/services/user.service'

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
      const user = await login(state.email, state.password)
      commit('SET_USER', user)
      return user
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
