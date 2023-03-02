<template>
  <section>
    <LottieAnimation :item="item" />
  </section>
</template>

<script>
import LottieAnimation from '~/components/global/LottieAnimation.vue'
import * as animationData1 from '~/assets/animations/coming-soon/coming_soon_1.json'
import * as animationData2 from '~/assets/animations/coming-soon/coming_soon_2.json'
import * as animationData3 from '~/assets/animations/coming-soon/coming_soon_3.json'

export default {
  name: 'ComingSoon',

  components: {
    LottieAnimation,
  },
  computed: {
    item() {
      const animationData = {
        1: animationData1,
        2: animationData2,
        3: animationData3,
      }
      const getRandomNum = Math.floor(Math.random() * 3) + 1
      return {
        animationData: animationData[getRandomNum],
      }
    },
  },
}
</script>
