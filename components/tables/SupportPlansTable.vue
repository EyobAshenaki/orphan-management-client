<template>
  <table-component
    :loading="loading"
    title="Support Plans"
    :headers="headers"
    :items="supportPlans"
    items-key="name"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    @onDoubleClickRow="navigateToPayments($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template v-if="userRole === 'coordinator'" #title-button>
      <button-light
        :to="`/projects/${$route.params.projectId}/add-support-plan`"
      >
        <span>Add Support Plan</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #paymentInterval="{ item }">
      Every {{ item.paymentInterval }} Months
    </template>

    <template #donor="{ item }">
      {{ item.donor.nameInitials }}
    </template>

    <template #orphansCount="{ item }"> {{ item._count_orphans }} </template>

    <template #no-data>
      <button-dark @click="initialize"> Reset </button-dark>
    </template>
  </table-component>
</template>

<script>
import { GraphQLError } from 'graphql'
import { fetchSupportPlans } from '~/services/support.service'

export default {
  name: 'SupportPlanTable',

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      supportPlans: [],
    }
  },
  computed: {
    userRole() {
      return this.$store.getters['auth/userRole']
    },
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Payment Interval',
          value: 'paymentInterval',
        },
        { text: 'Total Fund', value: 'totalFund' },
        { text: 'Admin Fee %', value: 'adminFeePercentage' },
        { text: 'Donor', value: 'donor' },
        { text: 'Orphans Count', value: 'orphansCount' },
      ]
    },
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.supportPlans = [
          ...(await fetchSupportPlans(this.$route.params.projectId)),
        ]
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
      } finally {
        this.loading = false
      }
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
