<template>
  <div class="tw-relative tw-py-8">
    <v-divider
      class="tw-w-10 tw-absolute tw-top-1/2 -tw-translate-y-1/2"
      :class="[
        active
          ? 'tw-border-emerald-800 tw-border-t-2'
          : 'tw-border-gray-200 tw-border-t',
        completed
          ? 'tw-border-t-2 tw-border-gray-400'
          : 'tw-border-t tw-border-gray-200',
      ]"
    ></v-divider>
    <fa-layers
      v-if="completed"
      class="fa-lg tw-absolute tw-top-1/2 tw-left-14 -tw-translate-y-1/2 tw-text-emerald-800"
    >
      <fa :icon="['fa', 'circle-check']" />
    </fa-layers>
    <div
      class="tw-absolute tw-top-1/2 -tw-translate-y-1/2"
      :class="[
        active || completed
          ? 'tw-text-emerald-800 tw-font-medium'
          : 'tw-text-gray-400',
        completed ? 'tw-left-[5.5rem]' : 'tw-left-14',
      ]"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddOrphanStep',

  props: {
    title: {
      type: String,
      required: true,
    },

    step: {
      type: Number,
      required: true,
    },
  },

  computed: {
    activeStep() {
      return this.$store.getters['addOrphan/activeStep']
    },

    active() {
      return this.activeStep === this.step
    },

    completed() {
      return this.activeStep > this.step
    },
  },
}
</script>
