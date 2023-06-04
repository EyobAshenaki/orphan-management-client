<template>
  <div class="tw-flex tw-gap-5">
    <section
      class="tw-grow tw-bg-white tw-rounded-md tw-p-5"
      :class="{ 'tw-max-w-[48rem]': photoForm }"
    >
      <!-- Header -->
      <div class="tw-w-full tw-flex tw-justify-end tw-my-4">
        <!-- TODO: Implement a Show all button -->
        <!-- <v-btn
          class="tw-w-fit hover:tw-text-emerald-800 tw-py-1 tw-px-3"
          text
          depressed
          plain
          :ripple="false"
         
        >
          <span class="tw-lowercase">
            <span class="tw-capitalize"> Show </span> all
          </span>
          <fa-layers class="tw-ml-2">
            <fa :icon="['fa', 'chevron-down']" />
          </fa-layers>
        </v-btn> -->

        <button-dark class="tw-mr-2" @click="handleAddDocument">
          <fa-layers class="tw-mr-2">
            <fa :icon="['fa', 'plus']" />
          </fa-layers>
          <span>Add Photo</span>
        </button-dark>
      </div>

      <!-- Document  view -->
      <div class="tw-flex tw-flex-wrap tw-justify-evenly">
        <document-preview
          v-for="(photo, idx) in orphanPhotos"
          :key="photo.id"
          :item="photo"
          :idx="idx"
          :is-letter="false"
          @onUpdateDocument="handleDocumentUpdate(photo.id)"
          @onViewDocument="handleDocumentView(photo)"
        />
      </div>
    </section>

    <!-- Update -->
    <!-- TODO: Refactor into a component -->
    <v-form
      v-if="photoForm"
      ref="form"
      class="tw-w-[23rem] tw-border tw-border-gray-400 tw-rounded-lg tw-p-5"
    >
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-1 tw-mb-5">
        {{ formTitle }}
      </h2>
      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Portrait Photo </label>
          <custom-file-input
            placeholder="Attach Portrait Photo"
            @fileChange="handleFileChange($event, 'orphanPortraitPhoto')"
          />
        </div>

        <div class="form-control">
          <label class="form-label"> Long Photo </label>
          <custom-file-input
            placeholder="Attach Long Photo"
            @fileChange="handleFileChange($event, 'orphanLongPhoto')"
          />
        </div>
      </div>

      <div class="tw-flex tw-justify-between tw-mt-8">
        <button-dark
          class="tw-bg-red-800 hover:tw-bg-red-700 tw-rounded-lg tw-py-6 tw-px-5"
          @click="cancel"
        >
          Cancel
        </button-dark>

        <button-dark
          :disabled="!valid"
          class="tw-rounded-lg tw-py-6 tw-px-5"
          @click="submit"
        >
          {{ formButton }}
        </button-dark>
      </div>
    </v-form>

    <!-- View -->
    <v-dialog v-model="orphanPhotosDialog" max-width="70vw">
      <div
        class="tw-relative tw-flex tw-flex-col tw-bg-white tw-rounded-lg tw-py-14 tw-px-12"
      >
        <v-btn
          class="tw-absolute tw-top-1 tw-right-7 tw-w-fit hover:tw-text-red-800"
          text
          fab
          depressed
          plain
          :ripple="false"
          @click="toggleOrphanPhotosDialog"
        >
          <fa-layers>
            <fa class="tw-w-6 tw-h-6" :icon="['fa', 'xmark']" />
          </fa-layers>
        </v-btn>
        <div class="tw-flex tw-gap-7">
          <v-img
            :src="portraitPhoto"
            contain
            alt="portrait photo"
            class="tw-rounded-lg"
          >
          </v-img>

          <v-img
            :src="longPhoto"
            contain
            alt="long photo"
            class="tw-rounded-lg"
          >
          </v-img>
        </div>
        <div class="tw-flex tw-gap-7 mt-7">
          <h3 class="tw-w-1/2 tw-font-mono tw-text-xl tw-text-center">
            Portrait Photo
          </h3>
          <h3 class="tw-w-1/2 tw-font-mono tw-text-xl tw-text-center">
            Long Photo
          </h3>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'
import DocumentPreview from '~/components/global/DocumentPreview.vue'
import { handleUrlUpload } from '~/helpers/upload.helper'

export default {
  name: 'PhotosInfo',
  components: { ButtonDark, DocumentPreview },

  data() {
    return {
      photoForm: false,
      orphanPhotosDialog: false,
      orphanLongPhoto: null,
      orphanPortraitPhoto: null,
      photoId: null,
      selectedPhoto: null,
      isUpdate: false,
    }
  },

  computed: {
    orphanPhotos() {
      return this.$store.getters['orphan/orphanPhotos']
    },

    valid() {
      return this.isUpdate
        ? this.orphanLongPhoto || this.orphanPortraitPhoto
        : this.orphanLongPhoto && this.orphanPortraitPhoto
    },

    formTitle() {
      return this.isUpdate ? 'Update Photo' : 'Add Photo'
    },

    formButton() {
      return this.isUpdate ? 'Update' : 'Add'
    },

    portraitPhoto() {
      return this.selectedPhoto?.photoPortraitUrl
    },

    longPhoto() {
      return this.selectedPhoto?.photoLongUrl
    },
  },

  async mounted() {
    await this.initialize()
    console.log('Photos: ' + this.orphanPhotos)
  },

  methods: {
    async initialize() {
      const orphanId = this.$route.params.orphanId
      console.log('Orphan Id: ' + orphanId)
      await this.$store.dispatch('orphan/fetchOrphanPhotos', orphanId)
    },

    handleFileChange(file, field) {
      this[field] = file
      console.log(this[field])
    },

    handleAddDocument() {
      this.isUpdate = false
      this.photoForm = true

      console.log('Add Doc')
    },

    handleDocumentUpdate(photoId) {
      this.isUpdate = true
      this.photoForm = true

      console.log('Update Doc: ', photoId)
      this.photoId = photoId
    },

    handleDocumentView(photo) {
      this.toggleOrphanPhotosDialog()
      console.log('View Doc: ', photo)
      this.selectedPhoto = photo
    },

    toggleOrphanPhotosDialog() {
      this.orphanPhotosDialog = !this.orphanPhotosDialog
    },

    cancel() {
      this.photoForm = false
      this.photoId = null
    },

    submit() {
      if (this.isUpdate) {
        this.updatePhoto(this.photoId)
      } else {
        this.addPhoto()
      }
      this.photoForm = false
    },

    async updatePhoto(photoId) {
      const orphanId = this.$route.params.orphanId

      const photoPortraitUrl =
        this.orphanPortraitPhoto &&
        `${process.env.NUXT_API_URL}/${await handleUrlUpload(
          this.orphanPortraitPhoto
        )}`
      const photoLongUrl =
        this.orphanLongPhoto &&
        `${process.env.NUXT_API_URL}/${await handleUrlUpload(
          this.orphanLongPhoto
        )}`

      await this.$store.dispatch('orphan/addOrphanPhoto', {
        id: photoId,
        orphanId,
        photoPortraitUrl,
        photoLongUrl,
      })

      await this.initialize()
    },

    async addPhoto() {
      const orphanId = this.$route.params.orphanId

      const photoPortraitUrl =
        this.orphanPortraitPhoto &&
        `${process.env.NUXT_API_URL}/${await handleUrlUpload(
          this.orphanPortraitPhoto
        )}`
      const photoLongUrl =
        this.orphanLongPhoto &&
        `${process.env.NUXT_API_URL}/${await handleUrlUpload(
          this.orphanLongPhoto
        )}`

      await this.$store.dispatch('orphan/addOrphanPhoto', {
        orphanId,
        photoPortraitUrl,
        photoLongUrl,
      })

      await this.initialize()
    },
  },
}
</script>

<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}

.form-control-group {
  @apply tw-flex tw-flex-col tw-gap-4;
}

.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
