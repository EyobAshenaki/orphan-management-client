<template>
  <div>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card
        v-for="item in statItemsOne"
        :key="item.title"
        :item="item"
      />
    </div>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card
        v-for="item in statItemsTwo"
        :key="item.title"
        :item="item"
      />
    </div>
    <div>
      <coordinators-table />
    </div>
  </div>
</template>

<script>
import StatisticsCard from '~/components/global/StatisticsCard.vue'
import CoordinatorsTable from '~/components/tables/CoordinatorsTable.vue'
import { countProjects } from '~/services/project.service'
import {
  countRegions,
  countZones,
  countDistricts,
  countVillages,
} from '~/services/location.service'
import { countOrphans } from '~/services/orphan.service'
export default {
  name: 'ProjectsPage',
  components: {
    StatisticsCard,
    CoordinatorsTable,
  },
  layout: 'head',
  data() {
    return {
      statItemsOne: [],
      statItemsTwo: [],
    }
  },
  async mounted() {
    try {
      this.statItemsOne = [
        {
          icon: ['fas', 'diagram-project'],
          title: 'Total Projects',
          value: await countProjects(),
        },
        {
          icon: ['fas', 'map'],
          title: 'Total Regions',
          value: await countRegions(),
        },
        {
          icon: ['fas', 'border-none'],
          title: 'Total Zones',
          value: await countZones(),
        },
      ]

      this.statItemsTwo = [
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
    } catch (error) {}
  },
}
</script>

<style lang="scss" scoped></style>
