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
            <button-dark
              :to="`/locations/${$route.params.regionId}/${$route.params.zoneId}/${$route.params.districtId}/${$route.params.villageId}/statistics`"
            >
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'pen']" />
              </fa-layers>
              <span>Edit</span>
            </button-dark>
            <button-light
              :to="`/locations/${$route.params.regionId}/${$route.params.zoneId}/${$route.params.districtId}/${$route.params.villageId}/statistics`"
            >
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
import { GraphQLError } from 'graphql'
import ButtonDark from '~/components/global/ButtonDark.vue'
import ButtonLight from '~/components/global/ButtonLight.vue'
import VillagesTable from '~/components/tables/VillagesTable.vue'
import { countVillages, fetchDistrict } from '~/services/location.service'
import { countOrphans } from '~/services/orphan.service'
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
      district: null,
      statItems: [],
    }
  },
  async mounted() {
    try {
      this.district = await fetchDistrict(this.$route.params.districtId)
      this.statItems = [
        {
          icon: ['fas', 'tents'],
          title: 'Total Villages',
          value: await countVillages(this.$route.params.districtId),
        },
        {
          icon: ['fas', 'children'],
          title: 'Total Orphans',
          value: await countOrphans(null, this.$route.params.districtId),
        },
      ]
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
}
</script>
