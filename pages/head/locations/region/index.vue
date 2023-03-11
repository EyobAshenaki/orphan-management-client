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
            <button-dark to="/head/locations/region/statistics">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'pen']" />
              </fa-layers>
              <span>Edit</span>
            </button-dark>
            <button-light to="/head/locations/region/statistics">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'chart-line']" />
              </fa-layers>
              <span>Statistics</span>
            </button-light>
          </div>
          <h1 class="tw-font-bold tw-text-3xl mb-5">{{ region.name }}</h1>
          <v-spacer></v-spacer>

          <!-- <v-tabs
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
          </v-tabs> -->
        </header>

        <!-- <v-tabs-items v-model="tab">
          <v-tab-item v-for="(item, idx) in items" :key="idx">
            <div
              v-if="tab === 0"
              class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5"
            >
              <villages-table @onVillageClick="navigateToOrphansTab($event)" />
            </div>

            <div
            v-if="tab === 1"
              class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5"
            >
              <orphans-table
                button-label="Add Orphan in village"
                route-to="/coordinator/districts/district/add-orphan"
                @onOrphanDetailClick="handleOrphanDetailClick($event)"
                />
              </div>
          </v-tab-item>
        </v-tabs-items> -->
        <div class="tw-gb-gray-100 tw-border-gray-100 tw-pt-5">
          <zones-table @onZoneClick="navigateToDistrictsTab($event)" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'
import ButtonLight from '~/components/global/ButtonLight.vue'
import ZonesTable from '~/components/tables/ZonesTable.vue'
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
      // tab: 0,
      // items: ['Zones', 'Districts', 'Villages', 'Orphans'],
      statItems: [
        {
          icon: ['fas', 'border-none'],
          title: 'Total Zones',
          value: 1,
        },
        {
          icon: ['fas', 'building-circle-arrow-right'],
          title: 'Total Districts',
          value: 1,
        },
        {
          icon: ['fas', 'tents'],
          title: 'Total Villages',
          value: 1,
        },
        {
          icon: ['fas', 'children'],
          title: 'Total Orphans',
          value: 1,
        },
      ],
    }
  },
  computed: {
    region() {
      return this.$store.state.location.selectedRegion
    },
  },
}
</script>
