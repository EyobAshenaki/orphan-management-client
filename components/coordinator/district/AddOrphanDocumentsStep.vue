<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Supplementary
    </h1>

    <v-form class="tw-max-w-[37rem]">
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Orphan</h2>
      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Birth Date Certificate </label>
          <custom-file-input placeholder="Attach Birth Certificate" />
        </div>

        <div class="form-control">
          <label class="form-label"> Portrait Photo </label>
          <custom-file-input placeholder="Attach Portrait Photo" />
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> ID </label>
          <custom-file-input placeholder="Attach ID" />
        </div>

        <div class="form-control">
          <label class="form-label"> Passport </label>
          <custom-file-input placeholder="Attach Passport" />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Report Card </label>
        <custom-file-input placeholder="Attach Report Card" />
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Father</h2>

      <div class="form-control">
        <label class="form-label"> Death Certificate </label>
        <custom-file-input placeholder="Attach Death Certificate" />
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Guardian</h2>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> ID </label>
          <custom-file-input placeholder="Attach ID" />
        </div>

        <div class="form-control">
          <label class="form-label"> Memorandum Of Understanding (MOU) </label>
          <custom-file-input placeholder="Attach MOU" />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Adoption Certificate </label>
        <custom-file-input placeholder="Attach Adoption Certificate" />
      </div>

      <div class="tw-flex tw-justify-end">
        <button-dark class="tw-rounded-lg tw-py-6 tw-px-5" @click="submit">
          Continue
          <fa-layers class="fa-lg tw-ml-4">
            <fa :icon="['fa', 'arrow-right-long']" />
          </fa-layers>
        </button-dark>
      </div>
    </v-form>
  </section>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'
import CustomFileInput from '~/components/global/CustomFileInput.vue'

export default {
  name: 'OrphanDetailStep',
  components: {
    ButtonDark,
    CustomFileInput,
  },

  methods: {
    submit() {
      this.$store.dispatch('addOrphan/setActiveStep', 7)
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
