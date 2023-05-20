<template>
  <table-component
    :loading="loading"
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
              {{
                villageSocialWorker
                  ? socialWorkerAcronym(villageSocialWorker?.user?.personalInfo)
                  : 'N/A'
              }}
            </span>
          </v-avatar>
        </template>
        <span>
          {{
            villageSocialWorker
              ? socialWorkerAcronym(villageSocialWorker?.user?.personalInfo)
              : 'N/A'
          }}
        </span>
      </v-tooltip>
    </template>

    <template v-if="userRole === 'head'" #title-button>
      <button-light
        :to="`/locations/${$route.params.regionId}/${$route.params.zoneId}/${$route.params.districtId}/add-village`"
      >
        <span>Add Village</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #no-data>
      <button-dark @click="initialize">Reset</button-dark>
    </template>
  </table-component>
</template>

<script>
import { GraphQLError } from 'graphql'
import TableComponent from '../global/TableComponent.vue'
import { fetchVillages } from '~/services/location.service'
export default {
  name: 'VillagesTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      villages: [],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Village Name',
          align: 'start',
          value: 'name',
        },
        { text: 'District', value: 'districtName' },
        { text: 'Orphan count', value: '_count_orphans' },
        {
          text: 'Social Worker',
          value: 'villageSocialWorker',
        },
      ]
    },
    userRole() {
      return this.$store.getters['auth/userRole']
    },
  },
  async mounted() {
    this.loading = true
    await this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.villages = (
          await fetchVillages(
            this.$route.params.districtId ?? null,
            this.$route.params.socialWorkerId ?? null,
            true
          )
        ).map((village) => {
          const villageSocialWorkers = village?.socialWorkers
          return {
            ...village,
            id: village.id,
            name: village.name,
            districtName: village.district.name,
            villageSocialWorker: villageSocialWorkers[0],
          }
        })
      } catch (error) {
        if (Array.from(error)[0] instanceof GraphQLError) {
          error.forEach((e) => {
            this.$toaster.showToast({
              content: e.message,
              state: 'error',
            })
          })
          // eslint-disable-next-line no-console
        } else console.log(error)
      } finally {
        this.loading = false
      }
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
      if (!socialWorker) return
      this.$router.push(`/social-workers/${socialWorker.id}`)
    },
  },
}
</script>
