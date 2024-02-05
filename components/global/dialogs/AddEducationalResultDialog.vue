<template>
  <v-dialog
    v-model="newRecordDialogToggle"
    max-width="720px"
    transition="dialog-transition"
  >
    <v-card class="tw-bg-white">
      <v-card-title
        class="tw-text-2xl tw-text-emerald-800 mt-n3 tw-sticky tw-top-0 tw-z-40 tw-bg-gray-100"
      >
        New Educational Result
      </v-card-title>
      <hr />
      <v-divider />
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <div class="form-control mt-5">
            <label class="form-label"> {{ currentYearDivisionLabel }} </label>
            <v-select
              v-model="currentYearDivisionValue"
              :items="currentYearDivisionOptions"
              :rules="[rules.required]"
              placeholder="Select one"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            />
          </div>
          <div class="tw-flex tw-flex-row tw-gap-3">
            <div class="form-control">
              <label class="form-label">Total Mark</label>
              <v-text-field
                v-model.trim="totalMark"
                :rules="[rules.required, rules.positive]"
                type="number"
                min="1"
                outlined
                filled
                dense
                color="teal darken-2"
              ></v-text-field>
            </div>
            <div class="form-control">
              <label class="form-label">Average</label>
              <v-text-field
                v-model.trim="average"
                :rules="[rules.required, rules.positive]"
                type="number"
                min="1"
                outlined
                filled
                dense
                color="teal darken-2"
              ></v-text-field>
            </div>
            <div class="form-control">
              <label class="form-label">Rank</label>
              <v-text-field
                v-model.trim="rank"
                :rules="[rules.required, rules.positive]"
                type="number"
                min="1"
                outlined
                filled
                dense
                color="teal darken-2"
              ></v-text-field>
            </div>
          </div>
          <div class="tw-flex tw-flex-row tw-gap-3">
            <div v-if="endOfYear" class="form-control">
              <label class="form-label">Remark</label>
              <v-select
                v-model="yearOutcome"
                :items="[
                  { text: 'Promoted (Passed)', value: 'PROMOTED' },
                  { text: 'Detained (Repeated)', value: 'DETAINED' },
                ]"
                :rules="[rules.required]"
                outlined
                filled
                dense
                item-color="teal darken-2"
                color="teal darken-2"
              ></v-select>
            </div>
            <div class="form-control">
              <label class="form-label">Report Card</label>
              <custom-file-input
                :rules="[rules.required, rules.isLt2MB]"
                accept=".pdf,.doc,.docx"
                @fileChange="handleFileChange($event, 'reportCard')"
              ></custom-file-input>
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions
        class="tw-sticky tw-bottom-0 tw-z-40 tw-flex tw-flex-row-reverse tw-bg-gray-100"
        ><button-dark
          :disabled="!valid"
          class="tw-rounded-lg tw-py-6 tw-px-5"
          @click="submit"
        >
          Save
          <fa-layers class="fa-lg tw-ml-4">
            <fa :icon="['fa', 'arrow-right-long']" />
          </fa-layers>
        </button-dark>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { startCase } from 'lodash'
import { handleUrlUpload } from '~/helpers/upload.helper'
import {
  createAcademicResult,
  fetchCurrentEducationalRecord,
} from '~/services/orphan.service'
export default {
  name: 'AddEducationalResultDialog',

  props: {
    newRecordDialog: {
      type: Boolean,
      default: true,
    },
    orphanId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || 'Required.',
        positive: (value) => value > 0 || 'Must be positive.',
        isLt2MB: (file) =>
          (file && file?.size < 2 * 1048576) ||
          'File size should be less than 2 MB!',
        textWithSpaces: (value) =>
          /^[a-zA-Z ]+$/.test(value) ||
          !value ||
          'Only letters and spaces allowed.',
      },
      loading: false,
      currentEducationalRecord: null,
      yearDivision: null,
      currentYearDivisionValue: null,
      totalMark: null,
      average: null,
      rank: null,
      yearOutcome: null,
      reportCard: null,
      eoy: null,
    }
  },

  computed: {
    newRecordDialogToggle: {
      get() {
        return this.newRecordDialog
      },
      set(value) {
        this.$emit('update:newRecordDialog', value)
      },
    },

    currentYearDivisionLabel() {
      return startCase(
        (
          this.yearDivision ?? 'Year Division (Semester/Quarter/Term)'
        ).toLowerCase()
      )
    },

    currentYearDivisionOptions() {
      const isQuarter = this.yearDivision === 'QUARTER'
      const isSemester = this.yearDivision === 'SEMESTER'
      return isQuarter
        ? [
            {
              text: 'First (1st Quarter)',
              value: 'FIRST',
            },
            {
              text: 'Second (2nd Quarter)',
              value: 'SECOND',
            },
            {
              text: 'Third (3rd Quarter)',
              value: 'THIRD',
            },
            {
              text: 'Fourth (4th Quarter)',
              value: 'FOURTH',
            },
          ]
        : isSemester
        ? [
            {
              text: 'First (1st Semester)',
              value: 'FIRST',
            },
            {
              text: 'Second (2nd Semester)',
              value: 'SECOND',
            },
          ]
        : []
    },

    endOfYear() {
      return (
        (this.yearDivision === 'SEMESTER' &&
          this.currentYearDivisionValue === 'SECOND') ||
        (this.yearDivision === 'QUARTER' &&
          this.currentYearDivisionValue === 'FOURTH')
      )
    },
  },
  async mounted() {
    await this.initialize()
  },
  methods: {
    async initialize() {
      this.loading = true

      try {
        this.currentEducationalRecord = await fetchCurrentEducationalRecord(
          this.orphanId
        )
        this.yearDivision =
          this.currentEducationalRecord?.schoolInfo?.yearDivision
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    handleFileChange(file, type) {
      this[type] = file
    },
    async submit() {
      this.$refs.form.validate()
      if (this.valid) {
        const {
          academicInfo: { id: academicInfoId },
        } = this.currentEducationalRecord
        const createAcademicResultInput = {
          academicInfoId,
          average: +Number(this.average).toFixed(2),
          currentDivision: this.currentYearDivisionValue,
          rank: +Number(this.rank).toFixed(0),
          reportCard: {
            documentType: 'REPORT_CARD',
            documentUrl: `${process.env.NUXT_API_URL}/${await handleUrlUpload(
              this.reportCard
            )}`,
            orphanId: this.orphanId,
          },
          totalMark: +Number(this.totalMark).toFixed(2),
          yearOutcome: this.endOfYear ? this.yearOutcome : 'NONE',
        }

        try {
          await createAcademicResult(createAcademicResultInput)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
        } finally {
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
          this.$emit('update:newRecordDialog', false)
        }
      }
    },
  },
}
</script>

<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}

.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
