<template>
  <table-component
    title="Support Plans"
    :headers="headers"
    :items="supportPlans"
    items-key="name"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    @onDoubleClickRow="navigateToPayments($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template #title-button>
      <button-light to="/coordinator/projects/project/add-supportPlan">
        <span>Add Support Plan</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </table-component>
</template>

<script>
export default {
  name: 'SupportPlanTable',

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Period of Support',
          value: 'periodOfSupport',
        },
        { text: 'Donor', value: 'donor' },
        { text: 'Normal of Orphans', value: 'normalOfOrphans' },
        { text: 'Total Fund', value: 'totalFund' },
        { text: 'Admin Fee %', value: 'adminFreePercentage' },
      ]
    },
    supportPlans() {
      return [
        {
          name: 'QC-1',
          periodOfSupport: '5 years',
          donor: 'QC',
          normalOfOrphans: 6,
          totalFund: 200000,
          adminFreePercentage: 5,
        },
        {
          name: 'QC-2',
          periodOfSupport: '3 years',
          donor: 'QC',
          normalOfOrphans: 3,
          totalFund: 500000,
          adminFreePercentage: 3,
        },
        {
          name: 'QC-3',
          periodOfSupport: '6 years',
          donor: 'QC',
          normalOfOrphans: 7,
          totalFund: 300000,
          adminFreePercentage: 5,
        },
        {
          name: 'QC-4',
          periodOfSupport: '8 years',
          donor: 'QC',
          normalOfOrphans: 9,
          totalFund: 900000,
          adminFreePercentage: 7,
        },
        {
          name: 'QC-5',
          periodOfSupport: '5 years',
          donor: 'QC',
          normalOfOrphans: 6,
          totalFund: 700000,
          adminFreePercentage: 5,
        },
        {
          name: 'QC-6',
          periodOfSupport: '3 years',
          donor: 'QC',
          normalOfOrphans: 3,
          totalFund: 500000,
          adminFreePercentage: 3,
        },
        {
          name: 'QC-7',
          periodOfSupport: '6 years',
          donor: 'QC',
          normalOfOrphans: 7,
          totalFund: 800000,
          adminFreePercentage: 5,
        },
        {
          name: 'QC-8',
          periodOfSupport: '8 years',
          donor: 'QC',
          normalOfOrphans: 9,
          totalFund: 300000,
          adminFreePercentage: 7,
        },
      ]
    },
  },
  methods: {
    initialize() {
      console.log('Initialize')
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToPayments(item) {
      this.$emit('onSupportPlanClick', item)
    },

    handleItemsPerPage(value) {
      // Since we are using server side pagination, we can't use -1 to show all items just the elements we fetched
      // if (value === -1) this.itemsPerPage = this.projects.length
      if (value === -1) this.itemsPerPage = 8
      else this.itemsPerPage = value
    },
  },
}
</script>
