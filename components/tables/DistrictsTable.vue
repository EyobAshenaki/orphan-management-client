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

    <template #districtProjects="{ item }">
      <div v-if="item.districtProjects.length > 0" class="tw-flex">
        <v-avatar
          v-for="(project, idx) in item.districtProjects"
          :key="project.id"
          size="28"
          class="tw-bg-indigo-500 tw-ring-1 tw-ring-white tw-ring-opacity-90"
          :class="idx === 0 ? '-tw-ml-0' : '-tw-ml-1'"
          @click="handleProjectClick(project)"
        >
          <span class="tw-text-white tw-text-xs">{{ project.number }}</span>
        </v-avatar>
      </div>
      <div v-else class="tw-flex">
        <span class="tw-text-xs">N/A</span>
      </div>
    </template>

    <template #districtSocialWorkers="{ item }">
      <div v-if="item.districtSocialWorkers.length > 0" class="tw-flex">
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
      <div v-else class="tw-flex">
        <span class="tw-text-xs">N/A</span>
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
      <button-dark @click="initialize">Reset</button-dark>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
import { fetchDistricts } from '~/services/location.service'
export default {
  name: 'DistrictsTable',

  components: {
    TableComponent,
  },
  props: {
    isOnProject: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 10,
      districts: [],
    }
  },
  computed: {
    userRole() {
      return this.$store.getters['auth/userRole']
    },
    headers() {
      return [
        {
          text: 'District Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Projects', value: 'districtProjects' },
        !this.isOnHeadLocationsZone
          ? {
              text: 'Zone',
              value: 'zoneName',
            }
          : {},
        !this.isOnHeadLocationsZone
          ? { text: 'Region', value: 'regionName' }
          : {},
        {
          text: 'Village count',

          value: 'noOfVillages',
        },
        { text: 'Orphan count', value: 'noOfOrphans' },
        {
          text: 'Social Workers',
          value: 'districtSocialWorkers',
        },
      ].filter((header) => Object.keys(header).length !== 0)
    },
    isOnHeadLocationsZone() {
      return this.$route.name === 'head-locations-zone'
    },
  },
  async mounted() {
    await this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.districts = (
          await fetchDistricts(
            this.isOnHeadLocationsZone
              ? this.$store.state.location.selectedZone.id
              : undefined,
            this.isOnProject
              ? this.$store.state[`${this.userRole}`].selectedProjectId
              : undefined
          )
        ).map((district) => {
          const districtSocialWorkers = Array.from(district?.socialWorkers).map(
            (socialWorker) => ({
              ...socialWorker,
              firstName: socialWorker.user.personalInfo.firstName,
              lastName: socialWorker.user.personalInfo.lastName,
            })
          )
          return {
            ...district,
            noOfOrphans: district?._count_orphans ?? 0,
            noOfVillages: district?._count_villages ?? 0,
            zoneName: district?.zone?.name ?? 'N/A',
            regionName: district?.zone?.region?.name ?? 'N/A',
            districtProjects: district?.projects ?? 'N/A',
            districtSocialWorkers: districtSocialWorkers ?? 'N/A',
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToDistrict(selectedDistrict) {
      if (this.isOnHeadLocationsZone) {
        // todo: refactor this
        this.$store.commit('location/SET_SELECTED_DISTRICT', selectedDistrict)
        this.$router.push('/head/locations/district')
      } else {
        this.$store.dispatch(
          'coordinator/setSelectedDistrictId',
          selectedDistrict.id
        )
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
      this.$store.dispatch(
        `${this.userRole}/setSelectedProjectNumber`,
        project.number
      )
      this.$router.push(`/${this.userRole}/projects/project`)
      if (
        this.isOnProject &&
        !this.isOnHeadLocationsZone &&
        this.$store.state.coordinator.selectedProjectId !== project.id
      ) {
        window.location.reload()
      }
      this.$store.dispatch(`${this.userRole}/setSelectedProjectId`, project.id)
    },

    handleSocialWorkerClick(socialWorker) {
      if (this.$route.name.includes('social-worker')) return
      this.$store.dispatch(
        `${this.userRole}/setSelectedSocialWorkerId`,
        socialWorker.id
      )
      this.$router.push(`/${this.userRole}/social-workers/social-worker`)
    },
  },
}
</script>
