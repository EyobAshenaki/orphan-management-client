<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in items" :key="item.title" :item="item" />
    </div>
    <div class="px-3">
      <districts-table class="tw-my-5" />
    </div>
  </section>
</template>

<script>
import DistrictsTable from '~/components/tables/DistrictsTable.vue'
export default {
  name: 'DistrictsPage',

  components: {
    DistrictsTable,
  },

  layout: 'coordinator',

  computed: {
    items() {
      return [
        {
          icon: ['fas', 'people-group'],
          title: 'Total Social Workers',
          value: 10,
        },
        {
          icon: ['fas', 'tents'],
          title: 'Total Villages ',
          value: 10,
        },
        {
          icon: ['fas', 'list-check'],
          title: 'Total Projects',
          value: 10,
        },
        {
          icon: ['fas', 'people-roof'],
          title: 'Total Orphans',
          value: 10,
        },
      ]
    },
  },
}
</script>
