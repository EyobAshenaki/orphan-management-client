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
              {{ socialWorkerAcronym(villageSocialWorker) }}
            </span>
          </v-avatar>
        </template>
        <span>
          {{ socialWorkerFullName(villageSocialWorker) }}
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
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
export default {
  name: 'VillagesTable',

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

    villages() {
      if (this.isOnHeadLocationsDistrict) {
        return Array.from(
          this.$store.state.location.selectedDistrict?.villages
        ).map((village) => {
          const noOfOrphans = village?.orphans?.length
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
      }
      return [
        {
          id: 1,
          name: 'village 1',
          districtName: 'Akaki Kaliti',
          noOfOrphans: 100,
          villageSocialWorker: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        {
          id: 2,
          name: 'village 2',
          districtName: 'Bole',
          noOfOrphans: 60,
          villageSocialWorker: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        {
          id: 3,
          name: 'village 3',
          districtName: 'Akaki Kaliti',
          noOfOrphans: 100,
          villageSocialWorker: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        {
          id: 4,
          name: 'village 4',
          districtName: 'Bole',
          noOfOrphans: 60,
          villageSocialWorker: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        {
          id: 5,
          name: 'village 5',
          districtName: 'Akaki Kaliti',
          noOfOrphans: 100,
          villageSocialWorker: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        {
          id: 6,
          name: 'village 6',
          districtName: 'Bole',
          noOfOrphans: 60,
          villageSocialWorker: {
            firstName: 'John',
            lastName: 'Doe',
          },
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
