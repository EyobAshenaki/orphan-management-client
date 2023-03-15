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
            <button-dark to="/head/locations/district/statistics">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'pen']" />
              </fa-layers>
              <span>Edit</span>
            </button-dark>
            <button-light to="/head/locations/district/statistics">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'chart-line']" />
              </fa-layers>
              <span>Statistics</span>
            </button-light>
          </div>
          <h1 class="tw-font-bold tw-text-3xl mb-5">{{ district.name }}</h1>
          <v-spacer></v-spacer>
        </header>
        <div class="tw-gb-gray-100 tw-border-gray-100 tw-pt-5">
          <villages-table @onDistrictClick="navigateToVillagesTab($event)" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'
import ButtonLight from '~/components/global/ButtonLight.vue'
import VillagesTable from '~/components/tables/VillagesTable.vue'
export default {
  name: 'DistrictPage',
  components: {
    ButtonDark,
    ButtonLight,
    VillagesTable,
  },
  layout: 'head',
  data() {
    return {
      version: 1,
      statItems: [
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
    district() {
      return this.$store.state.location.selectedDistrict
    },
  },
}
</script>
