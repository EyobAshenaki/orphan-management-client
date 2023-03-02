<template>
  <section>
    <h1 class="tw-font-thin tw-font-mono tw-text-xl tw-text-center tw-mt-10">
      Work in progress
    </h1>
    <LottieAnimation :item="item" />
  </section>
</template>

<script>
import LottieAnimation from '~/components/global/LottieAnimation.vue'
import * as animationData1 from '~/assets/animations/work-in-progress/work_in_progress_1.json'
import * as animationData2 from '~/assets/animations/work-in-progress/work_in_progress_2.json'
import * as animationData3 from '~/assets/animations/work-in-progress/work_in_progress_3.json'
import * as animationData4 from '~/assets/animations/work-in-progress/work_in_progress_4.json'
import * as animationData5 from '~/assets/animations/work-in-progress/work_in_progress_5.json'
import * as animationData6 from '~/assets/animations/work-in-progress/work_in_progress_6.json'

export default {
  name: 'WorkInProgress',

  components: {
    LottieAnimation,
  },
  computed: {
    item() {
      const animationData = {
        1: animationData1,
        2: animationData2,
        3: animationData3,
        4: animationData4,
        5: animationData5,
        6: animationData6,
      }
      const getRandomNum = Math.floor(Math.random() * 6) + 1
      return {
        animationData: animationData[getRandomNum],
      }
    },
  },
}
</script>
