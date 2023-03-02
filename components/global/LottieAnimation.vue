<template>
  <lottie :options="lottieOptions" @animCreated="handleAnimation" />
</template>

<script>
import Lottie from 'vue-lottie/src/lottie.vue'
export default {
  name: 'LottieAnimation',

  components: {
    Lottie,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: this.item.animationData.default },
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
  },
}
</script>
