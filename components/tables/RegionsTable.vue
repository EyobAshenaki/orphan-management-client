<template>
  <div>
    <table-component
      :loading="loading"
      title="Regions"
      :headers="headers"
      :items="regions"
      :items-key="'id'"
      :search="searchValue"
      :items-per-page="itemsPerPage"
      @onDoubleClickRow="navigateToRegion($event)"
    >
      <template #top-right>
        <search-field @onSearch="handleSearch($event)" />
      </template>
      <template v-if="userRole === 'head'" #title-button>
        <button-light :to="`/locations/add-region`">
          <span>Add Region</span>
          <fa-layers class="tw-ml-2">
            <fa :icon="['fa', 'plus']" />
          </fa-layers>
        </button-light>
      </template>
    </table-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableComponent from '../global/TableComponent.vue'
import { fetchRegions } from '~/services/location.service'
export default {
  name: 'RegionsTable',
  components: {
    TableComponent,
  },

  layout: 'head',
  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      regions: [],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Zones Count',
          value: '_count_zones',
        },
        {
          text: 'Districts Count',
          value: '_count_districts',
        },
        {
          text: 'Villages Count',
          value: '_count_villages',
        },
        {
          text: 'Orphans Count',
          value: '_count_orphans',
        },
      ]
    },
    ...mapGetters({
      userRole: 'auth/userRole',
    }),
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    handleSearch(value) {
      this.searchValue = value
    },
    navigateToRegion(selectedRegion) {
      this.$store.commit('location/SET_SELECTED_REGION', selectedRegion)
      this.$router.push({
        name: 'locations-regionId',
        params: { regionId: selectedRegion.id },
      })
    },
    async initialize() {
      try {
        this.regions = await fetchRegions()
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
