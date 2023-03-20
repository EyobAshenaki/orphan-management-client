<template>
  <section>
    <header class="tw-w-full tw-relative tw-bg-white tw-px-8 tw-pt-8">
      <div
        v-if="version > 1"
        class="tw-absolute tw-top-6 tw-right-6 tw-flex tw-flex-col tw-gap-3"
      >
        <button-dark
          to="/head/project/statistics"
        >
          <fa-layers class="tw-mr-2">
            <fa :icon="['fa', 'chart-line']" />
          </fa-layers>
          <span>Statistics</span>
        </button-dark>
        <button-dark to="/head/locations/zone/statistics">
          <fa-layers class="tw-mr-2">
            <fa :icon="['fa', 'pen']" />
          </fa-layers>
          <span>Edit</span>
        </button-dark>
      </div>

      <h1 class="tw-font-bold tw-text-3xl mb-3">Project-{{ project.number }}</h1>

      <!-- <button-light to="/coordinator/projects/add-project">
          <span>Add Project</span>
          <fa-layers class="tw-ml-2">
            <fa :icon="['fa', 'plus']" />
          </fa-layers>
        </button-light> -->

      <v-spacer></v-spacer>

      <v-tabs
        v-model="tab"
        height="35"
        slider-size="3"
        class="pb-7 mt-7"
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
      <v-tab-item v-for="(item, idx) in items" :key="idx">
        <div v-if="tab === 0" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <support-plans-table
            @onSupportPlanClick="navigateToPaymentsTab($event)"
          />
        </div>

        <div v-if="tab === 1" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <payments-table
            @onPaymentClick="navigateToIndividualPaymentsTab($event)"
          />
        </div>

        <div v-if="tab === 2" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <individual-payments-table />
        </div>

        <div v-if="tab === 3" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <districts-table />
        </div>

        <div v-if="tab === 4" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <orphans-table
            @onOrphanDetailClick="handleOrphanDetailClick($event)"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>

<script>
import SupportPlansTable from '~/components/tables/SupportPlansTable.vue'
import PaymentsTable from '~/components/tables/PaymentsTable.vue'
import IndividualPaymentsTable from '~/components/tables/IndividualPaymentsTable.vue'
import DistrictsTable from '~/components/tables/DistrictsTable.vue'
import OrphansTable from '~/components/tables/OrphansTable.vue'
export default {
  name: 'ProjectPage',

  components: {
    SupportPlansTable,
    PaymentsTable,
    IndividualPaymentsTable,
    DistrictsTable,
    OrphansTable,
  },

  layout: 'coordinator',

  data() {
    return {
      version: 1,
      tab: null,
      items: [
        'Support Plans',
        'Payments',
        'Individual Payments',
        'Districts',
        'Orphans',
        // 'Documents',
      ],
    }
    },
  computed: {
    project() {
      return this.$store.state.head.selectedProject
    },
  },
  methods: {
    navigateToPaymentsTab(item) {
      console.log('Go to payments tab', item)
      this.tab = 1
    },

    navigateToIndividualPaymentsTab(item) {
      console.log('Generate Individual Payment: ', item)
      this.tab = 2
    },

    handleOrphanDetailClick(item) {
      console.log('Go to orphan detail: ', item)
      this.$router.push({
        name: 'coordinator-projects-project-orphan',
        // Instead of passing the id to the route, we should store it in the vuex store
        // params: { id: item.id },
      })
    },
  },
}
</script>
