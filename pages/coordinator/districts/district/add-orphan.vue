<template>
  <section>
    <add-orphan-detail-step v-if="activeStep === 1" />
    <add-orphan-education-step v-else-if="activeStep === 2" />
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
import AddOrphanEducationStep from '~/components/coordinator/district/AddOrphanEducationStep.vue'

export default {
  name: 'AddOrphanPage',
  components: {
    AddOrphanDetailStep,
    AddOrphanEducationStep,
  },
  layout: 'add_orphan',

  computed: {
    activeStep() {
      return this.$store.getters['addOrphan/activeStep']
    },
  },
}
</script>
