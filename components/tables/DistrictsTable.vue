<template>
  <table-component
    title="Districts"
    :headers="headers"
    :items="districts"
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

    <template #district-projects="{ item }">
      <div class="tw-flex">
        <v-avatar
          v-for="(project, idx) in item.districtProjects"
          :key="idx"
          size="28"
          class="tw-bg-indigo-500 tw-ring-1 tw-ring-white tw-ring-opacity-90"
          :class="idx === 0 ? '-tw-ml-0' : '-tw-ml-1'"
          @click="handleProjectClick(project)"
        >
          <span class="tw-text-white tw-text-xs">{{ project }}</span>
        </v-avatar>
      </div>
    </template>

    <template #district-social-workers="{ item }">
      <div class="tw-relative tw-flex">
        <v-avatar
          v-for="(socialWorker, idx) in item.districtSocialWorkers"
          :key="idx"
          size="28"
          class="tw-static tw-bg-emerald-500 tw-ring-1 tw-ring-white tw-ring-opacity-95"
          :class="idx === 0 ? '-tw-ml-0' : '-tw-ml-1'"
          @click="handleSocialWorkerClick(socialWorker)"
        >
          <span class="tw-text-white tw-text-xs">
            {{ socialWorkerAcronym(socialWorker) }}
          </span>
        </v-avatar>
      </div>
    </template>

    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
export default {
  name: 'IndividualPaymentTable',

  components: {
    TableComponent,
  },

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
          text: 'District Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Projects', value: 'districtProjects' },
        {
          text: 'Zone',
          value: 'zoneName',
        },
        { text: 'Region', value: 'regionName' },
        {
          text: 'Village count',

          value: 'noOfVillages',
        },
        { text: 'Orphan count', value: 'noOfOrphans' },
        {
          text: 'Social Workers',
          value: 'districtSocialWorkers',
        },
      ]
    },

    districts() {
      return [
        {
          id: 1,
          name: 'Akaki Kaliti',
          zoneName: 'Zone 1',
          regionName: 'Addis Ababa',
          noOfVillages: 10,
          noOfOrphans: 100,
          districtProjects: [1, 4, 2],
          districtSocialWorkers: [
            {
              firstName: 'John',
              lastName: 'Doe',
            },
            {
              firstName: 'Bob',
              lastName: 'Do',
            },
          ],
        },
        {
          id: 2,
          name: 'Bole',
          zoneName: 'Zone 2',
          regionName: 'Addis Ababa',
          noOfVillages: 6,
          noOfOrphans: 60,
          districtProjects: [2, 4, 2],
          districtSocialWorkers: [
            {
              firstName: 'John',
              lastName: 'Doe',
            },
            {
              firstName: 'Bob',
              lastName: 'Do',
            },
          ],
        },
        {
          id: 3,
          name: 'Akaki Kaliti',
          zoneName: 'Zone 1',
          regionName: 'Addis Ababa',
          noOfVillages: 10,
          noOfOrphans: 100,
          districtProjects: [1, 4, 2],
          districtSocialWorkers: [
            {
              firstName: 'John',
              lastName: 'Doe',
            },
            {
              firstName: 'Bob',
              lastName: 'Do',
            },
          ],
        },
        {
          id: 4,
          name: 'Bole',
          zoneName: 'Zone 2',
          regionName: 'Addis Ababa',
          noOfVillages: 6,
          noOfOrphans: 60,
          districtProjects: [2, 4, 2],
          districtSocialWorkers: [
            {
              firstName: 'John',
              lastName: 'Doe',
            },
            {
              firstName: 'Bob',
              lastName: 'Do',
            },
          ],
        },
        {
          id: 5,
          name: 'Akaki Kaliti',
          zoneName: 'Zone 1',
          regionName: 'Addis Ababa',
          noOfVillages: 10,
          noOfOrphans: 100,
          districtProjects: [1, 4, 2],
          districtSocialWorkers: [
            {
              firstName: 'John',
              lastName: 'Doe',
            },
            {
              firstName: 'Bob',
              lastName: 'Do',
            },
          ],
        },
        {
          id: 6,
          name: 'Bole',
          zoneName: 'Zone 2',
          regionName: 'Addis Ababa',
          noOfVillages: 6,
          noOfOrphans: 60,
          districtProjects: [2, 4, 2],
          districtSocialWorkers: [
            {
              firstName: 'John',
              lastName: 'Doe',
            },
            {
              firstName: 'Bob',
              lastName: 'Do',
            },
          ],
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

    handleItemsPerPage(value) {
      // Since we are using server side pagination, we can't use -1 to show all items just the elements we fetched
      // if (value === -1) this.itemsPerPage = this.projects.length
      if (value === -1) this.itemsPerPage = 8
      else this.itemsPerPage = value
    },

    socialWorkerAcronym({ firstName, lastName }) {
      return firstName?.charAt(0) + lastName?.charAt(0)
    },

    handleProjectClick(project) {
      console.log('Project clicked', project)
    },

    handleSocialWorkerClick(socialWorker) {
      console.log('Social worker clicked', socialWorker)
    },
  },
}
</script>
