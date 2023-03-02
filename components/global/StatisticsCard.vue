<template>
  <div
    class="tw-min-h-max tw-w-56 tw-flex tw-justify-center tw-items-center tw-gap-2 tw-bg-white tw-border tw-border-gray-500 tw-rounded-md tw-shadow-md tw-py-4 tw-px-2 tw-mb-4"
  >
    <fa-layers class="tw-w-[30%] tw-justify-self-center">
      <fa class="tw-w-8 tw-h-8" :icon="getIcons" />
    </fa-layers>
    <div class="tw-w-[65%] tw-flex tw-flex-col tw-justify-center">
      <span class="tw-text-xs tw-text-gray-700">{{ item.title }}</span>
      <span class="tw-text-2xl tw-font-bold">{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getIcons() {
      return this.item.icon ? this.item.icon : ['fa', 'circle-question']
    },
  },
}
</script>
