<template>
  <table-component
    :loading="loading"
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
    <template v-if="buttonLabel" #title-button>
      <button-light :to="routeTo">
        <span>{{ buttonLabel }}</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="buttonIcon" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #districtSocialWorkers="{ item }">
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
      <button-dark @click="initialize">Reset</button-dark>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
import { fetchOrphans } from '~/services/orphan.service'
import { orphanFullName, calculateAge } from '~/helpers/app.helpers'
export default {
  name: 'OrphansTable',

  components: {
    TableComponent,
  },

  props: {
    routeTo: {
      type: String,
      default: '/',
    },
    buttonLabel: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: Array,
      default: () => ['fas', 'plus'],
    },
    isOnProject: {
      type: Boolean,
      default: false,
    },
    isOnDistrict: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 10,
      loading: false,
      orphans: [],
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
  },
  async mounted() {
    this.loading = true
    await this.initialize()
  },
  methods: {
    async initialize() {
      try {
        if (this.isOnDistrict)
          this.$store.dispatch('coordinator/unsetSelectedVillageId')
        this.orphans = (
          await fetchOrphans(
            undefined,
            !this.isOnProject && !this.isOnDistrict
              ? this.$store.state.coordinator.selectedVillageId ?? undefined
              : undefined,
            !this.isOnProject && this.isOnDistrict
              ? this.$store.state.coordinator.selectedDistrictId
              : undefined,
            this.isOnProject
              ? this.$store.state.coordinator.selectedProjectId
              : undefined
          )
        ).map((orphan) => ({
          ...orphan,
          orphanName: orphanFullName(orphan),
          age: calculateAge(orphan.dateOfBirth),
          gender: orphan.gender === 'M' ? 'Male' : 'Female',
          sponsorshipStatus: orphan.currentOrphanData.sponsorshipStatus.status,
          registrationDate: new Date(orphan.createdAt).toLocaleDateString(),
        }))
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },

    handleSearch(value) {
      this.searchValue = value
    },

    navigateToOrphanDetails(item) {
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
