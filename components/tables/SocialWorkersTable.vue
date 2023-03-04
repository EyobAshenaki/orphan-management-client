<template>
  <table-component
    title="Social Workers"
    :headers="headers"
    :items="socialWorkers"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    :single-select="false"
    :show-select="false"
    @onDoubleClickRow="navigateToSocialWorker($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
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
      return [
        {
          text: 'Full Name',
          align: 'start',
          value: 'fullName',
        },
        { text: 'Gender', value: 'gender' },
        {
          text: 'Age',
          value: 'age',
        },
        { text: 'Mobile Number', value: 'mobileNumber' },
        {
          text: 'District count',

          value: 'noOfDistricts',
        },
        { text: 'Orphan count', value: 'noOfOrphans' },
      ]
    },

    socialWorkers() {
      return [
        {
          id: 1,
          fullName: 'John Doe',
          gender: 'Male',
          age: 27,
          mobileNumber: '0912345678',
          noOfDistricts: 10,
          noOfOrphans: 100,
        },
        {
          id: 2,
          fullName: 'Bob Do',
          gender: 'Male',
          age: 32,
          mobileNumber: '0953456789',
          noOfDistricts: 10,
          noOfOrphans: 200,
        },
        {
          id: 3,
          fullName: 'Jane Doe',
          gender: 'Female',
          age: 24,
          mobileNumber: '0967347348',
          noOfDistricts: 10,
          noOfOrphans: 80,
        },
        {
          id: 4,
          fullName: 'John Doe',
          gender: 'Male',
          age: 27,
          mobileNumber: '0912345678',
          noOfDistricts: 10,
          noOfOrphans: 100,
        },
        {
          id: 5,
          fullName: 'Bob Do',
          gender: 'Male',
          age: 32,
          mobileNumber: '0953456789',
          noOfDistricts: 10,
          noOfOrphans: 200,
        },
        {
          id: 6,
          fullName: 'Jane Doe',
          gender: 'Female',
          age: 24,
          mobileNumber: '0967347348',
          noOfDistricts: 10,
          noOfOrphans: 80,
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

    navigateToSocialWorker(item) {
      this.$router.push({
        name: 'coordinator-social-workers-social-worker',
        // change selected project state using the item argument
      })
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
