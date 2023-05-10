<template>
  <table-component
    :loading="loading"
    title="Donors"
    :headers="headers"
    :items="donors"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    @onDoubleClickRow="navigateToDonor($event)"
  >
    <template #title-button>
      <button-light to="/head/donors/add-donor">
        <span>Add Donor</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #no-data>
      <button-dark @click="initialize">Reset</button-dark>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
export default {
  name: 'DonorsTable',
  components: {
    TableComponent,
  },
  layout: 'head',
  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          value: 'companyName',
        },
        {
          text: 'Name Initials',
          value: 'nameInitials',
        },
      ]
    },
    donors() {
      return this.$store.state.head.donors
    },
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        await this.$store.dispatch('head/fetchDonors')
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },
    handleSearch(value) {
      this.searchValue = value
    },
    navigateToDonor(donor) {
      /** ==> empty <== **/
    },
  },
}
</script>

<style lang="scss" scoped></style>
