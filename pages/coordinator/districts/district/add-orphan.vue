<template>
  <section>
    <add-orphan-stepper />
    <add-orphan-step-item />
  </section>
</template>

<script>
import AddOrphanStepper from '~/components/coordinator/district/AddOrphanStepper.vue'
import AddOrphanStepItem from '~/components/coordinator/district/AddOrphanStepItem.vue'

export default {
  name: 'AddOrphanPage',
  components: { AddOrphanStepper, AddOrphanStepItem },
}
</script>
