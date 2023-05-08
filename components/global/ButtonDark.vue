<template>
  <v-btn
    class="tw-w-fit tw-text-white tw-text-sm tw-capitalize tw-bg-emerald-800 hover:tw-bg-emerald-700"
    depressed
    :ripple="false"
    :to="to"
    :disabled="disabled"
    :loading="disabled || loading"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
