<template>
  <table-component
    :loading="loading"
    title="Coordinators"
    :headers="headers"
    :items="coordinators"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    :single-select="false"
    :show-select="false"
    @onItemsPerPage="handleItemsPerPage"
  >
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
import { fetchCoordinators } from '~/services/user.service'
import { calculateAge, fullName } from '~/helpers/app.helper'

export default {
  name: 'ZonesTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      coordinators: [],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Full Name',
          align: 'start',
          value: 'fullName',
        },
        { text: 'Gender', value: 'gender' },
        {
          text: 'Age',
          value: 'age',
        },
        { text: 'Mobile Number', value: 'mobileNumber' },
        { text: 'Project count', value: '_count_projects' },
        {
          text: 'Zone count',

          value: '_count_zones',
        },
        { text: 'Orphan count', value: '_count_orphans' },
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
        this.coordinators = (await fetchCoordinators()).map((coordinator) => ({
          ...coordinator,
          fullName: fullName(coordinator.user.personalInfo),
          gender: coordinator.user.personalInfo.gender ?? 'N/A',
          age: calculateAge(coordinator.user.personalInfo.dateOfBirth),
          mobileNumber: coordinator.user.personalInfo.mobileNumber ?? 'N/A',
        }))
      } catch (error) {}

      this.loading = false
    },

    handleSearch(value) {
      this.searchValue = value
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
