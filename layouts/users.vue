<template>
  <default-layout>
    <v-container>
      <section class="tw-h-fit tw-flex tw-justify-between tw-gap-10">
        <back-button />

        <v-spacer></v-spacer>

        <search-field />

        <v-avatar size="40" color="grey lighten-2">
          <fa-layers class="fa-lg">
            <fa :icon="['fa', 'user']" />
          </fa-layers>
        </v-avatar>
      </section>

      <bread-crumbs />
      <v-breadcrumbs divider="🚀">
        
      </v-breadcrumbs>
      <nuxt v-if="!$slots.default" />
      <slot />
    </v-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '~/layouts/default.vue'
import BreadCrumbs from '~/components/layout/BreadCrumbs.vue'

export default {
  name: 'UsersLayout',

  components: {
    DefaultLayout,
    BreadCrumbs,
  },
}
</script>
