<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in items" :key="item.title" :item="item" />
    </div>
    <div class="px-3">
      <social-workers-table class="tw-my-5" />
    </div>
  </section>
</template>

<script>
import SocialWorkersTable from '~/components/tables/SocialWorkersTable.vue'
export default {
  name: 'SocialWorkersPage',

  components: {
    SocialWorkersTable,
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
          icon: ['fas', 'people-line'],
          title: 'Zone Social Workers',
          value: 10,
        },
        {
          icon: ['fas', 'people-arrows'],
          title: 'Total Families',
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
