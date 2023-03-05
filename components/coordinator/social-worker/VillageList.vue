<template>
  <list-component
    :item="village"
    :title-icon="titleIcon"
    :action-icon="actionIcon"
  >
    <template #title>
      {{ village.name }}
    </template>

    <template #subtitle>
      {{ village.districtName }}
    </template>

    <template #firstStat>
      <span class="tw-text-lg tw-text-center tw-font-medium">
        {{ village.noOfProjects }}
      </span>
      <span class="tw-text-xs tw-text-gray-600">projects</span>
    </template>

    <template #secondStat>
      <span class="tw-text-lg tw-text-center tw-font-medium">
        {{ village.noOfOrphans }}
      </span>
      <span class="tw-text-xs tw-text-gray-600">orphans</span>
    </template>
  </list-component>
</template>

<script>
import ListComponent from '~/components/coordinator/social-worker/ListComponent.vue'

export default {
  name: 'VillageList',

  components: {
    ListComponent,
  },

  props: {
    village: {
      type: Object,
      required: true,
    },
    titleIcon: {
      type: Array,
      default: () => ['fa', 'tent'],
    },
    actionIcon: {
      type: Array,
      default: () => ['fa', 'chevron-right'],
    },
  },
}
</script>
