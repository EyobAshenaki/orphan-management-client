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
    @onDoubleClickRow="navigateToDistrict($event)"
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
      <div class="tw-flex">
        <v-avatar
          v-for="(socialWorker, idx) in item.districtSocialWorkers"
          :key="idx"
          size="28"
          class="tw-bg-emerald-500 tw-ring-1 tw-ring-white tw-ring-opacity-95"
          :class="idx === 0 ? '-tw-ml-0' : '-tw-ml-1'"
          @click="handleSocialWorkerClick(socialWorker)"
        >
          <span class="tw-text-white tw-text-xs">
            {{ socialWorkerAcronym(socialWorker) }}
          </span>
        </v-avatar>
      </div>
    </template>

    <template v-if="isOnHeadLocationsZone" #title-button>
      <button-light to="/head/locations/district/add-district">
        <span>Add District</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
export default {
  name: 'DistrictsTable',

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
      if (!this.isOnHeadLocationsZone)
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
      return [
        {
          text: 'District Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Projects', value: 'districtProjects' },
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
      if (!this.isOnHeadLocationsZone)
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
      return Array.from(this.$store.state.location.districts).map(
        (district) => {
          const noOfOrphans = Array.from(district?.villages).reduce(
            (acc, village) => acc + village.orphans.length,
            0
          )
          const districtProjects = Array.from(district?.projects).map(
            (project) => +project.number
          )
          const districtSocialWorkers = Array.from(district?.socialWorkers).map(
            (socialWorker) => ({
              firstName: socialWorker.user.personalInfo.firstName,
              lastName: socialWorker.user.personalInfo.lastName,
            })
          )
          return {
            ...district,
            noOfVillages: district?.villages?.length,
            noOfOrphans: noOfOrphans ?? 0,
            districtProjects: districtProjects ?? 'N/A',
            districtSocialWorkers: districtSocialWorkers ?? 'N/A',
          }
        }
      )
    },
    isOnHeadLocationsZone() {
      return this.$route.name === 'head-locations-zone'
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      if (this.isOnHeadLocationsZone)
        this.$store.dispatch('location/fetchDistricts', {
          zoneId: this.$store.state.location.selectedZone.id,
        })
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToDistrict(selectedDistrict) {
      if (this.isOnHeadLocationsZone) {
        this.$store.commit('location/SET_SELECTED_DISTRICT', selectedDistrict)
        this.$router.push('/head/locations/district')
      } else {
        this.$router.push({
          name: 'coordinator-districts-district',
          // change selected project state using the item argument
        })
      }
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
