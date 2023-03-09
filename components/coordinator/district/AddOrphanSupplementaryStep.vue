<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Supplementary
    </h1>

    <v-form class="tw-max-w-[37rem]">
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Health</h2>

      <div class="form-control">
        <label class="form-label"> Psychological Status </label>
        <custom-combobox :items="psychologicalStatuses" />
      </div>

      <div class="form-control">
        <label class="form-label"> Description </label>
        <v-textarea
          color="teal darken-2"
          auto-grow
          dense
          outlined
          filled
          rows="3"
          row-height="25"
        ></v-textarea>
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Housing</h2>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Living Arrangements </label>
          <custom-combobox :items="orphanLivingArrangements" />
        </div>

        <div class="form-control">
          <label class="form-label"> House Type </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Assets</h2>

      <div class="form-control">
        <label class="form-label"> Title </label>
        <v-text-field
          color="teal darken-2"
          dense
          filled
          outlined
        ></v-text-field>
      </div>

      <div class="form-control">
        <label class="form-label"> Description </label>
        <v-textarea
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
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Unit of Measurement </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Attachments </label>
        <custom-file-input placeholder="Enter Attachments" :multiple="true" />
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
import * as orphanPsychologicalStatusOptions from '~/helpers/psychologicalStatusOptions.json'
import * as orphanLivingArrangements from '~/helpers/livingArrangements.json'

export default {
  name: 'OrphanDetailStep',
  components: {
    ButtonDark,
    CustomFileInput,
  },

  data() {
    return {
      gender: '',
    }
  },

  computed: {
    psychologicalStatuses() {
      return orphanPsychologicalStatusOptions.default.psychologicalStatuses
    },

    orphanLivingArrangements() {
      return orphanLivingArrangements.default.livingArrangements
    },
  },

  methods: {
    submit() {
      this.$store.dispatch('addOrphan/setActiveStep', 6)
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
