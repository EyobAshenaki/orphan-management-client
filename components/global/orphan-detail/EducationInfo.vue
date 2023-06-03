<template>
  <section class="tw-bg-white tw-rounded-md tw-p-5">
    <div class="tw-absolute tw-top-11 tw-right-6">
      <button-dark class="tw-mr-2" @click="toggleHistory">
        <fa-layers class="tw-mr-2">
          <fa :icon="['fa', 'clock-rotate-left']" />
        </fa-layers>
        <span
          ><span v-if="!isHistoryVisible">Show</span>
          <span v-else>Hide</span> History</span
        >
      </button-dark>

      <!-- <button-light v-if="isEditShowing" @click="isEditable = !isEditable"> -->
      <button-light v-if="false" @click="isEditable = !isEditable">
        <fa-layers class="tw-mr-2">
          <fa :icon="['fa', 'pen-to-square']" />
        </fa-layers>
        <span>Edit</span>
      </button-light>
    </div>

    <v-form
      v-if="!isHistoryVisible && enrollmentStatus !== null"
      ref="form"
      v-model="valid"
      class="tw-max-w-[37rem]"
    >
      <div class="form-control">
        <label class="form-label"> Enrollment Status </label>
        <v-radio-group
          v-model="enrollmentStatus"
          :rules="[rules.required]"
          required
          class="-tw-mt-1"
          row
        >
          <custom-radio
            v-if="isEditable || enrollmentStatus === 'ENROLLED'"
            :class="[isEnrolled ? 'tw-border-emerald-800' : '']"
            label="Enrolled"
            value="ENROLLED"
          />
          <custom-radio
            v-if="isEditable || enrollmentStatus === 'DROPPED_OUT'"
            :class="[isDroppedOut ? 'tw-border-emerald-800' : '']"
            label="Drop-out"
            value="DROPPED_OUT"
          />
          <custom-radio
            v-if="isEditable || enrollmentStatus === 'NOT_ENROLLED'"
            :class="[isNotEnrolled ? 'tw-border-emerald-800' : '']"
            label="Unenrolled"
            value="NOT_ENROLLED"
          />
        </v-radio-group>
      </div>

      <div v-if="isEnrolled || isDroppedOut">
        <div class="form-control">
          <label class="form-label"> School Level </label>
          <v-radio-group
            v-model="schoolLevel"
            :rules="[rules.required]"
            requiredclass="-tw-mt-1"
            row
          >
            <custom-radio
              v-if="isEditable || isReligiousSchool"
              :class="[isReligiousSchool ? 'tw-border-emerald-800' : '']"
              label="Religious"
              value="RELIGIOUS_EDUCATION"
            />
            <custom-radio
              v-if="isEditable || isPreschool"
              :class="[isPreschool ? 'tw-border-emerald-800' : '']"
              label="Pre-School"
              value="PRE_SCHOOL"
            />
            <custom-radio
              v-if="isEditable || isElementary"
              :class="[isElementary ? 'tw-border-emerald-800' : '']"
              label="Primary/Elementary"
              value="PRIMARY_ELEMENTARY"
            />
            <custom-radio
              v-if="isEditable || isJunior"
              :class="[isJunior ? 'tw-border-emerald-800' : '']"
              label="Junior"
              value="JUNIOR"
            />
            <custom-radio
              v-if="isEditable || isHighschool"
              :class="[isHighschool ? 'tw-border-emerald-800' : '']"
              label="High School"
              value="HIGH_SCHOOL"
            />
            <custom-radio
              v-if="isEditable || isOther"
              :class="[isOther ? 'tw-border-emerald-800' : '']"
              label="Other"
              value="OTHER"
            />
          </v-radio-group>
        </div>

        <div v-if="isReligiousSchool" class="form-control">
          <label class="form-label"> School Year </label>

          <v-radio-group
            v-model="schoolYear"
            :rules="[rules.required]"
            required
            class="-tw-mt-1"
            row
          >
            <custom-radio
              v-for="year in religiousSchoolYears"
              :key="year.id"
              :class="[
                schoolYear === year.value ? 'tw-border-emerald-800' : '',
              ]"
              :label="year.label"
              :value="year.value"
            />
          </v-radio-group>
        </div>

        <div v-if="isPreschool" class="form-control">
          <label class="form-label"> School Year </label>

          <v-radio-group
            v-model="schoolYear"
            :rules="[rules.required]"
            required
            class="-tw-mt-1"
            row
          >
            <custom-radio
              v-for="year in preschoolSchoolYears"
              :key="year.id"
              :class="[
                schoolYear === year.value ? 'tw-border-emerald-800' : '',
              ]"
              :label="year.label"
              :value="year.value"
            />
          </v-radio-group>
        </div>

        <div v-if="isElementary" class="form-control">
          <label class="form-label"> School Year </label>

          <v-radio-group
            v-model="schoolYear"
            :rules="[rules.required]"
            required
            class="-tw-mt-1"
            row
          >
            <custom-radio
              v-for="year in elementarySchoolYears"
              :key="year.id"
              :class="[
                schoolYear === year.value ? 'tw-border-emerald-800' : '',
              ]"
              :label="year.label"
              :value="year.value"
            />
          </v-radio-group>
        </div>

        <div v-if="hasGradeAgeMismatch" class="form-control">
          <label class="form-label">
            Grade / Age Mismatch Reason (Optional)
          </label>
          <v-text-field
            v-model="gradeAgeMismatchReason"
            :rules="[rules.textWithSpaces]"
            class="tw-w-1/2"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> School Type </label>
          <v-radio-group
            v-model="schoolType"
            :rules="[rules.required]"
            required
            class="-tw-mt-1"
            row
          >
            <custom-radio
              v-if="schoolType === 'PUBLIC'"
              :class="[schoolType === 'PUBLIC' ? 'tw-border-emerald-800' : '']"
              label="Public"
              value="PUBLIC"
            />
            <custom-radio
              v-if="schoolType === 'PRIVATE'"
              :class="[schoolType === 'PRIVATE' ? 'tw-border-emerald-800' : '']"
              label="Private"
              value="PRIVATE"
            />
          </v-radio-group>
        </div>
      </div>

      <div class="form-control-group">
        <div v-if="isEnrolled || isDroppedOut" class="form-control">
          <label class="form-label"> School Name </label>
          <v-text-field
            v-model="schoolName"
            :rules="[rules.required, rules.textWithSpaces]"
            required
            :class="[isEnrolled ? 'tw-w-1/2' : '']"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div v-if="isNotEnrolled || isDroppedOut" class="form-control">
          <label class="form-label"> {{ reasonLabel }} </label>
          <v-text-field
            v-model="reason"
            :rules="[rules.required, rules.textWithSpaces]"
            required
            :class="[isNotEnrolled ? 'tw-w-1/2' : '']"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div v-if="isEditable" class="tw-flex tw-justify-between tw-mt-8">
        <button-dark
          class="tw-bg-red-800 hover:tw-bg-red-700 tw-rounded-lg tw-py-6 tw-px-5"
          @click="cancel"
        >
          <fa-layers class="fa-lg">
            <fa :icon="['fa', 'arrow-left-long']" />
          </fa-layers>
          <span class="tw-ml-4"> Cancel </span>
        </button-dark>

        <button-dark
          :disabled="!valid"
          class="tw-rounded-lg tw-py-6 tw-px-5"
          @click="submit"
        >
          Confirm
          <fa-layers class="fa-lg tw-ml-4">
            <fa :icon="['fa', 'arrow-right-long']" />
          </fa-layers>
        </button-dark>
      </div>
    </v-form>

    <div v-else class="tw-mt-10">
      <education-history :orphan-id="$route.params.orphanId" />
    </div>
  </section>
</template>

<script>
import uniqueId from 'lodash/uniqueId'
import EducationHistory from './EducationHistory.vue'
import ButtonDark from '~/components/global/ButtonDark.vue'
import ButtonLight from '~/components/global/ButtonLight.vue'
import CustomRadio from '~/components/global/CustomRadio.vue'

export default {
  name: 'EducationInfoTab',
  components: {
    ButtonDark,
    ButtonLight,
    CustomRadio,
    EducationHistory,
  },

  data() {
    return {
      isEditable: false,
      valid: false,
      rules: {
        required: (value) => !!value || 'Required.',
        textWithSpaces: (value) =>
          /^[a-zA-Z ,./]+$/.test(value) ||
          !value ||
          'Only letters and spaces allowed.',
      },
      isHistoryVisible: false,
      isEditShowing: true,
    }
  },

  computed: {
    religiousSchoolYears() {
      return [
        { id: uniqueId('schoolType-'), label: '1st Year', value: '1' },
        { id: uniqueId('schoolType-'), label: '2nd Year', value: '2' },
        { id: uniqueId('schoolType-'), label: '3rd Year', value: '3' },
      ].filter((year) => year.value === this.schoolYear)
    },

    preschoolSchoolYears() {
      return [
        {
          id: uniqueId('schoolType-'),
          label: 'Preparatory',
          value: 'preparatory',
        },
        { id: uniqueId('schoolType-'), label: 'Nursery', value: 'nursery' },
        { id: uniqueId('schoolType-'), label: 'LKG', value: 'lkg' },
        { id: uniqueId('schoolType-'), label: 'UKG', value: 'ukg' },
      ].filter((year) => year.value === this.schoolYear)
    },

    elementarySchoolYears() {
      return [
        { id: uniqueId('schoolType-'), label: '1st Grade', value: '1' },
        { id: uniqueId('schoolType-'), label: '2nd Grade', value: '2' },
        { id: uniqueId('schoolType-'), label: '3rd Grade', value: '3' },
        { id: uniqueId('schoolType-'), label: '4th Grade', value: '4' },
        { id: uniqueId('schoolType-'), label: '5th Grade', value: '5' },
        { id: uniqueId('schoolType-'), label: '6th Grade', value: '6' },
      ].filter((year) => year.value === this.schoolYear)
    },

    reasonLabel() {
      if (this.enrollmentStatus === 'DROPPED_OUT')
        return 'Reason for Dropping Out'
      else if (this.enrollmentStatus === 'NOT_ENROLLED')
        return 'Reason for Not Enrolling'
      return 'Reason'
    },

    isReligiousSchool() {
      return this.schoolLevel === 'RELIGIOUS_EDUCATION'
    },

    isPreschool() {
      return this.schoolLevel === 'PRE_SCHOOL'
    },

    isElementary() {
      return this.schoolLevel === 'PRIMARY_ELEMENTARY'
    },

    isJunior() {
      return this.schoolLevel === 'JUNIOR'
    },

    isHighschool() {
      return this.schoolLevel === 'HIGH_SCHOOL'
    },

    isOther() {
      return this.schoolLevel === 'OTHER'
    },

    isEnrolled() {
      return this.enrollmentStatus === 'ENROLLED'
    },

    isDroppedOut() {
      return this.enrollmentStatus === 'DROPPED_OUT'
    },

    isNotEnrolled() {
      return this.enrollmentStatus === 'NOT_ENROLLED'
    },

    hasGradeAgeMismatch() {
      return this.gradeAgeMismatchReason?.length > 0
    },

    enrollmentStatus: {
      get() {
        return this.$store.getters['orphan/orphanEducation'].enrollmentStatus
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_EDUCATION', {
          enrollmentStatus: value,
        })
      },
    },

    schoolLevel: {
      get() {
        return this.$store.getters['orphan/orphanEducation'].level
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_EDUCATION', {
          level: value,
        })
      },
    },

    schoolYear: {
      get() {
        return this.$store.getters['orphan/orphanEducation'].year
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_EDUCATION', {
          year: value,
        })
      },
    },

    gradeAgeMismatchReason: {
      get() {
        return this.$store.getters['orphan/orphanEducation']
          .gradeAgeMismatchReason
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_EDUCATION', {
          gradeAgeMismatchReason: value,
        })
      },
    },

    schoolType: {
      get() {
        return this.$store.getters['orphan/orphanEducation'].typeOfSchool
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_EDUCATION', {
          typeOfSchool: value,
        })
      },
    },

    schoolName: {
      get() {
        return this.$store.getters['orphan/orphanEducation'].schoolName
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_EDUCATION', {
          schoolName: value,
        })
      },
    },

    reason: {
      get() {
        return this.$store.getters['orphan/orphanEducation'].reason
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_EDUCATION', {
          reason: value,
        })
      },
    },
  },

  watch: {
    enrollmentStatus() {
      this.$refs.form?.resetValidation()
    },

    schoolLevel() {
      this.$refs.form?.resetValidation()
    },
  },

  async mounted() {
    await this.initialize()
  },

  methods: {
    async initialize() {
      const orphanId = this.$route.params.orphanId
      await this.$store.dispatch('orphan/fetchOrphanEducation', orphanId)
    },

    toggleHistory() {
      this.isHistoryVisible = !this.isHistoryVisible
      this.isEditShowing = !this.isEditShowing
    },

    cancel() {
      this.isEditable = false

      this.$toaster.showToast({
        content: 'Profile Edit Cancelled',
        state: 'error',
      })
    },
    submit() {
      if (!this.$refs.form.validate()) return

      this.isEditable = false

      this.$toaster.showToast({
        content: 'Profile Edited successfully',
        state: 'success',
      })
    },
  },
}
</script>

<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}

.form-control-group {
  @apply tw-flex tw-gap-4;
}

.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
