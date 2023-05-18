<template>
  <table-component
    :loading="loading"
    title="Coordinators"
    :headers="headers"
    :items="coordinators"
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
      <button-dark @click="initialize">Reset</button-dark>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
import { fetchCoordinators } from '~/services/user.service'
import { calculateAge, fullName } from '~/helpers/app.helper'

export default {
  name: 'ZonesTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      coordinators: [],
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
        { text: 'Project count', value: '_count_projects' },
        {
          text: 'Zone count',

          value: '_count_zones',
        },
        { text: 'Orphan count', value: '_count_orphans' },
      ]
    },

    isOnHeadCoordinatorsPage() {
      return this.$route.path === '/head/coordinators'
    },

    __coordinators() {
      if (this.isOnHeadCoordinatorsPage) {
        return this.$store.state.head.coordinators.map((coordinator) => {
          return {
            ...coordinator,
            fullName: `${coordinator.user.personalInfo.firstName} ${coordinator.user.personalInfo.middleName} ${coordinator.user.personalInfo.lastName}`,
            gender: coordinator.user.personalInfo.gender ?? 'N/A',
            age: calculateAge(coordinator.user.personalInfo.dateOfBirth),
            mobileNumber: coordinator.user.personalInfo.mobileNumber ?? 'N/A',
            noOfProjects: Array.from(coordinator?.zones)?.reduce(
              (acc, zone) => {
                return (
                  acc +
                  Array.from(zone.districts).reduce((acc, district) => {
                    return acc + Array.from(district.projects).length
                  }, 0)
                )
              },
              0
            ),
            noOfZones: Array.from(coordinator?.zones)?.length,
            noOfOrphans: Array.from(coordinator?.zones)?.reduce((acc, zone) => {
              return (
                acc +
                Array.from(zone.districts).reduce((acc, district) => {
                  return (
                    acc +
                    Array.from(district.villages).reduce((acc, village) => {
                      return acc + Array.from(village.orphans).length
                    }, 0)
                  )
                }, 0)
              )
            }, 0),
          }
        })
      }
      return [
        {
          id: 1,
          fullName: 'John Doe',
          gender: 'Male',
          age: 27,
          mobileNumber: '0912345678',
          noOfZones: 10,
          noOfOrphans: 100,
        },
        {
          id: 2,
          fullName: 'Bob Do',
          gender: 'Male',
          age: 32,
          mobileNumber: '0953456789',
          noOfZones: 10,
          noOfOrphans: 200,
        },
        {
          id: 3,
          fullName: 'Jane Doe',
          gender: 'Female',
          age: 24,
          mobileNumber: '0967347348',
          noOfZones: 10,
          noOfOrphans: 80,
        },
        {
          id: 4,
          fullName: 'John Doe',
          gender: 'Male',
          age: 27,
          mobileNumber: '0912345678',
          noOfZones: 10,
          noOfOrphans: 100,
        },
        {
          id: 5,
          fullName: 'Bob Do',
          gender: 'Male',
          age: 32,
          mobileNumber: '0953456789',
          noOfZones: 10,
          noOfOrphans: 200,
        },
        {
          id: 6,
          fullName: 'Jane Doe',
          gender: 'Female',
          age: 24,
          mobileNumber: '0967347348',
          noOfZones: 10,
          noOfOrphans: 80,
        },
      ]
    },
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.coordinators = (await fetchCoordinators()).map((coordinator) => ({
          ...coordinator,
          fullName: fullName(coordinator.user.personalInfo),
          gender: coordinator.user.personalInfo.gender ?? 'N/A',
          age: calculateAge(coordinator.user.personalInfo.dateOfBirth),
          mobileNumber: coordinator.user.personalInfo.mobileNumber ?? 'N/A',
        }))
      } catch (error) {}

      this.loading = false
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToSocialWorker(item) {
      console.log(`Navigating to coordinator ${item.id}`)
      //   this.$router.push({
      //     name: 'coordinator-social-workers-social-worker',
      //     // change selected project state using the item argument
      //   })
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
