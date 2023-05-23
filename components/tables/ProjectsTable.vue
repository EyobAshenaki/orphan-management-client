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
    <template v-if="userRole === 'head'" #title-button>
      <button-light to="/projects/add-project">
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
      <button-dark @click="initialize"> Reset </button-dark>
    </template>
  </table-component>
</template>

<script>
import { GraphQLError } from 'graphql'
import { fetchProjects } from '~/services/project.service'

export default {
  name: 'ProjectsTable',

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      projects: [],
    }
  },
  computed: {
    userRole() {
      return this.$store.getters['auth/userRole']
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
        { text: 'Support Plans Count', value: '_count_supportPlans' },
      ]
    },
  },
  async mounted() {
    await this.initialize()
  },
  methods: {
    async initialize() {
      this.loading = true
      try {
        this.projects = (await fetchProjects()).map((project) => {
          return {
            ...project,
            coordinatorFullName: `${
              Array.from(project?.coordinators)[0].user.personalInfo.firstName
            } ${
              Array.from(project?.coordinators)[0].user.personalInfo.lastName
            }`,
          }
        })
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

    navigateToProject(selectedProject) {
      this.$router.push({
        name: 'projects-projectId',
        params: { projectId: selectedProject.id },
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
