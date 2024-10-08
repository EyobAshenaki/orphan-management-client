<template>
  <section>
    <header class="tw-w-full tw-relative tw-bg-white tw-px-8 tw-pt-8">
      <button-dark
        v-if="false"
        class="tw-absolute tw-top-6 tw-right-6"
        to="/coordinator/social-workers/social-worker/statistics"
      >
        <fa-layers class="tw-mr-2">
          <fa :icon="['fa', 'chart-line']" />
        </fa-layers>
        <span>Statistics</span>
      </button-dark>

      <h1 class="tw-font-bold tw-text-3xl mb-5">
        {{ fullName(socialWorker?.user?.personalInfo) }}
      </h1>

      <v-spacer></v-spacer>

      <v-tabs
        v-model="tab"
        height="35"
        slider-size="3"
        class="pb-7 mt-3"
        active-class="tw-text-emerald-800"
      >
        <v-tabs-slider
          class="tw-w-[65%] tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2"
          color="tw-bg-emerald-800"
        ></v-tabs-slider>
        <v-tab
          v-for="(item, idx) in items"
          :key="idx"
          class="tw-capitalize hover:tw-text-emerald-800 hover:tw-bg-emerald-800/5 tw-rounded-[4px] tw-mx-2 tw-px-2"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </header>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, idx) in items" :key="idx">
        <div v-if="tab === 0" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <profile
            :social-worker="socialWorker"
            @onVillagesViewAllClick="navigateToVillagesTab"
          />
        </div>

        <div v-if="tab === 1" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <villages-table @onVillageClick="navigateToOrphansTab($event)" />
        </div>

        <div
          v-else-if="tab === 2"
          class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5"
        >
        <!-- route-to="/social-workers/:socialWorkerId/assign-orphan" -->
        <!-- button-label="Assign Orphan" -->
        <!-- :button-icon="['fas', 'user-plus']" -->
        <orphans-table
            @onOrphanDetailClick="handleOrphanDetailClick($event)"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>

<script>
import VillagesTable from '~/components/tables/VillagesTable.vue'
import OrphansTable from '~/components/tables/OrphansTable.vue'
import Profile from '~/components/coordinator/social-worker/Profile.vue'
import { fetchSocialWorker } from '~/services/social-worker.service'
import { fullName } from '~/helpers/app.helper'
export default {
  name: 'DistrictPage',

  components: {
    VillagesTable,
    OrphansTable,
    Profile,
  },

  layout: 'dashboard',

  data() {
    return {
      tab: null,
      loading: false,
      items: ['Profile', 'Villages', 'Orphans'],
      socialWorker: null,
    }
  },

  computed: {
    userRole() {
      return this.$store.getters['auth/userRole']
    },
  },

  async mounted() {
    this.loading = true
    await this.initialize()
  },

  methods: {
    fullName,
    async initialize() {
      try {
        this.socialWorker = await fetchSocialWorker(
          this.$route.params.socialWorkerId
        )
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },
    navigateToVillagesTab() {
      this.tab = 1
    },

    navigateToOrphansTab(village) {
      this.$store.dispatch('coordinator/setSelectedVillageId', village.id)
      this.tab = 2
    },

    handleOrphanDetailClick(item) {
      console.log('Go to orphan detail: ', item)
      this.$router.push({
        name: 'social-workers-socialWorkerId-orphanId',
        params: { orphanId: item.id },
      })
    },
  },
}
</script>
