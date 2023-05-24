<template>
  <div
    class="tw-w-60 lg:tw-w-72 xl:tw-w-[22rem] tw-h-72 tw-flex tw-justify-center tw-rounded-lg tw-bg-slate-100 tw-border tw-border-slate-300 tw-relative tw-mb-6"
  >
    <div
      class="tw-w-2/3 tw-h-2/3 tw-rounded-t-lg tw-border tw-border-slate-300 tw-mt-7"
    >
      <img
        :src="imageSrc"
        :alt="isLetter ? 'letter' : 'photo'"
        class="tw-object-cover tw-h-full tw-w-full tw-rounded-t-lg"
      />
    </div>
    <div
      class="tw-w-full tw-h-1/3 tw-absolute tw-bottom-0 tw-flex tw-justify-between tw-items-center tw-rounded-b-lg tw-border-t tw-border-slate-300 tw-bg-white tw-py-3 tw-px-5"
    >
      <div class="tw-flex tw-flex-col tw-gap-1">
        <p
          class="tw-w-40 lg:tw-w-52 xl:tw-w-[16rem] tw-font-bold tw-truncate tw-m-0"
        >
          {{ title }}
        </p>
        <p class="tw-font-medium tw-text-gray-400 tw-m-0">{{ createdAt }}</p>
      </div>

      <v-menu
        left
        offset-y
        nudge-left="20"
        origin="top right"
        rounded="200"
        transition="scale-transition"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            class="tw-w-fit hover:tw-text-emerald-800"
            text
            depressed
            plain
            :ripple="false"
            v-bind="attrs"
            v-on="on"
          >
            <fa-layers class="fa-lg">
              <fa :icon="['fa', 'ellipsis-vertical']" />
            </fa-layers>
          </v-btn>
        </template>

        <!-- Menu Content -->
        <v-list>
          <v-list-item dense @click="handleUpdateClick">
            <div class="tw-w-32 tw-flex tw-gap-2.5 tw-items-center">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fa', 'arrows-rotate']" />
              </fa-layers>
              <span>Update</span>
            </div>
          </v-list-item>
          <v-list-item dense @click="handleViewClick">
            <div class="tw-w-32 tw-flex tw-gap-2.5 tw-items-center">
              <fa-layers class="tw-mr-2">
                <fa :icon="['fas', 'eye']" />
              </fa-layers>
              <span>View</span>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentPreview',
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
    isLetter: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {}
  },

  computed: {
    title() {
      return `${this.isLetter ? 'Letter' : 'Photo'} ${this.idx + 1}`
    },

    imageSrc() {
      return this.isLetter
        ? this.item.originalThankyouLetterUrl
        : this.item.photoPortraitUrl
    },
    createdAt() {
      return Date(this.item.createdAt).slice(0, 15)
    },
  },

  methods: {
    handleUpdateClick() {
      this.$emit('onUpdateDocument', this.item.id)
    },

    handleViewClick() {
      this.$emit('onViewDocument', this.item.id)
    },

    // TODO: Implement preview after uploading
    // toggleOrphanPassportInput() {
    //   if (this.orphanPassportFile) {
    //     this.orphanPassport = URL.createObjectURL(this.orphanPassportFile)
    //   }
    // },
  },
}
</script>
