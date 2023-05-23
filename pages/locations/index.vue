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
import { GraphQLError } from 'graphql';
import RegionsTable from '~/components/tables/RegionsTable.vue'
import {
  countRegions,
  countZones,
  countDistricts,
  countVillages,
} from '~/services/location.service'
import { countOrphans } from '~/services/orphan.service'
export default {
  name: 'LocationsPage',
  components: {
    RegionsTable,
  },
  layout: 'head',
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
   try {
     this.items = [
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
   } catch (error) {
     if (Array.from(error)[0] instanceof GraphQLError) {
       error.forEach((e) => {
         this.$toaster.showToast({
           content: e.message,
           state: 'error',
         });
       });
       // eslint-disable-next-line no-console
     } else console.log(error);
   }
  },
}
</script>

<style lang="scss" scoped></style>
