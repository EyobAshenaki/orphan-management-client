<template>
  <v-card class="tw-max-w-xl" elevation="0">
    <v-card-title class="-tw-mb-4">New Project</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="projectForm" @submit.prevent="saveProject">
        <div class="tw-flex tw-flex-row tw-gap-3">
          <div class="form-control">
            <label class="form-label"> Start Date </label>
            <custom-date-picker v-model="startDate" />
          </div>
          <div class="form-control">
            <label class="form-label">Project Number</label>
            <v-text-field
              v-model.trim="number"
              :rules="[rules.required]"
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
          <div class="form-control">
            <label class="form-label">Duration</label>
            <v-text-field
              v-model.trim="durationInYears"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="form-control">
            <label class="form-label">Max. Beneficiaries</label>
            <v-text-field
              v-model.trim="maximumNumberOfBeneficiaries"
              :rules="[rules.required]"
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
          <div class="form-control">
            <label class="form-label">Total Budget</label>
            <v-text-field
              v-model.trim="grandTotalBudget"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="form-control">
            <label class="form-label">Administrative Cost</label>
            <v-text-field
              v-model.trim="administrativeCost"
              :rules="[rules.required]"
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
          <div class="form-control">
            <label class="form-label">Project Proposal</label>
            <custom-file-input
              :rules="[rules.required, rules.isLt2MB]"
              accept=".pdf,.doc,.docx"
              @fileChange="handleFileChange($event, 'projectProposal')"
            />
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-gap-3">
          <div class="form-control">
            <label class="form-label"> Region </label>
            <v-select
              v-model="regionId"
              :items="regionOptions"
              :rules="[rules.required]"
              placeholder="Select a Region"
              no-data-text="No Regions Found"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="form-label"> Zone </label>
            <v-select
              v-model="zoneId"
              :items="zoneOptions"
              :rules="[rules.required]"
              placeholder="Select a Zone"
              no-data-text="No Zones Found"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="form-label"> Districts </label>
            <v-select
              v-model="districtsIds"
              :items="districtOptions"
              :rules="[rules.required]"
              placeholder="Select Districts"
              no-data-text="No Districts Found"
              multiple
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-3">
          <div class="tw-w-full tw-flex tw-justify-end">
            <button-dark @click="saveProject">Save</button-dark>
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="projectNumber"
        item-type="Project"
        no-route="/projects"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { GraphQLError } from 'graphql'
import moment from 'moment'
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
import { handleUrlUpload } from '~/helpers/upload.helper'
import {
  fetchDistricts,
  fetchRegions,
  fetchZones,
} from '~/services/location.service'
import { createProject } from '~/services/project.service'
export default {
  name: 'AddRegion',
  components: {
    PostSaveDialog,
  },
  layout: 'dashboard',
  data() {
    return {
      startDate: null,
      number: null,
      projectNumber: null,
      durationInYears: null,
      maximumNumberOfBeneficiaries: null,
      grandTotalBudget: null,
      administrativeCost: null,
      projectProposal: null,
      districtsIds: [],
      showPostSaveDialog: false,
      rules: {
        required: (value) => !!value || 'Required.',
        isLt2MB: (file) =>
          (file && file?.size < 2 * 1048576) ||
          'File size should be less than 2MB',
      },
      regionId: null,
      regionOptions: [],
      zoneId: null,
      zoneOptions: [],
      districtOptions: [],
    }
  },
  watch: {
    regionId: async function (value) {
      this.zoneId = null
      this.zoneOptions = await this.getZoneOptions(value)
    },
    zoneId: async function (value) {
      this.districtIds = []
      this.districtOptions = await this.getDistrictOptions(value)
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.regionOptions = [
        ...(await fetchRegions()).map((region) => {
          return {
            text: region.name,
            value: region.id,
          }
        }),
      ]
      this.zoneOptions = await this.getZoneOptions()
      this.districtOptions = await this.getDistrictOptions()
    },
    async getZoneOptions(regionId) {
      if (regionId === null) return []
      if (!this.regionId) return []
      return [
        ...(await fetchZones(this.regionId ?? regionId)).map((zone) => {
          return {
            text: zone.name,
            value: zone.id,
          }
        }),
      ]
    },
    async getDistrictOptions(zoneId) {
      if (zoneId === null) return []
      if (!this.zoneId) return []
      return [
        ...(await fetchDistricts(this.zoneId ?? zoneId)).map((district) => {
          return {
            text: district.name,
            value: district.id,
          }
        }),
      ]
    },
    handleFileChange(file, type) {
      this[type] = file
    },
    async saveProject() {
      if (!this.$refs.projectForm.validate()) return
      const startDate = new Date(this.startDate)
      const createProjectInput = {
        administrativeCost: +this.administrativeCost,
        durationInYears: +this.durationInYears,
        endDate: moment(startDate)
          .add(this.durationInYears, 'years')
          .toISOString(),
        grandTotalBudget: +this.grandTotalBudget,
        location: this.districtsIds,
        maximumNumberOfBeneficiaries: +this.maximumNumberOfBeneficiaries,
        number: this.number,
        proposalUrl: `${process.env.NUXT_API_URL}/${await handleUrlUpload(
          this.projectProposal
        )}`,
        startDate: startDate.toISOString(),
        status: 'PENDING',
      }
      this.projectNumber = this.number
      try {
        await createProject(createProjectInput)
        this.$toaster.showToast({
          content: 'Project created successfully',
          state: 'success',
        })
        this.reset()
        // this.$router.back()
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
      }
    },
    reset() {
      this.showPostSaveDialog = true
      this.$refs.projectForm.reset()
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
