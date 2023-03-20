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
    <template #[`startDate`]="{ item }">
      {{ Intl.DateTimeFormat().format(new Date(item.startDate)) }}
    </template>
    <template #grandTotalBudget="{ item }">
      {{
        Intl.NumberFormat({ style: 'currency', currency: 'ETB' }).format(
          item.grandTotalBudget
        )
      }}
    </template>
    <!-- The code should be active for the head account -->
    <template v-if="isOnHeadProjectsPage" #title-button>
      <button-light to="/head/projects/project/add-project">
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
      projects: [],
      loading: false,
    }
  },
  computed: {
    isOnHeadProjectsPage() {
      return this.$route.path === '/head/projects'
    },
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
  async mounted() {
    await this.$store.dispatch('head/fetchProjects')
    this.initialize()
  },
  methods: {
    initialize() {
      this.loading = true
      this.projects = Array.from(this.$store.state.head.projects).map(
        (project) => {
          return {
            ...project,
            coordinatorFullName: `${
              Array.from(project?.coordinators)[0].user.personalInfo.firstName
            } ${
              Array.from(project?.coordinators)[0].user.personalInfo.lastName
            }`,
          }
        }
      )
      this.loading = false
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToProject(selectedProject) {
      this.$store.dispatch('head/setSelectedProject', selectedProject)
      this.$router.push(
        `/${
          this.isOnHeadProjectsPage ? 'head' : 'coordinator'
        }/projects/project`
      )
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
