<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Details
    </h1>

    <v-form class="tw-max-w-[37rem]">
      <div class="form-control mt-5">
        <label class="form-label"> Code </label>
        <v-text-field
          color="teal darken-2"
          dense
          filled
          outlined
        ></v-text-field>
      </div>

      <div class="form-control">
        <label class="form-label"> Gender </label>
        <v-radio-group v-model="gender" class="-tw-mt-1" row>
          <custom-radio
            :class="[gender === 'M' ? 'tw-border-emerald-800' : '']"
            label="Male"
            value="M"
          />
          <custom-radio
            :class="[gender === 'F' ? 'tw-border-emerald-800' : '']"
            label="Female"
            value="F"
          />
        </v-radio-group>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Name </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Father Name </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Grand Father Name </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Birth </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Place of Birth </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Religion </label>
          <custom-combobox :items="religions" />
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Spoken Languages </label>
          <custom-combobox :items="languages" :multiple="true" />
        </div>

        <div class="form-control">
          <label class="form-label"> Hobbies </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
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
import CustomCombobox from '~/components/global/CustomCombobox.vue'
import CustomRadio from '~/components/global/CustomRadio.vue'
import * as ethiopianLanguages from '~/helpers/commonEthiopianLanguages.json'
import * as ethiopianReligions from '~/helpers/commonEthiopianReligions.json'

export default {
  name: 'OrphanDetailStep',
  components: { ButtonDark, CustomRadio, CustomCombobox },

  data() {
    return {
      gender: '',
    }
  },

  computed: {
    languages() {
      return ethiopianLanguages.default.languages
    },
    religions() {
      return ethiopianReligions.default.religions
    },
  },

  methods: {
    submit() {
      this.$store.dispatch('addOrphan/setActiveStep', 2)
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
