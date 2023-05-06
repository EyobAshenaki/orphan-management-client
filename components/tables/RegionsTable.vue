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
      <template #title-button>
        <button-light to="/head/locations/region/add-region">
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
import TableComponent from '../global/TableComponent.vue'
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
    regions() {
      return this.$store.state.location.regions
    },
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
      this.$router.push(`/head/locations/region`)
    },
    async initialize() {
      try {
        await this.$store.dispatch('location/fetchRegions')
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
