<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Education
    </h1>

    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem]">
      <div class="form-control mt-5">
        <label class="form-label"> Enrollment Status </label>
        <v-radio-group
          v-model="enrollmentStatus"
          :rules="[rules.required]"
          required
          class="-tw-mt-1"
          row
        >
          <custom-radio
            :class="[isEnrolled ? 'tw-border-emerald-800' : '']"
            label="Enrolled"
            value="ENROLLED"
          />
          <custom-radio
            :class="[isDroppedOut ? 'tw-border-emerald-800' : '']"
            label="Drop-out"
            value="DROPPED_OUT"
          />
          <custom-radio
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
              :class="[isReligiousSchool ? 'tw-border-emerald-800' : '']"
              label="Religious"
              value="RELIGIOUS_EDUCATION"
            />
            <custom-radio
              :class="[isPreschool ? 'tw-border-emerald-800' : '']"
              label="Pre-School"
              value="PRE_SCHOOL"
            />
            <custom-radio
              :class="[isElementary ? 'tw-border-emerald-800' : '']"
              label="Primary/Elementary"
              value="PRIMARY_ELEMENTARY"
            />
          </v-radio-group>
        </div>

        <div v-if="isReligiousSchool" class="form-control">
          <label class="form-label"> School Level </label>

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
          <label class="form-label"> School Level </label>

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
          <label class="form-label"> School Level </label>

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
              :class="[schoolType === 'public' ? 'tw-border-emerald-800' : '']"
              label="Public"
              value="PUBLIC"
            />
            <custom-radio
              :class="[schoolType === 'private' ? 'tw-border-emerald-800' : '']"
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

      <div class="tw-flex tw-justify-between tw-mt-8">
        <button-dark
          class="tw-bg-red-800 hover:tw-bg-red-700 tw-rounded-lg tw-py-6 tw-px-5"
          @click="back"
        >
          <fa-layers class="fa-lg">
            <fa :icon="['fa', 'arrow-left-long']" />
          </fa-layers>
          <span class="tw-ml-4"> Back </span>
        </button-dark>

        <button-dark
          :disabled="!valid"
          class="tw-rounded-lg tw-py-6 tw-px-5"
          @click="submit"
        >
          Continue
          <fa-layers class="fa-lg tw-ml-4">
            <fa :icon="['fa', 'arrow-right-long']" />
          </fa-layers>
        </button-dark>
      </div>
    </v-form>
  </section>
</template>

<script>
import uniqueId from 'lodash/uniqueId'
import ButtonDark from '~/components/global/ButtonDark.vue'
import CustomRadio from '~/components/global/CustomRadio.vue'

export default {
  name: 'OrphanDetailStep',
  components: {
    ButtonDark,
    CustomRadio,
  },

  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || 'Required.',
        textWithSpaces: (value) =>
          /^[a-zA-Z ]+$/.test(value) ||
          !value ||
          'Only letters and spaces allowed.',
      },
    }
  },

  computed: {
    religiousSchoolYears() {
      return [
        { id: uniqueId('schoolType-'), label: '1st Year', value: '1' },
        { id: uniqueId('schoolType-'), label: '2nd Year', value: '2' },
        { id: uniqueId('schoolType-'), label: '3rd Year', value: '3' },
      ]
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
      ]
    },

    elementarySchoolYears() {
      return [
        { id: uniqueId('schoolType-'), label: '1st Grade', value: '1' },
        { id: uniqueId('schoolType-'), label: '2nd Grade', value: '2' },
        { id: uniqueId('schoolType-'), label: '3rd Grade', value: '3' },
        { id: uniqueId('schoolType-'), label: '4th Grade', value: '4' },
        { id: uniqueId('schoolType-'), label: '5th Grade', value: '5' },
        { id: uniqueId('schoolType-'), label: '6th Grade', value: '6' },
      ]
    },

    reasonLabel() {
      if (this.enrollmentStatus === 'dropout') return 'Reason for Dropping Out'
      else if (this.enrollmentStatus === 'unenrolled')
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
      return true
    },

    enrollmentStatus: {
      get() {
        return this.$store.getters['addOrphan/getOrphanEducation']
          .enrollmentStatus
      },
      set(value) {
        this.$store.dispatch('addOrphan/setEnrollmentStatus', value)
      },
    },

    schoolLevel: {
      get() {
        return this.$store.getters['addOrphan/getOrphanEducation'].level
      },
      set(value) {
        this.$store.dispatch('addOrphan/setSchoolLevel', value)
      },
    },

    schoolYear: {
      get() {
        return this.$store.getters['addOrphan/getOrphanEducation'].year
      },
      set(value) {
        this.$store.dispatch('addOrphan/setSchoolYear', value)
      },
    },

    gradeAgeMismatchReason: {
      get() {
        return this.$store.getters['addOrphan/getOrphanEducation']
          .gradeAgeMismatchReason
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGradeAgeMismatchReason', value)
      },
    },

    schoolType: {
      get() {
        return this.$store.getters['addOrphan/getOrphanEducation'].typeOfSchool
      },
      set(value) {
        this.$store.dispatch('addOrphan/setSchoolType', value)
      },
    },

    schoolName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanEducation'].schoolName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setSchoolName', value)
      },
    },

    reason: {
      get() {
        return this.$store.getters['addOrphan/getOrphanEducation'].reason
      },
      set(value) {
        this.$store.dispatch('addOrphan/setReason', value)
      },
    },
  },

  watch: {
    enrollmentStatus(value) {
      this.$refs.form.resetValidation()
      this.$store.commit('addOrphan/CLEAR_EDUCATIONAL_RECORD_INPUT')

      this.enrollmentStatus = value
    },

    schoolLevel(value) {
      const tempES = this.enrollmentStatus

      this.$refs.form.resetValidation()
      this.$store.commit('addOrphan/CLEAR_EDUCATIONAL_RECORD_INPUT')

      this.enrollmentStatus = tempES
      this.schoolLevel = value
    },
  },

  methods: {
    back() {
      this.$store.dispatch('addOrphan/previousStep')
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addOrphan/nextStep')
      }
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
