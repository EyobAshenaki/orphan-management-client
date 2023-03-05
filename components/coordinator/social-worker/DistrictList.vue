<template>
  <list-component
    :item="district"
    :title-icon="titleIcon"
    :action-icon="actionIcon"
  >
    <template #title>
      {{ district.name }}
    </template>

    <template #subtitle>
      {{ district.zoneName }}
    </template>

    <template #firstStat>
      <span class="tw-text-lg tw-text-center tw-font-medium">
        {{ district.noOfVillages }}
      </span>
      <span class="tw-text-xs tw-text-gray-600">villages</span>
    </template>

    <template #secondStat>
      <span class="tw-text-lg tw-text-center tw-font-medium">
        {{ district.noOfSocialWorkers }}
      </span>
      <span class="tw-truncate tw-text-xs tw-text-gray-600"
        >social workers</span
      >
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
    district: {
      type: Object,
      required: true,
    },
    titleIcon: {
      type: Array,
      default: () => ['fa', 'building'],
    },
    actionIcon: {
      type: Array,
      default: () => ['fa', 'chevron-right'],
    },
  },
}
</script>
