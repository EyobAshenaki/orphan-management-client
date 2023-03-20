<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in items" :key="item.title" :item="item" />
    </div>
    <div class="px-3">
      <donors-table class="tw-my-5" />
    </div>
  </section>
</template>

<script>
import StatisticsCard from '~/components/global/StatisticsCard.vue'
import DonorsTable from '~/components/tables/DonorsTable.vue'
const internationalMoneyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'ETB',
  notation: 'compact',
})
export default {
  name: 'DonorsPage',
  components: {
    StatisticsCard,
    DonorsTable,
  },
  layout: 'head',
  computed: {
    items() {
      return [
        {
          icon: ['fas', 'timeline'],
          title: 'In-progress Donors',
          value: 10,
        },
        {
          icon: ['fas', 'list-check'],
          title: 'Total Donors',
          value: 10,
        },
        {
          icon: ['fas', 'dollar-sign'],
          title: 'Money Donated',
          value: internationalMoneyFormat.format(286000000),
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped></style>
