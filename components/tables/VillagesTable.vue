<template>
  <table-component
    title="Villages"
    :headers="headers"
    :items="villages"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    :single-select="false"
    :show-select="false"
    @onDoubleClickRow="navigateToOrphans($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #villageSocialWorker="{ item: { villageSocialWorker } }">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-avatar
            size="28"
            class="tw-bg-emerald-500 tw-ring-1 tw-ring-white tw-ring-opacity-95"
            v-bind="attrs"
            v-on="on"
            @click="handleSocialWorkerClick(villageSocialWorker)"
          >
            <span class="tw-text-white tw-text-xs">
              {{
                villageSocialWorker
                  ? socialWorkerAcronym(villageSocialWorker?.user?.personalInfo)
                  : 'N/A'
              }}
            </span>
          </v-avatar>
        </template>
        <span>
          {{
            villageSocialWorker
              ? socialWorkerAcronym(villageSocialWorker?.user?.personalInfo)
              : 'N/A'
          }}
        </span>
      </v-tooltip>
    </template>

    <template v-if="isOnHeadLocationsDistrict" #title-button>
      <button-light to="/head/locations/village/add-village">
        <span>Add Village</span>
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
import {
  fetchVillages,
} from '~/services/location.service'
export default {
  name: 'VillagesTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      villages: [],
    }
  },
  computed: {
    isOnHeadLocationsDistrict() {
      return this.$route.name === 'head-locations-district'
    },
    headers() {
      if (this.isOnHeadLocationsDistrict) {
        return [
          {
            text: 'Village Name',
            align: 'start',
            value: 'name',
          },
          { text: 'Orphan count', value: 'noOfOrphans' },
          // {
          //   text: 'Social Worker',
          //   value: 'villageSocialWorker',
          // },
          // { text: 'Projects', value: 'districtProjects' },
        ]
      }
      return [
        {
          text: 'Village Name',
          align: 'start',
          value: 'name',
        },
        { text: 'District', value: 'districtName' },
        { text: 'Orphan count', value: 'noOfOrphans' },
        {
          text: 'Social Worker',
          value: 'villageSocialWorker',
        },
      ]
    },
  },
  async mounted() {
    await this.initialize()
  },
  methods: {
    async initialize() {
      console.log(`Initialize <VillageTable>`)
      console.log(
        'Selected SocialWorker Id: ',
        this.$store.state.coordinator.selectedSocialWorkerId
      )
      if (this.isOnHeadLocationsDistrict) {
        this.villages = Array.from(
          this.$store.state.location.selectedDistrict?.villages
        ).map((village) => {
          const noOfOrphans = village?._count_orphans
          const villageSocialWorkers = Array.from(
            this.$store.state.location.selectedDistrict?.socialWorkers
          ).map((socialWorker) => ({
            firstName: socialWorker.user.personalInfo.firstName,
            lastName: socialWorker.user.personalInfo.lastName,
          }))
          return {
            ...village,
            id: village.id,
            name: village.name,
            noOfOrphans: noOfOrphans ?? 0,
            villageSocialWorker: villageSocialWorkers[0] ?? {
              firstName: 'John',
              lastName: 'Doe',
            },
          }
        })
      } else
        this.villages = (
          await fetchVillages(
            this.$store.state.coordinator.selectedDistrictId,
            this.$store.state.coordinator.selectedSocialWorkerId,
            true
          )
        ).map((village) => ({
          ...village,
          noOfOrphans: village._count_orphans,
          villageSocialWorker: village.socialWorkers[0],
          districtName: village.district.name,
        }))
      console.log('Villages', this.villages)
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToOrphans(item) {
      this.$emit('onVillageClick', item)
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

    socialWorkerFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`
    },

    handleSocialWorkerClick(socialWorker) {
      console.log('Social worker clicked', socialWorker)
    },
  },
}
</script>
