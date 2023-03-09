<template>
  <section>
    <add-orphan-detail-step v-if="activeStep === 1" />
    <add-orphan-education-step v-else-if="activeStep === 2" />
    <add-orphan-family-step v-else-if="activeStep === 3" />
    <add-orphan-guardian-step v-else-if="activeStep === 4" />
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
import AddOrphanFamilyStep from '~/components/coordinator/district/AddOrphanFamilyStep.vue'
import AddOrphanGuardianStep from '~/components/coordinator/district/AddOrphanGuardianStep.vue'

export default {
  name: 'AddOrphanPage',
  components: {
    AddOrphanDetailStep,
    AddOrphanEducationStep,
    AddOrphanFamilyStep,
    AddOrphanGuardianStep,
  },
  layout: 'add_orphan',

  computed: {
    activeStep() {
      return this.$store.getters['addOrphan/activeStep']
    },
  },
}
</script>
