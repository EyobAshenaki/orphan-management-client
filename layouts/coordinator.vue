<template>
  <v-app>
    <side-bar :items="items" />
    <v-main class="tw-bg-gray-100">
      <v-container class="tw-overflow-y-hidden">
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
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from '~/components/layout/SideBar.vue'
import BreadCrumbs from '~/components/layout/BreadCrumbs.vue'
export default {
  name: 'CoordinatorLayout',

  components: {
    SideBar,
    BreadCrumbs,
  },

  data() {
    return {
      items: [
        {
          icon: ['fas', 'house'],
          title: 'Home',
          to: '/coordinator',
        },
        {
          icon: ['fas', 'diagram-project'],
          title: 'Projects',
          to: '/coordinator/projects',
        },
        {
          icon: ['fas', 'people-group'],
          title: 'Social Workers',
          to: '/coordinator/social-workers',
        },
        {
          icon: ['fas', 'hand-holding-dollar'],
          title: 'Donors',
          to: '/coordinator/donors',
        },
        {
          icon: ['fas', 'city'],
          title: 'Districts',
          to: '/coordinator/districts',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
