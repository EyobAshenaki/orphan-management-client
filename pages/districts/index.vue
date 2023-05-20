<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in statisticsItems" :key="item.title" :item="item" />
    </div>
    <div class="px-3">
      <districts-table class="tw-my-5" />
    </div>
  </section>
</template>

<script>
import DistrictsTable from '~/components/tables/DistrictsTable.vue'
import { countOrphans } from '~/services/orphan.service';
import { countProjects } from '~/services/project.service';
import { countDistricts, countVillages } from '~/services/location.service';
export default {
  name: 'DistrictsPage',

  components: {
    DistrictsTable,
  },

  layout: 'coordinator',

  data() {
    return {
      statisticsItems: [],
    }
  },

  async mounted() {
    this.statisticsItems = [
        {
          icon: ['fas', 'city'],
          title: 'Total Districts',
          value: await countDistricts(),
        },
        {
          icon: ['fas', 'tents'],
          title: 'Total Villages ',
          value: await countVillages(),
        },
        {
          icon: ['fas', 'list-check'],
          title: 'Total Projects',
          value: await countProjects(),
        },
        {
          icon: ['fas', 'people-roof'],
          title: 'Total Orphans',
          value: await countOrphans(),
        },
      ]
  },
}
</script>
