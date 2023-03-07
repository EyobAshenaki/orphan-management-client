<template>
  <v-btn
    class="tw-w-fit tw-text-white tw-text-sm tw-capitalize tw-bg-emerald-800 hover:tw-bg-emerald-700"
    depressed
    :ripple="false"
    :to="to"
    @click="$emit('click')"
  >
    <slot> Click Me </slot>
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonDark',
  props: {
    to: {
      type: String,
      default: '',
    },
  },
}
</script>
