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
import { countSocialWorkers } from '~/services/social-worker.service'
import { countOrphans, countGuardians } from '~/services/orphan.service'
export default {
  name: 'SocialWorkersPage',

  components: {
    SocialWorkersTable,
  },

  layout: 'dashboard',

  data() {
    return {
      items: [],
      loading: false,
    }
  },

  mounted() {
    this.loading = true
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        this.items = [
          {
            icon: ['fas', 'people-group'],
            title: 'Total Social Workers',
            value: await countSocialWorkers(),
          },
          /* todo: add this when zone social workers are added
          {
            icon: ['fas', 'people-line'],
            title: 'Zone Social Workers',
            value: 10,
          },
           */
          {
            icon: ['fas', 'people-arrows'],
            title: 'Total Families',
            value: await countGuardians(),
          },
          {
            icon: ['fas', 'people-roof'],
            title: 'Total Orphans',
            value: await countOrphans(),
          },
        ]
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
