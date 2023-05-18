<template>
  <table-component
    :loading="loading"
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

    <template v-if="userRole === 'head'" #title-button>
      <button-light
        :to="`/locations/${$route.params.regionId}/${$route.params.zoneId}/add-district`"
      >
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
import { GraphQLError } from 'graphql'
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
    zoneId: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 10,
      loading: false,
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
    isOnHeadLocationsZone() {
      // todo: remove this later
      return this.userRole === 'head' && this.$route.params.zoneId
    },
  },
  async mounted() {
    this.loading = true
    await this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.districts = (
          await fetchDistricts(
            this.userRole === 'head' ? this.$route.params.zoneId : undefined,
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
        if (Array.from(error)[0] instanceof GraphQLError) {
          error.forEach((e) => {
            this.$toaster.showToast({
              content: e.message,
              state: 'error',
            })
          })
          // eslint-disable-next-line no-console
        } else console.log(error)
      } finally {
        this.loading = false
      }
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToDistrict(selectedDistrict) {
      if (this.userRole === 'head') {
        // todo: refactor this
        this.$router.push({
          name: 'locations-regionId-zoneId-districtId',
          params: { districtId: selectedDistrict.id },
        })
      } else {
        this.$router.push({
          name: 'districts-districtId',
          params: { districtId: selectedDistrict.id },
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
      if (!socialWorker) return
      if (this.$route.name.includes('social-worker')) return
      this.$router.push({
        name: 'social-workers-socialWorkerId',
        params: { socialWorkerId: socialWorker.id },
      })
    },
  },
}
</script>
