<template>
  <div class="tw-flex tw-gap-5">
    <section
      class="tw-grow tw-bg-white tw-rounded-md tw-p-5"
      :class="{ 'tw-max-w-[48rem]': documentForm }"
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
          <span>Add Letter</span>
        </button-dark>
      </div>

      <!-- Document  view -->
      <div class="tw-flex tw-flex-wrap tw-justify-evenly">
        <document-preview
          v-for="(letter, idx) in orphanLetters"
          :key="letter.id"
          :item="letter"
          :idx="idx"
          :is-letter="true"
          @onUpdateDocument="handleDocumentUpdate(letter.id)"
          @onViewDocument="handleDocumentView(letter)"
        />
      </div>
    </section>

    <!-- Update -->
    <!-- TODO: Refactor into a component -->
    <v-form
      v-if="documentForm"
      ref="form"
      class="tw-w-[23rem] tw-border tw-border-gray-400 tw-rounded-lg tw-p-5"
    >
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-1 tw-mb-5">
        {{ formTitle }}
      </h2>
      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Original Letter </label>
          <custom-file-input
            placeholder="Attach Original Letter"
            @fileChange="handleFileChange($event, 'orphanOriginalLetter')"
          />
        </div>

        <div class="form-control">
          <label class="form-label"> Translated Letter </label>
          <custom-file-input
            placeholder="Attach Translated Letter"
            @fileChange="handleFileChange($event, 'orphanTranslatedLetter')"
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
    <v-dialog v-model="orphanLettersDialog" max-width="70vw">
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
          @click="toggleOrphanLettersDialog"
        >
          <fa-layers>
            <fa class="tw-w-6 tw-h-6" :icon="['fa', 'xmark']" />
          </fa-layers>
        </v-btn>
        <div class="tw-flex tw-gap-7">
          <v-img
            :src="originalLetter"
            contain
            alt="Original Thankyou Letter"
            class="tw-rounded-lg"
          >
          </v-img>

          <v-img
            :src="translatedLetter"
            contain
            alt="=Translated Thankyou Letter"
            class="tw-rounded-lg"
          >
          </v-img>
        </div>
        <div class="tw-flex tw-gap-7 mt-7">
          <h3 class="tw-w-1/2 tw-font-mono tw-text-xl tw-text-center">
            Original Thankyou Letter
          </h3>
          <h3 class="tw-w-1/2 tw-font-mono tw-text-xl tw-text-center">
            Translated Thankyou Letter
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
  name: 'LettersInfo',
  components: { ButtonDark, DocumentPreview },

  data() {
    return {
      documentForm: false,
      orphanLettersDialog: false,
      orphanOriginalLetter: null,
      orphanTranslatedLetter: null,
      letterId: null,
      selectedLetter: null,
      isUpdate: false,
    }
  },

  computed: {
    orphanLetters() {
      return this.$store.getters['orphan/orphanLetters']
    },

    valid() {
      return this.isUpdate
        ? this.orphanOriginalLetter || this.orphanTranslatedLetter
        : this.orphanOriginalLetter && this.orphanTranslatedLetter
    },

    formTitle() {
      return this.isUpdate ? 'Update Letter' : 'Add Letter'
    },

    formButton() {
      return this.isUpdate ? 'Update' : 'Add'
    },

    originalLetter() {
      return this.selectedLetter?.originalThankyouLetterUrl
    },

    translatedLetter() {
      return this.selectedLetter?.translatedThankyouLetterUrl
    },
  },

  async mounted() {
    await this.initialize()
    console.log('Letters: ' + this.orphanLetters)
  },

  methods: {
    async initialize() {
      const orphanId = this.$route.params.orphanId
      console.log('Orphan Id: ' + orphanId)
      await this.$store.dispatch('orphan/fetchOrphanLetters', orphanId)
    },

    handleFileChange(file, field) {
      this[field] = file
      console.log(this[field])
    },

    handleAddDocument() {
      this.isUpdate = false
      this.documentForm = true

      console.log('Add Doc')
    },

    handleDocumentUpdate(letterId) {
      this.isUpdate = true
      this.documentForm = true

      console.log('Update Doc: ', letterId)
      this.letterId = letterId
    },

    handleDocumentView(letter) {
      this.toggleOrphanLettersDialog()
      console.log('View Doc: ', letter)
      this.selectedLetter = letter
    },

    toggleOrphanLettersDialog() {
      this.orphanLettersDialog = !this.orphanLettersDialog
    },

    cancel() {
      this.documentForm = false
      this.letterId = null
    },

    submit() {
      if (this.isUpdate) {
        this.updateDocument()
        console.log(this.letterId)
      } else {
        this.addDocument()
      }
      this.documentForm = false
    },

    async addDocument() {
      const orphanId = this.$route.params.orphanId

      const originalThankyouLetterUrl =
        this.orphanOriginalLetter &&
        `${process.env.NUXT_API_URL}/${await handleUrlUpload(
          this.orphanOriginalLetter
        )}`
      const translatedThankyouLetterUrl =
        this.orphanTranslatedLetter &&
        `${process.env.NUXT_API_URL}/${await handleUrlUpload(
          this.orphanTranslatedLetter
        )}`

      await this.$store.dispatch('orphan/addOrphanLetter', {
        orphanId,
        originalThankyouLetterUrl,
        translatedThankyouLetterUrl,
      })

      await this.initialize()
    },
  },
}
</script>

<style scoped></style>
