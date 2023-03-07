export const state = () => ({
  activeStep: 1,
  totalSteps: 7,
  registrationSteps: [
    {
      title: 'Orphan Details',
      step: 1,
    },
    {
      title: 'Orphan Education',
      step: 2,
    },
    {
      title: 'Orphan Family',
      step: 3,
    },
    {
      title: 'Orphan Guardian',
      step: 4,
    },
    {
      title: 'Orphan Supplementary',
      step: 5,
    },
    {
      title: 'Orphan Documents',
      step: 6,
    },
    {
      title: 'Orphan Review',
      step: 7,
    },
  ],
})

export const mutations = {
  SET_ACTIVE_STEP(state, payload) {
    if (typeof payload !== 'number')
      throw new TypeError('Payload must be a number')

    if (payload < 0 || payload > state.totalSteps)
      throw new RangeError('Payload must be between 0 and ' + state.totalSteps)

    state.activeStep = payload
  },
}

export const actions = {
  setActiveStep({ commit }, payload) {
    commit('SET_ACTIVE_STEP', payload)
  },
}
