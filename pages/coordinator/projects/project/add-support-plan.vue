<template>
  <v-card class="tw-w-160" elevation="0">
    <v-card-title class="-tw-mb-4"> New Support Plan </v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="supportPlanForm" @submit.prevent="saveSupportPlan">
        <div class="tw-flex tw-flex-row tw-gap-3 tw-ml-1">
          <div class="form-control tw-w-80">
            <label class="form-label">Start date</label>
            <custom-date-picker
              v-model="startDate"
              :rules="[rules.required]"
            ></custom-date-picker>
          </div>

          <div class="form-control tw-w-80">
            <label class="form-label">Period in months</label>
            <v-text-field
              v-model.number="period"
              :rules="[rules.required]"
              type="number"
              min="1"
              max="12"
              outlined
              filled
              dense
              color="teal darken-2 tw-w-1/4"
            ></v-text-field>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-3 tw-ml-1">
          <div class="form-control tw-w-80">
            <label class="form-label">Payment interval</label>
            <v-select
              v-model.number="paymentInterval"
              :items="[
                { text: 'Monthly', value: 12 },
                { text: 'Quarterly', value: 3 },
                { text: 'Half-yearly', value: 2 },
                { text: 'Yearly', value: 1 },
              ]"
              :rules="[rules.required]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2 tw-w-1/4"
            ></v-select>
          </div>

          <div class="form-control tw-w-80">
            <label class="form-label">Admin fee percentage</label>
            <v-text-field
              v-model.number="adminFeePercentage"
              :rules="[rules.required]"
              type="number"
              min="0"
              max="30"
              outlined
              filled
              dense
              color="teal darken-2 tw-w-1/4"
            ></v-text-field>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-3 tw-ml-1">
          <div class="form-control tw-w-full">
            <label class="form-label">Total Fund</label>
            <v-text-field
              v-model.number="totalFund"
              type="number"
              outlined
              filled
              dense
              color="teal darken-2 tw-w-1/4"
            ></v-text-field>
          </div>
          <div class="form-control tw-w-full">
            <label class="form-label">Donor</label>
            <v-select
              v-model="donorId"
              :items="donorOptions"
              :rules="[rules.required]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2 tw-w-1/4"
            ></v-select>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-3 tw-ml-1">
          <div class="form-control tw-w-full">
            <label class="form-label">Orphans</label>
            <v-select
              v-model="orphansIds"
              :items="orphansOptions"
              :rules="[rules.requiredArray]"
              outlined
              filled
              dense
              multiple
              item-color="teal darken-2"
              color="teal darken-2 tw-w-1/4"
            ></v-select>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-3">
          <div class="tw-w-full tw-flex tw-justify-end">
            <button-dark @click="saveSupportPlan">Save</button-dark>
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
import { toUpper } from 'lodash'
export default {
  name: 'AddSupportPlanPage',
  components: {},
  layout: 'coordinator',
  data() {
    return {
      startDate: null,
      period: null,
      paymentInterval: null,
      adminFeePercentage: null,
      totalFund: null,
      donorId: null,
      orphansIds: [],
      rules: {
        required: (value) => !!value || 'Required.',
        requiredArray: (value) => value?.length !== 0 || 'Required.',
      },
    }
  },
  computed: {
    donorOptions() {
      return this.$store.getters['coordinator/donorOptions']
    },
    orphansOptions() {
      return this.$store.getters['coordinator/supportPlanOrphansOptions']
    },
  },
  mounted() {
    this.$store.dispatch('coordinator/fetchDonors')
    this.$store.dispatch('coordinator/fetchProjectOrphans', {
      projectId: this.$store.state.coordinator.selectedProjectId,
      status: 'NEW',
    })
  },
  methods: {
    async saveSupportPlan() {
      const startDate = new Date(this.startDate)
      const donorInitials = String(
        Array.from(this.donorOptions).find(
          (option) => option.value === this.donorId
        ).text
      )
        .split(' ')
        .pop()
      const name = `${donorInitials}-${toUpper(
        moment(startDate).format('MMM')
      )}-${startDate.getFullYear()}`
      const createSupportPlanInput = {
        name,
        projectId: this.$store.state.coordinator.selectedProjectId,
        startDate: startDate.toISOString(),
        endDate: new Date(
          startDate.getFullYear(),
          startDate.getMonth() + this.period,
          startDate.getDate()
        ).toISOString(),
        paymentInterval: this.paymentInterval,
        adminFeePercentage: this.adminFeePercentage,
        totalFund: this.totalFund,
        donorId: this.donorId,
        orphansIds: this.orphansIds,
      }
      if (!this.$refs.supportPlanForm.validate()) return
      try {
        await this.$store.dispatch(
          'coordinator/createSupportPlan',
          createSupportPlanInput
        )
        this.$toaster.showToast({
          content: 'Support plan created successfully',
          state: 'success',
        })
        this.$refs.supportPlanForm.reset()
        this.$router.push('/coordinator/projects/project')
      } catch (e) {
        /* empty */
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
