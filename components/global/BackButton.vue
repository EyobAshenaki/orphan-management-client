<template>
  <v-btn small text plain fab @click="handleClick">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    handleClick() {
      // this.$router.go(-1)
      this.$router.back()
    },
  },
}
</script>
