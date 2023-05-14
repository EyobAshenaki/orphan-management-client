<template>
  <v-app>
    <side-bar :items="items" />
    <users-layout>
      <nuxt />
    </users-layout>
  </v-app>
</template>

<script>
import UsersLayout from '~/layouts/users.vue'
import SideBar from '~/components/layout/SideBar.vue'
import { layoutGuard } from '~/helpers/auth.helper'

export default {
  name: 'CoordinatorLayout',

  components: {
    UsersLayout,
    SideBar,
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
        // todo: uncomment when donors page is ready
        // {
        //   icon: ['fas', 'hand-holding-dollar'],
        //   title: 'Donors',
        //   to: '/coordinator/donors',
        // },
        {
          icon: ['fas', 'city'],
          title: 'Districts',
          to: '/coordinator/districts',
        },
      ],
    }
  },
  beforeMount() {
    layoutGuard(this)
  },
}
</script>
