<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in items" :key="item.title" :item="item" />
    </div>
    <div class="px-3">
      <projects-table class="tw-my-5" />
    </div>
  </section>
</template>

<script>
import ProjectsTable from '~/components/tables/ProjectsTable.vue'
export default {
  name: 'ProjectsPage',

  components: {
    ProjectsTable,
  },

  layout: 'coordinator',

  computed: {
    items() {
      return [
        {
          icon: ['fas', 'timeline'],
          title: 'In-progress Projects',
          value: 10,
        },
        {
          icon: ['fas', 'list-check'],
          title: 'Total Projects',
          value: 10,
        },
        {
          icon: ['fas', 'hands-holding-child'],
          title: 'Active Orphans ',
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
