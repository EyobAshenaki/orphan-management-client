<template>
  <div
    class="tw-min-h-max tw-min-w-min tw-flex tw-justify-center tw-items-center tw-gap-4 tw-bg-white tw-border tw-border-gray-200 tw-rounded-md tw-py-2 tw-px-4"
  >
    <div
      class="tw-w-8 tw-aspect-square tw-relative tw-rounded-full tw-text-emerald-800 tw-bg-emerald-800/10 tw-mr-2"
    >
      <fa-layers
        class="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
      >
        <fa class="tw-w-4 tw-h-4" :icon="titleIcon" />
      </fa-layers>
    </div>

    <div class="tw-flex tw-flex-col tw-justify-center">
      <span class="tw-text-base tw-font-medium">
        <slot name="title"></slot>
      </span>
      <span class="tw-text-xs tw-text-gray-600">
        <slot name="subtitle"></slot>
      </span>
    </div>

    <v-divider vertical class="tw-mx-2"></v-divider>

    <div class="tw-flex tw-flex-col tw-justify-center">
      <slot name="firstStat"></slot>
    </div>

    <div class="tw-flex tw-flex-col tw-justify-center">
      <slot name="secondStat"></slot>
    </div>

    <fa-layers class="ml-2">
      <fa class="tw-w-3 tw-h-3" :icon="actionIcon" />
    </fa-layers>
  </div>
</template>

<script>
export default {
  name: 'ListComponent',

  props: {
    item: {
      type: Object,
      required: true,
    },
    titleIcon: {
      type: Array,
      required: true,
    },
    actionIcon: {
      type: Array,
      required: true,
    },
  },
}
</script>
