<template>
  <v-app>
    <add-orphan-stepper />
    <section class="fixed-container">
      <village-banner />
      <nuxt />
    </section>
  </v-app>
</template>

<script>
import AddOrphanStepper from '~/components/coordinator/district/AddOrphanStepper.vue'
import VillageBanner from '~/components/coordinator/district/VillageBanner.vue'
export default {
  name: 'AddOrphanLayout',
  components: {
    AddOrphanStepper,
    VillageBanner,
  },
}
</script>

<style scoped>
.fixed-container {
  @apply tw-w-full tw-h-full tw-fixed tw-top-0 tw-left-72 tw-border tw-border-black tw-overflow-y-scroll tw-py-8 tw-pl-10;
}
</style>
