<template>
  <table-component
    title="Projects"
    :headers="headers"
    :items="projects"
    items-key="name"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    @onDoubleClickRow="navigateToProject($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template #title-button>
      <button-light to="/coordinator/projects/add-project">
        <span>Add Project</span>
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
  name: 'ProjectsTable',

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
          text: 'Project Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Max beneficiaries',
          value: 'maxBeneficiaries',
        },
        { text: 'Date started', value: 'startDate' },
        { text: 'Total budget', value: 'totalBudget' },
        { text: 'Coordinated by', value: 'coordinatorFullName' },
      ]
    },
    projects() {
      return [
        {
          name: 'Project 1',
          maxBeneficiaries: 10,
          startDate: '2021-01-01',
          totalBudget: 1000,
          coordinatorFullName: 'John Doe',
        },
        {
          name: 'Project 2',
          maxBeneficiaries: 50,
          startDate: '2021-02-06',
          totalBudget: 500,
          coordinatorFullName: 'Jane Doe',
        },
        {
          name: 'Project 3',
          maxBeneficiaries: 100,
          startDate: '2022-03-08',
          totalBudget: 10000,
          coordinatorFullName: 'John Doe',
        },
        {
          name: 'Project 4',
          maxBeneficiaries: 82,
          startDate: '2022-12-25',
          totalBudget: 10000,
          coordinatorFullName: 'Jane Doe',
        },
        {
          name: 'Project 5',
          maxBeneficiaries: 17,
          startDate: '2022-10-01',
          totalBudget: 10000,
          coordinatorFullName: 'John Doe',
        },
        {
          name: 'Project 6',
          maxBeneficiaries: 23,
          startDate: '2022-09-18',
          totalBudget: 10000,
          coordinatorFullName: 'Jane Doe',
        },
        {
          name: 'Project 7',
          maxBeneficiaries: 10,
          startDate: '2021-01-01',
          totalBudget: 1000,
          coordinatorFullName: 'John Doe',
        },
        {
          name: 'Project 8',
          maxBeneficiaries: 50,
          startDate: '2021-02-06',
          totalBudget: 500,
          coordinatorFullName: 'Jane Doe',
        },
        {
          name: 'Project 9',
          maxBeneficiaries: 100,
          startDate: '2022-03-08',
          totalBudget: 10000,
          coordinatorFullName: 'John Doe',
        },
        {
          name: 'Project 10',
          maxBeneficiaries: 82,
          startDate: '2022-12-25',
          totalBudget: 10000,
          coordinatorFullName: 'Jane Doe',
        },
        {
          name: 'Project 11',
          maxBeneficiaries: 17,
          startDate: '2022-10-01',
          totalBudget: 10000,
          coordinatorFullName: 'John Doe',
        },
        {
          name: 'Project 12',
          maxBeneficiaries: 23,
          startDate: '2022-09-18',
          totalBudget: 10000,
          coordinatorFullName: 'Jane Doe',
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

    navigateToProject(item) {
      this.$router.push({
        name: 'coordinator-projects-project',
        // change selected project state using the item argument
      })
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
