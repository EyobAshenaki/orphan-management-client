<template>
  <div>
    <table-component
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
      <template #title-button>
        <button-light to="/head/locations/zone/add-zone">
          <span>Add Zone</span>
          <fa-layers class="tw-ml-2">
            <fa :icon="['fa', 'plus']" />
          </fa-layers>
        </button-light>
      </template>
    </table-component>
  </div>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
export default {
  name: 'ZonesTable',
  components: {
    TableComponent,
  },

  layout: 'head',
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
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
      ]
    },
    zones() {
      return this.$store.state.location.selectedRegion
        ? this.$store.state.location.selectedRegion.zones
        : this.$store.state.location.zones
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    handleSearch(value) {
      this.searchValue = value
    },
    navigateToZone(selectedZone) {
      this.$store.commit('location/SET_SELECTED_ZONE', selectedZone)
      this.$router.push(`/head/locations/zone`)
    },
    initialize() {
      if (!this.$store.state.location.selectedRegion) {
        this.$store.dispatch('location/fetchZones')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
