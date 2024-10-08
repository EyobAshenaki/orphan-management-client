<template>
  <section>
    <header class="tw-w-full tw-relative tw-bg-white tw-px-8 tw-pt-8">
      <button-dark
        v-if="false"
        class="tw-absolute tw-top-6 tw-right-6"
        to="/districts/:districtId/statistics"
      >
        <fa-layers class="tw-mr-2">
          <fa :icon="['fa', 'chart-line']" />
        </fa-layers>
        <span>Statistics</span>
      </button-dark>

      <h1 class="tw-font-bold tw-text-3xl mb-5">{{ district?.name }}</h1>

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
          <villages-table @onVillageClick="navigateToOrphansTab($event)" />
        </div>

        <div v-if="tab === 1" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <orphans-table
            :is-on-district="isOrphansTableOnDistrict"
            button-label="Add Orphan in village"
            :route-to="`/districts/${$route.params.districtId}/add-orphan`"
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
import { fetchDistrict } from '~/services/location.service'
export default {
  name: 'DistrictPage',

  components: {
    VillagesTable,
    OrphansTable,
  },

  layout: 'coordinator',

  data() {
    return {
      tab: null,
      loading: false,
      items: ['Villages', 'Orphans'],
      district: null,
      isOrphansTableOnDistrict: true,
    }
  },

  mounted() {
    this.loading = true
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        this.district = await fetchDistrict(
          this.$route.params.districtId,
        )
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },
    navigateToOrphansTab(village) {
      this.$store.dispatch('coordinator/setSelectedVillageId', village.id)
      // todo: find a way to not need to do this
      // this.$store.dispatch('coordinator/unsetSelectedDistrictId')
      this.isOrphansTableOnDistrict = false
      this.tab = 1
    },

    handleOrphanDetailClick(item) {
      this.$router.push({
        name: 'districts-districtId-orphanId',
        // Instead of passing the id to the route, we should store it in the vuex store
        params: { orphanId: item.id },
      })
    },
  },
}
</script>
