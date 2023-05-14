import { GraphQLError } from 'graphql'
import { toEnumString } from '~/helpers/app.helpers'
import { createOrphanWithNestedCreate } from '~/services/orphan.service'

export const state = () => ({
  activeStep: 4,
  totalSteps: 6,
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
    // {
    //   title: 'Orphan Review',
    //   step: 7,
    // },
  ],
  createOrphanInput: {
    villageId: undefined,
    code: undefined,
    name: undefined,
    gender: undefined,
    dateOfBirth: undefined,
    placeOfBirth: undefined,
    religion: undefined,
    spokenLanguages: [],
    hobbies: [],
    father: undefined, // this.createFatherInput,
    mother: undefined, // this.createMotherInput,
    guardian: undefined, // this.createGuardianInput,
    healthStatus: undefined, // this.createHealthStatusInput,
    educationalRecord: undefined, // this.createEducationalRecordInput,
    documents: [],
    housing: undefined, // this.createOrphanHousingInput,
    assets: [],
    photos: undefined, // this.createOrphanPhotoInput,
  },

  createFatherInput: {
    firstName: undefined,
    lastName: undefined,
    dateOfBirth: undefined,
    dateOfDeath: undefined,
    causeOfDeath: undefined,
    deathCertificateUrl: undefined,
  },

  createMotherInput: {
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    dateOfBirth: undefined,
    dateOfDeath: undefined,
    causeOfDeath: undefined,
    vitalStatus: undefined,
    maritalStatus: undefined,
  },

  createGuardianInput: {
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    gender: undefined,
    dateOfBirth: undefined,
    nationality: undefined,
    monthlyExpense: undefined,
    relationToOrphan: undefined,
    mobileNumber: undefined,
    telephoneNumber: undefined,
    idCardUrl: undefined,
    memorandumOfUnderstandingUrl: undefined,
    adoptionCertificateUrl: undefined,
  },

  createEducationalRecordInput: {
    enrollmentStatus: undefined,
    schoolName: undefined,
    gradeAgeMismatchReason: undefined,
    level: undefined,
    reason: undefined,
    typeOfSchool: undefined,
    year: undefined,
    reportCard: {},
  },

  createHealthStatusInput: {
    psychologicalStatus: undefined,
    description: undefined,
  },

  createOrphanHousingInput: {
    livingArrangement: undefined,
    houseType: undefined,
  },

  createOrphanAssetInput: {
    name: undefined,
    description: undefined,
    amount: undefined,
    unit: undefined,
    attachments: [],
  },

  createOrphanDocumentInput: {
    documentType: undefined,
    documentUrl: undefined,
  },

  createOrphanPhotoInput: {
    photoPortraitUrl: undefined,
    photoLongUrl: undefined,
  },
})

export const getters = {
  activeStep: (state) => state.activeStep,
  totalSteps: (state) => state.totalSteps,
  registrationSteps: (state) => state.registrationSteps,
  getOrphanDetails: ({
    createOrphanInput: {
      code,
      name,
      gender,
      dateOfBirth,
      placeOfBirth,
      religion,
      spokenLanguages,
      hobbies,
    },
    createFatherInput: { firstName: fatherName, lastName: grandFatherName },
  }) => {
    return {
      code,
      name,
      fatherName,
      grandFatherName,
      gender,
      dateOfBirth,
      placeOfBirth,
      religion,
      spokenLanguages,
      hobbies,
    }
  },

  getOrphanEducation: ({
    createEducationalRecordInput: {
      enrollmentStatus,
      schoolName,
      gradeAgeMismatchReason,
      level,
      reason,
      typeOfSchool,
      year,
    },
  }) => {
    return {
      enrollmentStatus,
      schoolName,
      gradeAgeMismatchReason,
      level,
      reason,
      typeOfSchool,
      year,
    }
  },

  getOrphanFamily: ({
    createFatherInput: {
      dateOfBirth: fatherDateOfBirth,
      dateOfDeath: fatherDateOfDeath,
      causeOfDeath: fatherCauseOfDeath,
    },
    createMotherInput: {
      firstName: motherFirstName,
      middleName: motherMiddleName,
      lastName: motherLastName,
      vitalStatus: motherVitalStatus,
      maritalStatus: motherMaritalStatus,
      dateOfBirth: motherDateOfBirth,
      dateOfDeath: motherDateOfDeath,
      causeOfDeath: motherCauseOfDeath,
    },
  }) => {
    return {
      fatherDateOfBirth,
      fatherDateOfDeath,
      fatherCauseOfDeath,
      motherFirstName,
      motherMiddleName,
      motherLastName,
      motherVitalStatus,
      motherMaritalStatus,
      motherDateOfBirth,
      motherDateOfDeath,
      motherCauseOfDeath,
    }
  },

  getOrphanGuardian: ({
    createGuardianInput: {
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      nationality,
      monthlyExpense,
      relationToOrphan,
      mobileNumber,
      telephoneNumber,
    },
  }) => {
    return {
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      nationality,
      monthlyExpense,
      relationToOrphan,
      mobileNumber,
      telephoneNumber,
    }
  },

  getOrphanSupplementary: ({
    createHealthStatusInput: { psychologicalStatus, healthDescription },
    createOrphanHousingInput: { livingArrangement, houseType },
    createOrphanInput: { assets },
  }) => {
    return {
      psychologicalStatus,
      healthDescription,
      livingArrangement,
      houseType,
      assets,
    }
  },
}

export const mutations = {
  SET_VILLAGE_ID(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')

    console.log('SET_VILLAGE_ID', payload)

    state.createOrphanInput.villageId = payload
  },

  SET_ACTIVE_STEP(state, payload) {
    if (typeof payload !== 'number')
      throw new TypeError('Payload must be a number')

    if (payload < 0 || payload > state.totalSteps)
      throw new RangeError('Payload must be between 0 and ' + state.totalSteps)

    state.activeStep = payload
  },

  MODIFY_ORPHAN_INPUT(state, { documents: _, ...payload }) {
    console.log('MODIFY_ORPHAN_INPUT', payload)
    state.createOrphanInput = {
      ...state.createOrphanInput,
      ...payload,
    }
  },

  ADD_HOBBY_TO_ORPHAN_INPUT(state, payload) {
    state.createOrphanInput.hobbies.push(payload)
    console.log('ADD_HOBBY_TO_ORPHAN_INPUT', state.createOrphanInput.hobbies)
  },

  REMOVE_HOBBY_FROM_ORPHAN_INPUT(state, payload) {
    state.createOrphanInput.hobbies.splice(payload, 1)
    console.log(
      'REMOVE_HOBBY_FROM_ORPHAN_INPUT',
      state.createOrphanInput.hobbies
    )
  },

  MODIFY_CREATE_FATHER_INPUT(state, payload) {
    console.log('MODIFY_CREATE_FATHER_INPUT', payload)
    state.createFatherInput = {
      ...state.createFatherInput,
      ...payload,
    }
  },

  MODIFY_CREATE_MOTHER_INPUT(state, payload) {
    console.log('MODIFY_CREATE_MOTHER_INPUT', payload)
    state.createMotherInput = {
      ...state.createMotherInput,
      ...payload,
    }
  },

  MODIFY_CREATE_GUARDIAN_INPUT(state, payload) {
    console.log('MODIFY_CREATE_GUARDIAN_INPUT', payload)

    state.createGuardianInput = {
      ...state.createGuardianInput,
      ...payload,
    }
  },

  MODIFY_CREATE_HEALTH_STATUS_INPUT(state, payload) {
    console.log('MODIFY_CREATE_HEALTH_STATUS_INPUT', payload)
    state.createHealthStatusInput = {
      ...state.createHealthStatusInput,
      ...payload,
    }
  },

  MODIFY_CREATE_ORPHAN_HOUSING_INPUT(state, payload) {
    console.log('MODIFY_CREATE_ORPHAN_HOUSING_INPUT', payload)
    state.createOrphanHousingInput = {
      ...state.createOrphanHousingInput,
      ...payload,
    }
  },

  MODIFY_EDUCATIONAL_RECORD_INPUT(state, payload) {
    console.log('MODIFY_EDUCATIONAL_RECORD_INPUT', payload)

    state.createEducationalRecordInput = {
      ...state.createEducationalRecordInput,
      ...payload,
    }
  },

  MODIFY_CREATE_ORPHAN_ASSET_INPUT(state, payload) {
    console.log('MODIFY_CREATE_ORPHAN_ASSET_INPUT', payload)
    state.createOrphanAssetInput = {
      ...state.createOrphanAssetInput,
      ...payload,
    }
  },

  ADD_ASSET_TO_ORPHAN(state) {
    if (
      state.createOrphanAssetInput === null ||
      state.createOrphanAssetInput === undefined
    )
      throw new TypeError('Payload must not be empty')

    state.createOrphanInput.assets.push(state.createOrphanAssetInput)
    console.log('ADD_ASSET_TO_ORPHAN', state.createOrphanInput.assets)
  },

  REMOVE_ASSET_FROM_ORPHAN(state, payload) {
    if (payload === null || payload === undefined)
      throw new TypeError('Payload must not be empty')

    console.log('REMOVE_ASSET_FROM_ORPHAN', payload)

    state.createOrphanInput.assets.splice(payload, 1)
  },

  CLEAR_ORPHAN_ASSET_INPUT(state) {
    state.createOrphanAssetInput = {
      name: '',
      description: '',
      amount: '',
      unit: '',
      attachments: [],
    }
  },

  ADD_DOCUMENT_TO_ORPHAN(state, payload) {
    if (payload === null || payload === undefined)
      throw new TypeError('Payload must not be empty')

    if (!Array.isArray(payload)) throw new TypeError('Payload must be an array')

    if (payload.some((item) => typeof item !== 'object'))
      throw new TypeError('Payload must be an array of objects')

    if (payload.some((item) => !item?.documentType))
      throw new TypeError(
        'Payload must be an array of objects with documentType property'
      )

    const documents = state.createOrphanInput.documents.map((item) => {
      const newDoc = payload.find(
        (item2) => item?.documentType === item2?.documentType
      )
      return newDoc || item
    })

    state.createOrphanInput = {
      ...state.createOrphanInput,
      documents,
    }
  },

  SET_CREATE_ORPHAN_PHOTO_INPUT(state, payload) {
    if (payload === null || payload === undefined)
      throw new TypeError('Payload must not be empty')

    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an object')

    state.createOrphanPhotoInput = payload
  },
}

export const actions = {
  nextStep({ commit, state }) {
    if (state.activeStep === 6) return

    commit('SET_ACTIVE_STEP', state.activeStep + 1)
  },

  previousStep({ commit, state }) {
    if (state.activeStep === 0) return

    commit('SET_ACTIVE_STEP', state.activeStep - 1)
  },

  // *** Orphan Detail ***

  setCode({ commit }, payload) {
    commit('MODIFY_ORPHAN_INPUT', { code: payload })
  },

  setGender({ commit }, payload) {
    commit('MODIFY_ORPHAN_INPUT', { gender: toEnumString(payload) })
  },

  setOrphanName({ commit }, payload) {
    commit('MODIFY_ORPHAN_INPUT', { name: payload })
  },

  setFatherName({ commit }, payload) {
    commit('MODIFY_CREATE_FATHER_INPUT', { firstName: payload })
  },

  setGrandFatherName({ commit }, payload) {
    commit('MODIFY_CREATE_FATHER_INPUT', { lastName: payload })
  },

  setDateOfBirth({ commit }, payload) {
    // TODO: Calculate age and set enrollment status is orphan is under age
    commit('MODIFY_ORPHAN_INPUT', { dateOfBirth: payload })
  },

  setPlaceOfBirth({ commit }, payload) {
    commit('MODIFY_ORPHAN_INPUT', { placeOfBirth: payload })
  },

  setReligion({ commit }, payload) {
    commit('MODIFY_ORPHAN_INPUT', { religion: payload })
  },

  setSpokenLanguages({ commit }, payload) {
    commit('MODIFY_ORPHAN_INPUT', { spokenLanguages: payload })
  },

  addHobby({ commit }, payload) {
    commit('ADD_HOBBY_TO_ORPHAN_INPUT', payload)
  },

  deleteHobby({ commit }, payload) {
    commit('REMOVE_HOBBY_FROM_ORPHAN_INPUT', payload)
  },

  // *** Educational Record ***

  setEnrollmentStatus({ commit }, payload) {
    commit('MODIFY_EDUCATIONAL_RECORD_INPUT', {
      enrollmentStatus: toEnumString(payload),
    })
  },

  setSchoolLevel({ commit }, payload) {
    commit('MODIFY_EDUCATIONAL_RECORD_INPUT', { level: toEnumString(payload) })
  },

  setSchoolYear({ commit }, payload) {
    if (payload !== null && payload !== undefined)
      commit('MODIFY_EDUCATIONAL_RECORD_INPUT', { year: payload })
  },

  setSchoolType({ commit }, payload) {
    commit('MODIFY_EDUCATIONAL_RECORD_INPUT', {
      typeOfSchool: toEnumString(payload),
    })
  },

  setSchoolName({ commit }, payload) {
    commit('MODIFY_EDUCATIONAL_RECORD_INPUT', { schoolName: payload })
  },

  setGradeAgeMismatchReason({ commit }, payload) {
    commit('MODIFY_EDUCATIONAL_RECORD_INPUT', {
      gradeAgeMismatchReason: payload,
    })
  },

  setReason({ commit }, payload) {
    commit('MODIFY_EDUCATIONAL_RECORD_INPUT', { reason: payload })
  },

  // *** Orphan Family ***

  setFatherDateOfBirth({ commit }, payload) {
    commit('MODIFY_CREATE_FATHER_INPUT', { dateOfBirth: payload })
  },

  setFatherDateOfDeath({ commit }, payload) {
    commit('MODIFY_CREATE_FATHER_INPUT', { dateOfDeath: payload })
  },

  setFatherCauseOfDeath({ commit }, payload) {
    commit('MODIFY_CREATE_FATHER_INPUT', { causeOfDeath: payload })
  },

  setMotherFirstName({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', { firstName: payload })
  },

  setMotherMiddleName({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', { middleName: payload })
  },

  setMotherLastName({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', { lastName: payload })
  },

  setMotherVitalStatus({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', { vitalStatus: toEnumString(payload) })
  },

  setMotherMaritalStatus({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', {
      maritalStatus: toEnumString(payload),
    })
  },

  setMotherDateOfBirth({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', { dateOfBirth: payload })
  },

  setMotherDateOfDeath({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', { dateOfDeath: payload })
  },

  setMotherCauseOfDeath({ commit }, payload) {
    commit('MODIFY_CREATE_MOTHER_INPUT', { causeOfDeath: payload })
  },

  // *** Orphan Guardian ***

  setGuardianFirstName({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { firstName: payload })
  },

  setGuardianMiddleName({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { middleName: payload })
  },

  setGuardianLastName({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { lastName: payload })
  },

  setGuardianGender({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { gender: toEnumString(payload) })
  },

  setGuardianDateOfBirth({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { dateOfBirth: payload })
  },

  setGuardianRelationToOrphan({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', {
      relationToOrphan: toEnumString(payload),
    })
  },

  setGuardianNationality({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { nationality: payload })
  },

  setGuardianMonthlyExpense({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { monthlyExpense: +payload })
  },

  setGuardianMobileNumber({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { mobileNumber: payload })
  },

  setGuardianTelephoneNumber({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', { telephoneNumber: payload })
  },

  // *** Orphan Supplementary ***

  setPsychologicalStatus({ commit }, payload) {
    commit('MODIFY_CREATE_HEALTH_STATUS_INPUT', {
      psychologicalStatus: toEnumString(payload),
    })
  },

  setHealthDescription({ commit }, payload) {
    commit('MODIFY_CREATE_HEALTH_STATUS_INPUT', { description: payload })
  },

  setLivingArrangement({ commit }, payload) {
    commit('MODIFY_CREATE_ORPHAN_HOUSING_INPUT', { livingArrangement: payload })
  },

  setHouseType({ commit }, payload) {
    commit('MODIFY_CREATE_ORPHAN_HOUSING_INPUT', { houseType: payload })
  },

  setAssetName({ commit }, payload) {
    commit('MODIFY_CREATE_ORPHAN_ASSET_INPUT', { name: payload })
  },

  setAssetDescription({ commit }, payload) {
    commit('MODIFY_CREATE_ORPHAN_ASSET_INPUT', { description: payload })
  },

  setAssetAmount({ commit }, payload) {
    commit('MODIFY_CREATE_ORPHAN_ASSET_INPUT', { amount: payload })
  },

  setAssetUnit({ commit }, payload) {
    commit('MODIFY_CREATE_ORPHAN_ASSET_INPUT', { unit: payload })
  },

  setAssetAttachments({ commit }, payload) {
    commit('MODIFY_CREATE_ORPHAN_ASSET_INPUT', { attachments: payload })
  },

  addAssetToOrphan({ commit }) {
    commit('ADD_ASSET_TO_ORPHAN')
    commit('CLEAR_ORPHAN_ASSET_INPUT')
  },

  resetAsset({ commit }) {
    commit('CLEAR_ORPHAN_ASSET_INPUT')
  },

  deleteAsset({ commit }, payload) {
    commit('REMOVE_ASSET_FROM_ORPHAN', payload)
  },

  // *** Orphan Documents ***

  addDocumentsToOrphan({ commit }, payload) {
    commit('ADD_DOCUMENT_TO_ORPHAN', payload)
  },

  setOrphanPhoto({ commit }, payload) {
    commit('SET_CREATE_ORPHAN_PHOTO_INPUT', {
      photoPortraitUrl: payload,
      photoLongUrl: payload,
    })
  },

  setFatherDeathCertificate({ commit }, payload) {
    commit('MODIFY_CREATE_FATHER_INPUT', { deathCertificateUrl: payload })
  },

  setReportCard({ commit }, payload) {
    commit('MODIFY_EDUCATIONAL_RECORD_INPUT', { reportCard: payload })
  },

  addGuardianDocuments({ commit }, payload) {
    commit('MODIFY_CREATE_GUARDIAN_INPUT', payload)
  },

  // *** Orphan Submit ***

  async submitOrphan({ commit, state }) {
    state.createOrphanInput.father = state.createFatherInput
    state.createOrphanInput.mother = state.createMotherInput
    state.createOrphanInput.guardian = state.createGuardianInput
    state.createOrphanInput.healthStatus = state.createHealthStatusInput
    state.createOrphanInput.educationalRecord =
      state.createEducationalRecordInput
    state.createOrphanInput.housing = state.createOrphanHousingInput
    state.createOrphanInput.photos = state.createOrphanPhotoInput
    try {
      const orphan = state.createOrphanInput

      const data = await createOrphanWithNestedCreate(orphan)
      console.log(data)
      this.$toaster.showToast({
        content: 'Orphan created successfully',
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

  setVillageId({ commit }, payload) {
    commit('SET_VILLAGE_ID', payload)
  },
}
