<template>
  <div class="tw-bg-white tw-mb-10">
    <v-form ref="assetForm" v-model="valid" class="tw-max-w-[37rem]">
      <div class="form-control">
        <label class="form-label"> Name </label>
        <v-text-field
          v-model="assetName"
          :rules="[rules.required, rules.name, rules.textWithSpaces]"
          required
          color="teal darken-2"
          dense
          filled
          outlined
        ></v-text-field>
      </div>

      <div class="form-control">
        <label class="form-label"> Description </label>
        <v-textarea
          v-model="assetDescription"
          :rules="[rules.required, rules.name, rules.textWithSpaces]"
          required
          color="teal darken-2"
          auto-grow
          dense
          outlined
          filled
          rows="3"
          row-height="25"
        ></v-textarea>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Amount </label>
          <v-text-field
            v-model="assetAmount"
            type="number"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Unit of Measurement </label>
          <v-text-field
            v-model="assetUnit"
            :rules="[rules.required, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Attachments (Optional) </label>
        <custom-file-input
          placeholder="Enter Attachments"
          :multiple="true"
          @fileChange="handleFileChange($event)"
        />
      </div>

      <div class="tw-flex tw-justify-end tw-gap-3 tw-my-3">
        <v-btn
          class="tw-text-sm tw-capitalize tw-text-gray-500 tw-bg-gray-200 tw-ring-1 tw-ring-gray-400"
          depressed
          :ripple="false"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <button-dark :disabled="!valid" @click="submit"> Save </button-dark>
      </div>
    </v-form>
  </div>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'
import CustomFileInput from '~/components/global/CustomFileInput.vue'
import { handleDocumentsUpload } from '~/helpers/upload.helper'

export default {
  name: 'AddOrphanAssetComponent',
  components: {
    ButtonDark,
    CustomFileInput,
  },

  data() {
    return {
      valid: true,
      assetName: '',
      assetDescription: '',
      assetAmount: null,
      assetUnit: '',
      assetAttachments: [],
      rules: {
        required: (value) => !!value || 'Required.',
        textWithSpaces: (value) =>
          /^[a-zA-Z ]+$/.test(value) ||
          !value ||
          'Only letters and spaces allowed.',
        name(value) {
          return (
            (value && value.length >= 3) ||
            'Name must be at least 3 characters long.'
          )
        },
      },
    }
  },

  watch: {
    assetName(value) {
      this.$store.dispatch('addOrphan/setAssetName', value)
    },
    assetDescription(value) {
      this.$store.dispatch('addOrphan/setAssetDescription', value)
    },
    assetAmount(value) {
      this.$store.dispatch('addOrphan/setAssetAmount', +value)
    },
    assetUnit(value) {
      this.$store.dispatch('addOrphan/setAssetUnit', value)
    },
  },

  methods: {
    handleFileChange(files) {
      this.assetAttachments = files
      console.log('Attachments: ', this.assetAttachments)
    },

    cancel() {
      this.$emit('assetClose')
    },

    async submit() {
      if (this.$refs.assetForm.validate()) {
        this.$emit('addAsset')

        if (this.assetAttachments.length > 0) {
          const assetAttachmentObjects = await handleDocumentsUpload(
            this.assetAttachments,
            'images',
            'ASSET'
          )

          this.$store.dispatch(
            'addOrphan/setAssetAttachments',
            assetAttachmentObjects
          )
        }
      }
    },
  },
}
</script>

<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}

.form-control-group {
  @apply tw-flex tw-gap-4;
}

.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
