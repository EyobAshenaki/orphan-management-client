<template>
  <v-btn
    class="tw-w-fit tw-text-sm tw-capitalize hover:tw-text-emerald-800 hover:tw-bg-emerald-800/10 tw-py-1 tw-px-3"
    text
    :ripple="false"
    :to="to"
    :x-small="isXSmall"
    @click="$emit('click')"
  >
    <slot> Click Me </slot>
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonLight',
  props: {
    to: {
      type: String,
      default: '',
    },
    isXSmall: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
