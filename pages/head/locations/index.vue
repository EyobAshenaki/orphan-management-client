<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in items" :key="item.title" :item="item" />
    </div>
    <div>
      <regions-table />
    </div>
  </section>
</template>

<script>
import RegionsTable from '~/components/tables/RegionsTable.vue'
export default {
  name: 'LocationsPage',
  components: {
    RegionsTable,
  },
  layout: 'head',
  data() {
    return {
      items: [
        {
          icon: ['fas', 'map'],
          title: 'Total Regions',
          value: Array.from(this.$store.state.location.regions).length,
        },
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
}
</script>

<style lang="scss" scoped></style>
