<template>
  <table-component
    title="Orphans"
    :headers="headers"
    :items="orphans"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    :single-select="false"
    :show-select="false"
    @onDoubleClickRow="navigateToOrphanDetails($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template #title-button>
      <button-light to="/coordinator/projects/project/add-orphan">
        <span>Add Orphan</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
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
  name: 'OrphansTable',

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
          text: 'Orphan Name',
          align: 'start',
          value: 'orphanName',
        },
        { text: 'Age', value: 'age' },
        {
          text: 'Gender',
          value: 'gender',
        },
        { text: 'Sponsorship Status', value: 'sponsorshipStatus' },
        {
          text: 'Registration Date',
          value: 'registrationDate',
        },
      ]
    },

    orphans() {
      return [
        {
          id: 1,
          orphanName: 'Eyob Alemu',
          age: 4,
          gender: 'Male',
          sponsorshipStatus: 'New',
          registrationDate: '2021-01-01',
        },
        {
          id: 2,
          orphanName: 'Belaynesh Alemu',
          age: 7,
          gender: 'Female',
          sponsorshipStatus: 'Active',
          registrationDate: '2019-03-08',
        },
        {
          id: 3,
          orphanName: 'Eyob Alemu',
          age: 4,
          gender: 'Male',
          sponsorshipStatus: 'Pending',
          registrationDate: '2021-01-01',
        },
        {
          id: 4,
          orphanName: 'Belaynesh Alemu',
          age: 7,
          gender: 'Female',
          sponsorshipStatus: 'Processing',
          registrationDate: '2019-03-08',
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

    navigateToOrphanDetails(item) {
      // this.$router.push({
      //   name: 'orphanDetails',
      //   params: { id: item.id },
      // })
      this.$emit('onOrphanDetailClick', item)
    },

    handleItemsPerPage(value) {
      // Since we are using server side pagination, we can't use -1 to show all items just the elements we fetched
      // if (value === -1) this.itemsPerPage = this.projects.length
      if (value === -1) this.itemsPerPage = 8
      else this.itemsPerPage = value
    },
  },
}
</script>
