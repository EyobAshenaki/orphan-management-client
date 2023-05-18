<template>
  <v-card class="tw-max-w-xs" elevation="0">
    <v-card-title class="-tw-mb-4">New Region</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="regionForm" @submit.prevent="saveRegion">
        <div class="tw-flex tw-flex-col">
          <div class="form-control">
            <label class="form-label">Region Name</label>
            <v-text-field
              v-model.trim="name"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="tw-w-full tw-flex tw-justify-end">
            <button-dark
              :loading="loading"
              :disabled="loading"
              @click="saveRegion"
              >Save</button-dark
            >
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="regionName"
        item-type="Region"
        no-route="/locations"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { GraphQLError } from 'graphql';
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
import { createRegion } from '~/services/location.service'
export default {
  name: 'AddRegion',
  components: {
    PostSaveDialog,
  },
  layout: 'head',
  data() {
    return {
      name: '',
      regionName: '',
      loading: false,
      showPostSaveDialog: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  methods: {
    async saveRegion() {
      if (!this.$refs.regionForm.validate()) return
      this.loading = true
      this.regionName = this.name
      const createRegionInput = {
        name: this.name,
      }
      try {
        const data = await createRegion(createRegionInput)
        if (data) this.reset()
      } catch (error) {
      if (Array.from(error)[0] instanceof GraphQLError) {
        error.forEach((e) => {
          this.$toaster.showToast({
            content: e.message,
            state: 'error',
          })
        })
        // eslint-disable-next-line no-console
      } else console.error(error)
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.showPostSaveDialog = true
      this.$refs.regionForm.reset()
    },
  },
}
</script>
<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}
.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
