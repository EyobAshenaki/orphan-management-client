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
export default {
  name: 'ProjectsPage',
  components: {
    StatisticsCard,
    CoordinatorsTable,
  },
  layout: 'head',
  data() {
    return {
      statItemsOne: [
        {
          icon: ['fas', 'diagram-project'],
          title: 'Total Projects',
          value: 1,
        },
        {
          icon: ['fas', 'map'],
          title: 'Total Regions',
          value: 1,
        },
        {
          icon: ['fas', 'border-none'],
          title: 'Total Zones',
          value: 1,
        },
      ],
      statItemsTwo: [
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
}
</script>

<style lang="scss" scoped></style>
