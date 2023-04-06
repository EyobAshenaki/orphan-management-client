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
              v-model="regionZones"
              :items="regionOptions"
              :rules="[rules.required]"
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
              v-model="zoneDistricts"
              :items="zoneOptions"
              :rules="[rules.required]"
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
        no-route="/head/projects"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
import { handleUrlUpload } from '~/helpers/upload.helper'
export default {
  name: 'AddRegion',
  components: {
    PostSaveDialog,
  },
  layout: 'head',
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
      regionZones: null,
      zoneDistricts: null,
      zoneOptions: this.getZones(),
      districtOptions: this.getDistricts(),
    }
  },
  computed: {
    regionOptions() {
      return this.$store.state.location.regions.map((region) => {
        return {
          text: region.name,
          value: region.zones,
        }
      })
    },
  },
  watch: {
    regionZones: function (value) {
      this.districtId = null
      const defaultOption = {
        text: 'Select a zone',
        value: null,
      }
      this.districtOptions = [defaultOption]
      this.zoneOptions = value.map((zone) => {
        return {
          text: zone.name,
          value: zone.districts,
        }
      })
    },
    zoneDistricts: function (value) {
      this.districtId = null
      this.districtOptions = value.map((district) => {
        return {
          text: district.name,
          value: district.id,
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('location/fetchRegions')
  },
  methods: {
    getZones() {
      const defaultOption = {
        text: 'Select a zone',
        value: null,
      }
      if (!this.$store.state.location.selectedRegion?.zones)
        return [defaultOption]
      return Array.from(this.$store.state.location.selectedRegion.zones).map(
        (zone) => {
          return {
            text: zone.name,
            value: zone.districts,
          }
        }
      )
    },
    getDistricts() {
      const defaultOption = {
        text: 'Select a district',
        value: null,
      }
      if (!this.$store.state.location.selectedZone?.districts)
        return [defaultOption]
      return Array.from(this.$store.state.location.selectedZone.districts).map(
        (district) => {
          return {
            text: district.name,
            value: district.id,
          }
        }
      )
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
        await this.$store.dispatch('head/createProject', createProjectInput)
        this.reset()
        this.$router.push('/head/projects')
      } catch(e) {
        /* empty */
      } // grounding the error
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
