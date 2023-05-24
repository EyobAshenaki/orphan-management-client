import { GraphQLError } from 'graphql'
import {
  createOrphanPhoto,
  createOrphanLetter,
  fetchOrphanDetail,
  fetchOrphanPersonal,
  fetchOrphanEducation,
  fetchOrphanEducationHistory,
  fetchOrphanFamily,
  fetchOrphanGuardian,
  fetchOrphanHealthStatus,
  fetchOrphanHealthStatuses,
  fetchOrphanPhotos,
  fetchOrphanLetters,
  fetchOrphanDocuments,
} from '~/services/orphan.service'

export const state = () => ({
  orphanHealthStatusHistory: [],
  orphanPhotos: [],
  orphanLetters: [],

  orphanDetail: {
    villageName: undefined,
    districtName: undefined,
    portraitPhoto: undefined,
    longPhoto: undefined,
    status: undefined,
  },

  orphanPersonal: {
    code: undefined,
    name: undefined,
    fatherName: undefined,
    grandFatherName: undefined,
    gender: undefined,
    dateOfBirth: undefined,
    placeOfBirth: undefined,
    religion: undefined,
    spokenLanguages: [],
    hobbies: [],
  },

  orphanEducation: {
    enrollmentStatus: undefined,
    level: undefined,
    year: undefined,
    gradeAgeMismatchReason: undefined,
    typeofSchool: undefined,
    schoolName: undefined,
    reason: undefined,
  },

  orphanFamily: {
    fatherDateOfBirth: undefined,
    fatherDateOfDeath: undefined,
    fatherCauseOfDeath: undefined,
    motherFirstName: undefined,
    motherMiddleName: undefined,
    motherLastName: undefined,
    motherDateOfBirth: undefined,
    motherVitalStatus: undefined,
    motherMaritalStatus: undefined,
    motherDateOfDeath: undefined,
    motherCauseOfDeath: undefined,
    motherMobileNumber: undefined,
  },

  orphanGuardian: {
    relationToOrphan: undefined,
    gender: undefined,
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    dateOfBirth: undefined,
    nationality: undefined,
    mobileNumber: undefined,
    telephoneNumber: undefined,
    orphanHouseType: undefined,
    orphanLivingArrangement: undefined,
  },

  orphanCurrentHealthStatus: {
    // mentalHealthStatus: undefined,
    // physicalHealthStatus: undefined,
    psychologicalStatus: undefined,
    description: undefined,
    healthDocumentName: undefined,
    healthDocumentUrl: undefined,
  },

  orphanDocuments: {
    personalDocuments: [],
    fatherDeathCertificate: undefined,
    guardianIdCard: undefined,
    adoptionCertificateUrl: undefined,
    memorandumOfUnderstandingUrl: undefined,
  },
})

export const getters = {
  orphanDetail: ({
    orphanDetail,
    orphanPersonal: { code, name, fatherName, grandFatherName },
  }) => {
    return { code, name, fatherName, grandFatherName, ...orphanDetail }
  },
  orphanPersonal: (state) => state.orphanPersonal,
  orphanEducation: (state) => state.orphanEducation,
  orphanFamily: (state) => state.orphanFamily,
  orphanGuardian: (state) => state.orphanGuardian,
  orphanCurrentHealthStatus: (state) => state.orphanCurrentHealthStatus,
  orphanHealthStatusHistory: (state) => state.orphanHealthStatusHistory,
  orphanPhotos: (state) => state.orphanPhotos,
  orphanLetters: (state) => state.orphanLetters,
  orphanDocuments: (state) => state.orphanDocuments,
}

export const mutations = {
  SET_ORPHAN_DETAIL(
    { orphanDetail },
    {
      village: { name, district },
      latestOrphanData: {
        photos: { photoPortraitUrl, photoLongUrl },
      },
      currentOrphanData,
    }
  ) {
    orphanDetail.villageName = name
    orphanDetail.districtName = district.name
    orphanDetail.portraitPhoto = photoPortraitUrl
    orphanDetail.longPhoto = photoLongUrl
    orphanDetail.status = currentOrphanData.sponsorshipStatus.status
  },

  SET_ORPHAN_PERSONAL({ orphanPersonal }, payload) {
    orphanPersonal.code = payload.code
    orphanPersonal.name = payload.name
    orphanPersonal.fatherName = payload.father?.firstName
    orphanPersonal.grandFatherName = payload.father?.lastName
    orphanPersonal.gender = payload.gender
    orphanPersonal.dateOfBirth = payload.dateOfBirth?.substr(0, 10)
    orphanPersonal.placeOfBirth = payload.placeOfBirth
    orphanPersonal.religion = payload.religion
    orphanPersonal.spokenLanguages = payload.spokenLanguages
    orphanPersonal.hobbies = payload.hobbies
  },

  MODIFY_ORPHAN_PERSONAL({ orphanPersonal }, payload) {
    orphanPersonal = { ...orphanPersonal, ...payload }
    console.log('MODIFY_ORPHAN_PERSONAL', orphanPersonal)
  },

  SET_ORPHAN_EDUCATION(
    { orphanEducation },
    { latestOrphanData: { educationalRecord } }
  ) {
    orphanEducation.enrollmentStatus = educationalRecord?.enrollmentStatus
    orphanEducation.level = educationalRecord?.level
    orphanEducation.year = educationalRecord?.year
    orphanEducation.gradeAgeMismatchReason =
      educationalRecord?.gradeAgeMismatchReason
    orphanEducation.typeOfSchool = educationalRecord?.typeOfSchool
    orphanEducation.schoolName = educationalRecord?.schoolName
    orphanEducation.reason = educationalRecord?.reason
  },

  MODIFY_ORPHAN_EDUCATION({ orphanEducation }, payload) {
    orphanEducation = { ...orphanEducation, ...payload }
    console.log('MODIFY_ORPHAN_EDUCATION', orphanEducation)
  },

  SET_ORPHAN_EDUCATION_HISTORY(state, { educationalRecords }) {
    state.orphanEducationHistory = educationalRecords
  },

  SET_ORPHAN_FAMILY({ orphanFamily }, { father, mother }) {
    orphanFamily.fatherDateOfBirth = father.dateOfBirth?.substr(0, 10)
    orphanFamily.fatherDateOfDeath = father.dateOfDeath?.substr(0, 10)
    orphanFamily.fatherCauseOfDeath = father.causeOfDeath
    orphanFamily.motherFirstName = mother.firstName
    orphanFamily.motherMiddleName = mother.middleName
    orphanFamily.motherLastName = mother.lastName
    orphanFamily.motherDateOfBirth = mother.dateOfBirth?.substr(0, 10)
    orphanFamily.motherVitalStatus = mother.vitalStatus
    orphanFamily.motherMaritalStatus = mother.maritalStatus
    orphanFamily.motherDateOfDeath = mother.dateOfDeath?.substr(0, 10)
    orphanFamily.motherCauseOfDeath = mother.causeOfDeath
    orphanFamily.motherMobileNumber = mother.mobileNumber
  },

  MODIFY_ORPHAN_FAMILY({ orphanFamily }, payload) {
    orphanFamily = { ...orphanFamily, ...payload }
    console.log('MODIFY_ORPHAN_FAMILY', orphanFamily)
  },

  SET_ORPHAN_GUARDIAN({ orphanGuardian }, { guardian, housing }) {
    orphanGuardian.relationToOrphan = guardian.relationToOrphan
    orphanGuardian.gender = guardian.gender
    orphanGuardian.firstName = guardian.firstName
    orphanGuardian.middleName = guardian.middleName
    orphanGuardian.lastName = guardian.lastName
    orphanGuardian.dateOfBirth = guardian.dateOfBirth?.substr(0, 10)
    orphanGuardian.nationality = guardian.nationality
    orphanGuardian.mobileNumber = guardian.mobileNumber
    orphanGuardian.telephoneNumber = guardian.telephoneNumber
    orphanGuardian.orphanHouseType = housing.houseType
    orphanGuardian.orphanLivingArrangement = housing.livingArrangement
  },

  MODIFY_ORPHAN_GUARDIAN({ orphanGuardian }, payload) {
    orphanGuardian = { ...orphanGuardian, ...payload }
    console.log('MODIFY_ORPHAN_GUARDIAN', orphanGuardian)
  },

  SET_ORPHAN_CURRENT_HEALTH_STATUS({ orphanCurrentHealthStatus }, payload) {
    orphanCurrentHealthStatus.psychologicalStatus = payload.psychologicalStatus
    orphanCurrentHealthStatus.description = payload.description
    orphanCurrentHealthStatus.healthDocumentName = payload.document.documentType
    orphanCurrentHealthStatus.healthDocumentUrl = payload.document.documentUrl
  },

  MODIFY_ORPHAN_CURRENT_HEALTH_STATUS({ orphanCurrentHealthStatus }, payload) {
    orphanCurrentHealthStatus = { ...orphanCurrentHealthStatus, ...payload }
    console.log(
      'MODIFY_ORPHAN_CURRENT_HEALTH_STATUS',
      orphanCurrentHealthStatus
    )
  },

  SET_ORPHAN_HEALTH_STATUS_HISTORY(state, { healthStatuses }) {
    state.orphanHealthStatusHistory = healthStatuses
  },

  SET_ORPHAN_PHOTOS(state, { photos }) {
    state.orphanPhotos = photos
  },

  SET_ORPHAN_LETTERS(state, { letters }) {
    state.orphanLetters = letters
  },

  SET_ORPHAN_DOCUMENTS({ orphanDocuments }, { documents, father, guardian }) {
    orphanDocuments.personalDocuments = documents
    orphanDocuments.fatherDeathCertificate = father.deathCertificateUrl
    orphanDocuments.guardianIdCard = guardian.idCardUrl
    orphanDocuments.adoptionCertificateUrl = guardian.adoptionCertificateUrl
    orphanDocuments.memorandumOfUnderstandingUrl =
      guardian.memorandumOfUnderstandingUrl
  },

  MODIFY_ORPHAN_DOCUMENTS({ orphanDocuments }, payload) {
    orphanDocuments = { ...orphanDocuments, ...payload }
    console.log('MODIFY_ORPHAN_DOCUMENTS', orphanDocuments)
  },

  ADD_HOBBY({ orphanPersonal }, payload) {
    orphanPersonal.hobbies.push(payload)
    console.log('ADD_HOBBY', orphanPersonal.hobbies)
  },

  REMOVE_HOBBY({ orphanPersonal }, payload) {
    orphanPersonal.hobbies.splice(payload, 1)
    console.log('REMOVE_HOBBY', orphanPersonal.hobbies)
  },
}

// TODO: Refactor actions and make them DRY
export const actions = {
  async fetchOrphanDetail({ commit }, id) {
    try {
      const data = await fetchOrphanDetail(id)
      commit('SET_ORPHAN_DETAIL', data)
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

  async fetchOrphanPersonal({ commit }, id) {
    try {
      const data = await fetchOrphanPersonal(id)
      commit('SET_ORPHAN_PERSONAL', data)
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

  async fetchOrphanEducation({ commit }, id) {
    try {
      const data = await fetchOrphanEducation(id)
      commit('SET_ORPHAN_EDUCATION', data)
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

  async fetchOrphanEducationHistory({ commit }, id) {
    try {
      const data = await fetchOrphanEducationHistory(id)
      commit('SET_ORPHAN_EDUCATION_HISTORY', data)
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

  async fetchOrphanFamily({ commit }, id) {
    try {
      const data = await fetchOrphanFamily(id)
      commit('SET_ORPHAN_FAMILY', data)
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

  async fetchOrphanGuardian({ commit }, id) {
    try {
      const data = await fetchOrphanGuardian(id)
      commit('SET_ORPHAN_GUARDIAN', data)
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

  async fetchCurrentOrphanHealthStatus({ commit }, id) {
    try {
      const data = await fetchOrphanHealthStatus(id)
      commit('SET_ORPHAN_CURRENT_HEALTH_STATUS', data)
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

  async fetchOrphanHealthStatusHistory({ commit }, id) {
    try {
      const data = await fetchOrphanHealthStatuses(id)
      commit('SET_ORPHAN_HEALTH_STATUS_HISTORY', data)
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

  async fetchOrphanPhotos({ commit }, id) {
    try {
      const data = await fetchOrphanPhotos(id)
      commit('SET_ORPHAN_PHOTOS', data)
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

  async fetchOrphanLetters({ commit }, id) {
    try {
      const data = await fetchOrphanLetters(id)
      commit('SET_ORPHAN_LETTERS', data)
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

  async fetchOrphanDocuments({ commit }, id) {
    try {
      const data = await fetchOrphanDocuments(id)
      commit('SET_ORPHAN_DOCUMENTS', data)
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

  async addOrphanPhoto(
    { commit },
    { orphanId, photoPortraitUrl, photoLongUrl }
  ) {
    try {
      const createOrphanPhotoInput = {
        orphanId,
        photoLongUrl,
        photoPortraitUrl,
      }

      console.log('Create Orphan Input: ', createOrphanPhotoInput)

      const data = await createOrphanPhoto(createOrphanPhotoInput)

      console.log(data)
      this.$toaster.showToast({
        content: 'Photo created successfully',
        state: 'success',
      })
      return data
      // commit('CLEAR_CREATE_ORPHAN_INPUT')
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

  async addOrphanLetter(
    { commit },
    { orphanId, originalThankyouLetterUrl, translatedThankyouLetterUrl }
  ) {
    try {
      const createOrphanLetterInput = {
        orphanId,
        originalThankyouLetterUrl,
        translatedThankyouLetterUrl,
      }

      console.log('Create Orphan Input: ', createOrphanLetterInput)

      const data = await createOrphanLetter(createOrphanLetterInput)

      console.log(data)
      this.$toaster.showToast({
        content: 'Letter created successfully',
        state: 'success',
      })
      return data
      // commit('CLEAR_CREATE_ORPHAN_INPUT')
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
