<template>
  <div>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card
        v-for="item in statItems"
        :key="item.title"
        :item="item"
      />
    </div>
    <div>
      <section>
        <header class="tw-w-full tw-relative tw-bg-white tw-px-8 tw-p-8">
          <div
            v-if="version > 1"
            class="tw-absolute tw-top-6 tw-right-6 tw-flex tw-flex-col tw-gap-3"
          >
            <button-dark :to="`/locations/${$route.params.regionId}/statistics`">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'pen']" />
              </fa-layers>
              <span>Edit</span>
            </button-dark>
            <button-light :to="`/locations/${$route.params.regionId}/statistics`">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'chart-line']" />
              </fa-layers>
              <span>Statistics</span>
            </button-light>
          </div>
          <h1 class="tw-font-bold tw-text-3xl mb-5">{{ region?.name }}</h1>
          <v-spacer></v-spacer>
        </header>
        <div class="tw-gb-gray-100 tw-border-gray-100 tw-pt-5">
          <zones-table
            :region-id="$route.params.regionId"
            @onZoneClick="navigateToDistrictsTab($event)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'
import ButtonLight from '~/components/global/ButtonLight.vue'
import ZonesTable from '~/components/tables/ZonesTable.vue'
import {
  fetchRegion,
  countZones,
  countDistricts,
  countVillages,
} from '~/services/location.service'
import { countOrphans } from '~/services/orphan.service'
export default {
  name: 'RegionPage',
  components: {
    ButtonDark,
    ButtonLight,
    ZonesTable,
  },
  layout: 'head',
  data() {
    return {
      version: 1,
      statItems: [],
      region: null,
    }
  },
  async mounted() {
    try {
      this.region = await fetchRegion(this.$route.params.regionId)
      this.statItems = [
        {
          icon: ['fas', 'border-none'],
          title: 'Total Zones',
          value: await countZones(this.region.id),
        },
        {
          icon: ['fas', 'building-circle-arrow-right'],
          title: 'Total Districts',
          value: await countDistricts(),
        },
        {
          icon: ['fas', 'tents'],
          title: 'Total Villages',
          value: await countVillages(),
        },
        {
          icon: ['fas', 'children'],
          title: 'Total Orphans',
          value: await countOrphans(),
        },
      ]
    } catch (error) {
      /* empty */
    }
  },
}
</script>
