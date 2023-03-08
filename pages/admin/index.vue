<template>
  <section>
    <div
      class="tw-w-full tw-max-h-full tw-flex tw-flex-col tw-justify-center tw-items-center"
    >
      <work-in-progress class="tw-aspect-square tw-w-1/2" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdminDashboard',
  layout: 'admin',
  data() {
    return {
      items: [
        {
          icon: ['fas', 'house'],
          title: 'Home',
          to: '/admin',
        },
        {
          icon: ['fas', 'user-group'],
          title: 'Users',
          to: '/admin/users',
        },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('user/fetchUsers')
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
