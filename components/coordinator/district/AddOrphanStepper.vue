<template>
  <div
    class="tw-fixed tw-top-0 tw-left-0 tw-w-72 tw-h-full tw-border tw-border-black tw-bg-white tw-pt-10"
  >
    <add-orphan-step
      v-for="(registrationStep, idx) in registrationSteps"
      :key="idx"
      :title="registrationStep.title"
      :step="registrationStep.step"
    />
  </div>
</template>

<script>
import AddOrphanStep from '~/components/coordinator/district/AddOrphanStep.vue'

export default {
  name: 'AddOrphanStepper',

  components: { AddOrphanStep },

  data() {
    return {}
  },

  computed: {
    registrationSteps() {
      return this.$store.getters['addOrphan/registrationSteps']
    },
  },
}
</script>
