<template>
  <section>
    <add-orphan-detail-step v-if="activeStep === 1" />
    <div
      v-else
      class="tw-w-full tw-max-h-full tw-flex tw-flex-col tw-justify-center tw-items-center"
    >
      <work-in-progress class="tw-aspect-square tw-w-1/2" />
    </div>
  </section>
</template>

<script>
import AddOrphanDetailStep from '~/components/coordinator/district/AddOrphanDetailStep.vue'

export default {
  name: 'AddOrphanPage',
  components: {
    AddOrphanDetailStep,
  },
  layout: 'add_orphan',

  computed: {
    activeStep() {
      return this.$store.getters['addOrphan/activeStep']
    },
  },
}
</script>
