import { GraphQLError } from 'graphql'
import { fetchCoordinators, fetchUsers } from '~/services/user.service'
import {
  fetchProjects,
  fetchSupportPlansByProjectId,
  createProject,
} from '~/services/project.service'
import {
  fetchDonors,
  createDonor,
  createDonorWithUser,
} from '~/services/donor.service'

export const state = () => ({
  donors: [],
  selectedDonor: {},
  donorUsers: [],
  projects: [],
  selectedProject: {},
  coordinators: [],
  selectedCoordinator: {},
  socialWorkers: [],
  selectedSocialWorkerId: '',
})

export const mutations = {
  SET_DONORS(state, donors) {
    state.donors = donors
  },
  SET_SELECTED_DONOR(state, donor) {
    state.selectedDonor = donor
  },
  SET_DONOR_USERS(state, donorUsers) {
    state.donorUsers = donorUsers
  },
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_SELECTED_PROJECT(state, project) {
    state.selectedProject = project
  },
  SET_COORDINATORS(state, coordinators) {
    state.coordinators = coordinators
  },
  SET_SELECTED_COORDINATOR(state, coordinator) {
    state.selectedCoordinator = coordinator
  },
  SET_SOCIAL_WORKER_ID(state, socialWorkerId) {
    state.selectedSocialWorkerId = socialWorkerId
  },
}

export const actions = {
  async fetchDonors({ commit }) {
    try {
      const donors = await fetchDonors()
      commit('SET_DONORS', donors)
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

  async createDonor({ commit, state }, payload) {
    try {
      const donor = payload?.userId
        ? await createDonor(payload)
        : await createDonorWithUser(payload)
      commit('SET_DONORS', [...state.donors, donor])
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

  async fetchProjects({ commit }) {
    try {
      const projects = await fetchProjects()
      commit('SET_PROJECTS', projects)
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

  async setSelectedProject({ commit }, project) {
    project.supportPlans = await fetchSupportPlansByProjectId(project.id)
    commit('SET_SELECTED_PROJECT', project)
  },

  async createProject({ commit, state }, payload) {
    try {
      const project = await createProject(payload)
      commit('SET_PROJECTS', [...state.projects, project])
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

  async fetchCoordinators({ commit }, simple) {
    try {
      const coordinators = await fetchCoordinators(simple)
      commit('SET_COORDINATORS', coordinators)
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

  async fetchDonorUsers({ commit }) {
    try {
      const donorUsers = Array.from(await fetchUsers()).filter(
        (user) => user.role === 'DONOR' && user.donor.nameInitials === ''
      )
      commit('SET_DONOR_USERS', donorUsers)
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

  setSelectedSocialWorkerId({ commit }, socialWorkerId) {
    commit('SET_SOCIAL_WORKER_ID', socialWorkerId)
  },
}
