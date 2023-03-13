<template>
  <table-component
    :loading="loading"
    title="Projects"
    :headers="headers"
    :items="projects"
    items-key="name"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    @onDoubleClickRow="navigateToProject($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
  <template #[`startDate`]="{item}">
    {{ Intl.DateTimeFormat().format(new Date(item.startDate)) }}
  </template>
  <template #grandTotalBudget="{item}">
    {{ Intl.NumberFormat({style: 'currency', currency: 'ETB'}).format(item.grandTotalBudget) }}
  </template>
    <!-- The code should be active for the head account -->
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
import { fetchProjects } from '~/services/project.service'
export default {
  name: 'ProjectsTable',

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      projects: [],
      loading: false
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Project Number',
          align: 'start',
          value: 'number',
        },
        {
          text: 'Max beneficiaries',
          value: 'maximumNumberOfBeneficiaries',
        },
        { text: 'Date started', value: 'startDate' },
        { text: 'Total budget', value: 'grandTotalBudget' },
        { text: 'Coordinated by', value: 'coordinatorFullName' },
      ]
    },
  },
  mounted(){
    this.initialize()
  },
  methods: {
    async initialize() {
      this.loading = true;
      this.projects = await fetchProjects()
      this.loading = false;
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
