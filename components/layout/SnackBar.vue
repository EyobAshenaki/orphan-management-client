<template>
  <div
    id="toast-element"
    class="tw-w-full tw-max-w-xs tw-h-max tw-fixed tw-top-14 -tw-right-20 tw-z-[5] tw-flex tw-flex-col tw-bg-white tw-border tw-border-b-0 tw-rounded-md tw-rounded-b-none tw-shadow tw-opacity-0 tw-transition-all tw-duration-200"
    :class="toastColor"
    role="alert"
  >
    <div class="tw-w-full tw-relative tw-flex tw-items-center tw-p-5 tw-pb-3">
      <button class="tw-absolute tw-top-1 tw-right-3" @click="removeToast">
        <fa-layers class="">
          <fa
            class="tw-w-5 tw-h-5 tw-cursor-pointer tw-rounded-full hover:tw-text-red-500 hover:tw-bg-red-500/20 tw-p-0.5"
            :icon="['fa', 'xmark']"
          />
        </fa-layers>
      </button>
      <div
        class="tw-inline-flex tw-flex-shrink-0 tw-justify-center tw-items-center tw-rounded-lg"
      >
        <fa-layers v-if="state == 'success'" class="fa-lg">
          <fa :icon="['fa', 'circle-check']" />
        </fa-layers>
        <fa-layers v-else-if="state == 'info'" class="fa-lg">
          <fa :icon="['fa', 'circle-info']" />
        </fa-layers>
        <fa-layers v-else-if="state == 'warning'" class="fa-lg">
          <fa :icon="['fa', 'triangle-exclamation']" />
        </fa-layers>
        <fa-layers v-else-if="state == 'error'" class="fa-lg">
          <fa :icon="['fa', 'circle-exclamation']" />
        </fa-layers>
        <fa-layers v-else class="fa-lg">
          <fa :icon="['fa', 'bell']" />
        </fa-layers>

        <span class="tw-sr-only">Fire icon</span>
      </div>
      <div class="tw-font-medium tw-text-base tw-ml-3">{{ message }}</div>
    </div>
    <div class="tw-w-full tw-h-1 tw-bg-gray-200">
      <div
        id="progressBar"
        class="tw-w-0 tw-h-1 tw-transition-all tw-ease-in-out tw-duration-[3000ms]"
        :class="progressBarColor"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SnackBar',

  data() {
    return {
      toastIsVisible: false,
      message: '',
      state: '',
      toastOpenTimeout: null,
    }
  },

  computed: {
    progressBarColor() {
      switch (this.state) {
        case 'success':
          return 'tw-bg-green-600'
        case 'error':
          return 'tw-bg-red-600'
        case 'info':
          return 'tw-bg-blue-600'
        case 'warning':
          return 'tw-bg-orange-600'
        default:
          return 'tw-bg-gray-600'
      }
    },
    toastColor() {
      switch (this.state) {
        case 'success':
          return 'tw-text-green-600 tw-border-green-600/80 tw-bg-green-600/30'
        case 'error':
          return 'tw-text-red-600 tw-border-red-600/80 tw-bg-red-600/30'
        case 'info':
          return 'tw-text-blue-600 tw-border-blue-600/80 tw-bg-blue-600/30'
        case 'warning':
          return 'tw-text-orange-600 tw-border-orange-600/80 tw-bg-orange-600/30'
        default:
          return 'tw-text-gray-600 tw-border-gray-600/80 tw-bg-gray-600/30'
      }
    },
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'toast/showToast') {
        this.message = state.toast.content
        this.state = state.toast.state
        this.toastIsVisible = true

        const toaster = document.getElementById('toast-element')
        const progressBarElmt = document.getElementById('progressBar')

        toaster?.classList.replace('-tw-right-20', 'tw-right-5')
        toaster?.classList.replace('tw-opacity-0', 'tw-opacity-100')
        progressBarElmt?.classList.replace('tw-w-0', 'tw-w-full')
        progressBarElmt?.classList.replace(
          'tw-transition-none',
          'tw-transition-all'
        )
        const timer = 3000

        if (typeof this.toastOpenTimeout !== 'number') {
          this.toastOpenTimeout = setTimeout(() => {
            if (this.toastIsVisible) {
              this.toastOpenTimeout = null

              this.removeToast()
              // speed up the progress bar rewind animation to match the toast animation speed
              progressBarElmt?.classList.replace(
                'tw-transition-all',
                'tw-transition-none'
              )
            }
          }, timer)
        }
      }
    })
  },
  methods: {
    removeToast() {
      this.toastIsVisible = false

      const toaster = document.getElementById('toast-element')
      const progressBarElmt = document.getElementById('progressBar')

      toaster?.classList.replace('tw-right-5', '-tw-right-20')
      toaster?.classList.replace('tw-opacity-100', 'tw-opacity-0')
      progressBarElmt?.classList.replace('tw-w-full', 'tw-w-0')
    },
  },
}
</script>
