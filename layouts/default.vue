<template>
  <v-app class="tw-bg-gray-100">
    <v-main class="tw-overflow-y-hidden">
      <snack-bar />
      <nuxt v-if="!$slots.default" />
      <slot />
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from '~/components/layout/SnackBar.vue'

export default {
  name: 'DefaultLayout',

  components: {
    SnackBar,
  },

  mounted() {
    // To mount the toast component before the page is loaded and to avoid the bug of
    // the toast not showing up on the first click or call of the function showToast()
    this.$toaster.showToast({
      content: 'Successfully logged in!',
      state: 'warning',
    })
  },
}
</script>
