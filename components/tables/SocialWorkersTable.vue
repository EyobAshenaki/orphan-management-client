<template>
  <table-component
    :loading="loading"
    title="Social Workers"
    :headers="headers"
    :items="socialWorkers"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    :single-select="false"
    :show-select="false"
    @onDoubleClickRow="navigateToSocialWorker($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #phoneNumber="{ item }">
      {{ item.user.personalInfo.phoneNumber }}
    </template>

    <template #no-data>
      <button-dark @click="initialize"> Reset </button-dark>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
import { calculateAge, fullName } from '~/helpers/app.helper'
import { fetchSocialWorkers } from '~/services/social-worker.service'
export default {
  name: 'SocialWorkersTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      socialWorkers: [],
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
        { text: 'Mobile Number', value: 'phoneNumber' },
        {
          text: 'District count',

          value: '_count_districts',
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
        this.socialWorkers = (await fetchSocialWorkers()).map(
          (socialWorker) => ({
            ...socialWorker,
            phoneNumber: socialWorker.user.personalInfo.phoneNumber,
            age: calculateAge(socialWorker.user.personalInfo.dateOfBirth),
            gender: socialWorker.user.personalInfo.gender,
            fullName: fullName(socialWorker.user.personalInfo),
          })
        )
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToSocialWorker(item) {
      this.$router.push({
        name: 'social-workers-socialWorkerId',
        params: { socialWorkerId: item.id },
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
