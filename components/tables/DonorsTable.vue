<template>
  <table-component
    :loading="loading"
    title="Donors"
    :headers="headers"
    :items="donors"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    @onDoubleClickRow="navigateToDonor($event)"
  >
    <template v-if="userRole === 'head'" #title-button>
      <button-light to="/donors/add-donor">
        <span>Add Donor</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #no-data>
      <button-dark @click="initialize">Reset</button-dark>
    </template>
  </table-component>
</template>

<script>
import { mapGetters } from 'vuex'
import { GraphQLError } from 'graphql'
import TableComponent from '../global/TableComponent.vue'
import { fetchDonors } from '~/services/donor.service'
export default {
  name: 'DonorsTable',
  components: {
    TableComponent,
  },
  layout: 'head',
  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      donors: [],
    }
  },
  computed: {
    ...mapGetters({
      userRole: 'auth/userRole',
    }),
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          value: 'companyName',
        },
        {
          text: 'Name Initials',
          value: 'nameInitials',
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
        this.donors = await fetchDonors()
      } catch (error) {
        if (Array.from(error)[0] instanceof GraphQLError) {
          error.forEach((e) => {
            this.$toaster.showToast({
              content: e.message,
              state: 'error',
            })
          })
          // eslint-disable-next-line no-console
        } else console.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(value) {
      this.searchValue = value
    },
    navigateToDonor(donor) {
      /** ==> empty <== **/
    },
  },
}
</script>

<style lang="scss" scoped></style>
