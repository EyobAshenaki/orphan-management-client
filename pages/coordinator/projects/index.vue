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
import { countProjects } from '~/services/project.service'
import { countOrphans } from '~/services/orphan.service'
import ProjectsTable from '~/components/tables/ProjectsTable.vue'
export default {
  name: 'ProjectsPage',

  components: {
    ProjectsTable,
  },

  layout: 'coordinator',

  data() {
    return {
      items: [],
    }
  },

  async mounted() {
    this.items = [
      {
        icon: ['fas', 'timeline'],
        title: 'In-progress Projects',
        value: await this.countProjects('in-progress'),
      },
      {
        icon: ['fas', 'list-check'],
        title: 'Total Projects',
        value: await this.countProjects(),
      },
      {
        icon: ['fas', 'hands-holding-child'],
        title: 'Active Orphans ',
        value: await countOrphans('ACTIVE'),
      },
      {
        icon: ['fas', 'people-roof'],
        title: 'Total Orphans',
        value: await countOrphans(),
      },
    ]
  },
  methods: {
    async countProjects(status) {
      return await countProjects(status)
    },
  },
}
</script>
