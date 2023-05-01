<template>
  <section>
    <header class="tw-w-full tw-relative tw-bg-white pa-8">
      <h1 class="tw-font-bold tw-text-3xl tw-mb-3">
        Support plan: {{ supportPlanName }}
      </h1>
      <v-spacer></v-spacer>

      <v-tabs
        v-model="tab"
        height="35"
        slider-size="3"
        class="tw-mt-3"
        active-class="tw-text-emerald-800"
      >
        <v-tabs-slider
          class="tw-w-[65%] tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2"
          color="tw-bg-emerald-800"
        ></v-tabs-slider>
        <v-tab
          v-for="(item, idx) in items"
          :key="idx"
          class="tw-capitalize hover:tw-text-emerald-800 hover:tw-bg-emerald-800/5 tw-rounded-[4px] tw-mx-2 tw-px-2"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </header>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <div
          v-if="
            tab === 0 &&
            $store.state.coordinator.selectedSupportPlan.name.length > 0
          "
          class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5"
        >
          <PaymentTable
            @onPaymentClick="navigateToIndividualPaymentsTab($event)"
          />
        </div>
        <div
          v-if="
            tab === 1 && $store.state.coordinator.selectedPayment.id.length > 0
          "
          class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5"
        >
          <IndividualPaymentTable />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>

<script>
import PaymentTable from '~/components/tables/PaymentsTable.vue'
import IndividualPaymentTable from '~/components/tables/IndividualPaymentsTable.vue'
export default {
  name: 'SupportPlanPage',
  components: {
    PaymentTable,
    IndividualPaymentTable,
  },
  layout: 'coordinator',
  data() {
    return {
      tab: null,
      items: ['Payments'],
    }
  },
  computed: {
    supportPlanName() {
      return this.$store.state.coordinator.selectedSupportPlan.name
    },
    adminFeePercentage() {
      return this.$store.state.coordinator.selectedSupportPlan
        .adminFeePercentage
    },
  },
  methods: {
    navigateToIndividualPaymentsTab(item) {
      this.$store.dispatch('coordinator/setSelectedPayment', item)
      if (this.items[1] !== 'Individual Payments')
        this.items.push('Individual Payments')
      this.tab = 1
    },
  },
}
</script>
