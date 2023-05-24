<template>
  <div>
    <TableComponent
      :loading="loading"
      title="Zones"
      :headers="headers"
      :items="zones"
      :items-key="'id'"
      :search="searchValue"
      :items-per-page="itemsPerPage"
      @onDoubleClickRow="navigateToZone($event)"
    >
      <template #top-right>
        <search-field @onSearch="handleSearch($event)" />
      </template>
      <template v-if="userRole === 'head'" #title-button>
        <button-light
          :to="`/locations/${$route.params.regionId}/add-zone`"
        >
          <span>Add Zone</span>
          <fa-layers class="tw-ml-2">
            <fa :icon="['fa', 'plus']" />
          </fa-layers>
        </button-light>
      </template>
    </TableComponent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableComponent from '../global/TableComponent.vue'
import { fetchZones } from '~/services/location.service'
export default {
  name: 'ZonesTable',
  components: {
    TableComponent,
  },

  layout: 'head',

  props: {
    regionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      zones: [],
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
    navigateToZone(selectedZone) {
      this.$router.push({
        name: 'locations-regionId-zoneId',
        params: { zoneId: selectedZone.id },
      })
    },
    async initialize() {
      try {
        this.zones = await fetchZones(this.regionId)
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
