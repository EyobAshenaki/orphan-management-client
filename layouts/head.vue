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

export default {
  name: 'HeadLayout',

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
          to: '/head',
        },
        {
          icon: ['fas', 'map'],
          title: 'Locations',
          to: '/head/locations',
        },
        {
          icon: ['fas', 'diagram-project'],
          title: 'Projects',
          to: '/head/projects',
        },
        {
          icon: ['fas', 'people-roof'],
          title: 'Coordinators',
          to: '/head/coordinators',
        },
      ],
    }
  },
}
</script>
